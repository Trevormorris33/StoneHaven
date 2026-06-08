// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Simple Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('shadow-lg');
    } else {
        nav.classList.remove('shadow-lg');
    }
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Theme Toggle Functionality
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to system preference
function getThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Apply theme
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update icon
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const theme = getThemePreference();
    applyTheme(theme);
});

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-switch if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// ============================================
// Reservation Modal Functionality
// ============================================
const reservationModal = document.getElementById('reservation-modal');
const openReservationBtn = document.getElementById('open-reservation-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const closeModalBtn2 = document.getElementById('close-modal-btn2');
const modalOverlay = document.getElementById('modal-overlay');
const step1Form = document.getElementById('step1-form');
const step2Form = document.getElementById('step2-form');
const successForm = document.getElementById('success-form');
const nextToStep2Btn = document.getElementById('next-to-step2');
const submitReservationBtn = document.getElementById('submit-reservation');
const closeSuccessBtn = document.getElementById('close-success-btn');

// Open Modal
function openModal() {
    reservationModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
    reservationModal.classList.add('hidden');
    document.body.style.overflow = '';
    // Reset forms
    step1Form.classList.remove('hidden');
    step2Form.classList.add('hidden');
    successForm.classList.add('hidden');
    // Clear form values
    document.getElementById('guests').value = '';
    document.getElementById('reservation-date').value = '';
    document.getElementById('reservation-time').value = '';
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('phone-number').value = '';
    document.getElementById('email-address').value = '';
    document.getElementById('agree-rules').checked = false;
    document.getElementById('receive-offers').checked = false;
}

// Open reservation modal
openReservationBtn.addEventListener('click', openModal);

// Close modal buttons
closeModalBtn.addEventListener('click', closeModal);
closeModalBtn2.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
closeSuccessBtn.addEventListener('click', closeModal);

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !reservationModal.classList.contains('hidden')) {
        closeModal();
    }
});

// Next step button
nextToStep2Btn.addEventListener('click', () => {
    const guests = document.getElementById('guests').value;
    const date = document.getElementById('reservation-date').value;
    const time = document.getElementById('reservation-time').value;
    
    // Validation
    if (!guests || !date || !time) {
        alert('Please fill in all fields: guests, date, and time.');
        return;
    }
    
    // Check if date is in the future
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        alert('Please select a future date.');
        return;
    }
    
    // Transition to step 2
    step1Form.classList.add('hidden');
    step2Form.classList.remove('hidden');
});

// Submit reservation
submitReservationBtn.addEventListener('click', () => {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phone = document.getElementById('phone-number').value;
    const email = document.getElementById('email-address').value;
    const agreeRules = document.getElementById('agree-rules').checked;
    
    // Validation
    if (!firstName || !lastName || !phone || !email) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Must agree to rules
    if (!agreeRules) {
        alert('You must agree to the restaurant\'s house rules to complete the reservation.');
        return;
    }
    
    // Transition to success
    step2Form.classList.add('hidden');
    successForm.classList.remove('hidden');
});

// Set minimum date to today
const dateInput = document.getElementById('reservation-date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// ============================================
// Animated Statistics Counter
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer to trigger animation when visible
const statisticsSection = document.getElementById('statistics');
if (statisticsSection) {
    const observerOptions = {
        threshold: 0.3 // Trigger when 30% of section is visible
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class for fade-in animation
                const statItems = entry.target.querySelectorAll('.stat-item');
                statItems.forEach(item => item.classList.add('visible'));
                
                // Start counter animation
                animateCounters();
                
                // Unobserve after triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observer.observe(statisticsSection);
}
