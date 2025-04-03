// Back to top button functionality
const backToTopButton = document.getElementById('backToTop');

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.style.display = 'flex';
  } else {
    backToTopButton.style.display = 'none';
  }
});

// Smooth scroll to top when back to top button is clicked
backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for all navigation links
  document.querySelectorAll('.navbar-nav .nav-link').forEach(navLink => {
    navLink.addEventListener('click', function(e) {
      // Prevent default anchor behavior
      e.preventDefault();
      
      // Get the target section ID
      const targetId = this.getAttribute('href');
      
      // Handle Home link separately
      if (targetId === '#') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      // For other section links
      if (targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Calculate position with offset for fixed navbar
          const offset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
      
      // Close mobile menu after clicking (for Bootstrap 5)
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false
        });
        bsCollapse.hide();
      }
    });
  });

  // Project details modal functionality
  // Show project details modal
  function showDetails(modalId) {
    // Hide all modals first
    document.querySelectorAll('.project-details-modal').forEach(modal => {
      modal.style.display = 'none';
    });
    
    // Show the requested modal
    const modal = document.getElementById(modalId);
    const overlay = document.querySelector('.modal-overlay');
    
    if (modal && overlay) {
      modal.style.display = 'block';
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }

  // Close project details modal
  function closeDetails() {
    document.querySelectorAll('.project-details-modal').forEach(modal => {
      modal.style.display = 'none';
    });
    
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
    
    document.body.style.overflow = '';
  }

  // Set up event listeners for project details
  document.querySelectorAll('[onclick^="showProjectDetails"]').forEach(button => {
    button.addEventListener('click', function() {
      const modalId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
      showDetails(modalId);
    });
  });

  // Close when clicking overlay
  document.querySelector('.modal-overlay')?.addEventListener('click', closeDetails);

  // Close with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeDetails();
    }
  });

  // Close buttons for modals
  document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', closeDetails);
  });

  // Initialize lightbox for certificates if available
  if (typeof lightbox !== 'undefined') {
    lightbox.option({
      'resizeDuration': 200,
      'wrapAround': true,
      'alwaysShowNavOnTouchDevices': true
    });
  }
});

// Section animation on scroll
const sections = document.querySelectorAll('.section');

function checkVisibility() {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - 100) {
      section.classList.add('visible');
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
      section.classList.remove('visible');
    }
  });
}

// Run once on load and then on scroll
window.addEventListener('load', checkVisibility);
window.addEventListener('scroll', checkVisibility);