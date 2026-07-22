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

  // Active navigation link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // function highlightNavLink() {
  //   const scrollPosition = window.scrollY;
    
  //   // Highlight "Home" link when the page is near the top (scrollPosition < 50)
  //   if (scrollPosition < 50) {
  //     navLinks.forEach(link => {
  //       link.classList.remove('active');
  //       if (link.getAttribute('href') === '#') {
  //         link.classList.add('active');
  //       }
  //     });
  //   }

  //   // Loop through sections and highlight the link for the currently visible section
  //   sections.forEach(section => {
  //     const sectionTop = section.offsetTop - 100;
  //     const sectionHeight = section.offsetHeight;
  //     const sectionId = section.getAttribute('id');

  //     if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
  //       navLinks.forEach(link => {
  //         link.classList.remove('active');
  //         if (link.getAttribute('href') === `#${sectionId}`) {
  //           link.classList.add('active');
  //         }
  //       });
  //     }
  //   });
  // }

  window.addEventListener('scroll', highlightNavLink);

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

  // Form validation for contact form (if added later)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic form validation
      let isValid = true;
      const formInputs = contactForm.querySelectorAll('input, textarea');

      formInputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          isValid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });

      if (isValid) {
        // Show success message or submit form
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you! Your message has been sent.';
        contactForm.reset();
        contactForm.appendChild(successMessage);

        // Remove message after 3 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 3000);
      }
    });
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
const successMessage = document.getElementById('success-message');
const formContent = document.getElementById('contact-form-content');

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function () {
    if (contactForm) {
        // contactForm.addEventListener('submit', handleFormSubmit);

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

// Submit form
function handleFormSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
        const firstError = contactForm.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
        return;
    }

    const formDataObj = new FormData(contactForm);
    const submissionData = {};
    for (let [key, value] of formDataObj.entries()) {
        submissionData[key] = value;
    }

    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    submitButton.disabled = true;

    // Simulate sending (replace this with EmailJS or API call)
    setTimeout(() => {
        showSuccessMessage();

        setTimeout(() => {
            hideSuccessMessage();
            resetForm();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 3000);
    }, 1000);
}

// Show/hide success message
function showSuccessMessage() {
    formContent.classList.add('hidden');
    successMessage.classList.remove('hidden');
    successMessage.style.opacity = '0';
    successMessage.style.transform = 'translateY(20px)';

    setTimeout(() => {
        successMessage.style.transition = 'all 0.5s ease';
        successMessage.style.opacity = '1';
        successMessage.style.transform = 'translateY(0)';
    }, 100);
}

function hideSuccessMessage() {
    successMessage.style.opacity = '0';
    successMessage.style.transform = 'translateY(-20px)';

    setTimeout(() => {
        successMessage.classList.add('hidden');
        formContent.classList.remove('hidden');
        successMessage.style.opacity = '';
        successMessage.style.transform = '';
        successMessage.style.transition = '';
    }, 500);
}


// WhatsApp button click tracking (optional)
document.querySelector('.whatsapp-float')?.addEventListener('click', function() {
  // You can add analytics tracking here if needed
  console.log('WhatsApp button clicked');
});