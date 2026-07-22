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



// WhatsApp button click tracking (optional)
document.querySelector('.whatsapp-float')?.addEventListener('click', function() {
  // You can add analytics tracking here if needed
  console.log('WhatsApp button clicked');
});