// Splash Cursor Effect - South African Flag Edition
(function() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  document.body.appendChild(canvas);

  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';

  let width = window.innerWidth;
  let height = window.innerHeight;
  let particles = [];

  // South African Flag Palette
  const colors = [
    '#DE3831', // Red
    '#002395', // Blue
    '#007A4D', // Green
    '#FFB612', // Yellow
    '#000000', // Black
    '#FFFFFF'  // White
  ];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5 + 2; // Reduced size
      this.speedX = Math.random() * 4 - 2; // Reduced spread speed
      this.speedY = Math.random() * 4 - 2; // Reduced spread speed
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.life = 1.0;
      this.decay = Math.random() * 0.01 + 0.01; // Slower decay
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= this.decay;
      this.size *= 0.98; // Slower shrink
    }

    draw() {
      ctx.globalAlpha = this.life;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add a subtle border for white particles on white background
      if (this.color === '#FFFFFF') {
        ctx.strokeStyle = 'rgba(0,0,0,0.1)'; // Fixed typo
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  function handleMouseMove(e) {
    // Create fewer particles for a cleaner look, but more frequent
    for (let i = 0; i < 3; i++) {
      particles.push(new Particle(e.clientX, e.clientY));
    }
  }
  
  // Throttle mouse move slightly for performance
  let isThrottled = false;
  window.addEventListener('mousemove', (e) => {
    if (!isThrottled) {
      handleMouseMove(e);
      isThrottled = true;
      setTimeout(() => isThrottled = false, 10);
    }
  });

  // Splash on click
  window.addEventListener('click', (e) => {
    for (let i = 0; i < 20; i++) {
      particles.push(new Particle(e.clientX, e.clientY));
    }
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      
      if (particles[i].life <= 0 || particles[i].size <= 0.1) {
        particles.splice(i, 1);
        i--;
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
})();