// Toggle navbar background on scroll
const header = document.querySelector('.header');

function toggleHeaderBackground() {
  const scrollThreshold = 150; // about 2 scrolls or more

  if (window.scrollY > scrollThreshold) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}


window.addEventListener('scroll', toggleHeaderBackground);
window.addEventListener('load', toggleHeaderBackground);


document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      
      // Toggle menu icon
      const menuIcon = menuToggle.querySelector('i');
      if (menuIcon.classList.contains('ri-menu-line')) {
        menuIcon.classList.remove('ri-menu-line');
        menuIcon.classList.add('ri-close-line');
      } else {
        menuIcon.classList.remove('ri-close-line');
        menuIcon.classList.add('ri-menu-line');
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      // Close mobile nav if open
      if (nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        if (menuToggle) {
          const menuIcon = menuToggle.querySelector('i');
          menuIcon.classList.remove('ri-close-line');
          menuIcon.classList.add('ri-menu-line');
        }
      }

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
      }
    });
  });

  // Add animation classes to elements when they enter viewport
  const animateElements = document.querySelectorAll('.service-card, .testimonial-card');

  function checkIfInView() {
    const windowHeight = window.innerHeight;
    const windowTopPosition = window.scrollY;
    const windowBottomPosition = windowTopPosition + windowHeight;

    animateElements.forEach(element => {
      const elementHeight = element.offsetHeight;
      const elementTopPosition = element.offsetTop;
      const elementBottomPosition = elementTopPosition + elementHeight;

      // Check if element is in view
      if (
        elementBottomPosition >= windowTopPosition &&
        elementTopPosition <= windowBottomPosition
      ) {
        element.classList.add('fade-in');
      }
    });
  }

  window.addEventListener('scroll', checkIfInView);
  window.addEventListener('load', checkIfInView);
  window.addEventListener('resize', checkIfInView);

  // Initial check for elements in view
  checkIfInView();

  // ✅ Show success message if redirected back after FormSubmit
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('sent') === '1') {
    const formContent = document.getElementById('contact-form-content');
    const successMessage = document.getElementById('success-message');
    if (formContent && successMessage) {
      formContent.style.display = 'none';
      successMessage.classList.remove('hidden');
      successMessage.style.opacity = '0';
      successMessage.style.transform = 'translateY(20px)';
      setTimeout(() => {
        successMessage.style.transition = 'all 0.5s ease';
        successMessage.style.opacity = '1';
        successMessage.style.transform = 'translateY(0)';
      }, 100);
      // Scroll to form area
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});



// Contact Section

// Global contact form variables
let formData = {
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guests: '',
    message: ''
};
let errors = {};

// DOM elements
const contactForm = document.getElementById('contactForm');

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function () {
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    }
});

// Form validation
function validateField(field) {
    const name = field.name;
    const value = field.value.trim();
    let error = '';

    switch (name) {
        case 'name':
            error = !value ? 'Name is required' : value.length < 2 ? 'Name must be at least 2 characters' : '';
            break;
        case 'email':
            error = !value ? 'Email is required' : !isValidEmail(value) ? 'Please enter a valid email address' : '';
            break;
        case 'phone':
            error = !value ? 'Phone number is required' : !isValidPhone(value) ? 'Please enter a valid phone number' : '';
            break;
        case 'eventType':
            error = !value ? 'Please select an event type' : '';
            break;
        case 'message':
            error = !value ? 'Message is required' : value.length < 10 ? 'Message must be at least 10 characters' : '';
            break;
    }

    displayFieldError(field, error);
    errors[name] = error;
    return !error;
}

function clearFieldError(field) {
    if (errors[field.name]) {
        displayFieldError(field, '');
        errors[field.name] = '';
    }
}

function displayFieldError(field, error) {
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = error;
    }
    field.classList.toggle('error', !!error);
}

function validateForm() {
    const requiredFields = ['name', 'email', 'phone', 'eventType', 'message'];
    let isValid = true;

    requiredFields.forEach(fieldName => {
        const field = contactForm.querySelector(`[name="${fieldName}"]`);
        if (field && !validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

// Validation helpers
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
}


// WhatsApp button click tracking (optional)
document.querySelector('.whatsapp-float')?.addEventListener('click', function() {
  console.log('WhatsApp button clicked');
});