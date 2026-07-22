// Toggle navbar background on scroll
const header = document.querySelector('.header');

function toggleHeaderBackground() {
  const scrollThreshold = 150;

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
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add animation classes to elements when they enter viewport
  const animateElements = document.querySelectorAll('.deal-card, .benefit-item, .featured-deal');

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

  // Deal card hover effects
  const dealCards = document.querySelectorAll('.deal-card');
  
  dealCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Featured deal parallax effect
//   const featuredDeal = document.querySelector('.featured-deal');
  
//   if (featuredDeal) {
//     window.addEventListener('scroll', function() {
//       const scrolled = window.pageYOffset;
//       const parallax = featuredDeal.querySelector('.deal-image img');
      
//       if (parallax) {
//         const speed = scrolled * 0.5;
//         parallax.style.transform = `translateY(${speed}px)`;
//       }
//     });
//   }

  // Price animation on scroll
  const priceElements = document.querySelectorAll('.discounted-price');
  
  function animatePrices() {
    priceElements.forEach(price => {
      const rect = price.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible && !price.classList.contains('animated')) {
        price.classList.add('animated');
        
        // Add a subtle pulse animation
        price.style.animation = 'pulse 1s ease-in-out';
        
        setTimeout(() => {
          price.style.animation = '';
        }, 1000);
      }
    });
  }

  window.addEventListener('scroll', animatePrices);
  window.addEventListener('load', animatePrices);

  // Add pulse animation keyframes dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);

  // Countdown timer for deals (optional feature)
  function startCountdown() {
    const countdownElements = document.querySelectorAll('.countdown');
    
    countdownElements.forEach(element => {
      const endDate = new Date('2024-12-31T23:59:59').getTime();
      
      function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate - now;
        
        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
          element.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
          element.innerHTML = 'Deal Expired';
        }
      }
      
      updateCountdown();
      setInterval(updateCountdown, 1000);
    });
  }

  // Initialize countdown if elements exist
  if (document.querySelector('.countdown')) {
    startCountdown();
  }

  // Form validation for contact forms (if any)
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#ef4444';
        } else {
          input.style.borderColor = '';
        }
      });
      
      if (isValid) {
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = 'Thank you! We will contact you soon.';
        successMsg.style.cssText = `
          background: var(--success-color);
          color: white;
          padding: 15px;
          border-radius: 5px;
          margin-top: 15px;
          text-align: center;
        `;
        
        form.appendChild(successMsg);
        form.reset();
        
        setTimeout(() => {
          successMsg.remove();
        }, 3000);
      }
    });
  });
});


// WhatsApp button click tracking (optional)
document.querySelector('.whatsapp-float')?.addEventListener('click', function() {
  // You can add analytics tracking here if needed
  console.log('WhatsApp button clicked');
});