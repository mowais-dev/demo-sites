// Celestia Smiles - Interactive Web Application with Native Boomerang Video Loop
document.addEventListener('DOMContentLoaded', () => {
  const toothVideo = document.getElementById('tooth-video');
  const videoWrapper = document.getElementById('video-wrapper');
  const watermarkBg = document.getElementById('hero-watermark');
  const scheduleBtn = document.getElementById('btn-schedule');

  // Video Autoplay setup
  if (toothVideo) {
    toothVideo.play().catch(err => {
      console.log('Autoplay muted playback active:', err);
    });
  }

  // Mouse 3D Parallax Effect with -30 degree rotation and refined size over expanded left text
  if (videoWrapper && watermarkBg) {
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;
    });

    function animateParallax() {
      targetX += (mouseX - targetX) * 0.06;
      targetY += (mouseY - targetY) * 0.06;

      // Watermark text moves subtly in background
      watermarkBg.style.transform = `translate3d(${targetX * 14}px, ${targetY * 10}px, 0)`;

      // Refined Overlay Video rotated -30deg over expanded headline text with 3D mouse parallax
      videoWrapper.style.transform = `translate(calc(-50% + ${-targetX * 24}px), calc(-50% + ${-targetY * 18}px)) rotate(-30deg) rotateY(${targetX * 6}deg) rotateX(${-targetY * 6}deg)`;

      requestAnimationFrame(animateParallax);
    }

    animateParallax();
  }

  // Button Click Handler
  if (scheduleBtn) {
    scheduleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('✨ Visit Scheduled! Our Celestia Smiles team will contact you shortly.');
    });
  }

  // Custom Toast Notification
  function showToast(message) {
    const existing = document.querySelector('.custom-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = `
      <div style="
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: #031b4e;
        color: #ffffff;
        padding: 0.9rem 1.6rem;
        border-radius: 50px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.95rem;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(2, 132, 199, 0.4);
        z-index: 9999;
        animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      ">
        ${message}
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.5s ease';
      setTimeout(() => toast.remove(), 500);
    }, 3500);
  }
});
