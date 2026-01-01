// Global Variables
let currentUser = {
    name: '',
    gender: 'adult',
    age: 'adult',
    theme: 'theme-default'
};

// Compliments Database
const compliments = {
    general: [
        "Wow! You're rocking that outfit today! 🌟",
        "Looking absolutely fabulous! The fashion gods are smiling upon you!",
        "That combination is pure fire! 🔥 You've got amazing style!",
        "You look like you just stepped off a runway! Stunning!",
        "Your fashion sense is on point today! Keep slaying!",
        "That outfit was made for you! Perfect choice!",
        "You're turning heads with that look! Absolutely gorgeous!",
        "Style icon alert! You're killing it! 💃",
        "That outfit screams confidence! Love it!",
        "You've mastered the art of fashion! Perfection!"
    ],
    weather: [
        "Smart choice for this weather! You'll be comfortable and stylish!",
        "Perfect outfit for today's forecast! You're weather-ready!",
        "Great selection considering the temperature! Very practical!",
        "You nailed it! This outfit is ideal for the current conditions!",
        "Weather-appropriate and fashionable? You're a genius!",
        "This look works perfectly with today's weather! Well done!"
    ],
    gender: {
        male: [
            "Looking sharp, king! That outfit suits you perfectly! 👑",
            "Clean and masculine look! Very stylish!",
            "Great combination! You've got that masculine elegance down!"
        ],
        female: [
            "Absolutely stunning, queen! That outfit is gorgeous on you! 👑",
            "Elegant and feminine! You're glowing!",
            "Beautiful choice! The colors complement you perfectly!"
        ],
        lgbtq: [
            "Living your truth has never looked better! Fabulous! 🌈",
            "Breaking gender norms with style! Absolutely love it!",
            "Your authentic self shines through this outfit! Gorgeous!",
            "Pride looks amazing on you! Stunning outfit! 🏳️‍🌈"
        ]
    },
    age: {
        child: [
            "Look at you, little fashion star! So adorable! ⭐",
            "You're the coolest kid on the block! Awesome outfit!",
            "So cute! You've got great style for your age!"
        ],
        teen: [
            "Trendy and fresh! You've got that teen fashion vibe down!",
            "Cool and contemporary! You're setting trends!",
            "Awesome style for a young trendsetter! Love it!"
        ],
        adult: [
            "Sophisticated and stylish! Age brings great taste!",
            "Elegant and mature look! Very classy!",
            "Perfect blend of style and sophistication!"
        ]
    }
};

// Background Comments
const backgroundComments = [
    "By the way, love the background! Adds great atmosphere to your style!",
    "Your surroundings are as stylish as your outfit!",
    "Nice backdrop! It complements your fashion perfectly!",
    "Great setting for a fashion icon like you!",
    "Your environment is giving major vibes! Love it!"
];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    loadUserPreferences();
    loadNavigation();
    setupEventListeners();
});

// Load User Preferences
function loadUserPreferences() {
    currentUser.gender = localStorage.getItem('luki_gender') || 'adult';
    currentUser.age = localStorage.getItem('luki_age') || 'adult';
    currentUser.theme = localStorage.getItem('luki_theme') || 'theme-default';
    
    // Apply theme
    document.body.className = currentUser.theme;
}

// Load Navigation
function loadNavigation() {
    const navHTML = `
        <nav class="navbar navbar-expand-lg navbar-light fixed-top">
            <div class="container">
                <a class="navbar-brand" href="home.html">
                    <i class="fas fa-tshirt me-2"></i>Luki Fashion
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="home.html">
                                <i class="fas fa-home"></i> Home
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="scanner.html">
                                <i class="fas fa-camera"></i> Body Scan
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="wardrobe.html">
                                <i class="fas fa-archive"></i> My Wardrobe
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="weather.html">
                                <i class="fas fa-cloud-sun"></i> Weather
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="feedback.html">
                                <i class="fas fa-comment-alt"></i> Feedback
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="settings.html">
                                <i class="fas fa-cog"></i> Settings
                            </a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
                                <i class="fas fa-user"></i> Profile
                            </a>
                            <ul class="dropdown-menu">
                                <li><span class="dropdown-item-text">Gender: ${currentUser.gender}</span></li>
                                <li><span class="dropdown-item-text">Age: ${currentUser.age}</span></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="#" id="logoutBtn">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
    
    document.getElementById('navbar-container').innerHTML = navHTML;
    
    // Add logout functionality
    document.getElementById('logoutBtn')?.addEventListener('click', logout);
}

// Setup Event Listeners
function setupEventListeners() {
    // Gender customization on home page
    document.querySelectorAll('.gender-option').forEach(option => {
        option.addEventListener('click', function() {
            const gender = this.dataset.gender;
            customizeForGender(gender);
        });
    });
    
    // Age group selection
    document.querySelectorAll('.age-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const age = this.dataset.age;
            customizeForAge(age);
        });
    });
    
    // Random compliment generator
    const complimentBtn = document.getElementById('randomCompliment');
    if (complimentBtn) {
        complimentBtn.addEventListener('click', generateCompliment);
    }
}

// Customize for Gender
function customizeForGender(gender) {
    currentUser.gender = gender;
    localStorage.setItem('luki_gender', gender);
    
    // Update UI elements based on gender
    const genderElements = document.querySelectorAll('.gender-option');
    genderElements.forEach(el => {
        el.classList.remove('selected');
        if (el.dataset.gender === gender) {
            el.classList.add('selected');
        }
    });
    
    // Update fashion suggestions based on gender
    updateFashionSuggestions();
    
    // Show gender-specific compliment
    showCompliment('gender');
}

// Customize for Age
function customizeForAge(age) {
    currentUser.age = age;
    localStorage.setItem('luki_age', age);
    
    // Update UI
    document.querySelectorAll('.age-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.age === age) {
            btn.classList.add('active');
        }
    });
    
    // Update fashion suggestions for age
    updateFashionSuggestions();
    
    // Show age-specific compliment
    showCompliment('age');
}

// Generate Random Compliment
function generateCompliment() {
    const types = ['general', 'weather', 'gender', 'age'];
    const type = types[Math.floor(Math.random() * types.length)];
    showCompliment(type);
}

// Show Specific Compliment
function showCompliment(type = 'general') {
    let compliment = '';
    
    switch(type) {
        case 'gender':
            compliment = compliments.gender[currentUser.gender]?.[Math.floor(Math.random() * compliments.gender[currentUser.gender].length)] || compliments.general[0];
            break;
        case 'age':
            compliment = compliments.age[currentUser.age]?.[Math.floor(Math.random() * compliments.age[currentUser.age].length)] || compliments.general[0];
            break;
        case 'weather':
            compliment = compliments.weather[Math.floor(Math.random() * compliments.weather.length)];
            break;
        default:
            compliment = compliments.general[Math.floor(Math.random() * compliments.general.length)];
    }
    
    // Randomly add background comment
    if (Math.random() > 0.7) {
        const bgComment = backgroundComments[Math.floor(Math.random() * backgroundComments.length)];
        compliment += ` ${bgComment}`;
    }
    
    // Display compliment
    displayComplimentMessage(compliment);
}

// Display Compliment Message
function displayComplimentMessage(message) {
    // Remove existing compliment box
    const existingCompliment = document.querySelector('.compliment-box');
    if (existingCompliment) {
        existingCompliment.remove();
    }
    
    // Create new compliment box
    const complimentBox = document.createElement('div');
    complimentBox.className = 'compliment-box animate__animated animate__bounceIn';
    complimentBox.innerHTML = `
        <div class="d-flex align-items-center">
            <div class="flex-shrink-0">
                <i class="fas fa-heart fa-2x" style="color: #e91e63;"></i>
            </div>
            <div class="flex-grow-1 ms-3">
                <h5><i class="fas fa-star"></i> Fashion Friend Says:</h5>
                <p class="mb-0">${message}</p>
            </div>
            <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    // Add to page
    const mainContent = document.querySelector('main') || document.body;
    mainContent.prepend(complimentBox);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (complimentBox.parentElement) {
            complimentBox.classList.add('animate__animated', 'animate__fadeOut');
            setTimeout(() => {
                if (complimentBox.parentElement) {
                    complimentBox.remove();
                }
            }, 1000);
        }
    }, 10000);
}

// Update Fashion Suggestions
function updateFashionSuggestions() {
    // This would be connected to your fashion database
    // For now, we'll just update the UI
    const suggestionsContainer = document.getElementById('fashionSuggestions');
    if (suggestionsContainer) {
        suggestionsContainer.innerHTML = getFashionSuggestionsHTML();
    }
}

// Get Fashion Suggestions HTML
function getFashionSuggestionsHTML() {
    const suggestions = {
        male: {
            child: [
                { name: "Casual Jeans & T-Shirt", color: "blue", category: "Casual" },
                { name: "School Uniform", color: "navy", category: "Formal" },
                { name: "Sports Outfit", color: "red", category: "Sports" }
            ],
            teen: [
                { name: "Streetwear Hoodie", color: "black", category: "Casual" },
                { name: "Smart Casual", color: "gray", category: "Semi-Formal" },
                { name: "Gym Wear", color: "dark", category: "Sports" }
            ],
            adult: [
                { name: "Business Casual", color: "dark", category: "Formal" },
                { name: "Weekend Chic", color: "brown", category: "Casual" },
                { name: "Date Night Outfit", color: "dark", category: "Evening" }
            ]
        },
        female: {
            child: [
                { name: "Floral Dress", color: "pink", category: "Casual" },
                { name: "School Dress", color: "navy", category: "Formal" },
                { name: "Play Outfit", color: "yellow", category: "Sports" }
            ],
            teen: [
                { name: "Trendy Jeans & Top", color: "blue", category: "Casual" },
                { name: "Party Dress", color: "red", category: "Evening" },
                { name: "Athleisure", color: "purple", category: "Sports" }
            ],
            adult: [
                { name: "Office Attire", color: "black", category: "Formal" },
                { name: "Weekend Casual", color: "white", category: "Casual" },
                { name: "Cocktail Dress", color: "gold", category: "Evening" }
            ]
        },
        lgbtq: {
            child: [
                { name: "Colorful Mix", color: "rainbow", category: "Playful" },
                { name: "Gender-neutral", color: "green", category: "Casual" },
                { name: "Expressive Outfit", color: "multicolor", category: "Creative" }
            ],
            teen: [
                { name: "Androgynous Look", color: "black", category: "Trendy" },
                { name: "Pride Colors", color: "rainbow", category: "Expressive" },
                { name: "Artistic Style", color: "purple", category: "Creative" }
            ],
            adult: [
                { name: "Gender-fluid Formal", color: "gray", category: "Formal" },
                { name: "Queer Chic", color: "multicolor", category: "Casual" },
                { name: "Pride Celebration", color: "rainbow", category: "Special" }
            ]
        }
    };
    
    const userSuggestions = suggestions[currentUser.gender]?.[currentUser.age] || suggestions.adult.adult;
    
    return userSuggestions.map(item => `
        <div class="col-md-4 mb-4">
            <div class="card fashion-card h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <span class="badge bg-primary">${item.category}</span>
                        <i class="fas fa-heart text-danger"></i>
                    </div>
                    <h5 class="card-title">${item.name}</h5>
                    <div class="color-indicator mb-3" style="background-color: ${item.color}; width: 30px; height: 30px; border-radius: 50%; border: 2px solid #ddd;"></div>
                    <p class="card-text">Perfect for your ${currentUser.age} ${currentUser.gender} style!</p>
                    <button class="btn btn-sm btn-luki w-100">Add to Wardrobe</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Logout Function
function logout() {
    localStorage.removeItem('luki_gender');
    localStorage.removeItem('luki_age');
    localStorage.removeItem('luki_theme');
    window.location.href = 'login.html';
}

// Theme Changer
function changeTheme(theme) {
    document.body.className = theme;
    currentUser.theme = theme;
    localStorage.setItem('luki_theme', theme);
    
    // Show confirmation
    displayComplimentMessage(`Theme changed to ${theme.replace('theme-', '')}! Looking fresh!`);
}

// Weather Integration
async function getWeather() {
    // This would integrate with a weather API
    // For demo purposes, we'll return mock data
    return {
        temp: 22,
        condition: 'Sunny',
        icon: 'fa-sun',
        advice: 'Light layers recommended. Perfect for a stylish jacket!'
    };
}

// Initialize weather on page load
window.addEventListener('load', async function() {
    const weatherElement = document.getElementById('weatherWidget');
    if (weatherElement) {
        const weather = await getWeather();
        weatherElement.innerHTML = `
            <div class="weather-widget">
                <div class="row align-items-center">
                    <div class="col-4 text-center">
                        <i class="fas ${weather.icon} weather-icon"></i>
                        <h2>${weather.temp}°C</h2>
                    </div>
                    <div class="col-8">
                        <h4>${weather.condition}</h4>
                        <p class="mb-0">${weather.advice}</p>
                        <small><i class="fas fa-map-marker-alt"></i> Current Location</small>
                    </div>
                </div>
            </div>
        `;
    }
});

// Export functions for use in HTML
window.changeTheme = changeTheme;
window.generateCompliment = generateCompliment;