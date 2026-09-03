/**
 * AURA JEWELS • PARIS — NOIR HAUTE JOAILLERIE CORE JAVASCRIPT
 * Diamond Light Refractions, 3D Parallax & Interactive Solitaire Showcase • Paris Atelier
 */

document.addEventListener('DOMContentLoaded', () => {
  initAtmosphereCanvas();
  initMouseGoldGlow();
  initMouse3DParallax();
  initThumbnailGallery();
  initHeaderAndModals();
  initSearchSystem();
  initMasterpiecesCarousel();
  initCraftsmanshipJourney();
  initMultiColumnParallax();
  initTestimonialsCarousel();
  initNewsletterAndForms();
  initAudioFeedback();
  initVideoPlayback();
  initAuraChatbot();
});

/* ==========================================================================
   1. ATMOSPHERIC DIAMOND FIRE & GOLD SPARKLE CANVAS (#ffc71f GLOW)
   ========================================================================== */
function initAtmosphereCanvas() {
  const canvas = document.getElementById('sparkle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  class DiamondSparkle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = Math.random() * 2.6 + 0.8;
      this.speedY = -(Math.random() * 0.4 + 0.12);
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.7 + 0.3;
      this.alphaSpeed = (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1);
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.025;
      
      // Noir Haute Joaillerie Palette: #ffc71f Royal Gold, Diamond White, Champagne, Amber
      const luxuryPalette = [
        'rgba(255, 199, 31, ',     // #ffc71f Radiant Royal Sun Gold
        'rgba(255, 255, 255, ',    // Pure Diamond White
        'rgba(255, 199, 31, ',     // #ffc71f Royal Gold
        'rgba(245, 226, 179, ',    // Champagne Shimmer
        'rgba(0, 240, 255, ',      // Diamond Cyan Dispersion
        'rgba(255, 199, 31, '      // #ffc71f Intense Gold Glow
      ];
      this.color = luxuryPalette[Math.floor(Math.random() * luxuryPalette.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotSpeed;
      this.alpha += this.alphaSpeed;

      if (this.alpha > 0.9 || this.alpha < 0.15) {
        this.alphaSpeed = -this.alphaSpeed;
      }

      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.x -= (dx / dist) * force * 1.6;
          this.y -= (dy / dist) * force * 1.6;
        }
      }

      if (this.y < -30 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color + Math.max(0, Math.min(1, this.alpha)) + ')';
      
      const s = this.size;
      ctx.beginPath();
      ctx.moveTo(0, -s * 2.4);
      ctx.quadraticCurveTo(0, 0, s * 2.4, 0);
      ctx.quadraticCurveTo(0, 0, 0, s * 2.4);
      ctx.quadraticCurveTo(0, 0, -s * 2.4, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s * 2.4);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, s * 0.75, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, ' + Math.min(1, this.alpha * 1.2) + ')';
      ctx.fill();
      ctx.restore();
    }
  }

  const particleCount = Math.min(50, Math.floor(width / 32));
  for (let i = 0; i < particleCount; i++) {
    particles.push(new DiamondSparkle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   2. INTERACTIVE #ffc71f MOUSE STOP & CLICK BACKGROUND GLOW SYSTEM
   ========================================================================== */
function initMouseGoldGlow() {
  const spotlight = document.getElementById('mouse-gold-spotlight');
  const burstContainer = document.getElementById('mouse-click-burst-container');
  if (!spotlight) return;

  let idleTimer = null;
  let currentX = window.innerWidth / 2;
  let currentY = window.innerHeight / 2;

  // Initialize center
  spotlight.style.left = `${currentX}px`;
  spotlight.style.top = `${currentY}px`;
  spotlight.classList.add('stopped');

  window.addEventListener('mousemove', (e) => {
    currentX = e.clientX;
    currentY = e.clientY;

    spotlight.style.left = `${currentX}px`;
    spotlight.style.top = `${currentY}px`;

    // Moving state: subtle gold glow
    spotlight.classList.remove('stopped');
    spotlight.classList.add('moving');

    // When mouse stops moving: trigger radiant #ffc71f background glow
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      spotlight.classList.remove('moving');
      spotlight.classList.add('stopped');
    }, 110);
  });

  // When mouse leaves window
  document.addEventListener('mouseleave', () => {
    spotlight.classList.remove('moving', 'stopped');
  });

  // On click: spawn #ffc71f radiant ripple shockwave
  window.addEventListener('pointerdown', (e) => {
    if (!burstContainer) return;

    const burst = document.createElement('div');
    burst.className = 'mouse-click-burst';
    burst.style.left = `${e.clientX}px`;
    burst.style.top = `${e.clientY}px`;
    burstContainer.appendChild(burst);

    // Remove ripple after animation completes
    setTimeout(() => {
      burst.remove();
    }, 1300);
  });
}

/* ==========================================================================
   3. SMOOTH 3D MOUSE PARALLAX ON CENTERPIECE SOLITAIRE
   ========================================================================== */
function initMouse3DParallax() {
  const ringWrapper = document.getElementById('solitaire-3d-stage');
  const glowHalo = document.querySelector('.solitaire-lighting-halo');
  if (!ringWrapper) return;

  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let targetTransX = 0;
  let targetTransY = 0;
  let currentTransX = 0;
  let currentTransY = 0;

  window.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 1100) return;

    const normX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    const normY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

    targetRotY = normX * 18;
    targetRotX = -normY * 14;
    targetTransX = normX * 22;
    targetTransY = normY * 16;

    if (glowHalo) {
      glowHalo.style.transform = `translate(calc(-50% + ${normX * 45}px), calc(-50% + ${normY * 35}px)) rotate(${normX * 15}deg)`;
    }
  });

  function renderLoop() {
    if (window.innerWidth >= 1100) {
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;
      currentTransX += (targetTransX - currentTransX) * 0.08;
      currentTransY += (targetTransY - currentTransY) * 0.08;

      ringWrapper.style.transform = `translate3d(${currentTransX}px, ${currentTransY}px, 0) rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;
    } else {
      ringWrapper.style.transform = 'none';
    }
    requestAnimationFrame(renderLoop);
  }
  renderLoop();
}

/* ==========================================================================
   3. 3D SOLITAIRE VIDEO PLAYBACK & CINEMATIC MID-VIDEO TEXT REVEAL
   ========================================================================== */
function initVideoPlayback() {
  const video = document.getElementById('solitaire-video');
  const heroStage = document.getElementById('hero-stage');
  const showcaseLayer = document.querySelector('.gallery-showcase-layer');
  const editorialCapsule = document.querySelector('.floating-editorial-capsule');
  
  if (!video) return;

  let isRevealed = false;
  function revealEditorialText() {
    if (isRevealed) return;
    isRevealed = true;
    if (heroStage) heroStage.classList.add('revealed');
    if (showcaseLayer) showcaseLayer.classList.add('revealed');
    if (editorialCapsule) editorialCapsule.classList.add('revealed');
    
    // Reveal top navbar when hero headings become visible
    const header = document.getElementById('site-header');
    if (header) header.classList.add('revealed');
  }

  // Target timestamp where forward animation finishes (stops right at the peak presentation pose)
  const FORWARD_END_TIMESTAMP = 9.96;

  // Explicitly ensure video plays once and stays on final frame without looping or reversing
  video.loop = false;
  video.currentTime = 0;

  // Trigger text reveal mid-video and stop playback at forward end timestamp
  video.addEventListener('timeupdate', () => {
    if (video.currentTime >= 1.4) {
      revealEditorialText();
    }

    // Stop and lock at the peak forward pose so it does NOT reverse
    if (video.currentTime >= FORWARD_END_TIMESTAMP) {
      video.pause();
      video.currentTime = FORWARD_END_TIMESTAMP;
    }
  });

  // Smooth fallback timer after opening video shine
  setTimeout(revealEditorialText, 2000);

  // Interaction fallback
  ['scroll', 'touchstart', 'click'].forEach(evt => {
    window.addEventListener(evt, revealEditorialText, { once: true });
  });

  // Keep video steady on final frame
  video.addEventListener('ended', () => {
    video.pause();
  });

  video.play().catch(() => {
    document.addEventListener('click', () => video.play(), { once: true });
  });
}

/* ==========================================================================
   4. INTERACTIVE THUMBNAIL GALLERY & 360° VIEW TOGGLE
   ========================================================================== */
function initThumbnailGallery() {
  const thumbCards = document.querySelectorAll('.thumb-card');
  const btn360 = document.getElementById('btn-360-toggle');
  const videoEl = document.getElementById('solitaire-video');
  const photoEl = document.getElementById('solitaire-photo-element');

  if (!thumbCards.length || !videoEl || !photoEl) return;

  function switchTo360() {
    thumbCards.forEach(t => t.classList.remove('active'));
    document.querySelector('.thumb-card[data-view="360"]')?.classList.add('active');
    btn360?.classList.add('active');

    photoEl.style.display = 'none';
    videoEl.style.display = 'block';
    videoEl.play().catch(() => {});
    playAudioClick(750);
  }

  function switchToImage(imgSrc, clickedBtn) {
    thumbCards.forEach(t => t.classList.remove('active'));
    clickedBtn.classList.add('active');
    btn360?.classList.remove('active');

    videoEl.style.display = 'none';
    photoEl.src = imgSrc;
    photoEl.style.display = 'block';
    playAudioClick(820);
  }

  thumbCards.forEach((card) => {
    card.addEventListener('click', () => {
      const view = card.getAttribute('data-view');
      const img = card.getAttribute('data-img');

      if (view === '360') {
        switchTo360();
      } else if (img) {
        switchToImage(img, card);
      }
    });
  });

  btn360?.addEventListener('click', () => {
    switchTo360();
  });
}

/* ==========================================================================
   5. HIGH JEWELRY MASTERPIECES CAROUSEL & CATEGORY FILTERING
   ========================================================================== */
function initMasterpiecesCarousel() {
  const viewport = document.getElementById('gallery-carousel-viewport');
  const track = document.getElementById('gallery-carousel-track');
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  const pagination = document.getElementById('carousel-pagination');
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const allCards = Array.from(document.querySelectorAll('.carousel-slide'));

  if (!viewport || !track || !allCards.length) return;

  let currentIndex = 0;
  let activeFilter = 'all';

  function getVisibleCards() {
    return allCards.filter(card => {
      const cat = card.getAttribute('data-category');
      return activeFilter === 'all' || cat === activeFilter;
    });
  }

  function getVisibleCount() {
    const width = window.innerWidth;
    if (width <= 768) return 1;
    if (width <= 1100) return 2;
    return 3;
  }

  function getSlideWidthWithGap() {
    const visible = getVisibleCards();
    if (!visible.length) return 0;
    const first = visible[0];
    const rect = first.getBoundingClientRect();
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 28;
    return rect.width + gap;
  }

  function getMaxIndex() {
    const visible = getVisibleCards();
    const count = getVisibleCount();
    return Math.max(0, visible.length - count);
  }

  function buildPagination() {
    if (!pagination) return;
    pagination.innerHTML = '';
    const maxIdx = getMaxIndex();
    const totalDots = maxIdx + 1;

    if (totalDots <= 1) {
      pagination.style.display = 'none';
      return;
    }
    pagination.style.display = 'flex';

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${i === currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => {
        playAudioClick(850);
        goToSlide(i);
      });
      pagination.appendChild(dot);
    }
  }

  function updateCarousel() {
    const maxIdx = getMaxIndex();
    currentIndex = Math.max(0, Math.min(currentIndex, maxIdx));

    const step = getSlideWidthWithGap();
    const offset = currentIndex * step;
    track.style.transform = `translateX(-${offset}px)`;

    if (prevBtn) prevBtn.disabled = currentIndex <= 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= maxIdx;

    if (pagination) {
      const dots = pagination.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  prevBtn?.addEventListener('click', () => {
    if (currentIndex > 0) {
      playAudioClick(750);
      goToSlide(currentIndex - 1);
    }
  });

  nextBtn?.addEventListener('click', () => {
    const maxIdx = getMaxIndex();
    if (currentIndex < maxIdx) {
      playAudioClick(850);
      goToSlide(currentIndex + 1);
    }
  });

  // Filter Tabs
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playAudioClick(800);
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      activeFilter = btn.getAttribute('data-filter');

      allCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (activeFilter === 'all' || cat === activeFilter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });

      currentIndex = 0;
      buildPagination();
      updateCarousel();
    });
  });

  // Touch and Mouse Drag Swiping
  let startX = 0;
  let isDragging = false;
  let dragDiff = 0;

  viewport.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    track.style.transition = 'none';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    dragDiff = e.pageX - startX;
    const step = getSlideWidthWithGap();
    const baseOffset = currentIndex * step;
    track.style.transform = `translateX(-${baseOffset - dragDiff}px)`;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';

    if (dragDiff < -50 && currentIndex < getMaxIndex()) {
      goToSlide(currentIndex + 1);
    } else if (dragDiff > 50 && currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      updateCarousel();
    }
    dragDiff = 0;
  });

  // Touch Swipe
  viewport.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
    isDragging = true;
    track.style.transition = 'none';
  }, { passive: true });

  viewport.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    dragDiff = e.touches[0].pageX - startX;
    const step = getSlideWidthWithGap();
    const baseOffset = currentIndex * step;
    track.style.transform = `translateX(-${baseOffset - dragDiff}px)`;
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';

    if (dragDiff < -40 && currentIndex < getMaxIndex()) {
      goToSlide(currentIndex + 1);
    } else if (dragDiff > 40 && currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      updateCarousel();
    }
    dragDiff = 0;
  });

  window.addEventListener('resize', () => {
    buildPagination();
    updateCarousel();
  });

  // Initialize initial state
  buildPagination();
  updateCarousel();
}



/* ==========================================================================
   6.5 SAVOIR-FAIRE & ATELIER MASTERCLASS (AUTO-ADVANCING DUAL STAGE)
   ========================================================================== */
function initCraftsmanshipJourney() {
  const section = document.getElementById('craftsmanship-journey');
  if (!section) return;

  const stageWrapper = document.getElementById('atelier-stage-wrapper');
  const slides = Array.from(section.querySelectorAll('.atelier-slide'));
  const cards = Array.from(section.querySelectorAll('.milestone-card'));
  const counterCurr = document.getElementById('atelier-counter-curr');
  const progressFill = document.getElementById('atelier-progress-fill');
  const progressTrack = section.querySelector('.atelier-progress-track');
  const prevBtn = document.getElementById('btn-atelier-prev');
  const nextBtn = document.getElementById('btn-atelier-next');
  const visualPane = document.getElementById('atelier-visual-pane');

  if (!slides.length || !cards.length) return;

  const totalSteps = Math.min(slides.length, cards.length);
  const STEP_DURATION = 5000; // 5 seconds per step

  let currentIndex = 0;
  let isPaused = false;
  let isVisible = true;
  let stepStartTime = performance.now();
  let elapsedBeforePause = 0;
  let animFrameId = null;

  function setActiveStep(index, triggerAudio = true) {
    currentIndex = (index + totalSteps) % totalSteps;

    // Update slides
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });

    // Update milestone accordion cards
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === currentIndex);
    });

    // Update step counter text (e.g., '01', '02')
    if (counterCurr) {
      counterCurr.textContent = String(currentIndex + 1).padStart(2, '0');
    }

    // Audio click feedback
    if (triggerAudio && typeof playAudioClick === 'function') {
      playAudioClick(620 + currentIndex * 60);
    }

    // Reset progress tracking
    stepStartTime = performance.now();
    elapsedBeforePause = 0;
    if (progressFill) {
      progressFill.style.width = '0%';
    }
  }

  // Animation frame loop for continuous, buttery-smooth progress bar & auto-advance
  function tick(timestamp) {
    if (!isPaused && isVisible) {
      const elapsed = (timestamp - stepStartTime) + elapsedBeforePause;
      const progressRatio = Math.min(1, elapsed / STEP_DURATION);

      if (progressFill) {
        progressFill.style.width = `${(progressRatio * 100).toFixed(2)}%`;
      }

      if (elapsed >= STEP_DURATION) {
        // Shift automatically to next card
        setActiveStep(currentIndex + 1, false);
      }
    }

    animFrameId = requestAnimationFrame(tick);
  }

  // Start progress animation
  stepStartTime = performance.now();
  animFrameId = requestAnimationFrame(tick);

  // Pause / Resume helpers
  function pauseAutoAdvance() {
    if (isPaused) return;
    isPaused = true;
    elapsedBeforePause += performance.now() - stepStartTime;
  }

  function resumeAutoAdvance() {
    if (!isPaused) return;
    isPaused = false;
    stepStartTime = performance.now();
  }

  // Pause on hover over the stage wrapper, resume on mouse leave
  if (stageWrapper) {
    stageWrapper.addEventListener('mouseenter', pauseAutoAdvance);
    stageWrapper.addEventListener('mouseleave', resumeAutoAdvance);
  }

  // Card click interaction
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      setActiveStep(index, true);
    });
  });

  // Prev / Next button navigation
  prevBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveStep(currentIndex - 1, true);
  });

  nextBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveStep(currentIndex + 1, true);
  });

  // Clicking the progress track advances to the next step
  progressTrack?.addEventListener('click', () => {
    setActiveStep(currentIndex + 1, true);
  });

  // Pause when section is scrolled out of view to save performance
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (!isVisible) {
          pauseAutoAdvance();
        } else {
          resumeAutoAdvance();
        }
      });
    }, { threshold: 0.15 });

    observer.observe(section);
  }

  // Touch Swipe Support for Mobile & Tablets on the Visual Pane
  if (visualPane) {
    let touchStartX = 0;
    let touchStartY = 0;

    visualPane.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      pauseAutoAdvance();
    }, { passive: true });

    visualPane.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Ensure horizontal swipe is dominant
      if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          // Swipe Left -> Next
          setActiveStep(currentIndex + 1, true);
        } else {
          // Swipe Right -> Prev
          setActiveStep(currentIndex - 1, true);
        }
      }

      resumeAutoAdvance();
    }, { passive: true });
  }

  // Initialize initial active state
  setActiveStep(0, false);
}

/* ==========================================================================
   6.8 MULTI-COLUMN EDITORIAL PARALLAX SCROLL ENGINE
   ========================================================================== */
function initMultiColumnParallax() {
  const section = document.getElementById('editorial-gallery');
  if (!section) return;

  const cols = Array.from(section.querySelectorAll('.editorial-col'));
  const cards = Array.from(section.querySelectorAll('.ed-card'));

  if (!cols.length) return;

  // Add subtle sound / hover micro-reaction on cards
  cards.forEach((card, idx) => {
    card.addEventListener('mouseenter', () => {
      if (typeof playAudioClick === 'function') {
        playAudioClick(680 + (idx % 4) * 70);
      }
    });
  });

  // Multi-Speed Vertical Parallax Loop
  let isTicking = false;

  function updateColumnParallax() {
    // Disable on mobile and tablets to keep images and columns completely still
    if (window.innerWidth <= 1024) {
      cols.forEach(col => {
        col.style.transform = 'none';
      });
      return;
    }

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;

    // Execute only when section is within or near the visible viewport
    if (rect.bottom > -100 && rect.top < vh + 100) {
      const scrollProgress = (vh - rect.top) / (vh + rect.height); // 0 to 1
      const centerRelative = (scrollProgress - 0.5); // -0.5 to +0.5

      cols.forEach((col, idx) => {
        const defaultSpeed = (idx % 2 === 0) ? 0.14 : -0.14;
        const speed = parseFloat(col.getAttribute('data-speed')) || defaultSpeed;
        const translateY = centerRelative * speed * 200; // in px
        col.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
      });
    }
  }

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        updateColumnParallax();
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateColumnParallax, { passive: true });
  updateColumnParallax();
}

/* ==========================================================================
   7. COLLECTOR TESTIMONIALS CAROUSEL (AUTOMATIC AUTO-PLAY & HOVER-PAUSE)
   ========================================================================== */
function initTestimonialsCarousel() {
  const container = document.getElementById('testimonials-carousel-container');
  const viewport = document.getElementById('testimonials-carousel-viewport');
  const track = document.getElementById('testimonials-carousel-track');
  const prevBtn = document.getElementById('testi-prev-btn');
  const nextBtn = document.getElementById('testi-next-btn');
  const pagination = document.getElementById('testi-pagination');
  const slides = Array.from(document.querySelectorAll('.testimonial-slide'));

  if (!viewport || !track || !slides.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 3000; // 3 seconds per transition

  function getVisibleCount() {
    const width = window.innerWidth;
    if (width <= 768) return 1;
    if (width <= 1100) return 2;
    return 3;
  }

  function getSlideWidthWithGap() {
    if (!slides.length) return 0;
    const first = slides[0];
    const rect = first.getBoundingClientRect();
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 24;
    return rect.width + gap;
  }

  function getMaxIndex() {
    const count = getVisibleCount();
    return Math.max(0, slides.length - count);
  }

  function buildPagination() {
    if (!pagination) return;
    pagination.innerHTML = '';
    const maxIdx = getMaxIndex();
    const totalDots = maxIdx + 1;

    if (totalDots <= 1) {
      pagination.style.display = 'none';
      return;
    }
    pagination.style.display = 'flex';

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${i === currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
      dot.addEventListener('click', () => {
        playAudioClick(850);
        goToSlide(i);
        restartAutoplay();
      });
      pagination.appendChild(dot);
    }
  }

  function updateCarousel() {
    const maxIdx = getMaxIndex();
    if (currentIndex > maxIdx) {
      currentIndex = 0;
    }
    currentIndex = Math.max(0, currentIndex);

    const step = getSlideWidthWithGap();
    const offset = currentIndex * step;
    track.style.transform = `translateX(-${offset}px)`;

    if (pagination) {
      const dots = pagination.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function goToNext() {
    const maxIdx = getMaxIndex();
    if (currentIndex < maxIdx) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(0); // Seamless wrap around to beginning
    }
  }

  function goToPrev() {
    const maxIdx = getMaxIndex();
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(maxIdx);
    }
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      goToNext();
    }, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Hover to pause: When mouse enters the carousel, stop automatically!
  [container, viewport, track].forEach(el => {
    el?.addEventListener('mouseenter', () => {
      stopAutoplay();
    });
    el?.addEventListener('mouseleave', () => {
      startAutoplay();
    });
  });

  prevBtn?.addEventListener('click', () => {
    playAudioClick(750);
    goToPrev();
    restartAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    playAudioClick(850);
    goToNext();
    restartAutoplay();
  });

  // Touch and Mouse Drag Swiping
  let startX = 0;
  let isDragging = false;
  let dragDiff = 0;

  viewport.addEventListener('mousedown', (e) => {
    stopAutoplay();
    isDragging = true;
    startX = e.pageX;
    track.style.transition = 'none';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    dragDiff = e.pageX - startX;
    const step = getSlideWidthWithGap();
    const baseOffset = currentIndex * step;
    track.style.transform = `translateX(-${baseOffset - dragDiff}px)`;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';

    if (dragDiff < -50) {
      goToNext();
    } else if (dragDiff > 50) {
      goToPrev();
    } else {
      updateCarousel();
    }
    dragDiff = 0;
    startAutoplay();
  });

  // Touch Swipe
  viewport.addEventListener('touchstart', (e) => {
    stopAutoplay();
    startX = e.touches[0].pageX;
    isDragging = true;
    track.style.transition = 'none';
  }, { passive: true });

  viewport.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    dragDiff = e.touches[0].pageX - startX;
    const step = getSlideWidthWithGap();
    const baseOffset = currentIndex * step;
    track.style.transform = `translateX(-${baseOffset - dragDiff}px)`;
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';

    if (dragDiff < -40) {
      goToNext();
    } else if (dragDiff > 40) {
      goToPrev();
    } else {
      updateCarousel();
    }
    dragDiff = 0;
    startAutoplay();
  });

  window.addEventListener('resize', () => {
    buildPagination();
    updateCarousel();
  });

  buildPagination();
  updateCarousel();
  startAutoplay(); // Start automatic sliding
}
function initNewsletterAndForms() {
  const newsletterForm = document.getElementById('newsletter-form');
  const inpageSalonForm = document.getElementById('salon-inpage-form');

  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    playAudioClick(950);
    const submitBtn = newsletterForm.querySelector('.btn-newsletter-submit');
    if (submitBtn) {
      const orig = submitBtn.textContent;
      submitBtn.textContent = '✓ INVITATION SENT';
      submitBtn.style.background = 'linear-gradient(135deg, #00D084 0%, #008850 100%)';
      submitBtn.style.color = '#FFFFFF';
      setTimeout(() => {
        submitBtn.textContent = orig;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
        newsletterForm.reset();
      }, 2500);
    }
  });

  inpageSalonForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    playAudioClick(950);
    const submitBtn = inpageSalonForm.querySelector('.btn-confirm-appointment');
    if (submitBtn) {
      const orig = submitBtn.textContent;
      submitBtn.textContent = '✓ PRIVATE VIEWING CONFIRMED';
      submitBtn.style.background = 'linear-gradient(135deg, #00D084 0%, #008850 100%)';
      submitBtn.style.color = '#FFFFFF';
      setTimeout(() => {
        submitBtn.textContent = orig;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
        inpageSalonForm.reset();
      }, 2800);
    }
  });
}

/* ==========================================================================
   9. LUXURY WEB AUDIO API MICRO-FEEDBACK
   ========================================================================== */
let audioCtx = null;
function initAudioFeedback() {
  const unlockAudio = () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('touchstart', unlockAudio);
  };
  window.addEventListener('click', unlockAudio, { once: true });
  window.addEventListener('touchstart', unlockAudio, { once: true });
}

function playAudioClick(freq = 680, type = 'sine') {
  if (!audioCtx) return;
  try {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.45, audioCtx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.04);
  } catch (e) {
    // Graceful fallback
  }
}

/* ==========================================================================
   10. HEADER SCROLL, MENU & ATELIER BOOKING MODAL
   ========================================================================== */
function initHeaderAndModals() {
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled', 'revealed');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  /* ---------------- Mobile Navigation Drawer ---------------- */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('mobile-drawer-backdrop');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link, .btn-drawer-salon');

  function openDrawer() {
    playAudioClick(880);
    mobileDrawer?.classList.add('active');
    drawerBackdrop?.classList.add('active');
    mobileDrawer?.setAttribute('aria-hidden', 'false');
    drawerBackdrop?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    playAudioClick(460);
    mobileDrawer?.classList.remove('active');
    drawerBackdrop?.classList.remove('active');
    mobileDrawer?.setAttribute('aria-hidden', 'true');
    drawerBackdrop?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  mobileMenuBtn?.addEventListener('click', openDrawer);
  drawerCloseBtn?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  /* ---------------- Atelier Booking Modal ---------------- */
  const modal = document.getElementById('atelier-booking-modal');
  const openBtns = [
    document.getElementById('btn-book-nav'),
    document.getElementById('btn-drawer-salon'),
    document.getElementById('btn-footer-salon'),
    document.getElementById('btn-salon-hero'),
    document.getElementById('btn-inquire-hero'),
    ...document.querySelectorAll('.btn-product-inquire')
  ].filter(Boolean);
  const closeBtn = document.getElementById('modal-close-btn');
  const form = document.getElementById('atelier-booking-form');

  openBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (href === '#salon' && !btn.classList.contains('btn-product-inquire')) {
        // Allow smooth scroll to salon or open modal
      }
      playAudioClick(850);
      modal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    playAudioClick(420);
    modal?.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileDrawer?.classList.contains('active')) {
        closeDrawer();
      }
      if (modal?.classList.contains('active')) {
        closeModal();
      }
    }
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    playAudioClick(950);
    const submitBtn = form.querySelector('.btn-confirm-appointment');
    if (submitBtn) {
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '✓ APPOINTMENT CONFIRMED';
      submitBtn.style.background = 'linear-gradient(135deg, #00D084 0%, #008850 100%)';
      submitBtn.style.color = '#FFFFFF';
      setTimeout(() => {
        closeModal();
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
        form.reset();
      }, 1600);
    }
  });

  // Sound feedback on interactive buttons, cards & nav links
  document.querySelectorAll('.nav-icon-btn, .mobile-menu-btn, .drawer-nav-link, .thumb-card, .btn-360-toggle, .nav-link, .filter-tab-btn, .btn-product-inquire, .suggested-card, .handcrafted-pill').forEach(el => {
    el.addEventListener('mouseenter', () => playAudioClick(900));
  });
}

/* ==========================================================================
   11. SEARCH SYSTEM: LIVE TYPEWRITER "SEARCHING..." ANIMATION & VAULT SEARCH
   ========================================================================== */
function initSearchSystem() {
  const searchWrapper = document.getElementById('nav-search-wrapper');
  const searchBtn = document.getElementById('btn-search-nav');
  const searchInput = document.getElementById('search-real-input');
  const searchClear = document.getElementById('search-clear-btn');
  const typingTextEl = document.getElementById('typing-text');
  const searchDisplay = document.getElementById('search-typing-display');
  const dropdown = document.getElementById('search-dropdown-menu');
  const resultsList = document.getElementById('search-results-list');
  const quickTags = document.querySelectorAll('.quick-tag-btn');

  if (!searchBtn || !searchInput) return;

  const typingPhrases = [
    "Searching...",
    "Searching Solitaires...",
    "Searching Flawless Diamonds...",
    "Searching 18K Royal Gold...",
    "Searching Place Vendôme...",
    "Searching Muzo Emeralds...",
    "Searching Kashmir Sapphires..."
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimer = null;
  let isTypingActive = false;

  function runTypewriter() {
    if (!isTypingActive) return;

    const currentPhrase = typingPhrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    if (typingTextEl) {
      typingTextEl.textContent = currentPhrase.substring(0, charIndex);
    }

    let typeSpeed = isDeleting ? 38 : 75;

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 1600; // Pause at end of phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % typingPhrases.length;
      typeSpeed = 350; // Pause before typing next phrase
    }

    typingTimer = setTimeout(runTypewriter, typeSpeed);
  }

  function startTyping() {
    if (typingTimer) clearTimeout(typingTimer);
    isTypingActive = true;
    phraseIndex = 0;
    charIndex = 0;
    isDeleting = false;
    runTypewriter();
  }

  function stopTyping() {
    isTypingActive = false;
    if (typingTimer) clearTimeout(typingTimer);
  }

  function openSearch() {
    playAudioClick(880);
    searchWrapper.classList.add('active');
    searchInput.value = '';
    if (searchDisplay) {
      searchDisplay.style.display = 'flex';
      searchDisplay.style.opacity = '1';
    }
    dropdown?.classList.add('open');
    searchInput.focus();
    startTyping();
    renderSearchResults('');
  }

  function closeSearch() {
    playAudioClick(440);
    searchWrapper.classList.remove('active');
    dropdown?.classList.remove('open');
    stopTyping();
    searchInput.blur();
  }

  searchBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (searchWrapper.classList.contains('active')) {
      closeSearch();
    } else {
      openSearch();
    }
  });

  searchClear.addEventListener('click', (e) => {
    e.stopPropagation();
    if (searchInput.value.trim().length > 0) {
      searchInput.value = '';
      if (searchDisplay) searchDisplay.style.opacity = '1';
      renderSearchResults('');
      searchInput.focus();
    } else {
      closeSearch();
    }
  });

  searchInput.addEventListener('input', (e) => {
    const val = e.target.value;
    if (val.length > 0) {
      if (searchDisplay) searchDisplay.style.opacity = '0';
    } else {
      if (searchDisplay) searchDisplay.style.opacity = '1';
    }
    renderSearchResults(val);
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (searchWrapper.classList.contains('active') && !searchWrapper.contains(e.target)) {
      closeSearch();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchWrapper.classList.contains('active')) {
      closeSearch();
    }
  });

  // Quick tag chips click
  quickTags.forEach(tag => {
    tag.addEventListener('click', (e) => {
      e.stopPropagation();
      const q = tag.getAttribute('data-query');
      searchInput.value = q;
      if (searchDisplay) searchDisplay.style.opacity = '0';
      searchInput.focus();
      renderSearchResults(q);
      playAudioClick(760);
    });
  });

  // Masterpiece catalog dataset for instant search
  const products = [
    {
      title: "La Couronne d'Or Ring",
      sub: "Haute Joaillerie Solitaire",
      price: "$185,000",
      specs: "3.20 ct D-Flawless • 18K Royal Gold",
      img: "images/thumb_angle.png",
      category: "solitaires"
    },
    {
      title: "Lumière Éternelle Necklace",
      sub: "Cascading Diamond High Jewelry",
      price: "$420,000",
      specs: "24.50 ct Pear Diamonds • 18K Gold",
      img: "images/necklace_fire.jpg",
      category: "necklaces"
    },
    {
      title: "Cascade Céleste Earrings",
      sub: "Chandelier Drop Earrings",
      price: "$145,000",
      specs: "8.40 ct D-E VVS Diamonds • 18K Royal Gold",
      img: "images/earrings_solitaire.jpg",
      category: "earrings"
    },
    {
      title: "Le Bracelet Impérial",
      sub: "Emerald Cut Diamond Bracelet",
      price: "$210,000",
      specs: "14.20 ct Emerald Cuts • 18K Yellow Gold",
      img: "images/bracelet_haute.jpg",
      category: "bracelets"
    },
    {
      title: "Émeraude Royale Ring",
      sub: "Muzo Colombian Emerald",
      price: "$295,000",
      specs: "5.50 ct Vivid Green Emerald • 2.10 ct Diamonds",
      img: "images/gem_emerald.jpg",
      category: "gems"
    },
    {
      title: "Saphir de Cachemire Ring",
      sub: "Royal Velvet Kashmir Sapphire",
      price: "$340,000",
      specs: "6.10 ct Kashmir Sapphire • Dual Diamond Halo",
      img: "images/gem_sapphire.jpg",
      category: "gems"
    }
  ];

  function renderSearchResults(query) {
    if (!resultsList) return;
    const cleanQ = query.trim().toLowerCase();
    
    let filtered = products;
    if (cleanQ) {
      filtered = products.filter(p => 
        p.title.toLowerCase().includes(cleanQ) ||
        p.sub.toLowerCase().includes(cleanQ) ||
        p.specs.toLowerCase().includes(cleanQ) ||
        p.category.toLowerCase().includes(cleanQ)
      );
    }

    if (filtered.length === 0) {
      resultsList.innerHTML = `
        <div class="search-empty-state">
          <span>✦ No masterpieces found for "${query}"</span>
          <p>Contact our Place Vendôme atelier for bespoke acquisitions.</p>
        </div>
      `;
      return;
    }

    resultsList.innerHTML = filtered.map(item => `
      <div class="search-result-item" data-category="${item.category}" data-title="${item.title}">
        <img src="${item.img}" alt="${item.title}" class="search-res-thumb" />
        <div class="search-res-info">
          <div class="search-res-title">${item.title}</div>
          <div class="search-res-specs">${item.specs}</div>
        </div>
        <div class="search-res-price">${item.price}</div>
      </div>
    `).join('');

    // Attach click events on results
    resultsList.querySelectorAll('.search-result-item').forEach(itemEl => {
      itemEl.addEventListener('click', () => {
        const cat = itemEl.getAttribute('data-category');
        const title = itemEl.getAttribute('data-title');
        closeSearch();
        playAudioClick(920);

        // Switch collection filter tab if appropriate
        const tab = document.querySelector(`.filter-tab-btn[data-filter="${cat}"]`) || document.querySelector('.filter-tab-btn[data-filter="all"]');
        tab?.click();

        // Smooth scroll to target card and trigger golden spotlight flash
        const targetCard = Array.from(document.querySelectorAll('.product-card')).find(c => {
          return c.querySelector('.product-title')?.textContent.includes(title);
        });

        if (targetCard) {
          setTimeout(() => {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetCard.classList.add('card-highlight-flash');
            setTimeout(() => {
              targetCard.classList.remove('card-highlight-flash');
            }, 2400);
          }, 150);
        } else {
          document.getElementById('high-jewelry')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
}

/* ==========================================================================
   15. MAISON AURA AI GEMOLOGICAL CONCIERGE CHATBOT
   ========================================================================== */
function initAuraChatbot() {
  const triggerBtn = document.getElementById('chatbot-trigger-btn');
  const chatWindow = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close-btn');
  const resetBtn = document.getElementById('chatbot-reset-btn');
  const unreadDot = document.getElementById('chatbot-unread-dot');
  const messagesContainer = document.getElementById('chatbot-messages');
  const typingIndicator = document.getElementById('chatbot-typing-indicator');
  const form = document.getElementById('chatbot-input-form');
  const input = document.getElementById('chatbot-user-input');
  const chipBtns = document.querySelectorAll('.chat-chip');

  if (!triggerBtn || !chatWindow || !form || !input) return;

  function toggleChatbot() {
    playAudioClick(850);
    const isOpen = chatWindow.classList.toggle('active');
    if (isOpen) {
      if (unreadDot) unreadDot.style.display = 'none';
      input.focus();
    }
  }

  function closeChatbot() {
    playAudioClick(700);
    chatWindow.classList.remove('active');
  }

  function resetChatbot() {
    playAudioClick(750);
    messagesContainer.innerHTML = `
      <div class="chat-msg chat-msg-bot">
        <div class="msg-avatar">⚜</div>
        <div class="msg-bubble">
          <p>Bonjour. Conversation refreshed. How may I guide your haute joaillerie journey today?</p>
          <span class="msg-timestamp">Just now</span>
        </div>
      </div>
    `;
  }

  triggerBtn.addEventListener('click', toggleChatbot);
  closeBtn?.addEventListener('click', closeChatbot);
  resetBtn?.addEventListener('click', resetChatbot);

  // Quick Chips Click
  chipBtns.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) {
        input.value = prompt;
        sendMessage(prompt);
      }
    });
  });

  // Handle Form Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    sendMessage(text);
  });

  function formatTime() {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function appendUserMessage(text) {
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-msg chat-msg-user';
    msgEl.innerHTML = `
      <div class="msg-bubble">
        <p>${escapeHtml(text)}</p>
        <span class="msg-timestamp">${formatTime()}</span>
      </div>
    `;
    messagesContainer.appendChild(msgEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function appendBotMessage(htmlContent) {
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-msg chat-msg-bot';
    msgEl.innerHTML = `
      <div class="msg-avatar">⚜</div>
      <div class="msg-bubble">
        ${htmlContent}
        <span class="msg-timestamp">${formatTime()}</span>
      </div>
    `;
    messagesContainer.appendChild(msgEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Attach click listeners on dynamic action links in message
    msgEl.querySelectorAll('.chat-salon-open-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeChatbot();
        document.getElementById('btn-book-nav')?.click();
      });
    });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function showTyping() {
    if (typingIndicator) typingIndicator.style.display = 'flex';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function hideTyping() {
    if (typingIndicator) typingIndicator.style.display = 'none';
  }

  function sendMessage(userText) {
    appendUserMessage(userText);
    input.value = '';
    playAudioClick(900);

    showTyping();

    // Natural bot response delay
    const delay = Math.random() * 400 + 600;
    setTimeout(() => {
      hideTyping();
      const responseHtml = generateConciergeResponse(userText);
      appendBotMessage(responseHtml);
      playAudioClick(1100);
    }, delay);
  }

  function generateConciergeResponse(query) {
    const q = query.toLowerCase();

    // 1. 4Cs / Diamonds / Carat / Type IIa
    if (q.includes('4c') || q.includes('carat') || q.includes('clarity') || q.includes('color') || q.includes('cut') || q.includes('type iia')) {
      return `
        <p>At Maison Aura, our solitaires strictly adhere to the highest <strong>Haute Joaillerie Protocol</strong>:</p>
        <p>• <strong>Type IIa Diamonds</strong>: The purest 1–2% of natural diamonds with zero nitrogen impurities.<br>
        • <strong>D-Flawless</strong>: Perfectly colorless and microscopically clean.<br>
        • <strong>Triple Excellent Cut</strong>: Engineered for maximum optical dispersion and rainbow fire.</p>
        <a href="#craftsmanship-journey" class="chat-action-link">✦ Explore Place Vendôme Atelier →</a>
      `;
    }

    // 2. Bespoke Commission / Custom
    if (q.includes('bespoke') || q.includes('custom') || q.includes('commission') || q.includes('design') || q.includes('create') || q.includes('sketch')) {
      return `
        <p>Our <strong>Haute Couture Bespoke Experience</strong> takes 6 to 8 weeks in our Place Vendôme atelier:</p>
        <p>1. 1-on-1 consultation & gouache watercolor sketching<br>
        2. Mine-to-finger gemological stone scouting<br>
        3. Master Parisian wax carving & micro-pavé hand setting<br>
        4. French Eagle hallmark & insured global delivery</p>
        <a href="#salon" class="chat-action-link chat-salon-open-btn">⚜ Inquire with Private Salon →</a>
      `;
    }

    // 3. Salon Appointment / Visit / Flagships / Paris / Geneva / London
    if (q.includes('salon') || q.includes('appointment') || q.includes('book') || q.includes('visit') || q.includes('paris') || q.includes('geneva') || q.includes('london') || q.includes('dubai') || q.includes('location')) {
      return `
        <p>Private appointments are available in our global VIP salons:</p>
        <p>📍 <strong>Place Vendôme, Paris</strong> • <strong>Geneva</strong> • <strong>London</strong> • <strong>Dubai</strong>, or via our <strong>Encrypted 4K Video Suite</strong>.</p>
        <a href="#salon" class="chat-action-link chat-salon-open-btn">📅 Reserve Private Salon →</a>
      `;
    }

    // 4. Solitaire Rings / Products / Recommendations / Emerald / Necklace
    if (q.includes('ring') || q.includes('solitaire') || q.includes('necklace') || q.includes('emerald') || q.includes('earring') || q.includes('recommend') || q.includes('collection') || q.includes('buy') || q.includes('shop')) {
      return `
        <p>Our featured masterpiece is <strong>La Couronne d'Or</strong> (5.20ct Type IIa D-Flawless solitaire in 18K Royal Ethical Gold).</p>
        <p>We also feature the <strong>Muzo Emerald Royale</strong> (6.40ct untreated Colombian emerald) and the <strong>Prismatic Luminescence Collar</strong>.</p>
        <a href="#high-jewelry" class="chat-action-link">✨ View Curated Masterpieces →</a>
      `;
    }

    // 5. Pricing / Cost / Investment
    if (q.includes('price') || q.includes('cost') || q.includes('worth') || q.includes('invest') || q.includes('euro') || q.includes('dollar') || q.includes('eur')) {
      return `
        <p>Maison Aura pieces are heirloom investment-grade assets:</p>
        <p>Solitaire rings start from <strong>€48,000</strong>, high jewelry suites from <strong>€140,000</strong>, and bespoke commissions are tailored to your private capital allocation.</p>
        <p>Each piece is accompanied by full GIA and Swiss Gemmological Institute dossiers.</p>
      `;
    }

    // 6. Ethical Gold / Kimberley Process / Sustainability / Warranty
    if (q.includes('ethical') || q.includes('gold') || q.includes('kimberley') || q.includes('clean') || q.includes('warranty') || q.includes('care') || q.includes('repair')) {
      return `
        <p>Every creation is backed by our <strong>Lifetime Maison Warranty</strong>:</p>
        <p>• 100% certified Fairmined recycled 18K Royal Ethical Gold.<br>
        • 100% Kimberley Process compliant, audited conflict-free diamonds.<br>
        • Complimentary annual ultrasonic cleaning & insured valuation updates.</p>
        <a href="#heritage" class="chat-action-link">🏛️ Learn About Maison Heritage →</a>
      `;
    }

    // 7. Greetings
    if (q.includes('bonjour') || q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('good morning') || q.includes('good evening')) {
      return `
        <p>Bonjour! It is a pleasure to welcome you to Maison Aura Jewels Paris.</p>
        <p>Are you exploring engagement solitaires, high jewelry necklaces, or considering a bespoke commission for an upcoming celebration?</p>
      `;
    }

    // Default Fallback
    return `
      <p>Thank you for inquiring with Maison Aura. Our Master Gemologist can prepare a private gemological dossier for you.</p>
      <p>Would you like to reserve a private salon viewing or explore our current curated vault?</p>
      <a href="#salon" class="chat-action-link chat-salon-open-btn">✦ Connect with Concierge →</a>
    `;
  }
}


