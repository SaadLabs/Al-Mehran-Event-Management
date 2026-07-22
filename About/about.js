






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

  // Statistics Counter Animation
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Animation speed

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const increment = target / speed;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          setTimeout(updateCounter, 10);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  // Elements to animate on scroll
  const animatedElements = document.querySelectorAll(
    '.mission-card, .team-card, .timeline-item, .award-card, .process-step, .kitchen-image'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        
        // Trigger counter animation when stats section is visible
        if (entry.target.closest('.stats-section')) {
          animateCounters();
        }
      }
    });
  }, observerOptions);

  // Observe animated elements
  animatedElements.forEach(element => {
    observer.observe(element);
  });

  // Special observer for stats section
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target); // Only animate once
        }
      });
    }, observerOptions);

    statsObserver.observe(statsSection);
  }

  // Timeline items alternate animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(timelineItems).indexOf(entry.target);
        if (index % 2 === 0) {
          entry.target.classList.add('fade-in-left');
        } else {
          entry.target.classList.add('fade-in-right');
        }
      }
    });
  }, observerOptions);

  timelineItems.forEach(item => {
    timelineObserver.observe(item);
  });

  // Team card hover effects
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Kitchen gallery lightbox effect (simple version)
  const kitchenImages = document.querySelectorAll('.kitchen-img');
  kitchenImages.forEach(img => {
    img.addEventListener('click', function() {
      // Create simple modal
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        cursor: pointer;
      `;

      const modalImg = document.createElement('img');
      modalImg.src = this.src;
      modalImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 10px;
      `;

      modal.appendChild(modalImg);
      document.body.appendChild(modal);

      // Close modal on click
      modal.addEventListener('click', function() {
        document.body.removeChild(modal);
      });

      // Close modal on escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          if (document.body.contains(modal)) {
            document.body.removeChild(modal);
          }
        }
      });
    });
  });

  // Active navigation link on scroll
  // const sections = document.querySelectorAll('section[id]');
  // const navLinks = document.querySelectorAll('.nav-link');
  
  // function highlightNavLink() {
  //   const scrollPosition = window.scrollY;
    
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

  // REMOVED: Parallax effect that was causing the white gap
  // The parallax effect on the hero section was causing the gap issue
  // by applying translateY transforms that created space between sections

  // Awards card tilt effect
  const awardCards = document.querySelectorAll('.award-card');
  awardCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // Loading animation for images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '0';
      this.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        this.style.opacity = '1';
      }, 100);
    });
  });

  // Initialize animations for elements already in view
  const elementsInView = document.querySelectorAll('.mission-card, .process-step');
  elementsInView.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      element.classList.add('fade-in-up');
    }
  });
});

// Utility function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Throttle function for scroll events
function throttle(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
  // Additional scroll-based animations can be added here
}, 16)); // ~60fps


// WhatsApp button click tracking (optional)
document.querySelector('.whatsapp-float')?.addEventListener('click', function() {
  // You can add analytics tracking here if needed
  console.log('WhatsApp button clicked');
});