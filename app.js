// ============================================================
// ExploreDest - App.js v3.1
// Author: Aditi Gupta
// Fixes: City not found bug, India-biased geocoding,
//        strict budget combo checking, travelFilter safe read
// ============================================================

const destinations = [
    // --- PUNJAB / HIMACHAL ---
    {
        name: "Amritsar", country: "India", lat: 31.6340, lng: 74.8723,
        dailyCostUSD: 10, recommendedDays: 2, image: "",
        description: "Rich culture, incredible food, and spiritual peace right next door.",
        attractions: [
            { name: "Golden Temple", lat: 31.6200, lng: 74.8765 },
            { name: "Jallianwala Bagh", lat: 31.6206, lng: 74.8790 }
        ],
        gems: ["Wagah Border ceremony at sunset", "Kesar Da Dhaba for authentic food"],
        dayPlan: [
            "Arrive, check in, evening visit to Golden Temple for aarti",
            "Morning Jallianwala Bagh, afternoon Wagah Border ceremony, street food tour at night"
        ]
    },
    {
        name: "Dalhousie", country: "India", lat: 32.5387, lng: 75.9710,
        dailyCostUSD: 14, recommendedDays: 3, image: "",
        description: "Colonial charm and pine valleys. A quiet alternative to crowded Shimla.",
        attractions: [
            { name: "Khajjiar", lat: 32.5558, lng: 76.0658 },
            { name: "Dainkund Peak", lat: 32.5480, lng: 76.0120 }
        ],
        gems: ["Kalatop Wildlife Sanctuary", "Cafe Dalhousie for sunset views"],
        dayPlan: [
            "Arrive, explore Mall Road and St. Francis Church",
            "Day trip to Khajjiar — the mini Switzerland of India",
            "Trek to Dainkund Peak, evening departure or relax"
        ]
    },
    {
        name: "McLeod Ganj", country: "India", lat: 32.2426, lng: 76.3213,
        dailyCostUSD: 12, recommendedDays: 3, image: "",
        description: "Little Lhasa. A budget-friendly, spiritual mountain alternative to Manali.",
        attractions: [
            { name: "Bhagsu Waterfall", lat: 32.2464, lng: 76.3315 },
            { name: "Namgyal Monastery", lat: 32.2323, lng: 76.3255 }
        ],
        gems: ["Triund Trek for sunrise views", "Shiva Cafe for the best views"],
        dayPlan: [
            "Arrive, explore McLeod Ganj market and Namgyal Monastery",
            "Triund Trek — early start, reach top for sunset",
            "Bhagsu Waterfall morning visit, afternoon cafe hopping, departure"
        ]
    },
    {
        name: "Bir Billing", country: "India", lat: 32.0465, lng: 76.7126,
        dailyCostUSD: 13, recommendedDays: 2, image: "",
        description: "The paragliding capital of India with amazing cafes and cheap stays.",
        attractions: [
            { name: "Bir Tibetan Colony", lat: 32.0450, lng: 76.7140 },
            { name: "Sherabling Monastery", lat: 32.0300, lng: 76.7000 }
        ],
        gems: ["Paragliding from Billing", "Northern Cafe Sunset View"],
        dayPlan: [
            "Arrive, visit Tibetan Colony and Sherabling Monastery",
            "Morning paragliding experience, afternoon cafe hopping, departure"
        ]
    },
    {
        name: "Kasol", country: "India", lat: 32.0100, lng: 77.3150,
        dailyCostUSD: 12, recommendedDays: 3, image: "",
        description: "The backpacker's paradise in Parvati Valley. Unbelievably cheap and scenic.",
        attractions: [
            { name: "Parvati River", lat: 32.0116, lng: 77.3148 },
            { name: "Manikaran", lat: 32.0270, lng: 77.3452 }
        ],
        gems: ["Chalal Village trek", "Jim Morrison Cafe"],
        dayPlan: [
            "Arrive, settle in, evening walk along Parvati River",
            "Day trip to Manikaran hot springs and Gurudwara",
            "Chalal Village trek, riverside cafes, departure"
        ]
    },
    {
        name: "Rishikesh", country: "India", lat: 30.0869, lng: 78.2676,
        dailyCostUSD: 14, recommendedDays: 4, image: "",
        description: "Yoga, river rafting, and stunning Ganga aarti.",
        attractions: [
            { name: "Laxman Jhula", lat: 30.1221, lng: 78.3242 },
            { name: "Triveni Ghat", lat: 30.1065, lng: 78.2936 }
        ],
        gems: ["Beatles Ashram", "Neer Garh Waterfall"],
        dayPlan: [
            "Arrive, evening Ganga aarti at Triveni Ghat",
            "River rafting in the morning, afternoon Beatles Ashram",
            "Yoga session at sunrise, Laxman Jhula exploration",
            "Neer Garh Waterfall trek, departure in evening"
        ]
    },
    {
        name: "Pushkar", country: "India", lat: 26.4883, lng: 74.5519,
        dailyCostUSD: 9, recommendedDays: 2, image: "",
        description: "A tranquil, extremely affordable hippie town centered around a sacred lake.",
        attractions: [
            { name: "Pushkar Lake", lat: 26.4882, lng: 74.5539 },
            { name: "Savitri Mata Temple", lat: 26.4800, lng: 74.5385 }
        ],
        gems: ["Sunset Cafe by the lake", "Pap Mochani Temple"],
        dayPlan: [
            "Arrive, Pushkar Lake morning ritual, Brahma Temple visit, evening at Sunset Cafe",
            "Savitri Mata Temple trek for sunrise, camel ride, bazaar shopping, departure"
        ]
    },
    {
        name: "Gokarna", country: "India", lat: 14.5398, lng: 74.3188,
        dailyCostUSD: 15, recommendedDays: 3, image: "",
        description: "The ultimate budget alternative to Goa. Clean beaches and peaceful vibes.",
        attractions: [
            { name: "Om Beach", lat: 14.5195, lng: 74.3153 },
            { name: "Mahabaleshwar Temple, Gokarna", lat: 14.5420, lng: 74.3180 }
        ],
        gems: ["Half Moon Beach (only by boat or trek)", "Namaste Cafe"],
        dayPlan: [
            "Arrive, Mahabaleshwar Temple, evening at Om Beach",
            "Beach trek — Om Beach to Half Moon to Paradise Beach",
            "Kudle Beach sunrise, water activities, departure"
        ]
    },
    {
        name: "Varkala", country: "India", lat: 8.7379, lng: 76.7163,
        dailyCostUSD: 16, recommendedDays: 3, image: "",
        description: "Stunning cliffside beaches in Kerala, filled with student hostels.",
        attractions: [
            { name: "Varkala Cliff", lat: 8.7350, lng: 76.7050 },
            { name: "Janardanaswamy Temple", lat: 8.7310, lng: 76.7100 }
        ],
        gems: ["Darjeeling Cafe on the cliff", "Kappil Beach by backwaters"],
        dayPlan: [
            "Arrive, cliff walk, sunset at North Cliff",
            "Janardanaswamy Temple morning, beach day, cliff cafes",
            "Kappil Beach backwaters, Ayurvedic massage, departure"
        ]
    },
    {
        name: "Manali", country: "India", lat: 32.2396, lng: 77.1887,
        dailyCostUSD: 15, recommendedDays: 5, image: "",
        description: "Snow, adventure, and mountain magic — India's most loved hill station.",
        attractions: [
            { name: "Rohtang Pass", lat: 32.3714, lng: 77.2505 },
            { name: "Hadimba Temple", lat: 32.2452, lng: 77.1761 }
        ],
        gems: ["Old Manali cafes", "Solang Valley snow activities"],
        dayPlan: [
            "Arrive, Mall Road, Hadimba Temple, Old Manali cafes",
            "Solang Valley — paragliding or snow activities",
            "Rohtang Pass day trip (permit needed)",
            "Vashisht hot springs, local market",
            "Jogini Waterfall trek, departure"
        ]
    },
    {
        name: "Spiti Valley", country: "India", lat: 32.2461, lng: 78.0340,
        dailyCostUSD: 16, recommendedDays: 6, image: "",
        description: "The cold desert of India — monasteries, stark landscapes, stargazing.",
        attractions: [
            { name: "Key Monastery", lat: 32.2969, lng: 78.0141 },
            { name: "Chandratal Lake", lat: 32.4785, lng: 77.6182 }
        ],
        gems: ["Langza fossil village", "Chicham bridge — Asia's highest"],
        dayPlan: [
            "Arrive Kaza, acclimatize, local market",
            "Key Monastery and Kibber village",
            "Langza village, fossil hunting, stargazing",
            "Chandratal Lake day trip",
            "Chicham bridge, Pin Valley",
            "Departure via Manali or Shimla"
        ]
    },
    {
        name: "Jaipur", country: "India", lat: 26.9124, lng: 75.7873,
        dailyCostUSD: 13, recommendedDays: 3, image: "",
        description: "The Pink City — forts, palaces, and Rajasthani food on a budget.",
        attractions: [
            { name: "Amber Fort", lat: 26.9855, lng: 75.8513 },
            { name: "Hawa Mahal", lat: 26.9239, lng: 75.8267 }
        ],
        gems: ["Johari Bazaar for textiles", "LMB Restaurant for dal baati churma"],
        dayPlan: [
            "Arrive, Hawa Mahal, City Palace, Johari Bazaar evening",
            "Amber Fort, Jaigarh Fort, Nahargarh sunset",
            "Jantar Mantar, Albert Hall Museum, departure"
        ]
    },
    {
        name: "Varanasi", country: "India", lat: 25.3176, lng: 82.9739,
        dailyCostUSD: 10, recommendedDays: 3, image: "",
        description: "The spiritual capital of India — ghats, aarti, and ancient energy.",
        attractions: [
            { name: "Dashashwamedh Ghat", lat: 25.3058, lng: 83.0105 },
            { name: "Kashi Vishwanath Temple", lat: 25.3109, lng: 83.0107 }
        ],
        gems: ["Boat ride at sunrise on the Ganges", "Blue Lassi Shop"],
        dayPlan: [
            "Arrive, evening Ganga aarti at Dashashwamedh Ghat",
            "Sunrise boat ride on Ganges, Kashi Vishwanath Temple, gali exploration",
            "Sarnath day trip, Assi Ghat sunset, departure"
        ]
    },
    {
        name: "Coorg", country: "India", lat: 12.4244, lng: 75.7382,
        dailyCostUSD: 17, recommendedDays: 3, image: "",
        description: "Coffee plantations, waterfalls, and misty hills in Karnataka.",
        attractions: [
            { name: "Abbey Falls", lat: 12.4157, lng: 75.7333 },
            { name: "Raja's Seat", lat: 12.4199, lng: 75.7374 }
        ],
        gems: ["Coffee estate tour", "Iruppu Falls trek"],
        dayPlan: [
            "Arrive, Raja's Seat sunset, local Coorg cuisine",
            "Abbey Falls, coffee plantation tour, Bylakuppe monastery",
            "Iruppu Falls trek, departure"
        ]
    },
    {
        name: "Hampi", country: "India", lat: 15.3350, lng: 76.4600,
        dailyCostUSD: 8, recommendedDays: 3, image: "",
        description: "Ancient ruins of the Vijayanagara Empire — one of India's most unique destinations.",
        attractions: [
            { name: "Virupaksha Temple", lat: 15.3358, lng: 76.4600 },
            { name: "Vittala Temple", lat: 15.3375, lng: 76.4776 }
        ],
        gems: ["Matanga Hill sunrise", "Coracle ride on Tungabhadra river"],
        dayPlan: [
            "Arrive, Virupaksha Temple, Hampi Bazaar, sunset at Hemakuta Hill",
            "Vittala Temple, Stone Chariot, Elephant Stables, coracle ride",
            "Matanga Hill sunrise, Monkey Temple (Anjenadri), departure"
        ]
    },

    // --- INTERNATIONAL ---
    {
        name: "Hanoi", country: "Vietnam", lat: 21.0285, lng: 105.8542,
        dailyCostUSD: 22, recommendedDays: 4, image: "",
        description: "Incredible street food, rich history, and very budget-friendly.",
        attractions: [
            { name: "Hoan Kiem Lake", lat: 21.0287, lng: 105.8523 },
            { name: "Old Quarter, Hanoi", lat: 21.0345, lng: 105.8503 }
        ],
        gems: ["Train Street Hanoi", "Dong Xuan Market"],
        dayPlan: [
            "Arrive, Old Quarter walk, Hoan Kiem Lake evening",
            "Ho Chi Minh Mausoleum, Temple of Literature, street food tour",
            "Day trip to Ninh Binh or Ha Long Bay",
            "Train Street visit, Dong Xuan Market, departure"
        ]
    },
    {
        name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018,
        dailyCostUSD: 25, recommendedDays: 4, image: "",
        description: "Temples, street food, rooftop bars — all shockingly affordable.",
        attractions: [
            { name: "Wat Phra Kaew", lat: 13.7516, lng: 100.4925 },
            { name: "Chatuchak Market", lat: 13.7999, lng: 100.5503 }
        ],
        gems: ["Khao San Road at night", "Chinatown street food"],
        dayPlan: [
            "Arrive, Khao San Road evening, settle in",
            "Grand Palace, Wat Phra Kaew, Wat Pho, Chao Phraya river",
            "Chatuchak Weekend Market, rooftop bar sunset",
            "Chinatown food tour, night market, departure"
        ]
    },
    {
        name: "Bali", country: "Indonesia", lat: -8.3405, lng: 115.0920,
        dailyCostUSD: 30, recommendedDays: 5, image: "",
        description: "The island of gods — temples, rice terraces, and beaches on a budget.",
        attractions: [
            { name: "Tanah Lot Temple", lat: -8.6213, lng: 115.0866 },
            { name: "Tegallalang Rice Terrace", lat: -8.4313, lng: 115.2771 }
        ],
        gems: ["Canggu digital nomad cafes", "Seminyak sunset beach clubs"],
        dayPlan: [
            "Arrive Denpasar, head to Ubud, evening Monkey Forest",
            "Tegallalang Rice Terrace, Tirta Empul Holy Spring",
            "Tanah Lot sunset temple visit",
            "Seminyak beach day, sunset strip",
            "Canggu cafes, surfing lesson, departure"
        ]
    },
    {
        name: "Kathmandu", country: "Nepal", lat: 27.7172, lng: 85.3240,
        dailyCostUSD: 18, recommendedDays: 4, image: "",
        description: "Gateway to the Himalayas. Extremely budget friendly for Indian travelers.",
        attractions: [
            { name: "Pashupatinath Temple", lat: 27.7105, lng: 85.3487 },
            { name: "Boudhanath Stupa", lat: 27.7215, lng: 85.3620 }
        ],
        gems: ["Thamel backpacker street", "Nagarkot sunrise over Himalayas"],
        dayPlan: [
            "Arrive, Thamel exploration, evening Pashupatinath aarti",
            "Boudhanath Stupa, Swayambhunath (Monkey Temple)",
            "Day trip to Nagarkot for Himalayan views",
            "Patan Durbar Square, local food tour, departure"
        ]
    },
    {
        name: "Colombo", country: "Sri Lanka", lat: 6.9271, lng: 79.8612,
        dailyCostUSD: 20, recommendedDays: 3, image: "",
        description: "Underrated gem with colonial history, beaches, and incredible food.",
        attractions: [
            { name: "Gangaramaya Temple", lat: 6.9167, lng: 79.8567 },
            { name: "Galle Face Green", lat: 6.9144, lng: 79.8474 }
        ],
        gems: ["Pettah Market chaos", "Ministry of Crab for splurge meal"],
        dayPlan: [
            "Arrive, Galle Face Green sunset, Fort area walk",
            "Gangaramaya Temple, National Museum, Pettah Market",
            "Day trip to Negombo beach, departure"
        ]
    }
];

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
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();
        exchangeRates = data.rates;
    } catch {
        exchangeRates = { USD: 1, INR: 83, EUR: 0.9 };
    }
}
fetchExchangeRates();

function getCurrency() { return document.getElementById('currencySelect').value; }
function convert(usdAmount) {
    const rate = exchangeRates[getCurrency()] || 1;
    return Math.round(usdAmount * rate);
}
function formatMoney(usdAmount) {
    return `${symbols[getCurrency()]}${convert(usdAmount)}`;
}

// ── GPS ───────────────────────────────────────────────────────
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

// ── DISTANCE ─────────────────────────────────────────────────
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// ── TRANSPORT COST ────────────────────────────────────────────
function getTransport(distanceKM) {
    if (distanceKM < 400) return { cost: 10, mode: "State Bus / Sleeper Train" };
    if (distanceKM < 1500) return { cost: 35, mode: "Express / Sleeper Train" };
    return { cost: 300, mode: "Budget Airlines" };
}

// ── SMART TRIP COMBINER ───────────────────────────────────────
function findTripOptions(affordableDestinations, totalDays, filter, totalBudgetUSD) {
    let pool = affordableDestinations;
    if (filter === "domestic") pool = affordableDestinations.filter(d => d.country === "India");
    if (filter === "international") pool = affordableDestinations.filter(d => d.country !== "India");

    let options = [];

    // Single destination matching days (±1 day tolerance)
    pool.forEach(dest => {
        if (Math.abs(dest.recommendedDays - totalDays) <= 1) {
            options.push({ type: "single", destinations: [dest] });
        }
    });

    // Two destinations — BOTH days AND combined cost must fit budget strictly
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

    // Safe read — won't crash if travelFilter element is missing
    const filterEl = document.getElementById('travelFilter');
    const filter = filterEl ? filterEl.value : 'all';

    const container = document.getElementById('destinations-container');
    if (!startCity || !days || !userBudgetInput) return alert("Please fill all fields!");

    const currency = getCurrency();
    const rate = exchangeRates[currency] || 1;
    const totalBudgetUSD = userBudgetInput / rate;

    container.innerHTML = `<div class="empty-state"><h3>⏳ Finding your perfect trip...</h3></div>`;

    // Always reset so typing a new city re-geocodes
    originCoords = null;

    try {
        // India-biased geocoding — works for any Indian city/town
        const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(startCity)}&format=json&limit=5&countrycodes=in`
        );
        const geoData = await geoRes.json();

        if (geoData.length === 0) {
            // Fallback: search globally if not found in India
            const geoRes2 = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(startCity)}&format=json&limit=1`
            );
            const geoData2 = await geoRes2.json();
            if (geoData2.length === 0) throw new Error("City not found");
            originCoords = { lat: parseFloat(geoData2[0].lat), lng: parseFloat(geoData2[0].lon) };
        } else {
            originCoords = { lat: parseFloat(geoData[0].lat), lng: parseFloat(geoData[0].lon) };
        }

        // Calculate affordable destinations
        let affordableDestinations = [];
        destinations.forEach(dest => {
            const distanceKM = calculateDistance(originCoords.lat, originCoords.lng, dest.lat, dest.lng);
            const transport = getTransport(distanceKM);
            const livingCostUSD = dest.dailyCostUSD * dest.recommendedDays;
            const totalCostUSD = livingCostUSD + transport.cost;

            if (totalBudgetUSD >= totalCostUSD) {
                affordableDestinations.push({
                    ...dest,
                    distance: Math.round(distanceKM),
                    transportCostUSD: transport.cost,
                    transportMode: transport.mode,
                    totalCostUSD: totalCostUSD,
                    leftoverUSD: totalBudgetUSD - totalCostUSD
                });
            }
        });

        // Find smart combos — pass totalBudgetUSD for strict budget check
        const tripOptions = findTripOptions(affordableDestinations, days, filter, totalBudgetUSD);

        // Fetch Wikipedia images
        const fallbackImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";
        await Promise.all(affordableDestinations.map(async (dest) => {
            try {
                const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(dest.name)}`);
                const data = await res.json();
                if (data.originalimage?.source) {
                    dest.image = data.originalimage.source;
                } else if (data.thumbnail?.source) {
                    dest.image = data.thumbnail.source.replace(/\/\d+px-/, '/800px-');
                } else {
                    dest.image = fallbackImage;
                }
            } catch {
                dest.image = fallbackImage;
            }
        }));

        currentDisplayedTrips = affordableDestinations;
        renderResults(tripOptions, days);

    } catch (error) {
        container.innerHTML = `<div class="empty-state">
            <h3>⚠️ Could not find that city.</h3>
            <p>Try a nearby larger city or check the spelling. Example: "Ludhiana" instead of a small town name.</p>
        </div>`;
        originCoords = null;
    }
}

// ── RENDER RESULTS ────────────────────────────────────────────
function renderResults(tripOptions, days) {
    const container = document.getElementById('destinations-container');
    container.innerHTML = "";

    currentMarkers.forEach(marker => map.removeLayer(marker));
    currentMarkers = [];
    if (routeLine) map.removeLayer(routeLine);

    if (tripOptions.length === 0) {
        container.innerHTML = `<div class="empty-state">
            <h3>💸 No perfect matches found!</h3>
            <p>Try increasing your budget, adjusting the number of days, or switching between domestic and international options.</p>
        </div>`;
        return;
    }

    const fallbackImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";

    tripOptions.forEach((option) => {
        const isSingle = option.type === "single";
        const dests = option.destinations;
        const totalCostUSD = dests.reduce((sum, d) => sum + d.totalCostUSD, 0);
        const leftoverUSD = dests[0].leftoverUSD;
        const totalDays = dests.reduce((sum, d) => sum + d.recommendedDays, 0);

        const title = isSingle
            ? `${dests[0].name} — ${dests[0].recommendedDays} Days`
            : `${dests[0].name} (${dests[0].recommendedDays}d) + ${dests[1].name} (${dests[1].recommendedDays}d)`;

        const description = isSingle
            ? dests[0].description
            : `A perfect ${totalDays}-day combo — two destinations, one unforgettable trip!`;

        const image = dests[0].image || fallbackImage;
        const destKey = dests.map(d => d.name).join('|');

        dests.forEach(dest => {
            const marker = L.marker([dest.lat, dest.lng]).addTo(map);
            marker.bindPopup(`<b>${dest.name}</b><br>${formatMoney(dest.totalCostUSD)}`);
            currentMarkers.push(marker);
        });

        container.innerHTML += `
            <div class="card">
                <img src="${image}" alt="${title}" onerror="this.src='${fallbackImage}'">
                <div class="card-content">
                    <span class="badge">${formatMoney(totalCostUSD)} Total · ${totalDays} Days</span>
                    <h3>${title}</h3>
                    <p style="margin-bottom:8px; color:#555;">${description}</p>
                    <p style="margin-bottom:15px; color:#888; font-size:13px;">
                        🛣️ ${dests[0].distance} km away &nbsp;·&nbsp; ✈️ ${dests[0].transportMode}<br>
                        💚 ${formatMoney(leftoverUSD)} left for food & extras
                    </p>
                    <button class="cta-btn" style="width:100%; text-align:center;"
                        onclick="openGuide('${destKey}', ${totalDays})">
                        🗺️ View ${totalDays}-Day Itinerary
                    </button>
                </div>
            </div>
        `;
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
    const dests = destNames.map(name => currentDisplayedTrips.find(d => d.name === name)).filter(Boolean);
    if (!dests.length) return;

    const isSingle = dests.length === 1;
    const title = isSingle
        ? `Your ${totalDays}-Day Trip to ${dests[0].name}`
        : `Your ${totalDays}-Day ${dests[0].name} + ${dests[1].name} Combo`;

    document.getElementById('guideTitle').innerText = title;

    document.getElementById('guideTransport').innerHTML = dests.map(d =>
        `<b>${d.name}:</b> ${d.transportMode} · ${d.distance} km · ${formatMoney(d.transportCostUSD)}`
    ).join('<br><br>');

    document.getElementById('guideBudget').innerHTML = `
        <b>Living Costs:</b> ${formatMoney(dests.reduce((s, d) => s + d.dailyCostUSD * d.recommendedDays, 0))}<br>
        <b>Transport:</b> ${formatMoney(dests.reduce((s, d) => s + d.transportCostUSD, 0))}<br>
        <b>Total Trip Cost:</b> ${formatMoney(dests.reduce((s, d) => s + d.totalCostUSD, 0))}<br>
        <span style="color:green;"><b>Money Left:</b> ${formatMoney(dests[0].leftoverUSD)} for snacks & surprises!</span>
    `;

    if (routeLine) map.removeLayer(routeLine);
    const routePoints = [[originCoords.lat, originCoords.lng], ...dests.map(d => [d.lat, d.lng])];
    routeLine = L.polyline(routePoints, { color: '#ff6600', weight: 3, dashArray: '10, 10' }).addTo(map);
    map.setView([dests[0].lat, dests[0].lng], 10);

    // Day by day itinerary
    const gemsList = document.getElementById('guideGems');
    gemsList.innerHTML = "";
    let dayNumber = 1;

    for (const dest of dests) {
        gemsList.innerHTML += `
            <li style="background:#fff3e0; border-left: 4px solid #ff6600;">
                🚌 <b>Day ${dayNumber} — Travel to ${dest.name}</b><br>
                <small>${dest.transportMode} · ${dest.distance} km · Est. ${formatMoney(dest.transportCostUSD)}</small>
            </li>`;
        dayNumber++;

        for (const plan of dest.dayPlan) {
            gemsList.innerHTML += `<li>📅 <b>Day ${dayNumber}</b> — ${plan}</li>`;
            dayNumber++;
        }

        for (const gem of dest.gems) {
            let imgTag = "";
            try {
                const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(gem)}`);
                const wikiData = await wikiRes.json();
                let imgSrc = wikiData.originalimage?.source ||
                    wikiData.thumbnail?.source?.replace(/\/\d+px-/, '/600px-') || "";
                if (imgSrc) imgTag = `<img src="${imgSrc}" class="attraction-img" alt="${gem}" onerror="this.style.display='none'">`;
            } catch (e) {}
            gemsList.innerHTML += `<li>💎 <b>Hidden Gem:</b> ${gem} ${imgTag}</li>`;
        }

        dest.attractions.forEach(place => {
            const pin = L.marker([place.lat, place.lng]).addTo(map);
            pin.bindPopup(`<b>${place.name}</b>`);
            currentMarkers.push(pin);
        });
    }

    document.getElementById('guideModal').style.display = "block";

    // Live 7-day weather
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
    } catch { grid.innerHTML = "Weather unavailable."; }
}

function closeGuideModal() {
    document.getElementById('guideModal').style.display = "none";
    if (originCoords && currentMarkers.length > 0) {
        const bounds = new L.LatLngBounds(currentMarkers.map(m => m.getLatLng()));
        map.fitBounds(bounds, { padding: [50, 50] });
    }
}