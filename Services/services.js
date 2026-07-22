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

  

  // --- Slider Functionality ---
  const slides = document.querySelectorAll('.slide');
  const prevButton = document.querySelector('.nav-button.prev');
  const nextButton = document.querySelector('.nav-button.next');
  const sliderDots = document.querySelector('.slider-dots');
  let currentSlide = 0;
  let slideTimeout;

  // Create dots
  if (sliderDots && slides.length > 0) {
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetSlideTimeout();
      });
      sliderDots.appendChild(dot);
    });
  }

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');

    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
    resetSlideTimeout();
  }

  function resetSlideTimeout() {
    clearTimeout(slideTimeout);
    slideTimeout = setTimeout(nextSlide, 6000);
  }

  function initializeSlider() {
    if (slides.length > 0) {
      showSlide(0);
      slideTimeout = setTimeout(nextSlide, 6000);

      if (prevButton) {
        prevButton.addEventListener('click', () => {
          goToSlide(currentSlide - 1);
          resetSlideTimeout();
        });
      }

      if (nextButton) {
        nextButton.addEventListener('click', () => {
          goToSlide(currentSlide + 1);
          resetSlideTimeout();
        });
      }

      const sliderContainer = document.querySelector('.slider-container');
      if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => clearTimeout(slideTimeout));
        sliderContainer.addEventListener('mouseleave', resetSlideTimeout);
      }
    }
  }

  // --- Initialize on page load ---
  window.addEventListener('load', () => {
    // Fade in visible elements on load
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementPosition < windowHeight - 50) {
        element.classList.add('active');
      }
    });

    // Initialize slider
    initializeSlider();
  });
});



// WhatsApp button click tracking (optional)
document.querySelector('.whatsapp-float')?.addEventListener('click', function() {
  // You can add analytics tracking here if needed
  console.log('WhatsApp button clicked');
});