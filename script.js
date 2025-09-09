// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Sticky navigation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Active navigation link
    window.addEventListener('scroll', function() {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Quantum particles
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Random animation delay
        const delay = Math.random() * 15;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Dashboard tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Initialize charts when switching tabs
            if (tabId === 'soil' && !window.soilChart) {
                initSoilChart();
            } else if (tabId === 'weather' && !window.weatherChart) {
                initWeatherChart();
            } else if (tabId === 'crops' && !window.cropChart) {
                initCropChart();
            }
        });
    });
    
    // Initialize soil chart by default
    initSoilChart();
    
    // Animated counter for insights
    const insightValues = document.querySelectorAll('.insight-value');
    
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            element.textContent = value + '%';
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    };
    
    // Intersection Observer for insight values
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const endValue = parseFloat(element.getAttribute('data-target'));
                
                animateValue(element, 0, endValue, 2000);
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    insightValues.forEach(value => {
        observer.observe(value);
    });
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showFormMessage('Sending message...', 'info');
        
        setTimeout(() => {
            showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        }, 1500);
    });
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message';
        
        if (type === 'success') {
            formMessage.classList.add('success');
        } else if (type === 'error') {
            formMessage.classList.add('error');
        } else {
            formMessage.style.background = 'rgba(59, 130, 246, 0.1)';
            formMessage.style.color = '#3b82f6';
            formMessage.style.border = '1px solid #3b82f6';
        }
        
        formMessage.style.display = 'block';
        
        if (type !== 'info') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    // Chart initialization functions
    function initSoilChart() {
        const ctx = document.getElementById('soilChart').getContext('2d');
        
        window.soilChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Nitrogen',
                    data: [110, 115, 118, 120, 122, 119, 120],
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Phosphorus',
                    data: [60, 62, 63, 65, 64, 66, 65],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Potassium',
                    data: [130, 132, 135, 138, 140, 139, 140],
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Soil Nutrient Levels Over Time',
                        font: {
                            size: 16
                        }
                    },
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Nutrient Level (ppm)'
                        }
                    }
                }
            }
        });
    }
    
    function initWeatherChart() {
        const ctx = document.getElementById('weatherChart').getContext('2d');
        
        window.weatherChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Temperature (°C)',
                    data: [24, 26, 22, 20, 23, 25, 27],
                    backgroundColor: 'rgba(34, 197, 94, 0.7)',
                    borderColor: '#22c55e',
                    borderWidth: 1
                }, {
                    label: 'Humidity (%)',
                    data: [65, 60, 75, 80, 70, 62, 58],
                    backgroundColor: 'rgba(59, 130, 246, 0.7)',
                    borderColor: '#3b82f6',
                    borderWidth: 1
                }, {
                    label: 'Precipitation (mm)',
                    data: [0, 0, 5, 12, 2, 0, 0],
                    backgroundColor: 'rgba(139, 92, 246, 0.7)',
                    borderColor: '#8b5cf6',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Weekly Weather Forecast',
                        font: {
                            size: 16
                        }
                    },
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Value'
                        }
                    }
                }
            }
        });
    }
    
    function initCropChart() {
        const ctx = document.getElementById('cropChart').getContext('2d');
        
        window.cropChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Wheat', 'Corn', 'Soybean', 'Rice'],
                datasets: [{
                    data: [30, 25, 20, 25],
                    backgroundColor: [
                        'rgba(34, 197, 94, 0.7)',
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(139, 92, 246, 0.7)',
                        'rgba(249, 115, 22, 0.7)'
                    ],
                    borderColor: [
                        '#22c55e',
                        '#3b82f6',
                        '#8b5cf6',
                        '#f97316'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Crop Distribution',
                        font: {
                            size: 16
                        }
                    },
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
    
    // Crop Database
    const cropsData = [
        {
            id: 1,
            name: 'Wheat',
            description: 'Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food.',
            images: [
                       'https://uploads.onecompiler.io/43bfq86cy/43w84h5t9/1000083234.jpg'
                        
                 ],
            duration: '120-150 days',
            soilTypes: ['Loamy', 'Clay', 'Sandy loam'],
            chemicals: [
                { name: 'Urea', purpose: 'Nitrogen fertilizer', application: 'Apply during tillering stage' },
                { name: 'DAP', purpose: 'Phosphorus fertilizer', application: 'Apply at sowing' },
                { name: 'MOP', purpose: 'Potassium fertilizer', application: 'Apply before flowering' },
                { name: 'Mancozeb', purpose: 'Fungicide', application: 'Spray at disease appearance' }
            ],
            insights: [
                'Quantum algorithms indicate optimal planting time is 2 weeks earlier than traditional methods',
                'Yield can be increased by 18% with quantum-optimized irrigation schedule',
                'Early disease detection can reduce chemical usage by up to 30%'
            ]
        },
        {
            id: 2,
            name: 'Corn',
            description: 'Corn, also known as maize, is a cereal grain first domesticated by indigenous peoples in southern Mexico.',
            images: [
                'https://uploads.onecompiler.io/43bfq86cy/43w84h5t9/1000083230.jpg'
                
            ],
            duration: '90-120 days',
            soilTypes: ['Loamy', 'Sandy loam', 'Clay loam'],
            chemicals: [
                { name: 'NPK 15-15-15', purpose: 'Balanced fertilizer', application: 'Apply at sowing' },
                { name: 'Urea', purpose: 'Nitrogen top dressing', application: 'Apply at knee-high stage' },
                { name: 'Glyphosate', purpose: 'Herbicide', application: 'Pre-planting weed control' },
                { name: 'Lambda-cyhalothrin', purpose: 'Insecticide', application: 'When pest threshold is reached' }
            ],
            insights: [
                'Quantum soil analysis shows 22% higher yield potential with adjusted pH levels',
                'Optimal planting density determined by quantum algorithms increases yield by 15%',
                'Quantum weather prediction reduces irrigation needs by 25%'
            ]
        },
        {
            id: 3,
            name: 'Rice',
            description: 'Rice is the seed of the grass species Oryza sativa or less commonly Oryza glaberrima.',
            images: [
                'https://uploads.onecompiler.io/43bfq86cy/43w84h5t9/1000083234.jpg'
 ],
            duration: '105-150 days',
            soilTypes: ['Clay', 'Clay loam', 'Silty clay'],
            chemicals: [
                { name: 'NPK 20-20-20', purpose: 'Basal fertilizer', application: 'Apply before transplanting' },
                { name: 'Urea', purpose: 'Nitrogen top dressing', application: 'Apply at tillering stage' },
                { name: 'Buprofezin', purpose: 'Insecticide', application: 'For planthopper control' },
                { name: 'Tricyclazole', purpose: 'Fungicide', application: 'For blast disease control' }
            ],
            insights: [
                'Quantum water management reduces water usage by 35% while maintaining yield',
                'Quantum algorithms predict optimal harvest time 5 days earlier than traditional methods',
                'Early disease detection through quantum imaging reduces yield loss by 40%'
            ]
        },
        {
            id: 4,
            name: 'Soybean',
            description: 'The soybean, soy bean, or soya bean is a species of legume native to East Asia.',
            images: [
                'https://uploads.onecompiler.io/43bfq86cy/43w84h5t9/1000083236.jpg'
 ],
            duration: '100-130 days',
            soilTypes: ['Loamy', 'Sandy loam', 'Clay loam'],
            chemicals: [
                { name: 'Rhizobium', purpose: 'Biofertilizer', application: 'Seed treatment' },
                { name: 'DAP', purpose: 'Phosphorus fertilizer', application: 'At sowing' },
                { name: 'MOP', purpose: 'Potassium fertilizer', application: 'At flowering' },
                { name: 'Imidacloprid', purpose: 'Insecticide', application: 'For stem borer control' }
            ],
            insights: [
                'Quantum seed treatment increases germination rate by 25%',
                'Quantum algorithms optimize planting density for 18% higher yield',
                'Quantum soil analysis reduces fertilizer requirements by 20%'
            ]
        },
        {
            id: 5,
            name: 'Tomato',
            description: 'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as a tomato plant.',
            images: [
                'https://uploads.onecompiler.io/43bfq86cy/43w84h5t9/1000083233.jpg'
 ],
            duration: '90-120 days',
            soilTypes: ['Loamy', 'Sandy loam', 'Clay loam'],
            chemicals: [
                { name: 'NPK 15-15-15', purpose: 'Balanced fertilizer', application: 'At transplanting' },
                { name: 'Calcium nitrate', purpose: 'Calcium fertilizer', application: 'During fruit development' },
                { name: 'Mancozeb', purpose: 'Fungicide', application: 'For early and late blight' },
                { name: 'Imidacloprid', purpose: 'Insecticide', application: 'For whitefly control' }
            ],
            insights: [
                'Quantum algorithms predict optimal harvest time with 95% accuracy',
                'Quantum imaging detects nutrient deficiencies 10 days before visible symptoms',
                'Optimized irrigation schedule reduces water usage by 30%'
            ]
        },
        {
            id: 6,
            name: 'Potato',
            description: 'The potato is a starchy tuberous crop from the perennial nightshade Solanum tuberosum.',
            images: [
                'https://uploads.onecompiler.io/43bfq86cy/43w84h5t9/1000083233.jpg'
],
            duration: '90-120 days',
            soilTypes: ['Loamy', 'Sandy loam', 'Silt loam'],
            chemicals: [
                { name: 'NPK 15-15-15', purpose: 'Basal fertilizer', application: 'At planting' },
                { name: 'Urea', purpose: 'Nitrogen top dressing', application: 'At tuber initiation' },
                { name: 'Mancozeb', purpose: 'Fungicide', application: 'For early and late blight' },
                { name: 'Imidacloprid', purpose: 'Insecticide', application: 'For aphid control' }
            ],
            insights: [
                'Quantum soil analysis predicts optimal planting depth for 15% higher yield',
                'Quantum algorithms reduce fertilizer requirements by 25%',
                'Early disease detection reduces crop loss by 35%'
            ]
        }
    ];
    
    // Generate crop cards
    const cropsGrid = document.getElementById('crops-grid');
    
    function generateCropCards(crops) {
        cropsGrid.innerHTML = '';
        
        crops.forEach(crop => {
            const cropCard = document.createElement('div');
            cropCard.className = 'crop-item';
            cropCard.dataset.cropId = crop.id;
            
            cropCard.innerHTML = `
                <div class="crop-item-image">
                    <img src="${crop.images[0]}" alt="${crop.name}">
                </div>
                <div class="crop-item-content">
                    <h3 class="crop-item-title">${crop.name}</h3>
                    <p class="crop-item-description">${crop.description}</p>
                    <div class="crop-item-meta">
                        <div class="crop-item-soil">
                            <i class="fas fa-mountain"></i>
                            <span>${crop.soilTypes[0]}</span>
                        </div>
                        <div class="crop-item-duration">
                            <i class="fas fa-clock"></i>
                            <span>${crop.duration}</span>
                        </div>
                    </div>
                </div>
            `;
            
            cropsGrid.appendChild(cropCard);
        });
        
        // Add click event listeners to crop cards
        document.querySelectorAll('.crop-item').forEach(card => {
            card.addEventListener('click', function() {
                const cropId = parseInt(this.dataset.cropId);
                const crop = cropsData.find(c => c.id === cropId);
                showCropModal(crop);
            });
        });
    }
    
    // Initialize crop cards
    generateCropCards(cropsData);
    
    // Crop filter functionality
    const cropFilter = document.getElementById('crop-filter');
    const soilFilter = document.getElementById('soil-filter');
    
    cropFilter.addEventListener('change', filterCrops);
    soilFilter.addEventListener('change', filterCrops);
    
    function filterCrops() {
        const cropValue = cropFilter.value;
        const soilValue = soilFilter.value;
        
        let filteredCrops = cropsData;
        
        if (cropValue !== 'all') {
            filteredCrops = filteredCrops.filter(crop => 
                crop.name.toLowerCase() === cropValue.toLowerCase()
            );
        }
        
        if (soilValue !== 'all') {
            filteredCrops = filteredCrops.filter(crop => 
                crop.soilTypes.some(soil => soil.toLowerCase() === soilValue.toLowerCase())
            );
        }
        
        generateCropCards(filteredCrops);
    }
    
    // Modal functionality
    const modal = document.getElementById('crop-modal');
    const closeModal = document.querySelector('.close-modal');
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    function showCropModal(crop) {
        // Set crop name
        document.getElementById('modal-crop-name').textContent = crop.name;
        
        // Set main image
        document.getElementById('main-crop-image').src = crop.images[0];
        document.getElementById('main-crop-image').alt = crop.name;
        
        // Generate thumbnails
        const thumbnailsContainer = document.getElementById('image-thumbnails');
        thumbnailsContainer.innerHTML = '';
        
        crop.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            
            thumbnail.innerHTML = `<img src="${image}" alt="${crop.name} image ${index + 1}">`;
            
            thumbnail.addEventListener('click', function() {
                // Update main image
                document.getElementById('main-crop-image').src = image;
                
                // Update active thumbnail
                document.querySelectorAll('.thumbnail').forEach(thumb => {
                    thumb.classList.remove('active');
                });
                this.classList.add('active');
            });
            
            thumbnailsContainer.appendChild(thumbnail);
        });
        
        // Set crop duration
        document.getElementById('crop-duration').textContent = crop.duration;
        
        // Set soil types
        const soilTypesContainer = document.getElementById('crop-soil-types');
        soilTypesContainer.innerHTML = '';
        
        crop.soilTypes.forEach(soil => {
            const soilType = document.createElement('span');
            soilType.className = 'soil-type';
            soilType.textContent = soil;
            soilTypesContainer.appendChild(soilType);
        });
        
        // Set chemicals table
        const chemicalsTbody = document.getElementById('chemicals-tbody');
        chemicalsTbody.innerHTML = '';
        
        crop.chemicals.forEach(chemical => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${chemical.name}</td>
                <td>${chemical.purpose}</td>
                <td>${chemical.application}</td>
            `;
            
            chemicalsTbody.appendChild(row);
        });
        
        // Set quantum insights
        const insightsContainer = document.getElementById('quantum-insights');
        insightsContainer.innerHTML = '';
        
        crop.insights.forEach(insight => {
            const listItem = document.createElement('li');
            listItem.textContent = insight;
            insightsContainer.appendChild(listItem);
        });
        
        // Show modal
        modal.style.display = 'block';
    }
    
    // Crop Disease Detection
    const uploadBox = document.getElementById('upload-box');
    const fileInput = document.getElementById('file-input');
    const uploadBtn = document.getElementById('upload-btn');
    const imagePreview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    const analyzeBtn = document.getElementById('analyze-btn');
    const detectionResult = document.getElementById('detection-result');
    const newAnalysisBtn = document.getElementById('new-analysis-btn');
    uploadBtn.addEventListener('click', function() {
        fileInput.click();
    });
    
    uploadBox.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadBox.style.borderColor = '#22c55e';
    });
    
    uploadBox.addEventListener('dragleave', function() {
        uploadBox.style.borderColor = '#ddd';
    });
    
    uploadBox.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadBox.style.borderColor = '#ddd';
        
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFileSelect();
        }
    });
    
    fileInput.addEventListener('change', handleFileSelect);
    
    function handleFileSelect() {
        if (fileInput.files.length === 0) return;
        
        const file = fileInput.files[0];
        
        if (!file.type.match('image.*')) {
            alert('Please select an image file');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            uploadBox.style.display = 'none';
            imagePreview.style.display = 'block';
        };
        
        reader.readAsDataURL(file);
    }
    
    analyzeBtn.addEventListener('click', function() {
        // Simulate analysis
        detectionResult.style.display = 'none';
        
        setTimeout(() => {
            // Mock disease detection results
            const diseases = [
                {
                    name: 'Wheat Rust',
                    confidence: '92%',
                    severity: 'Moderate',
                    treatment: 'Apply fungicide containing triazole. Ensure proper irrigation to reduce humidity.',
                    insights: 'Quantum algorithms predict 78% chance of disease spread in next 7 days without treatment.'
                },
                {
                    name: 'Healthy Crop',
                    confidence: '98%',
                    severity: 'None',
                    treatment: 'Continue current practices. Monitor for early signs of disease.',
                    insights: 'Quantum analysis shows optimal growing conditions. Yield potential is 15% above average.'
                },
                {
                    name: 'Leaf Blight',
                    confidence: '87%',
                    severity: 'High',
                    treatment: 'Apply copper-based fungicide immediately. Remove and destroy infected plant material.',
                    insights: 'Quantum models indicate high risk of rapid spread. Immediate action required.'
                },
                {
                    name: 'Aphid Infestation',
                    confidence: '95%',
                    severity: 'Moderate',
                    treatment: 'Apply insecticidal soap or neem oil. Introduce natural predators like ladybugs.',
                    insights: 'Quantum weather patterns suggest conditions will worsen infestation in next 5 days.'
                }
            ];
            
            const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
            
            document.getElementById('disease-name').textContent = randomDisease.name;
            document.getElementById('confidence').textContent = `Confidence: ${randomDisease.confidence}`;
            document.getElementById('severity').textContent = randomDisease.severity;
            document.getElementById('treatment').textContent = randomDisease.treatment;
            document.getElementById('quantum-insights').textContent = randomDisease.insights;
            
            detectionResult.style.display = 'block';
        }, 2000);
    });
    
    newAnalysisBtn.addEventListener('click', function() {
        uploadBox.style.display = 'block';
        imagePreview.style.display = 'none';
        detectionResult.style.display = 'none';
        fileInput.value = '';
    });
    
    // Farm Management Planner
    const farmForm = document.getElementById('farm-form');
    const plannerResult = document.getElementById('planner-result');
    const newPlanBtn = document.getElementById('new-plan-btn');
    
    farmForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const farmSize = document.getElementById('farm-size').value;
        const cropType = document.getElementById('crop-type').value;
        const soilType = document.getElementById('soil-type').value;
        const waterSource = document.getElementById('water-source').value;
        const plantingDate = document.getElementById('planting-date').value;
        
        // Calculate harvest date based on crop type
        const cropDurations = {
            'wheat': 120,
            'corn': 100,
            'rice': 130,
            'soybean': 110,
            'tomato': 100,
            'potato': 110
        };
        
        const duration = cropDurations[cropType] || 100;
        const plantingDateObj = new Date(plantingDate);
        const harvestDateObj = new Date(plantingDateObj);
        harvestDateObj.setDate(harvestDateObj.getDate() + duration);
        
        const harvestDate = harvestDateObj.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        
        // Calculate expected yield (simplified)
        const baseYields = {
            'wheat': 3.5,
            'corn': 7.5,
            'rice': 4.5,
            'soybean': 2.5,
            'tomato': 25,
            'potato': 20
        };
        
        const baseYield = baseYields[cropType] || 5;
        const soilMultiplier = {
            'clay': 0.9,
            'loamy': 1.2,
            'sandy': 0.8,
            'silty': 1.1
        };
        
        const waterMultiplier = {
            'rainfed': 0.8,
            'irrigation': 1.2,
            'mixed': 1.0
        };
        
        const expectedYield = (baseYield * soilMultiplier[soilType] * waterMultiplier[waterSource] * farmSize).toFixed(1);
        
        // Calculate water requirement (simplified)
        const waterRequirements = {
            'wheat': 450,
            'corn': 550,
            'rice': 1200,
            'soybean': 500,
            'tomato': 600,
            'potato': 500
        };
        
        const waterRequirement = (waterRequirements[cropType] || 500) * farmSize;
        
        // Update UI
        document.getElementById('harvest-date').textContent = harvestDate;
        document.getElementById('expected-yield').textContent = `${expectedYield} tons`;
        document.getElementById('water-requirement').textContent = `${waterRequirement.toLocaleString()} liters`;
        
        // Generate timeline
        const timeline = document.getElementById('timeline');
        timeline.innerHTML = '';
        
        // Planting
        const plantingItem = document.createElement('div');
        plantingItem.className = 'timeline-item';
        plantingItem.innerHTML = `
            <div class="timeline-date">${plantingDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            <div class="timeline-activity">Planting</div>
            <div class="timeline-description">Plant ${cropType} seeds in prepared soil</div>
        `;
        timeline.appendChild(plantingItem);
        
        // Fertilization
        const fertilizationDate = new Date(plantingDateObj);
        fertilizationDate.setDate(fertilizationDate.getDate() + 30);
        
        const fertilizationItem = document.createElement('div');
        fertilizationItem.className = 'timeline-item';
        fertilizationItem.innerHTML = `
            <div class="timeline-date">${fertilizationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            <div class="timeline-activity">First Fertilization</div>
            <div class="timeline-description">Apply NPK fertilizer according to soil test results</div>
        `;
        timeline.appendChild(fertilizationItem);
        
        // Irrigation check
        const irrigationDate = new Date(plantingDateObj);
        irrigationDate.setDate(irrigationDate.getDate() + 45);
        
        const irrigationItem = document.createElement('div');
        irrigationItem.className = 'timeline-item';
        irrigationItem.innerHTML = `
            <div class="timeline-date">${irrigationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            <div class="timeline-activity">Irrigation Check</div>
            <div class="timeline-description">Monitor soil moisture and irrigate if needed</div>
        `;
        timeline.appendChild(irrigationItem);
        
        // Pest control
        const pestDate = new Date(plantingDateObj);
        pestDate.setDate(pestDate.getDate() + 60);
        
        const pestItem = document.createElement('div');
        pestItem.className = 'timeline-item';
        pestItem.innerHTML = `
            <div class="timeline-date">${pestDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            <div class="timeline-activity">Pest Control</div>
            <div class="timeline-description">Monitor for pests and apply treatments if necessary</div>
        `;
        timeline.appendChild(pestItem);
        
        // Harvest
        const harvestItem = document.createElement('div');
        harvestItem.className = 'timeline-item';
        harvestItem.innerHTML = `
            <div class="timeline-date">${harvestDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            <div class="timeline-activity">Harvest</div>
            <div class="timeline-description">Harvest ${cropType} when mature</div>
        `;
        timeline.appendChild(harvestItem);
        
        // Generate recommendations
        const recommendationsList = document.getElementById('recommendations-list');
        recommendationsList.innerHTML = '';
        
        const recommendations = [
            `Quantum algorithms suggest planting ${cropType} 2 weeks earlier than traditional methods for optimal yield`,
            `Soil analysis indicates ${soilType} soil is suitable for ${cropType} with proper amendments`,
            `Quantum weather prediction shows ${waterSource} will be adequate for this growing season`,
            `Optimal planting density determined by quantum algorithms: ${Math.round(farmSize * 0.8)} plants per acre`,
            `Quantum sensors recommend monitoring soil moisture every 3 days for optimal irrigation`
        ];
        
        recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            recommendationsList.appendChild(li);
        });
        
        // Show result
        plannerResult.style.display = 'block';
    });
    
    newPlanBtn.addEventListener('click', function() {
        farmForm.reset();
        plannerResult.style.display = 'none';
    });
    
    // Market Price Predictor
    const cropSelect = document.getElementById('crop-select');
    const timeRange = document.getElementById('time-range');
    const predictBtn = document.getElementById('predict-btn');
    const priceChart = document.getElementById('priceChart');
    
    predictBtn.addEventListener('click', function() {
        // Mock price data
        const crop = cropSelect.value;
        const range = timeRange.value;
        
        let labels, data;
        
        if (range === '1m') {
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            data = [240, 245, 250, 255];
        } else if (range === '3m') {
            labels = ['Month 1', 'Month 2', 'Month 3'];
            data = [230, 240, 250];
        } else if (range === '6m') {
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
            data = [220, 225, 230, 240, 245, 250];
        } else {
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            data = [210, 215, 220, 225, 230, 235, 240, 245, 250, 255, 260, 265];
        }
        
        // Add prediction data
        const predictionLabels = [...labels];
        const predictionData = [...data];
        
        if (range === '1m') {
            predictionLabels.push('Week 5 (Predicted)');
            predictionData.push(265);
        } else if (range === '3m') {
            predictionLabels.push('Month 4 (Predicted)');
            predictionData.push(260);
        } else if (range === '6m') {
            predictionLabels.push('Jul (Predicted)', 'Aug (Predicted)');
            predictionData.push(255, 260);
        } else {
            predictionLabels.push('Jan (Predicted)', 'Feb (Predicted)', 'Mar (Predicted)');
            predictionData.push(270, 275, 280);
        }
        
        // Update chart
        if (window.priceChart) {
            window.priceChart.destroy();
        }
        
        const ctx = priceChart.getContext('2d');
        window.priceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: predictionLabels,
                datasets: [{
                    label: 'Historical Price',
                    data: data,
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Predicted Price',
                    data: predictionData.slice(-predictionLabels.length + labels.length),
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    borderDash: [5, 5],
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `${crop.charAt(0).toUpperCase() + crop.slice(1)} Price Prediction`,
                        font: {
                            size: 16
                        }
                    },
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Price ($/ton)'
                        }
                    }
                }
            }
        });
        
        // Update market insights
        const currentPrice = data[data.length - 1];
        const predictedPrice = predictionData[predictionData.length - 1];
        const priceChange = ((predictedPrice - currentPrice) / currentPrice * 100).toFixed(1);
        
        document.getElementById('current-price').textContent = `$${currentPrice}/ton`;
        document.getElementById('predicted-price').textContent = `$${predictedPrice}/ton`;
        
        const priceChangeElement = document.getElementById('price-change');
        priceChangeElement.textContent = `${priceChange > 0 ? '+' : ''}${priceChange}%`;
        priceChangeElement.className = priceChange > 0 ? 'insight-value positive' : 'insight-value negative';
        
        document.getElementById('confidence-level').textContent = `${Math.floor(Math.random() * 10) + 85}%`;
        
        // Update quantum analysis
        const analyses = [
            `Based on quantum algorithms analyzing market trends, weather patterns, and global supply chain data, we predict a price ${priceChange > 0 ? 'increase' : 'decrease'} in the next quarter due to ${priceChange > 0 ? 'reduced supply and increased demand' : 'increased supply and market uncertainties'}.`,
            `Quantum computing models indicate that ${crop} prices will be influenced by changing weather patterns and global trade policies. Our prediction model has a ${Math.floor(Math.random() * 10) + 85}% confidence rate.`,
            `Market analysis using quantum algorithms shows that ${crop} prices are likely to ${priceChange > 0 ? 'rise' : 'fall'} due to shifts in consumer demand and production costs. Farmers should consider ${priceChange > 0 ? 'delaying sales' : 'selling soon'} to maximize profits.`
        ];
        
        document.getElementById('quantum-analysis').textContent = analyses[Math.floor(Math.random() * analyses.length)];
    });
    
    // Soil Health Calculator
    const soilForm = document.getElementById('soil-form');
    const calculatorResult = document.getElementById('calculator-result');
    const newCalculationBtn = document.getElementById('new-calculation-btn');
    
    soilForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const nitrogen = parseFloat(document.getElementById('nitrogen').value);
        const phosphorus = parseFloat(document.getElementById('phosphorus').value);
        const potassium = parseFloat(document.getElementById('potassium').value);
        const ph = parseFloat(document.getElementById('ph').value);
        const organicMatter = parseFloat(document.getElementById('organic-matter').value);
        const soilType = document.getElementById('soil-type-calc').value;
        
        // Calculate health score (simplified)
        let score = 0;
        
        // Nitrogen score (0-25 points)
        if (nitrogen >= 100 && nitrogen <= 200) score += 25;
        else if (nitrogen >= 80 && nitrogen <= 250) score += 20;
        else if (nitrogen >= 60 && nitrogen <= 300) score += 15;
        else score += 10;
        
        // Phosphorus score (0-25 points)
        if (phosphorus >= 40 && phosphorus <= 80) score += 25;
        else if (phosphorus >= 30 && phosphorus <= 100) score += 20;
        else if (phosphorus >= 20 && phosphorus <= 120) score += 15;
        else score += 10;
        
        // Potassium score (0-25 points)
        if (potassium >= 100 && potassium <= 200) score += 25;
        else if (potassium >= 80 && potassium <= 250) score += 20;
        else if (potassium >= 60 && potassium <= 300) score += 15;
        else score += 10;
        
        // pH score (0-15 points)
        if (ph >= 6.0 && ph <= 7.0) score += 15;
        else if (ph >= 5.5 && ph <= 7.5) score += 12;
        else if (ph >= 5.0 && ph <= 8.0) score += 8;
        else score += 5;
        
        // Organic matter score (0-10 points)
        if (organicMatter >= 3 && organicMatter <= 5) score += 10;
        else if (organicMatter >= 2 && organicMatter <= 6) score += 8;
        else if (organicMatter >= 1 && organicMatter <= 7) score += 5;
        else score += 3;
        
        // Update UI
        const scoreElement = document.getElementById('health-score');
        scoreElement.textContent = score;
        
        // Update score circle
        const scoreCircle = document.querySelector('.score-circle');
        scoreCircle.style.setProperty('--score-percent', `${score}%`);
        
        // Update score description
        let description;
        if (score >= 85) description = 'Excellent';
        else if (score >= 70) description = 'Good';
        else if (score >= 55) description = 'Fair';
        else description = 'Poor';
        
        document.getElementById('score-description').textContent = description;
        
        // Update nutrient bars
        const nitrogenPercent = Math.min(100, (nitrogen / 200) * 100);
        const phosphorusPercent = Math.min(100, (phosphorus / 80) * 100);
        const potassiumPercent = Math.min(100, (potassium / 200) * 100);
        const phPercent = Math.min(100, ((ph - 4) / 4) * 100);
        
        document.getElementById('nitrogen-bar').style.width = `${nitrogenPercent}%`;
        document.getElementById('phosphorus-bar').style.width = `${phosphorusPercent}%`;
        document.getElementById('potassium-bar').style.width = `${potassiumPercent}%`;
        document.getElementById('ph-bar').style.width = `${phPercent}%`;
        
        // Update nutrient status
        const nitrogenStatus = nitrogenPercent >= 70 ? 'Good' : nitrogenPercent >= 40 ? 'Low' : 'Very Low';
        const phosphorusStatus = phosphorusPercent >= 70 ? 'Good' : phosphorusPercent >= 40 ? 'Low' : 'Very Low';
        const potassiumStatus = potassiumPercent >= 70 ? 'Good' : potassiumPercent >= 40 ? 'Low' : 'Very Low';
        const phStatus = (ph >= 6.0 && ph <= 7.0) ? 'Optimal' : (ph >= 5.5 && ph <= 7.5) ? 'Acceptable' : 'Needs Adjustment';
        
        document.getElementById('nitrogen-status').textContent = nitrogenStatus;
        document.getElementById('phosphorus-status').textContent = phosphorusStatus;
        document.getElementById('potassium-status').textContent = potassiumStatus;
        document.getElementById('ph-status').textContent = phStatus;
        
        // Update status text colors
        document.getElementById('nitrogen-status').className = `nutrient-status-text ${nitrogenStatus === 'Good' ? 'good' : 'low'}`;
        document.getElementById('phosphorus-status').className = `nutrient-status-text ${phosphorusStatus === 'Good' ? 'good' : 'low'}`;
        document.getElementById('potassium-status').className = `nutrient-status-text ${potassiumStatus === 'Good' ? 'good' : 'low'}`;
        document.getElementById('ph-status').className = `nutrient-status-text ${phStatus === 'Optimal' ? 'good' : 'low'}`;
        
        // Generate recommendations
        const recommendationsList = document.getElementById('soil-recommendations');
        recommendationsList.innerHTML = '';
        
        const recommendations = [];
        
        if (nitrogen < 100) {
            recommendations.push(`Apply nitrogen fertilizer. Quantum algorithms recommend ${Math.round((100 - nitrogen) * 1.5)} kg/ha of urea.`);
        }
        
        if (phosphorus < 40) {
            recommendations.push(`Apply phosphorus fertilizer. Quantum algorithms recommend ${Math.round((40 - phosphorus) * 2)} kg/ha of DAP.`);
        }
        
        if (potassium < 100) {
            recommendations.push(`Apply potassium fertilizer. Quantum algorithms recommend ${Math.round((100 - potassium) * 1.2)} kg/ha of MOP.`);
        }
        
        if (ph < 6.0 || ph > 7.0) {
            if (ph < 6.0) {
                recommendations.push(`Apply lime to increase pH. Quantum algorithms recommend ${Math.round((6.0 - ph) * 2000)} kg/ha of agricultural lime.`);
            } else {
                recommendations.push(`Apply sulfur to decrease pH. Quantum algorithms recommend ${Math.round((ph - 7.0) * 1500)} kg/ha of elemental sulfur.`);
            }
        }
        
        if (organicMatter < 3) {
            recommendations.push(`Add organic matter. Quantum algorithms recommend adding ${Math.round((3 - organicMatter) * 10)} tons/ha of compost or manure.`);
        }
        
        if (recommendations.length === 0) {
            recommendations.push('Soil nutrients are well-balanced. Continue current practices and monitor regularly.');
        }
        
        recommendations.push(`Quantum soil analysis suggests ${soilType} soil is suitable for most crops with the current nutrient levels.`);
        recommendations.push('Consider crop rotation to maintain soil health and prevent nutrient depletion.');
        
        recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            recommendationsList.appendChild(li);
        });
        
        // Show result
        calculatorResult.style.display = 'block';
    });
    
    newCalculationBtn.addEventListener('click', function() {
        soilForm.reset();
        calculatorResult.style.display = 'none';
    });
});