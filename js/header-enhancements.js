/**
 * HiveSmart Header Enhancement Script
 * Adds beautiful scroll effects and interactions
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    setupScrollEffect();
    setupNavHoverEffects();
    setupLogoAnimation();
    setupMobileMenu();
    addParallaxEffect();
  }

  /**
   * Add shrink effect to header on scroll
   */
  function setupScrollEffect() {
    const header = document.querySelector('.header-wrapper');
    if (!header) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      lastScroll = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (lastScroll > 50) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * Add magnetic effect to navigation links
   */
  function setupNavHoverEffects() {
    const navLinks = document.querySelectorAll('.header-nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.cssText = `
          position: absolute;
          background: radial-gradient(circle, rgba(59, 115, 133, 0.2) 0%, transparent 70%);
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border-radius: 8px;
          animation: ripple-animation 0.6s ease-out;
          pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  /**
   * Add entrance animation to logo
   */
  function setupLogoAnimation() {
    const logo = document.querySelector('.header-logo');
    if (!logo) return;

    // Add subtle rotation on page load
    setTimeout(() => {
      logo.style.animation = 'logoEntrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }, 200);
  }

  /**
   * Enhanced mobile menu interactions
   */
  function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu-wrapper');
    const navMenu = document.querySelector('.header-nav-menu-wrapper');
    
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', function() {
      // Add bounce effect
      this.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.style.transform = '';
      }, 100);
    });
  }

  /**
   * Add subtle parallax effect to header
   */
  function addParallaxEffect() {
    const header = document.querySelector('.header-content-wrapper');
    if (!header) return;

    let ticking = false;

    window.addEventListener('mousemove', (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const mouseX = e.clientX / window.innerWidth - 0.5;
          const mouseY = e.clientY / window.innerHeight - 0.5;
          
          // Only apply on desktop
          if (window.innerWidth > 991) {
            header.style.transform = `
              perspective(1000px) 
              rotateX(${mouseY * 2}deg) 
              rotateY(${mouseX * 2}deg)
              translateZ(0)
            `;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
      header.style.transform = '';
    });
  }

})();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-animation {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  @keyframes logoEntrance {
    0% {
      transform: scale(0.8) rotate(-10deg);
      opacity: 0;
    }
    60% {
      transform: scale(1.05) rotate(5deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Selection color */
  ::selection {
    background: rgba(59, 115, 133, 0.2);
    color: #0a1316;
  }
`;
document.head.appendChild(style);
