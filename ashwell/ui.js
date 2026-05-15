// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  // Global dropdown navigation for all pages (always visible)
  const quickBar = document.querySelector('.quick-access-bar');
  if (quickBar) {
    const links = [...quickBar.querySelectorAll('a[href]')].map(a => ({
      href: a.getAttribute('href'),
      text: a.textContent.trim()
    }));

    const navWrap = document.createElement('div');
    navWrap.className = 'site-dropdown-nav';

    const label = document.createElement('label');
    label.className = 'dropdown-nav-label';
    label.setAttribute('for', 'site-page-select');
    label.textContent = 'Navigate';

    const select = document.createElement('select');
    select.id = 'site-page-select';
    select.className = 'site-page-select';
    select.setAttribute('aria-label', 'Navigate to page');

    links.forEach(link => {
      const option = document.createElement('option');
      option.value = link.href;
      option.textContent = link.text;
      select.appendChild(option);
    });

    const current = (window.location.pathname.split('/').pop() || 'index.html');
    const exact = [...select.options].find(o => o.value === current);
    if (exact) select.value = current;

    select.addEventListener('change', () => {
      if (select.value) window.location.href = select.value;
    });

    navWrap.appendChild(label);
    navWrap.appendChild(select);

    const main = document.querySelector('main.container');
    if (main) {
      main.parentNode.insertBefore(navWrap, main);
    }
  }

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
