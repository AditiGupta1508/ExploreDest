// ============================================================
// ExploreDest - app.js v4.0
// Author: Aditi Gupta
// Logic only — all destination/airport data is in destinations.js
// ============================================================

// ── MAP INIT ──────────────────────────────────────────────────
const map = L.map('map').setView([22.0, 78.0], 4);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CARTO'
}).addTo(map);

let currentMarkers = [];
let routeLine = null;
let originCoords = null;
let currentDisplayedTrips = [];

// ── CURRENCY ──────────────────────────────────────────────────
let exchangeRates = {};
const symbols = { USD: "$", EUR: "€", INR: "₹" };

async function fetchExchangeRates() {
    try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await res.json();
        exchangeRates = data.rates;
    } catch {
        exchangeRates = { USD: 1, INR: 83, EUR: 0.9 };
    }
}
fetchExchangeRates();

function getCurrency() { return document.getElementById('currencySelect').value; }
function convert(usdAmount) {
    return Math.round(usdAmount * (exchangeRates[getCurrency()] || 1));
}
function formatMoney(usdAmount) {
    return `${symbols[getCurrency()]}${convert(usdAmount)}`;
}

// ── GPS ───────────────────────────────────────────────────────
async function getUserLocation() {
    if (!navigator.geolocation) return alert("GPS not supported on this browser.");
    document.getElementById('startCity').value = "Locating...";
    navigator.geolocation.getCurrentPosition(async (pos) => {
        originCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${originCoords.lat}&lon=${originCoords.lng}&format=json`);
            const data = await res.json();
            document.getElementById('startCity').value = data.address.city || data.address.town || data.address.state || "Your Location";
        } catch {
            document.getElementById('startCity').value = "Your Location";
        }
    }, () => {
        alert("Could not get location. Please type your city.");
        document.getElementById('startCity').value = "";
    });
}

// ── DISTANCE (Haversine Formula) ──────────────────────────────
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// ── NEAREST AIRPORT ───────────────────────────────────────────
// Finds the closest Indian airport to the user's origin
function findNearestAirport(originLat, originLng) {
    let nearest = null;
    let minDistance = Infinity;
    indianAirports.forEach(airport => {
        const dist = calculateDistance(originLat, originLng, airport.lat, airport.lng);
        if (dist < minDistance) {
            minDistance = dist;
            nearest = { ...airport, distanceFromOrigin: Math.round(dist) };
        }
    });
    return nearest;
}

// ── TRANSPORT COST ────────────────────────────────────────────
function getTransport(distanceKM, isInternational, nearestAirport) {
    if (isInternational) {
        // Cost = taxi/bus to nearest airport + budget flight
        const airportTransferCostUSD = nearestAirport.distanceFromOrigin < 50 ? 5 : 12;
        const flightCostUSD = distanceKM < 3000 ? 120 : 200; // regional vs long haul
        return {
            cost: airportTransferCostUSD + flightCostUSD,
            mode: `Bus/Taxi to ${nearestAirport.name} (${nearestAirport.distanceFromOrigin} km) → Budget Flight`,
            airportName: nearestAirport.name,
            airportCity: nearestAirport.city,
            airportCode: nearestAirport.code,
            airportDist: nearestAirport.distanceFromOrigin
        };
    }
    if (distanceKM < 400) return { cost: 10, mode: "State Bus / Sleeper Train" };
    if (distanceKM < 1500) return { cost: 35, mode: "Express / Sleeper Train" };
    return { cost: 60, mode: "Budget Domestic Flight" };
}

// ── VIBE FILTER ───────────────────────────────────────────────
function applyFilters(pool, travelType, vibe) {
    let filtered = pool;

    // Travel type filter
    if (travelType === "domestic") filtered = filtered.filter(d => d.country === "India");
    if (travelType === "international") filtered = filtered.filter(d => d.country !== "India");

    // Vibe filter
    if (vibe && vibe !== "all") {
        filtered = filtered.filter(d => d.vibes && d.vibes.includes(vibe));
    }

    return filtered;
}

// ── SMART TRIP COMBINER ───────────────────────────────────────
function findTripOptions(affordableDestinations, totalDays, travelType, vibe, totalBudgetUSD) {
    const pool = applyFilters(affordableDestinations, travelType, vibe);
    let options = [];

    // Single destination matching days (±1 day tolerance)
    pool.forEach(dest => {
        if (Math.abs(dest.recommendedDays - totalDays) <= 1) {
            options.push({ type: "single", destinations: [dest] });
        }
    });

    // Two destinations — days AND combined cost must both fit
    for (let i = 0; i < pool.length; i++) {
        for (let j = i + 1; j < pool.length; j++) {
            const combinedDays = pool[i].recommendedDays + pool[j].recommendedDays;
            const combinedCost = pool[i].totalCostUSD + pool[j].totalCostUSD;
            const daysMatch = Math.abs(combinedDays - totalDays) <= 1;
            const budgetFits = combinedCost <= totalBudgetUSD;
            if (daysMatch && budgetFits) {
                options.push({ type: "multi", destinations: [pool[i], pool[j]] });
            }
        }
    }

    return options;
}

// ── MAIN PLANNING LOGIC ───────────────────────────────────────
async function planMyTrip() {
    const startCity = document.getElementById('startCity').value.trim();
    const days = parseInt(document.getElementById('tripDays').value);
    const userBudgetInput = parseInt(document.getElementById('totalBudget').value);
    const travelType = document.getElementById('travelFilter')?.value || 'all';
    const vibe = document.getElementById('vibeFilter')?.value || 'all';
    const container = document.getElementById('destinations-container');

    if (!startCity || !days || !userBudgetInput) return alert("Please fill all fields!");

    const rate = exchangeRates[getCurrency()] || 1;
    const totalBudgetUSD = userBudgetInput / rate;

    container.innerHTML = `<div class="empty-state"><h3>⏳ Finding your perfect trip...</h3></div>`;

    // Always reset origin so changing city always re-geocodes
    originCoords = null;

    try {
        // India-biased geocoding — works for any Indian city/town
        let geoData = [];
        const res1 = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(startCity)}&format=json&limit=5&countrycodes=in`);
        geoData = await res1.json();

        if (geoData.length === 0) {
            // Fallback to global search
            const res2 = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(startCity)}&format=json&limit=1`);
            geoData = await res2.json();
        }

        if (geoData.length === 0) throw new Error("City not found");
        originCoords = { lat: parseFloat(geoData[0].lat), lng: parseFloat(geoData[0].lon) };

        // Find nearest airport for international trip planning
        const nearestAirport = findNearestAirport(originCoords.lat, originCoords.lng);

        // Calculate cost for each destination
        let affordableDestinations = [];
        destinations.forEach(dest => {
            const isInternational = dest.country !== "India";
            const distanceKM = calculateDistance(originCoords.lat, originCoords.lng, dest.lat, dest.lng);
            const transport = getTransport(distanceKM, isInternational, nearestAirport);
            const livingCostUSD = dest.dailyCostUSD * dest.recommendedDays;
            const totalCostUSD = livingCostUSD + transport.cost;

            if (totalBudgetUSD >= totalCostUSD) {
                affordableDestinations.push({
                    ...dest,
                    distance: Math.round(distanceKM),
                    transportCostUSD: transport.cost,
                    transportMode: transport.mode,
                    totalCostUSD,
                    leftoverUSD: totalBudgetUSD - totalCostUSD,
                    isInternational,
                    nearestAirport: isInternational ? transport : null
                });
            }
        });

        // Find smart trip combinations
        const tripOptions = findTripOptions(affordableDestinations, days, travelType, vibe, totalBudgetUSD);

        // Fetch Wikipedia images
        const fallbackImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";
        await Promise.all(affordableDestinations.map(async (dest) => {
            try {
                const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(dest.name)}`);
                const data = await res.json();
                dest.image = data.originalimage?.source ||
                    data.thumbnail?.source?.replace(/\/\d+px-/, '/800px-') ||
                    fallbackImage;
            } catch {
                dest.image = fallbackImage;
            }
        }));

        currentDisplayedTrips = affordableDestinations;
        renderResults(tripOptions, days);

    } catch (err) {
        container.innerHTML = `<div class="empty-state">
            <h3>⚠️ Could not find that city.</h3>
            <p>Try a nearby larger city — e.g. "Ludhiana" or "Chandigarh" instead of a small town.</p>
        </div>`;
        originCoords = null;
    }
}

// ── RENDER RESULTS ────────────────────────────────────────────
function renderResults(tripOptions, days) {
    const container = document.getElementById('destinations-container');
    container.innerHTML = "";

    currentMarkers.forEach(m => map.removeLayer(m));
    currentMarkers = [];
    if (routeLine) map.removeLayer(routeLine);

    if (tripOptions.length === 0) {
        container.innerHTML = `<div class="empty-state">
            <h3>💸 No matches found for these filters!</h3>
            <p>Try changing the vibe filter, adjusting your days, increasing budget, or switching between domestic/international.</p>
        </div>`;
        return;
    }

    const fallbackImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";

    tripOptions.forEach((option) => {
        const dests = option.destinations;
        const isSingle = option.type === "single";
        const totalCostUSD = dests.reduce((s, d) => s + d.totalCostUSD, 0);
        const leftoverUSD = dests[0].leftoverUSD;
        const totalDays = dests.reduce((s, d) => s + d.recommendedDays, 0);

        const title = isSingle
            ? `${dests[0].name} — ${dests[0].recommendedDays} Days`
            : `${dests[0].name} (${dests[0].recommendedDays}d) + ${dests[1].name} (${dests[1].recommendedDays}d)`;

        const description = isSingle ? dests[0].description
            : `A perfect ${totalDays}-day combo — two destinations, one unforgettable trip!`;

        const vibeEmojis = (dests[0].vibes || []).map(v => ({
            beach: "🏖️", mountains: "🏔️", party: "🎉",
            backpacker: "🎒", city: "🌆", nature: "🌿",
            history: "🏛️", adventure: "⚡"
        }[v] || "")).join(" ");

        const destKey = dests.map(d => d.name).join('|');

        dests.forEach(dest => {
            const marker = L.marker([dest.lat, dest.lng]).addTo(map);
            marker.bindPopup(`<b>${dest.name}</b><br>${formatMoney(dest.totalCostUSD)}`);
            currentMarkers.push(marker);
        });

        container.innerHTML += `
            <div class="card">
                <img src="${dests[0].image || fallbackImage}" alt="${title}" onerror="this.src='${fallbackImage}'">
                <div class="card-content">
                    <span class="badge">${formatMoney(totalCostUSD)} Total · ${totalDays} Days</span>
                    <h3>${title}</h3>
                    <p style="font-size:13px; margin-bottom:6px;">${vibeEmojis}</p>
                    <p style="margin-bottom:8px; color:#555; font-size:14px;">${description}</p>
                    <p style="margin-bottom:15px; color:#888; font-size:13px;">
                        🛣️ ${dests[0].distance} km away &nbsp;·&nbsp; ${dests[0].isInternational ? "✈️ Flight" : "🚌 " + dests[0].transportMode}<br>
                        💚 ${formatMoney(leftoverUSD)} left for food & extras
                    </p>
                    <button class="cta-btn" style="width:100%;"
                        onclick="openGuide('${destKey}', ${totalDays})">
                        🗺️ View ${totalDays}-Day Itinerary
                    </button>
                </div>
            </div>`;
    });

    if (currentMarkers.length > 0) {
        const bounds = new L.LatLngBounds(currentMarkers.map(m => m.getLatLng()));
        bounds.extend([originCoords.lat, originCoords.lng]);
        map.fitBounds(bounds, { padding: [50, 50] });
    }

    const homeMarker = L.circleMarker([originCoords.lat, originCoords.lng], { color: 'red', radius: 8 }).addTo(map);
    homeMarker.bindPopup("<b>Your Starting Point</b>");
    currentMarkers.push(homeMarker);
}

// ── TOUR GUIDE — DAY BY DAY ITINERARY ────────────────────────
async function openGuide(destKey, totalDays) {
    const destNames = destKey.split('|');
    const dests = destNames.map(n => currentDisplayedTrips.find(d => d.name === n)).filter(Boolean);
    if (!dests.length) return;

    const title = dests.length === 1
        ? `Your ${totalDays}-Day Trip to ${dests[0].name}`
        : `Your ${totalDays}-Day ${dests[0].name} + ${dests[1].name} Combo`;

    document.getElementById('guideTitle').innerText = title;

    // Transport section — show airport info for international
    document.getElementById('guideTransport').innerHTML = dests.map(d => {
        if (d.isInternational && d.nearestAirport) {
            return `<b>${d.name} (International):</b><br>
                📍 Nearest Airport: <b>${d.nearestAirport.airportName}</b> (${d.nearestAirport.airportCode})<br>
                🚕 Distance to Airport: ${d.nearestAirport.airportDist} km from ${document.getElementById('startCity').value}<br>
                ✈️ Budget Flight from ${d.nearestAirport.airportCode} → ${d.name}`;
        }
        return `<b>${d.name}:</b> ${d.transportMode} · ${d.distance} km · ${formatMoney(d.transportCostUSD)}`;
    }).join('<br><br>');

    document.getElementById('guideBudget').innerHTML = `
        <b>Living Costs:</b> ${formatMoney(dests.reduce((s, d) => s + d.dailyCostUSD * d.recommendedDays, 0))}<br>
        <b>Transport:</b> ${formatMoney(dests.reduce((s, d) => s + d.transportCostUSD, 0))}<br>
        <b>Total Trip Cost:</b> ${formatMoney(dests.reduce((s, d) => s + d.totalCostUSD, 0))}<br>
        <span style="color:green;"><b>Money Left:</b> ${formatMoney(dests[0].leftoverUSD)} for food & surprises!</span>
    `;

    // Draw route on map
    if (routeLine) map.removeLayer(routeLine);
    const routePoints = [[originCoords.lat, originCoords.lng], ...dests.map(d => [d.lat, d.lng])];
    routeLine = L.polyline(routePoints, { color: '#ff6600', weight: 3, dashArray: '10, 10' }).addTo(map);
    map.setView([dests[0].lat, dests[0].lng], 10);

    // Day by day itinerary
    const gemsList = document.getElementById('guideGems');
    gemsList.innerHTML = "";
    let dayNumber = 1;

    for (const dest of dests) {
        // Travel day — show airport journey for international
        if (dest.isInternational && dest.nearestAirport) {
            gemsList.innerHTML += `
                <li style="background:#e8f4fd; border-left: 4px solid #1a56db;">
                    ✈️ <b>Day ${dayNumber} — Travel Day (International)</b><br>
                    <small>
                        🚕 ${document.getElementById('startCity').value} → ${dest.nearestAirport.airportCity} Airport (${dest.nearestAirport.airportCode}) by taxi/bus · ~${dest.nearestAirport.airportDist} km<br>
                        ✈️ Flight from ${dest.nearestAirport.airportCode} → ${dest.name}<br>
                        🏨 Arrive, check in, explore nearby area
                    </small>
                </li>`;
        } else {
            gemsList.innerHTML += `
                <li style="background:#fff3e0; border-left: 4px solid #ff6600;">
                    🚌 <b>Day ${dayNumber} — Travel to ${dest.name}</b><br>
                    <small>${dest.transportMode} · ${dest.distance} km · Est. ${formatMoney(dest.transportCostUSD)}</small>
                </li>`;
        }
        dayNumber++;

        // Day plans
        for (const plan of dest.dayPlan) {
            gemsList.innerHTML += `<li>📅 <b>Day ${dayNumber}</b> — ${plan}</li>`;
            dayNumber++;
        }

        // Hidden gems with Wikipedia images
        for (const gem of dest.gems) {
            let imgTag = "";
            try {
                const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(gem)}`);
                const wikiData = await wikiRes.json();
                const imgSrc = wikiData.originalimage?.source ||
                    wikiData.thumbnail?.source?.replace(/\/\d+px-/, '/600px-') || "";
                if (imgSrc) imgTag = `<img src="${imgSrc}" class="attraction-img" alt="${gem}" onerror="this.style.display='none'">`;
            } catch (e) {}
            gemsList.innerHTML += `<li>💎 <b>Hidden Gem:</b> ${gem} ${imgTag}</li>`;
        }

        // Add attraction pins to map
        dest.attractions.forEach(place => {
            const pin = L.marker([place.lat, place.lng]).addTo(map);
            pin.bindPopup(`<b>${place.name}</b>`);
            currentMarkers.push(pin);
        });
    }

    document.getElementById('guideModal').style.display = "block";

    // 7-day live weather
    const grid = document.getElementById('weatherForecast');
    grid.innerHTML = "Fetching live weather...";
    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${dests[0].lat}&longitude=${dests[0].lng}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`);
        const data = await res.json();
        grid.innerHTML = "";
        for (let i = 0; i < 7; i++) {
            const dateStr = new Date(data.daily.time[i]).toLocaleDateString('en-US', {
                weekday: 'short', month: 'short', day: 'numeric'
            });
            grid.innerHTML += `
                <div class="weather-day">
                    <span>${dateStr}</span>
                    ${Math.round(data.daily.temperature_2m_max[i])}°C | ${Math.round(data.daily.temperature_2m_min[i])}°C
                </div>`;
        }
    } catch { grid.innerHTML = "Weather data unavailable."; }
}

function closeGuideModal() {
    document.getElementById('guideModal').style.display = "none";
    if (originCoords && currentMarkers.length > 0) {
        const bounds = new L.LatLngBounds(currentMarkers.map(m => m.getLatLng()));
        map.fitBounds(bounds, { padding: [50, 50] });
    }
}