// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling with Professional Validation
const contactForm = document.getElementById('contactForm');

// Validation functions
const validators = {
    name: (value) => {
        if (!value || value.trim().length < 2) {
            return 'Name must be at least 2 characters long';
        }
        if (!/^[a-zA-Z\s'-]+$/.test(value)) {
            return 'Name can only contain letters, spaces, hyphens and apostrophes';
        }
        return '';
    },
    
    email: (value) => {
        if (!value || value.trim().length === 0) {
            return 'Email address is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Please enter a valid email address';
        }
        return '';
    },
    
    service: (value) => {
        if (!value || value === '') {
            return 'Please select a service';
        }
        return '';
    },
    
    message: (value) => {
        if (!value || value.trim().length < 10) {
            return 'Message must be at least 10 characters long';
        }
        if (value.trim().length > 1000) {
            return 'Message must not exceed 1000 characters';
        }
        return '';
    }
};

// Show error message
function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement && inputElement) {
        errorElement.textContent = message;
        errorElement.style.display = message ? 'block' : 'none';
        inputElement.classList.toggle('error', !!message);
        inputElement.classList.remove('success');
    }
}

// Show success state
function showSuccess(fieldId) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement && inputElement) {
        errorElement.style.display = 'none';
        inputElement.classList.remove('error');
        inputElement.classList.add('success');
    }
}

// Clear all errors
function clearAllErrors() {
    ['name', 'email', 'service', 'message'].forEach(field => {
        const errorElement = document.getElementById(`${field}Error`);
        const inputElement = document.getElementById(field);
        if (errorElement) errorElement.style.display = 'none';
        if (inputElement) {
            inputElement.classList.remove('error', 'success');
        }
    });
}

// Validate single field
function validateField(fieldId, value) {
    const error = validators[fieldId](value);
    if (error) {
        showError(fieldId, error);
        return false;
    } else {
        showSuccess(fieldId);
        return true;
    }
}

// Add real-time validation
['name', 'email', 'service', 'message'].forEach(field => {
    const element = document.getElementById(field);
    if (element) {
        // Validate on blur
        element.addEventListener('blur', () => {
            validateField(field, element.value);
        });
        
        // Clear error on input
        element.addEventListener('input', () => {
            if (element.classList.contains('error')) {
                const error = validators[field](element.value);
                if (!error) {
                    showSuccess(field);
                }
            }
        });
    }
});

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // Validate all fields
    let isValid = true;
    Object.keys(formData).forEach(field => {
        if (!validateField(field, formData[field])) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        // Scroll to first error
        const firstError = contactForm.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');
    
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    
    // Remove any existing messages
    const existingMessage = contactForm.querySelector('.form-success, .form-error');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    try {
        // Send data to PHP backend
        const response = await fetch('contact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${result.message}</span>
            `;
            contactForm.insertBefore(successMessage, contactForm.firstChild);
            
            // Reset form and clear validation states
            contactForm.reset();
            clearAllErrors();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        } else {
            throw new Error(result.message);
        }
        
    } catch (error) {
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error';
        errorMessage.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <span>${error.message || 'Something went wrong. Please try again or email us at projects@nexofydigital.com'}</span>
        `;
        contactForm.insertBefore(errorMessage, contactForm.firstChild);
        
        console.error('Form submission error:', error);
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-card, .about-text, .contact-form-wrapper').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Stats counter animation
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
};

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat h3');
            stats.forEach(stat => {
                const target = stat.textContent;
                if (!isNaN(target)) {
                    animateCounter(stat, parseInt(target));
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - navbar.offsetHeight - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});

// Console branding
console.log('%c🚀 Nexofy Digital', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%c✨ Professional Digital Solutions', 'color: #8b5cf6; font-size: 14px; font-weight: 600;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #e5e7eb;');
console.log('%c✅ Website loaded successfully', 'color: #10b981; font-size: 12px;');
console.log('%c📧 Contact form: Active with rate limiting', 'color: #6366f1; font-size: 12px;');
console.log('%c🔒 Security: Domain restricted & spam protected', 'color: #8b5cf6; font-size: 12px;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #e5e7eb;');