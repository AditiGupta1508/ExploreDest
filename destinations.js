// ============================================================
// ExploreDest - destinations.js
// All destination and airport data lives here.
// To add a new place: copy any block, fill in details, done.
// ============================================================

// ── INDIAN AIRPORTS (one per major state) ─────────────────────
// Used to find nearest departure point for international flights
const indianAirports = [
    { name: "Indira Gandhi International Airport", city: "Delhi", state: "Delhi", lat: 28.5562, lng: 77.1000, code: "DEL" },
    { name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai", state: "Maharashtra", lat: 19.0896, lng: 72.8656, code: "BOM" },
    { name: "Kempegowda International Airport", city: "Bengaluru", state: "Karnataka", lat: 13.1986, lng: 77.7066, code: "BLR" },
    { name: "Chennai International Airport", city: "Chennai", state: "Tamil Nadu", lat: 12.9941, lng: 80.1709, code: "MAA" },
    { name: "Netaji Subhas Chandra Bose International Airport", city: "Kolkata", state: "West Bengal", lat: 22.6520, lng: 88.4463, code: "CCU" },
    { name: "Rajiv Gandhi International Airport", city: "Hyderabad", state: "Telangana", lat: 17.2403, lng: 78.4294, code: "HYD" },
    { name: "Sardar Vallabhbhai Patel International Airport", city: "Ahmedabad", state: "Gujarat", lat: 23.0771, lng: 72.6347, code: "AMD" },
    { name: "Jaipur International Airport", city: "Jaipur", state: "Rajasthan", lat: 26.8242, lng: 75.8122, code: "JAI" },
    { name: "Lal Bahadur Shastri International Airport", city: "Varanasi", state: "Uttar Pradesh", lat: 25.4524, lng: 82.8593, code: "VNS" },
    { name: "Chaudhary Charan Singh International Airport", city: "Lucknow", state: "Uttar Pradesh", lat: 26.7606, lng: 80.8893, code: "LKO" },
    { name: "Sri Guru Ram Dass Jee International Airport", city: "Amritsar", state: "Punjab", lat: 31.7096, lng: 74.7973, code: "ATQ" },
    { name: "Chandigarh International Airport", city: "Chandigarh", state: "Chandigarh", lat: 30.6735, lng: 76.7885, code: "IXC" },
    { name: "Kullu Manali Airport", city: "Bhuntar", state: "Himachal Pradesh", lat: 31.8767, lng: 77.1544, code: "KUU" },
    { name: "Dehradun Airport (Jolly Grant)", city: "Dehradun", state: "Uttarakhand", lat: 30.1897, lng: 78.1800, code: "DED" },
    { name: "Goa International Airport (Manohar)", city: "Goa", state: "Goa", lat: 15.3808, lng: 73.8314, code: "GOX" },
    { name: "Cochin International Airport", city: "Kochi", state: "Kerala", lat: 10.1520, lng: 76.3919, code: "COK" },
    { name: "Tiruchirappalli International Airport", city: "Trichy", state: "Tamil Nadu", lat: 10.7654, lng: 78.7097, code: "TRZ" },
    { name: "Biju Patnaik International Airport", city: "Bhubaneswar", state: "Odisha", lat: 20.2444, lng: 85.8178, code: "BBI" },
    { name: "Lokpriya Gopinath Bordoloi International Airport", city: "Guwahati", state: "Assam", lat: 26.1061, lng: 91.5859, code: "GAU" },
    { name: "Birsa Munda Airport", city: "Ranchi", state: "Jharkhand", lat: 23.3143, lng: 85.3217, code: "IXR" },
    { name: "Devi Ahilya Bai Holkar Airport", city: "Indore", state: "Madhya Pradesh", lat: 22.7218, lng: 75.8011, code: "IDR" },
    { name: "Raipur Airport (Swami Vivekananda)", city: "Raipur", state: "Chhattisgarh", lat: 21.1804, lng: 81.7388, code: "RPR" },
    { name: "Jay Prakash Narayan International Airport", city: "Patna", state: "Bihar", lat: 25.5913, lng: 85.0877, code: "PAT" },
    { name: "Srinagar International Airport", city: "Srinagar", state: "Jammu & Kashmir", lat: 33.9871, lng: 74.7742, code: "SXR" },
    { name: "Veer Savarkar International Airport", city: "Port Blair", state: "Andaman & Nicobar", lat: 11.6412, lng: 92.7297, code: "IXZ" },
    { name: "Agartala Airport (Maharaja Bir Bikram)", city: "Agartala", state: "Tripura", lat: 23.8870, lng: 91.2404, code: "IXA" },
    { name: "Visakhapatnam International Airport", city: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.7212, lng: 83.2245, code: "VTZ" },
    { name: "Mangalore International Airport", city: "Mangalore", state: "Karnataka", lat: 12.9613, lng: 74.8898, code: "IXE" }
];

// ── DESTINATIONS ──────────────────────────────────────────────
// vibes: beach, mountains, party, backpacker, city, nature, history
const destinations = [

    // ── BEACH & CHILL ─────────────────────────────────────────
    {
        name: "Gokarna", country: "India", lat: 14.5398, lng: 74.3188,
        dailyCostUSD: 15, recommendedDays: 3,
        vibes: ["beach", "backpacker"],
        image: "",
        description: "The ultimate budget alternative to Goa. Clean beaches, zero crowds, maximum vibes.",
        attractions: [
            { name: "Om Beach", lat: 14.5195, lng: 74.3153 },
            { name: "Mahabaleshwar Temple, Gokarna", lat: 14.5420, lng: 74.3180 }
        ],
        gems: ["Half Moon Beach — only reachable by boat or trek", "Namaste Cafe on the cliff"],
        dayPlan: [
            "Arrive, Mahabaleshwar Temple, evening at Om Beach",
            "Beach trek — Om Beach → Half Moon → Paradise Beach",
            "Kudle Beach sunrise, water activities, departure"
        ]
    },
    {
        name: "Varkala", country: "India", lat: 8.7379, lng: 76.7163,
        dailyCostUSD: 16, recommendedDays: 3,
        vibes: ["beach", "backpacker"],
        image: "",
        description: "Stunning cliffside beaches in Kerala, packed with student hostels and rooftop cafes.",
        attractions: [
            { name: "Varkala Cliff", lat: 8.7350, lng: 76.7050 },
            { name: "Janardanaswamy Temple", lat: 8.7310, lng: 76.7100 }
        ],
        gems: ["Darjeeling Cafe on the cliff", "Kappil Beach backwaters"],
        dayPlan: [
            "Arrive, cliff walk, sunset at North Cliff",
            "Janardanaswamy Temple morning, beach day, cliff cafes",
            "Kappil Beach backwaters, Ayurvedic massage, departure"
        ]
    },
    {
        name: "Goa", country: "India", lat: 15.2993, lng: 74.1240,
        dailyCostUSD: 20, recommendedDays: 4,
        vibes: ["beach", "party", "backpacker"],
        image: "",
        description: "India's party capital — beaches by day, nightlife by night, budget hostels everywhere.",
        attractions: [
            { name: "Baga Beach", lat: 15.5537, lng: 73.7516 },
            { name: "Anjuna Flea Market", lat: 15.5736, lng: 73.7404 }
        ],
        gems: ["Chapora Fort sunset", "Curlies beach shack at Anjuna"],
        dayPlan: [
            "Arrive North Goa, check into hostel, Baga Beach evening",
            "Anjuna Flea Market, Chapora Fort, beach party night",
            "South Goa day trip — Palolem Beach, Butterfly Beach",
            "Water sports, sunset cruise, departure"
        ]
    },
    {
        name: "Andaman Islands", country: "India", lat: 11.7401, lng: 92.6586,
        dailyCostUSD: 25, recommendedDays: 5,
        vibes: ["beach", "nature"],
        image: "",
        description: "Crystal clear waters, pristine beaches, and snorkelling that feels like another world.",
        attractions: [
            { name: "Radhanagar Beach", lat: 11.9754, lng: 92.9422 },
            { name: "Cellular Jail", lat: 11.6726, lng: 92.7264 }
        ],
        gems: ["Elephant Beach snorkelling", "Jolly Buoy Island coral reefs"],
        dayPlan: [
            "Arrive Port Blair, Cellular Jail evening light show",
            "Ferry to Havelock Island, Radhanagar Beach",
            "Elephant Beach snorkelling, kayaking",
            "Neil Island day trip, natural bridge",
            "Return to Port Blair, departure"
        ]
    },
    {
        name: "Vizag (Visakhapatnam)", country: "India", lat: 17.6868, lng: 83.2185,
        dailyCostUSD: 12, recommendedDays: 3,
        vibes: ["beach", "city", "nature"],
        image: "",
        description: "Underrated gem with beautiful beaches, a submarine museum, and zero tourist crowds.",
        attractions: [
            { name: "Rushikonda Beach", lat: 17.7780, lng: 83.3780 },
            { name: "Kailasagiri Hill Park", lat: 17.7447, lng: 83.3641 }
        ],
        gems: ["INS Kurusura Submarine Museum", "Araku Valley coffee"],
        dayPlan: [
            "Arrive, Rushikonda Beach, Kailasagiri sunset",
            "Submarine Museum, RK Beach, local seafood",
            "Araku Valley day trip, tribal museum, departure"
        ]
    },

    // ── MOUNTAINS & TREK ──────────────────────────────────────
    {
        name: "Manali", country: "India", lat: 32.2396, lng: 77.1887,
        dailyCostUSD: 15, recommendedDays: 5,
        vibes: ["mountains", "adventure", "party"],
        image: "",
        description: "Snow, adventure, and mountain magic — India's most loved hill station.",
        attractions: [
            { name: "Rohtang Pass", lat: 32.3714, lng: 77.2505 },
            { name: "Hadimba Temple", lat: 32.2452, lng: 77.1761 }
        ],
        gems: ["Old Manali cafe strip", "Solang Valley snow activities"],
        dayPlan: [
            "Arrive, Mall Road, Hadimba Temple, Old Manali cafes",
            "Solang Valley — paragliding or snow activities",
            "Rohtang Pass day trip (permit needed)",
            "Vashisht hot springs, local market",
            "Jogini Waterfall trek, departure"
        ]
    },
    {
        name: "Kasol", country: "India", lat: 32.0100, lng: 77.3150,
        dailyCostUSD: 12, recommendedDays: 3,
        vibes: ["mountains", "backpacker", "nature"],
        image: "",
        description: "The backpacker's paradise in Parvati Valley. Cheap, scenic, full of character.",
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
        name: "McLeod Ganj", country: "India", lat: 32.2426, lng: 76.3213,
        dailyCostUSD: 12, recommendedDays: 3,
        vibes: ["mountains", "backpacker", "history"],
        image: "",
        description: "Little Lhasa — Tibetan culture, mountain treks, and the cheapest momos in India.",
        attractions: [
            { name: "Bhagsu Waterfall", lat: 32.2464, lng: 76.3315 },
            { name: "Namgyal Monastery", lat: 32.2323, lng: 76.3255 }
        ],
        gems: ["Triund Trek for sunrise views", "Shiva Cafe for panoramic views"],
        dayPlan: [
            "Arrive, explore McLeod Ganj market and Namgyal Monastery",
            "Triund Trek — early start, reach top for sunset",
            "Bhagsu Waterfall morning, cafe hopping, departure"
        ]
    },
    {
        name: "Spiti Valley", country: "India", lat: 32.2461, lng: 78.0340,
        dailyCostUSD: 16, recommendedDays: 6,
        vibes: ["mountains", "nature", "adventure"],
        image: "",
        description: "The cold desert of India — monasteries, stark landscapes, world-class stargazing.",
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
        name: "Dalhousie", country: "India", lat: 32.5387, lng: 75.9710,
        dailyCostUSD: 14, recommendedDays: 3,
        vibes: ["mountains", "nature"],
        image: "",
        description: "Colonial charm and pine valleys — a quieter, cheaper alternative to Shimla.",
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
        name: "Bir Billing", country: "India", lat: 32.0465, lng: 76.7126,
        dailyCostUSD: 13, recommendedDays: 2,
        vibes: ["mountains", "adventure", "backpacker"],
        image: "",
        description: "The paragliding capital of India — fly over pine forests for under ₹2000.",
        attractions: [
            { name: "Bir Tibetan Colony", lat: 32.0450, lng: 76.7140 },
            { name: "Sherabling Monastery", lat: 32.0300, lng: 76.7000 }
        ],
        gems: ["Paragliding from Billing top", "Northern Cafe sunset view"],
        dayPlan: [
            "Arrive, visit Tibetan Colony and Sherabling Monastery",
            "Morning paragliding, afternoon cafe hopping, departure"
        ]
    },
    {
        name: "Chopta", country: "India", lat: 30.3847, lng: 79.2017,
        dailyCostUSD: 11, recommendedDays: 3,
        vibes: ["mountains", "nature", "adventure"],
        image: "",
        description: "The mini Switzerland of Uttarakhand — untouched meadows, zero crowds, incredible trek to Tungnath.",
        attractions: [
            { name: "Tungnath Temple", lat: 30.4762, lng: 79.2161 },
            { name: "Chandrashila Peak", lat: 30.4833, lng: 79.2194 }
        ],
        gems: ["Deoria Tal lake reflection trek", "Rohini Bugyal meadows"],
        dayPlan: [
            "Arrive Chopta, set up camp or homestay, evening meadow walk",
            "Trek to Tungnath Temple and Chandrashila Peak for sunrise",
            "Deoria Tal lake trek, departure"
        ]
    },
    {
        name: "Tosh", country: "India", lat: 32.0806, lng: 77.3956,
        dailyCostUSD: 10, recommendedDays: 3,
        vibes: ["mountains", "backpacker", "nature"],
        image: "",
        description: "A tiny Himalayan village above Kasol — the cheapest, most off-beat mountain escape in India.",
        attractions: [
            { name: "Tosh Village", lat: 32.0806, lng: 77.3956 },
            { name: "Rakcham", lat: 31.5300, lng: 78.3300 }
        ],
        gems: ["Pink Floyd Cafe with Himalayan views", "Kutla village above Tosh"],
        dayPlan: [
            "Trek from Barshaini to Tosh village (3hrs), settle in",
            "Explore village, hike to Kutla, bonfire evening",
            "Morning mountain views, descent, departure"
        ]
    },
    {
        name: "Rishikesh", country: "India", lat: 30.0869, lng: 78.2676,
        dailyCostUSD: 14, recommendedDays: 4,
        vibes: ["adventure", "backpacker", "nature"],
        image: "",
        description: "Yoga, river rafting, bungee jumping, and stunning Ganga aarti — the adventure capital of India.",
        attractions: [
            { name: "Laxman Jhula", lat: 30.1221, lng: 78.3242 },
            { name: "Triveni Ghat", lat: 30.1065, lng: 78.2936 }
        ],
        gems: ["Beatles Ashram (Chaurasi Kutia)", "Neer Garh Waterfall"],
        dayPlan: [
            "Arrive, evening Ganga aarti at Triveni Ghat",
            "River rafting in the morning, afternoon Beatles Ashram",
            "Yoga session at sunrise, Laxman Jhula exploration",
            "Neer Garh Waterfall trek, bungee jumping, departure"
        ]
    },

    // ── PARTY & NIGHTLIFE ─────────────────────────────────────
    {
        name: "Pushkar", country: "India", lat: 26.4883, lng: 74.5519,
        dailyCostUSD: 9, recommendedDays: 2,
        vibes: ["backpacker", "party"],
        image: "",
        description: "Hippie town with rooftop cafes, camel rides, and surprisingly good nightlife for its size.",
        attractions: [
            { name: "Pushkar Lake", lat: 26.4882, lng: 74.5539 },
            { name: "Savitri Mata Temple", lat: 26.4800, lng: 74.5385 }
        ],
        gems: ["Sunset Cafe rooftop", "Pap Mochani Temple"],
        dayPlan: [
            "Arrive, Pushkar Lake, Brahma Temple, evening rooftop",
            "Savitri Mata sunrise trek, camel ride, bazaar, departure"
        ]
    },

    // ── CITY EXPLORER ─────────────────────────────────────────
    {
        name: "Jaipur", country: "India", lat: 26.9124, lng: 75.7873,
        dailyCostUSD: 13, recommendedDays: 3,
        vibes: ["city", "history"],
        image: "",
        description: "The Pink City — forts, palaces, Rajasthani food and street shopping on a student budget.",
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
        name: "Kolkata", country: "India", lat: 22.5726, lng: 88.3639,
        dailyCostUSD: 11, recommendedDays: 3,
        vibes: ["city", "history", "backpacker"],
        image: "",
        description: "The city of joy — colonial architecture, incredible street food, and the cheapest city trip in India.",
        attractions: [
            { name: "Victoria Memorial", lat: 22.5448, lng: 88.3426 },
            { name: "Howrah Bridge", lat: 22.5851, lng: 88.3468 }
        ],
        gems: ["College Street book market", "Kathi roll at Nizam's"],
        dayPlan: [
            "Arrive, Howrah Bridge, evening Ganges ghats",
            "Victoria Memorial, Park Street, College Street",
            "Kumartuli potters quarter, Kalighat temple, departure"
        ]
    },
    {
        name: "Amritsar", country: "India", lat: 31.6340, lng: 74.8723,
        dailyCostUSD: 10, recommendedDays: 2,
        vibes: ["city", "history", "backpacker"],
        image: "",
        description: "The Golden Temple, incredible Punjabi food, and the most patriotic experience in India.",
        attractions: [
            { name: "Golden Temple", lat: 31.6200, lng: 74.8765 },
            { name: "Jallianwala Bagh", lat: 31.6206, lng: 74.8790 }
        ],
        gems: ["Wagah Border ceremony at sunset", "Kesar Da Dhaba"],
        dayPlan: [
            "Arrive, evening Golden Temple aarti",
            "Morning Jallianwala Bagh, afternoon Wagah Border, street food night"
        ]
    },

    // ── NATURE & WILDLIFE ─────────────────────────────────────
    {
        name: "Coorg", country: "India", lat: 12.4244, lng: 75.7382,
        dailyCostUSD: 17, recommendedDays: 3,
        vibes: ["nature", "mountains"],
        image: "",
        description: "Coffee plantations, misty hills, and waterfalls — the Scotland of India.",
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
        name: "Munnar", country: "India", lat: 10.0889, lng: 77.0595,
        dailyCostUSD: 16, recommendedDays: 3,
        vibes: ["nature", "mountains"],
        image: "",
        description: "Endless tea plantations, cool weather, and some of the most beautiful roads in India.",
        attractions: [
            { name: "Eravikulam National Park", lat: 10.1667, lng: 77.0833 },
            { name: "Top Station", lat: 10.0989, lng: 77.2064 }
        ],
        gems: ["Mattupetty Dam sunrise", "TATA Tea Museum"],
        dayPlan: [
            "Arrive, tea plantation walk, Mattupetty Dam",
            "Eravikulam National Park, Top Station viewpoint",
            "Echo Point, Kundala Lake, departure"
        ]
    },
    {
        name: "Kaziranga", country: "India", lat: 26.5775, lng: 93.1700,
        dailyCostUSD: 20, recommendedDays: 3,
        vibes: ["nature", "adventure"],
        image: "",
        description: "Home to two-thirds of the world's one-horned rhinos — one of India's greatest wildlife experiences.",
        attractions: [
            { name: "Kaziranga National Park", lat: 26.5802, lng: 93.1694 },
            { name: "Kohora Range", lat: 26.5668, lng: 93.1723 }
        ],
        gems: ["Elephant safari at sunrise", "Orchid Park nearby"],
        dayPlan: [
            "Arrive, evening at Kohora, local Assamese dinner",
            "Early morning jeep safari — rhinos, elephants, tigers",
            "Elephant safari, Orchid Park, departure"
        ]
    },

    // ── HISTORY & CULTURE ─────────────────────────────────────
    {
        name: "Varanasi", country: "India", lat: 25.3176, lng: 82.9739,
        dailyCostUSD: 10, recommendedDays: 3,
        vibes: ["history", "backpacker", "city"],
        image: "",
        description: "One of the oldest living cities on earth — ghats, aarti, and ancient energy unlike anywhere else.",
        attractions: [
            { name: "Dashashwamedh Ghat", lat: 25.3058, lng: 83.0105 },
            { name: "Kashi Vishwanath Temple", lat: 25.3109, lng: 83.0107 }
        ],
        gems: ["Sunrise boat ride on the Ganges", "Blue Lassi Shop"],
        dayPlan: [
            "Arrive, evening Ganga aarti at Dashashwamedh Ghat",
            "Sunrise boat ride, Kashi Vishwanath Temple, gali exploration",
            "Sarnath day trip, Assi Ghat sunset, departure"
        ]
    },
    {
        name: "Hampi", country: "India", lat: 15.3350, lng: 76.4600,
        dailyCostUSD: 8, recommendedDays: 3,
        vibes: ["history", "backpacker", "nature"],
        image: "",
        description: "Ancient ruins of the Vijayanagara Empire set among giant boulders — utterly unique.",
        attractions: [
            { name: "Virupaksha Temple", lat: 15.3358, lng: 76.4600 },
            { name: "Vittala Temple", lat: 15.3375, lng: 76.4776 }
        ],
        gems: ["Matanga Hill sunrise", "Coracle ride on Tungabhadra river"],
        dayPlan: [
            "Arrive, Virupaksha Temple, Hampi Bazaar, sunset at Hemakuta Hill",
            "Vittala Temple, Stone Chariot, Elephant Stables, coracle ride",
            "Matanga Hill sunrise, Monkey Temple, departure"
        ]
    },
    {
        name: "Bodh Gaya", country: "India", lat: 24.6961, lng: 84.9914,
        dailyCostUSD: 8, recommendedDays: 2,
        vibes: ["history", "backpacker"],
        image: "",
        description: "Where Buddha attained enlightenment — the most important Buddhist site on earth, very affordable.",
        attractions: [
            { name: "Mahabodhi Temple", lat: 24.6961, lng: 84.9914 },
            { name: "Bodhi Tree", lat: 24.6963, lng: 84.9916 }
        ],
        gems: ["Thai Monastery meditation sessions", "Japanese Temple garden"],
        dayPlan: [
            "Arrive, Mahabodhi Temple, Bodhi Tree, evening meditation",
            "Thai and Japanese monasteries, Dungeshwari caves, departure"
        ]
    },
    {
        name: "Agra", country: "India", lat: 27.1767, lng: 78.0081,
        dailyCostUSD: 12, recommendedDays: 2,
        vibes: ["history", "city"],
        image: "",
        description: "The Taj Mahal at sunrise is one of the most breathtaking things you'll ever see.",
        attractions: [
            { name: "Taj Mahal", lat: 27.1751, lng: 78.0421 },
            { name: "Agra Fort", lat: 27.1795, lng: 78.0211 }
        ],
        gems: ["Mehtab Bagh for sunset Taj view", "Petha sweets at Pancchi"],
        dayPlan: [
            "Arrive, Taj Mahal at sunset (entry closes 30 min before), Agra Fort",
            "Taj Mahal at sunrise, Mehtab Bagh opposite view, Fatehpur Sikri, departure"
        ]
    },

    // ── INTERNATIONAL ─────────────────────────────────────────
    {
        name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018,
        dailyCostUSD: 25, recommendedDays: 4,
        vibes: ["city", "party", "history", "backpacker"],
        image: "",
        description: "Temples, street food, rooftop bars and night markets — all shockingly affordable.",
        attractions: [
            { name: "Wat Phra Kaew", lat: 13.7516, lng: 100.4925 },
            { name: "Chatuchak Market", lat: 13.7999, lng: 100.5503 }
        ],
        gems: ["Khao San Road backpacker street", "Chinatown street food at night"],
        dayPlan: [
            "Arrive, Khao San Road evening, settle in",
            "Grand Palace, Wat Phra Kaew, Wat Pho, Chao Phraya river",
            "Chatuchak Weekend Market, rooftop bar sunset",
            "Chinatown food tour, night market, departure"
        ]
    },
    {
        name: "Bali", country: "Indonesia", lat: -8.3405, lng: 115.0920,
        dailyCostUSD: 30, recommendedDays: 5,
        vibes: ["beach", "party", "nature", "history"],
        image: "",
        description: "The island of gods — temples, rice terraces, beaches, and some of the best hostels in the world.",
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
        name: "Hanoi", country: "Vietnam", lat: 21.0285, lng: 105.8542,
        dailyCostUSD: 22, recommendedDays: 4,
        vibes: ["city", "history", "backpacker", "nature"],
        image: "",
        description: "Incredible street food, French colonial history, and Ha Long Bay — all incredibly cheap.",
        attractions: [
            { name: "Hoan Kiem Lake", lat: 21.0287, lng: 105.8523 },
            { name: "Old Quarter, Hanoi", lat: 21.0345, lng: 105.8503 }
        ],
        gems: ["Train Street Hanoi", "Dong Xuan night market"],
        dayPlan: [
            "Arrive, Old Quarter walk, Hoan Kiem Lake evening",
            "Ho Chi Minh Mausoleum, Temple of Literature, street food tour",
            "Day trip to Ha Long Bay or Ninh Binh",
            "Train Street, Dong Xuan Market, departure"
        ]
    },
    {
        name: "Kathmandu", country: "Nepal", lat: 27.7172, lng: 85.3240,
        dailyCostUSD: 18, recommendedDays: 4,
        vibes: ["mountains", "history", "backpacker", "adventure"],
        image: "",
        description: "Gateway to the Himalayas — stupas, trekking, and very student-friendly prices.",
        attractions: [
            { name: "Pashupatinath Temple", lat: 27.7105, lng: 85.3487 },
            { name: "Boudhanath Stupa", lat: 27.7215, lng: 85.3620 }
        ],
        gems: ["Thamel backpacker street", "Nagarkot sunrise over the Himalayas"],
        dayPlan: [
            "Arrive, Thamel exploration, evening Pashupatinath aarti",
            "Boudhanath Stupa, Swayambhunath Monkey Temple",
            "Day trip to Nagarkot for Himalayan views",
            "Patan Durbar Square, local food tour, departure"
        ]
    },
    {
        name: "Colombo", country: "Sri Lanka", lat: 6.9271, lng: 79.8612,
        dailyCostUSD: 20, recommendedDays: 3,
        vibes: ["city", "beach", "history"],
        image: "",
        description: "Underrated gem — colonial streets, amazing food, and beaches within easy reach.",
        attractions: [
            { name: "Gangaramaya Temple", lat: 6.9167, lng: 79.8567 },
            { name: "Galle Face Green", lat: 6.9144, lng: 79.8474 }
        ],
        gems: ["Pettah Market chaos", "Galle Fort day trip"],
        dayPlan: [
            "Arrive, Galle Face Green sunset, Fort area walk",
            "Gangaramaya Temple, National Museum, Pettah Market",
            "Day trip to Galle Fort, beach, departure"
        ]
    },
    {
        name: "Kuala Lumpur", country: "Malaysia", lat: 3.1390, lng: 101.6869,
        dailyCostUSD: 28, recommendedDays: 4,
        vibes: ["city", "party", "backpacker"],
        image: "",
        description: "Stunning skyline, incredible food diversity, and one of the most student-friendly cities in Asia.",
        attractions: [
            { name: "Petronas Twin Towers", lat: 3.1579, lng: 101.7116 },
            { name: "Batu Caves", lat: 3.2379, lng: 101.6840 }
        ],
        gems: ["Jalan Alor street food strip at night", "Bukit Bintang nightlife"],
        dayPlan: [
            "Arrive, KLCC Park, Petronas Towers evening",
            "Batu Caves morning, Chinatown, Central Market",
            "Bukit Bintang shopping and street food, rooftop bar",
            "KL Tower, Jalan Alor food street, departure"
        ]
    },
    {
        name: "Phuket", country: "Thailand", lat: 7.8804, lng: 98.3923,
        dailyCostUSD: 35, recommendedDays: 4,
        vibes: ["beach", "party", "adventure"],
        image: "",
        description: "Thailand's party island — Patong Beach, island hopping, and legendary nightlife.",
        attractions: [
            { name: "Patong Beach", lat: 7.8968, lng: 98.2963 },
            { name: "Big Buddha Phuket", lat: 7.8272, lng: 98.3089 }
        ],
        gems: ["Phi Phi Island day trip", "Bangla Road nightlife"],
        dayPlan: [
            "Arrive, Patong Beach, Bangla Road evening",
            "Island hopping — Phi Phi, Maya Bay",
            "Big Buddha, Old Town Phuket, beach clubs",
            "ATV ride, Tiger Kingdom, departure"
        ]
    },
    {
        name: "Ho Chi Minh City", country: "Vietnam", lat: 10.8231, lng: 106.6297,
        dailyCostUSD: 20, recommendedDays: 3,
        vibes: ["city", "history", "backpacker", "party"],
        image: "",
        description: "War history, rooftop bars, and the best banh mi of your life — incredibly cheap.",
        attractions: [
            { name: "War Remnants Museum", lat: 10.7796, lng: 106.6927 },
            { name: "Ben Thanh Market", lat: 10.7721, lng: 106.6982 }
        ],
        gems: ["Cu Chi Tunnels day trip", "Bui Vien Walking Street nightlife"],
        dayPlan: [
            "Arrive, Ben Thanh Market, Bui Vien evening",
            "War Remnants Museum, Reunification Palace, rooftop bar",
            "Cu Chi Tunnels day trip, Mekong Delta, departure"
        ]
    },
    {
        name: "Penang", country: "Malaysia", lat: 5.4141, lng: 100.3288,
        dailyCostUSD: 22, recommendedDays: 3,
        vibes: ["city", "history", "backpacker"],
        image: "",
        description: "UNESCO heritage town with the best street food in Southeast Asia — seriously.",
        attractions: [
            { name: "George Town Street Art", lat: 5.4189, lng: 100.3330 },
            { name: "Kek Lok Si Temple", lat: 5.3963, lng: 100.2730 }
        ],
        gems: ["Lorong Baru (New Lane) hawker stalls", "Clan Jetties sunset"],
        dayPlan: [
            "Arrive, George Town street art walk, hawker stalls",
            "Kek Lok Si Temple, Penang Hill, Clan Jetties",
            "Food tour — char kway teow, asam laksa, departure"
        ]
    }
];