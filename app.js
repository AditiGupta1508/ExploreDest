// 1. EXPANDED GLOBAL DATABASE: Added nearby alternatives & budget hubs!
const destinations =[
    // --- NEARBY PUNJAB / HIMACHAL ALTERNATIVES ---
    {
        name: "Amritsar", country: "India", lat: 31.6340, lng: 74.8723, dailyCostUSD: 10,
        image: "", 
        description: "Rich culture, incredible food, and spiritual peace right next door.",
        attractions:[ { name: "Golden Temple", lat: 31.6200, lng: 74.8765 }, { name: "Jallianwala Bagh", lat: 31.6206, lng: 74.8790 } ],
        gems:["Wagah Border ceremony", "Kesar Da Dhaba"]
    },
    {
        name: "Dalhousie", country: "India", lat: 32.5387, lng: 75.9710, dailyCostUSD: 14,
        image: "", 
        description: "Colonial charm and pine valleys. A quiet alternative to crowded Shimla.",
        attractions:[ { name: "Khajjiar", lat: 32.5558, lng: 76.0658 }, { name: "Dainkund Peak", lat: 32.5480, lng: 76.0120 } ],
        gems:["Kalatop Wildlife Sanctuary", "Cafe Dalhousie"]
    },
    {
        name: "McLeod Ganj", country: "India", lat: 32.2426, lng: 76.3213, dailyCostUSD: 12,
        image: "", 
        description: "Little Lhasa. A budget-friendly, spiritual mountain alternative to Manali.",
        attractions:[ { name: "Bhagsu Waterfall", lat: 32.2464, lng: 76.3315 }, { name: "Namgyal Monastery", lat: 32.2323, lng: 76.3255 } ],
        gems:["Triund Trek", "Shiva Cafe"]
    },
    {
        name: "Bir Billing", country: "India", lat: 32.0465, lng: 76.7126, dailyCostUSD: 13,
        image: "", 
        description: "The paragliding capital of India with amazing cafes and cheap stays.",
        attractions:[ { name: "Bir Tibetan Colony", lat: 32.0450, lng: 76.7140 }, { name: "Sherabling Monastery", lat: 32.0300, lng: 76.7000 } ],
        gems:["Deer Park Institute", "Northern Cafe Sunset View"]
    },

    // --- OTHER INDIA BUDGET HUBS ---
    { 
        name: "Kasol", country: "India", lat: 32.0100, lng: 77.3150, dailyCostUSD: 12, 
        image: "",
        description: "The backpacker's paradise in Parvati Valley. Unbelievably cheap and scenic.",
        attractions:[ { name: "Parvati River", lat: 32.0116, lng: 77.3148 }, { name: "Manikaran", lat: 32.0270, lng: 77.3452 } ],
        gems:["Chalal Village", "Jim Morrison Cafe"]
    },
    { 
        name: "Rishikesh", country: "India", lat: 30.0869, lng: 78.2676, dailyCostUSD: 14, 
        image: "",
        description: "Yoga, river rafting, and stunning Ganga aarti.",
        attractions:[ { name: "Laxman Jhula", lat: 30.1221, lng: 78.3242 }, { name: "Triveni Ghat", lat: 30.1065, lng: 78.2936 } ],
        gems:["Beatles Ashram", "Neer Garh Waterfall"]
    },
    {
        name: "Pushkar", country: "India", lat: 26.4883, lng: 74.5519, dailyCostUSD: 9, 
        image: "",
        description: "A tranquil, extremely affordable hippie town centered around a sacred lake.",
        attractions:[ { name: "Pushkar Lake", lat: 26.4882, lng: 74.5539 }, { name: "Savitri Mata Temple", lat: 26.4800, lng: 74.5385 } ],
        gems:["Sunset Cafe", "Pap Mochani Temple"]
    },
    {
        name: "Gokarna", country: "India", lat: 14.5398, lng: 74.3188, dailyCostUSD: 15,
        image: "", 
        description: "The ultimate budget alternative to Goa. Clean beaches and peaceful vibes.",
        attractions:[ { name: "Om Beach", lat: 14.5195, lng: 74.3153 }, { name: "Mahabaleshwar Temple, Gokarna", lat: 14.5420, lng: 74.3180 } ],
        gems:["Half Moon Beach", "Namaste Cafe"]
    },
    {
        name: "Varkala", country: "India", lat: 8.7379, lng: 76.7163, dailyCostUSD: 16,
        image: "", 
        description: "Stunning cliffside beaches in Kerala, filled with student hostels.",
        attractions:[ { name: "Varkala Cliff", lat: 8.7350, lng: 76.7050 }, { name: "Janardanaswamy Temple", lat: 8.7310, lng: 76.7100 } ],
        gems:["Darjeeling Cafe", "Kappil Beach"]
    },
    
    // --- INTERNATIONAL STUDENT BUDGET OPTIONS ---
    { 
        name: "Hanoi", country: "Vietnam", lat: 21.0285, lng: 105.8542, dailyCostUSD: 22, 
        image: "",
        description: "Incredible street food, rich history, and very budget-friendly.",
        attractions:[ { name: "Hoan Kiem Lake", lat: 21.0287, lng: 105.8523 }, { name: "Old Quarter, Hanoi", lat: 21.0345, lng: 105.8503 } ],
        gems:["Train Street Hanoi", "Dong Xuan Market"]
    }
];

// Initialize Map
const map = L.map('map').setView([22.0, 78.0], 4);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { attribution: '&copy; CARTO' }).addTo(map);

let currentMarkers =[];
let routeLine = null; 
let originCoords = null;
let currentDisplayedTrips =[]; 

// --- CURRENCY LOGIC ---
let exchangeRates = {};
const symbols = { USD: "$", EUR: "€", INR: "₹" };

async function fetchExchangeRates() {
    try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();
        exchangeRates = data.rates;
    } catch {
        exchangeRates = { USD: 1, INR: 83, EUR: 0.9 }; // Fallback
    }
}
fetchExchangeRates();

function getCurrency() {
    return document.getElementById('currencySelect').value;
}

function convert(usdAmount) {
    const currency = getCurrency();
    const rate = exchangeRates[currency] || 1;
    return Math.round(usdAmount * rate);
}

function formatMoney(usdAmount) {
    const currency = getCurrency();
    return `${symbols[currency]}${convert(usdAmount)}`;
}

// --- GPS LOGIC ---
async function getUserLocation() {
    if (navigator.geolocation) {
        document.getElementById('startCity').value = "Locating...";
        navigator.geolocation.getCurrentPosition(async (position) => {
            originCoords = { lat: position.coords.latitude, lng: position.coords.longitude };
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${originCoords.lat}&lon=${originCoords.lng}&format=json`);
            const data = await res.json();
            document.getElementById('startCity').value = data.address.city || data.address.town || data.address.state;
        }, () => {
            alert("Could not get location.");
            document.getElementById('startCity').value = "";
        });
    }
}

// --- DISTANCE LOGIC ---
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

// --- MAIN PLANNING LOGIC ---
async function planMyTrip() {
    const startCity = document.getElementById('startCity').value;
    const days = parseInt(document.getElementById('tripDays').value);
    const userBudgetInput = parseInt(document.getElementById('totalBudget').value);
    const container = document.getElementById('destinations-container');

    if(!startCity || !days || !userBudgetInput) return alert("Fill all fields!");

    const currency = getCurrency();
    const rate = exchangeRates[currency] || 1;
    const totalBudgetUSD = userBudgetInput / rate;

    // Loading UI
    container.innerHTML = `<div class="empty-state"><h3>⏳ Calculating Routes & Fetching Live Images...</h3></div>`;

    try {
        if (!originCoords) {
            const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${startCity}&format=json&limit=1`);
            const geoData = await geoRes.json();
            if(geoData.length === 0) throw new Error();
            originCoords = { lat: geoData[0].lat, lng: geoData[0].lon };
        }

        let affordableTrips =[];

        destinations.forEach(dest => {
            const distanceKM = calculateDistance(originCoords.lat, originCoords.lng, dest.lat, dest.lng);
            
            let transportCostUSD = 0;
            let transportMode = "";
            if (distanceKM < 400) {
                transportCostUSD = 10; 
                transportMode = "State Bus / Sleeper Class Train";
            } else if (distanceKM < 1500) {
                transportCostUSD = 35; 
                transportMode = "Sleeper Class / Budget Express Train";
            } else {
                transportCostUSD = 300; 
                transportMode = "Budget Airlines";
            }

            const requiredBudgetUSD = (dest.dailyCostUSD * days) + transportCostUSD;

            if (totalBudgetUSD >= requiredBudgetUSD) {
                dest.distance = Math.round(distanceKM);
                dest.transportCostUSD = transportCostUSD;
                dest.transportMode = transportMode;
                dest.requiredBudgetUSD = requiredBudgetUSD;
                dest.leftoverUSD = totalBudgetUSD - requiredBudgetUSD;
                affordableTrips.push(dest);
            }
        });

        // Sort by distance so the nearest/cheapest alternatives show first!
        affordableTrips.sort((a, b) => a.distance - b.distance);

        const fallbackImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";
        
        await Promise.all(affordableTrips.map(async (dest) => {
            try {
                const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(dest.name)}`);
                const data = await res.json();
                
                if (data.originalimage && data.originalimage.source) {
                    dest.image = data.originalimage.source;
                } else if (data.thumbnail && data.thumbnail.source) {
                    dest.image = data.thumbnail.source.replace(/\/\d+px-/, '/800px-'); 
                } else {
                    dest.image = fallbackImage;
                }
            } catch(e) {
                dest.image = fallbackImage; 
            }
        }));

        currentDisplayedTrips = affordableTrips; 
        renderResults(affordableTrips, days);
    } catch (error) {
        container.innerHTML = `<div class="empty-state"><h3>⚠️ City not found.</h3></div>`;
        originCoords = null; 
    }
}

// --- RENDER RESULTS ON SCREEN ---
function renderResults(affordableTrips, days) {
    const container = document.getElementById('destinations-container');
    container.innerHTML = ""; 
    
    currentMarkers.forEach(marker => map.removeLayer(marker));
    currentMarkers =[];
    if(routeLine) map.removeLayer(routeLine);

    if(affordableTrips.length === 0) {
        container.innerHTML = `<div class="empty-state">
            <h3>💸 Budget a bit tight? No worries!</h3>
            <p>We are a student budget site, so let's make this work. Try reducing your trip by 1 day or searching for a city closer to home to save on long-distance transport costs!</p>
        </div>`;
        return;
    }

    const fallbackImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";

    affordableTrips.forEach(dest => {
        const marker = L.marker([dest.lat, dest.lng]).addTo(map);
        marker.bindPopup(`<b>${dest.name}</b><br>${formatMoney(dest.requiredBudgetUSD)}`);
        currentMarkers.push(marker);

        container.innerHTML += `
            <div class="card">
                <img src="${dest.image}" alt="${dest.name}" onerror="this.src='${fallbackImage}'">
                <div class="card-content">
                    <span class="badge">Match! ${formatMoney(dest.requiredBudgetUSD)} Total</span>
                    <h3>${dest.name}, ${dest.country}</h3>
                    <p style="margin-bottom:15px; color:#555;">🛣️ ${dest.distance} km away<br>✈️ ${dest.transportMode}</p>
                    <button class="cta-btn" style="width:100%; text-align:center;" onclick="openGuide('${dest.name}', ${days})">🗺️ Open Tour Guide</button>
                </div>
            </div>
        `;
    });

    const bounds = new L.LatLngBounds(affordableTrips.map(d =>[d.lat, d.lng]));
    bounds.extend([originCoords.lat, originCoords.lng]); 
    map.fitBounds(bounds, { padding:[50, 50] });

    const homeMarker = L.circleMarker([originCoords.lat, originCoords.lng], { color: 'red', radius: 8 }).addTo(map);
    homeMarker.bindPopup("<b>Your Location</b>");
    currentMarkers.push(homeMarker);
}

// --- THE TOUR GUIDE UI & LOCAL MAP EXPLORER ---
async function openGuide(destName, days) {
    const dest = currentDisplayedTrips.find(d => d.name === destName);
    
    document.getElementById('guideTitle').innerText = `Your ${days}-Day Trip to ${dest.name}`;
    document.getElementById('guideTransport').innerHTML = `<b>Mode:</b> ${dest.transportMode} <br><b>Distance:</b> ${dest.distance} km <br><b>Est. Travel Cost:</b> ${formatMoney(dest.transportCostUSD)}`;
    document.getElementById('guideBudget').innerHTML = `<b>Living Cost:</b> ${formatMoney(dest.dailyCostUSD * days)} <br><b>Total Cost:</b> ${formatMoney(dest.requiredBudgetUSD)} <br><span style="color:green;"><b>Money Left:</b> ${formatMoney(dest.leftoverUSD)} (For local snacks!)</span>`;

    if(routeLine) map.removeLayer(routeLine);
    routeLine = L.polyline([[originCoords.lat, originCoords.lng],[dest.lat, dest.lng]], {color: '#ff6600', weight: 3, dashArray: '10, 10'}).addTo(map);
    
    map.setView([dest.lat, dest.lng], 11);

    const gemsList = document.getElementById('guideGems');
    gemsList.innerHTML = "<li>Loading local attractions...</li>";
    let gemsHTML = "";

    // 1. Fetch Images for Attractions
    for (let place of dest.attractions) {
        const localPin = L.marker([place.lat, place.lng]).addTo(map);
        localPin.bindPopup(`<b>${place.name}</b>`);
        currentMarkers.push(localPin);

        let imgTag = "";
        try {
            const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(place.name)}`);
            const wikiData = await wikiRes.json();
            
            let imgSrc = "";
            if (wikiData.originalimage && wikiData.originalimage.source) {
                imgSrc = wikiData.originalimage.source;
            } else if (wikiData.thumbnail && wikiData.thumbnail.source) {
                imgSrc = wikiData.thumbnail.source.replace(/\/\d+px-/, '/600px-');
            }
            if (imgSrc) imgTag = `<img src="${imgSrc}" class="attraction-img" alt="${place.name}" onerror="this.style.display='none'">`;
        } catch(e) {}
        
        gemsHTML += `<li>📸 <b>Must See:</b> ${place.name} ${imgTag}</li>`;
    }

    // 2. NEW: Try to Fetch Images for Hidden Gems too!
    for (let gem of dest.gems) {
        let imgTag = "";
        try {
            // Ask Wikipedia if they have a photo of this Hidden Gem
            const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(gem)}`);
            const wikiData = await wikiRes.json();
            
            let imgSrc = "";
            if (wikiData.originalimage && wikiData.originalimage.source) {
                imgSrc = wikiData.originalimage.source;
            } else if (wikiData.thumbnail && wikiData.thumbnail.source) {
                imgSrc = wikiData.thumbnail.source.replace(/\/\d+px-/, '/600px-');
            }
            if (imgSrc) imgTag = `<img src="${imgSrc}" class="attraction-img" alt="${gem}" onerror="this.style.display='none'">`;
        } catch(e) {}
        
        gemsHTML += `<li>💎 <b>Hidden Gem:</b> ${gem} ${imgTag}</li>`;
    }

    gemsList.innerHTML = gemsHTML;

    document.getElementById('guideModal').style.display = "block";

    const grid = document.getElementById('weatherForecast');
    grid.innerHTML = "Fetching live weather...";
    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${dest.lat}&longitude=${dest.lng}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`);
        const data = await res.json();
        grid.innerHTML = ""; 
        for(let i=0; i<7; i++) {
            const dateObj = new Date(data.daily.time[i]);
            const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            grid.innerHTML += `
                <div class="weather-day">
                    <span>${dateStr}</span>
                    ${Math.round(data.daily.temperature_2m_max[i])}°C | ${Math.round(data.daily.temperature_2m_min[i])}°C
                </div>
            `;
        }
    } catch { grid.innerHTML = "Weather unavailable."; }
}

function closeGuideModal() { 
    document.getElementById('guideModal').style.display = "none"; 
    if (originCoords) {
        const bounds = new L.LatLngBounds(currentMarkers.map(m => m.getLatLng()));
        map.fitBounds(bounds, { padding:[50, 50] });
    }
}