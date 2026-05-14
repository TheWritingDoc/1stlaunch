// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navBar = document.querySelector('.nav-bar');
  if(menuToggle && navBar) {
    menuToggle.addEventListener('click', () => {
      const isVisible = navBar.classList.contains('active');
      if (isVisible) {
        navBar.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
      } else {
        navBar.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.textContent = '✕';
      }
    });
  }

  // Scroll Reveal Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

  // Magnetic Button Effect
  const magneticBtns = document.querySelectorAll('.btn, .menu-toggle, .stat, .link-card, .service-card');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Magnetic strength
      const strength = 15;
      
      btn.style.transform = `translate(${x / strength}px, ${y / strength}px) scale(1.02)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0) scale(1)';
    });
  });
});
