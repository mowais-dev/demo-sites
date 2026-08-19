/**
 * Celestia Smiles - Master Interactive Script
 * Handles Hero Video Parallax, Services Expanding Accordion,
 * Specialists Carousel Slider, Stats Counter, Calculator & Booking Modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Mobile Hamburger Menu Toggle
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburgerBtn.classList.toggle('active');
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     2. Full-Page 1-Gesture Section Switcher (One Wheel / Swipe = One Section)
     ========================================================================== */
  const sectionList = Array.from(document.querySelectorAll('.hero-container, .about-us-section, .services-section, .specialists-section, .testimonials-section, .booking-section, .footer'));
  let currentSectionIdx = 0;
  let isSectionScrolling = false;
  const SCROLL_LOCK_MS = 850;

  function goToSection(index) {
    if (index < 0 || index >= sectionList.length) return;
    currentSectionIdx = index;
    isSectionScrolling = true;

    sectionList[currentSectionIdx].scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      isSectionScrolling = false;
    }, SCROLL_LOCK_MS);
  }

  window.scrollToSection = function(selector) {
    const el = document.querySelector(selector);
    if (el) {
      const idx = sectionList.indexOf(el);
      if (idx !== -1) {
        goToSection(idx);
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          scrollToSection(targetId);
        }
      }
    });
  });

  // Sync active section index when scrolled
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
        const idx = sectionList.indexOf(entry.target);
        if (idx !== -1 && !isSectionScrolling) {
          currentSectionIdx = idx;
        }
      }
    });
  }, { threshold: 0.4 });

  sectionList.forEach(sec => sectionObserver.observe(sec));

  // Wheel listener: 1 wheel gesture = 1 full section transition
  window.addEventListener('wheel', (e) => {
    if (document.querySelector('.modal-overlay.active')) return;

    e.preventDefault();
    if (isSectionScrolling) return;

    if (e.deltaY > 0) {
      if (currentSectionIdx < sectionList.length - 1) {
        goToSection(currentSectionIdx + 1);
      }
    } else if (e.deltaY < 0) {
      if (currentSectionIdx > 0) {
        goToSection(currentSectionIdx - 1);
      }
    }
  }, { passive: false });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (document.querySelector('.modal-overlay.active')) return;
    const activeTag = document.activeElement ? document.activeElement.tagName : '';
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag)) return;

    if (['ArrowDown', 'PageDown'].includes(e.key)) {
      e.preventDefault();
      if (!isSectionScrolling && currentSectionIdx < sectionList.length - 1) {
        goToSection(currentSectionIdx + 1);
      }
    } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
      e.preventDefault();
      if (!isSectionScrolling && currentSectionIdx > 0) {
        goToSection(currentSectionIdx - 1);
      }
    }
  });

  // Touch Swipe for mobile
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (document.querySelector('.modal-overlay.active')) return;
    const activeTag = document.activeElement ? document.activeElement.tagName : '';
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag)) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diffY = touchStartY - touchEndY;

    if (Math.abs(diffY) > 40 && !isSectionScrolling) {
      if (diffY > 0 && currentSectionIdx < sectionList.length - 1) {
        goToSection(currentSectionIdx + 1);
      } else if (diffY < 0 && currentSectionIdx > 0) {
        goToSection(currentSectionIdx - 1);
      }
    }
  }, { passive: true });

  /* ==========================================================================
     3. 3D Mouse Parallax on Hero 3D Video & Watermark
     ========================================================================== */
  const videoWrapper = document.getElementById('video-wrapper');
  const watermarkBg = document.getElementById('hero-watermark');
  const toothVideo = document.getElementById('tooth-video');

  if (toothVideo) {
    toothVideo.play().catch(() => {
      console.log('Video autoplay initiated.');
    });
  }

  if (videoWrapper && watermarkBg && window.innerWidth > 1024) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });

    function animateHeroParallax() {
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      watermarkBg.style.transform = `translate3d(${currentX * 16}px, ${currentY * 10}px, 0)`;
      videoWrapper.style.transform = `translate(calc(-50% + ${-currentX * 22}px), calc(-50% + ${-currentY * 16}px)) rotate(-30deg) rotateY(${currentX * 6}deg) rotateX(${-currentY * 6}deg)`;

      requestAnimationFrame(animateHeroParallax);
    }

    animateHeroParallax();
  }

  /* ==========================================================================
     4. About Us Stats Number Count-Up Animation
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  function runStatsCounter() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const isPercent = stat.textContent.includes('%');
      const isPlus = stat.textContent.includes('+');

      let count = 0;
      const duration = 1600;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;

      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        let formatted = Math.floor(count);
        if (isPercent) formatted += '%';
        else if (isPlus) formatted += '+';
        stat.textContent = formatted;
      }, stepTime);
    });
  }

  const aboutSection = document.getElementById('about');
  if (aboutSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          runStatsCounter();
        }
      });
    }, { threshold: 0.25 });

    observer.observe(aboutSection);
  }

  /* ==========================================================================
     5. Services Section: Interactive Expanding Accordion with Auto-Close
     ========================================================================== */
  const serviceCards = document.querySelectorAll('.service-accordion-card');
  const servicesAccordion = document.getElementById('services-accordion');

  serviceCards.forEach(card => {
    // Desktop hover expansion
    card.addEventListener('mouseenter', () => {
      if (window.matchMedia('(hover: hover)').matches) {
        serviceCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      }
    });

    // Arrow button direct booking
    const arrowBtn = card.querySelector('.hover-arrow-circle');
    if (arrowBtn) {
      arrowBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const serviceKey = card.getAttribute('data-service');
        const treatmentSelect = document.getElementById('treatment-select');
        if (treatmentSelect && serviceKey) {
          treatmentSelect.value = serviceKey;
        }
        window.scrollToSection('#booking');
      });
    }

    // Direct 1-click open on tap/click
    card.addEventListener('click', () => {
      serviceCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // Automatically close all cards when cursor leaves the services container on desktop hover
  if (servicesAccordion) {
    servicesAccordion.addEventListener('mouseleave', () => {
      if (window.matchMedia('(hover: hover)').matches) {
        serviceCards.forEach(c => c.classList.remove('active'));
      }
    });
  }

  /* ==========================================================================
     6. Specialists Section: Continuous Smooth Marquee & View All
     ========================================================================== */
  const specialistsTrack = document.getElementById('specialists-track');
  const btnPrev = document.getElementById('slider-prev');
  const btnNext = document.getElementById('slider-next');
  const currentSlideEl = document.getElementById('current-slide');
  const totalSlidesEl = document.getElementById('total-slides');
  const btnViewAll = document.getElementById('btn-view-all');
  const originalCards = document.querySelectorAll('.doctor-card');
  const totalCards = originalCards.length;
  let isGridView = false;
  let isPaused = false;
  let scrollX = 0;
  let rafId = null;
  let pauseTimeout = null;

  if (totalSlidesEl) {
    totalSlidesEl.textContent = totalCards < 10 ? `0${totalCards}` : totalCards;
  }

  // Clone original cards to create seamless infinite loop
  if (specialistsTrack && originalCards.length) {
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.classList.add('clone-card');
      specialistsTrack.appendChild(clone);
    });
  }

  function getStepSize() {
    if (!specialistsTrack || !originalCards.length) return 320;
    const cardWidth = originalCards[0].offsetWidth || 300;
    const gap = parseFloat(window.getComputedStyle(specialistsTrack).gap) || 20;
    return cardWidth + gap;
  }

  function getSingleSetWidth() {
    return getStepSize() * totalCards;
  }

  function updateCounter() {
    if (!currentSlideEl) return;
    const step = getStepSize();
    const singleSet = getSingleSetWidth();
    if (singleSet <= 0) return;
    const normalizedX = ((scrollX % singleSet) + singleSet) % singleSet;
    const idx = Math.floor(normalizedX / step) % totalCards;
    const num = idx + 1;
    currentSlideEl.textContent = num < 10 ? `0${num}` : num;
  }

  // Smooth continuous animation loop
  const scrollSpeed = 0.85; // Pixels per frame

  function marqueeLoop() {
    if (!isGridView && !isPaused && specialistsTrack) {
      scrollX += scrollSpeed;
      const singleSet = getSingleSetWidth();
      if (singleSet > 0 && scrollX >= singleSet) {
        scrollX -= singleSet;
      }
      specialistsTrack.style.transform = `translate3d(-${scrollX}px, 0, 0)`;
      updateCounter();
    }
    rafId = requestAnimationFrame(marqueeLoop);
  }

  // Start continuous loop
  rafId = requestAnimationFrame(marqueeLoop);

  // Pause continuous marquee on mouse hover, resume on mouse leave
  const specialistsSliderWrapper = document.querySelector('.specialists-slider-wrapper');
  if (specialistsSliderWrapper) {
    specialistsSliderWrapper.addEventListener('mouseenter', () => {
      isPaused = true;
    });
    specialistsSliderWrapper.addEventListener('mouseleave', () => {
      if (!isGridView) isPaused = false;
    });
  }

  // Manual Next Button (Step smoothly forward)
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (isGridView || !specialistsTrack) return;
      isPaused = true;
      if (pauseTimeout) clearTimeout(pauseTimeout);

      const step = getStepSize();
      const singleSet = getSingleSetWidth();
      specialistsTrack.classList.add('with-transition');
      scrollX += step;
      specialistsTrack.style.transform = `translate3d(-${scrollX}px, 0, 0)`;
      updateCounter();

      setTimeout(() => {
        if (specialistsTrack) {
          specialistsTrack.classList.remove('with-transition');
          if (singleSet > 0 && scrollX >= singleSet) {
            scrollX -= singleSet;
            specialistsTrack.style.transform = `translate3d(-${scrollX}px, 0, 0)`;
          }
        }
      }, 460);

      pauseTimeout = setTimeout(() => {
        if (!isGridView) isPaused = false;
      }, 3500);
    });
  }

  // Manual Prev Button (Step smoothly backward)
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (isGridView || !specialistsTrack) return;
      isPaused = true;
      if (pauseTimeout) clearTimeout(pauseTimeout);

      const step = getStepSize();
      const singleSet = getSingleSetWidth();
      specialistsTrack.classList.add('with-transition');
      scrollX -= step;
      if (scrollX < 0) {
        scrollX += singleSet;
      }
      specialistsTrack.style.transform = `translate3d(-${scrollX}px, 0, 0)`;
      updateCounter();

      setTimeout(() => {
        if (specialistsTrack) {
          specialistsTrack.classList.remove('with-transition');
        }
      }, 460);

      pauseTimeout = setTimeout(() => {
        if (!isGridView) isPaused = false;
      }, 3500);
    });
  }

  // View All / Show Carousel Toggle
  if (btnViewAll) {
    btnViewAll.addEventListener('click', () => {
      isGridView = !isGridView;
      if (isGridView) {
        isPaused = true;
        specialistsTrack.classList.add('grid-view');
        specialistsTrack.style.transform = 'none';
        btnViewAll.classList.add('active');
        btnViewAll.innerHTML = `<span>Show carousel</span> <span class="arrow-right">←</span>`;
      } else {
        specialistsTrack.classList.remove('grid-view');
        specialistsTrack.style.transform = `translate3d(-${scrollX}px, 0, 0)`;
        btnViewAll.classList.remove('active');
        btnViewAll.innerHTML = `<span>View all specialists</span> <span class="arrow-right">→</span>`;
        isPaused = false;
      }
    });
  }

  // Touch Drag Support for mobile & tablet
  let isDragging = false;
  let startX = 0;
  let lastX = 0;

  if (specialistsSliderWrapper) {
    specialistsSliderWrapper.addEventListener('touchstart', (e) => {
      if (isGridView) return;
      isPaused = true;
      isDragging = true;
      startX = e.touches[0].pageX;
      lastX = startX;
    }, { passive: true });

    specialistsSliderWrapper.addEventListener('touchmove', (e) => {
      if (!isDragging || isGridView) return;
      const currentX = e.touches[0].pageX;
      const delta = lastX - currentX;
      lastX = currentX;
      scrollX += delta;
      const singleSet = getSingleSetWidth();
      if (singleSet > 0) {
        if (scrollX >= singleSet) scrollX -= singleSet;
        if (scrollX < 0) scrollX += singleSet;
      }
      specialistsTrack.style.transform = `translate3d(-${scrollX}px, 0, 0)`;
      updateCounter();
    }, { passive: true });

    specialistsSliderWrapper.addEventListener('touchend', () => {
      isDragging = false;
      if (pauseTimeout) clearTimeout(pauseTimeout);
      pauseTimeout = setTimeout(() => {
        if (!isGridView) isPaused = false;
      }, 2500);
    }, { passive: true });
  }

  // Clicking doctor card scrolls to booking (delegated for original + cloned cards)
  if (specialistsTrack) {
    specialistsTrack.addEventListener('click', (e) => {
      const card = e.target.closest('.doctor-card');
      if (!card) return;
      const docName = card.getAttribute('data-doc');
      const notesEl = document.getElementById('notes');
      if (notesEl && docName) {
        notesEl.value = `Requesting consultation with ${docName}`;
      }
      window.scrollToSection('#booking');
    });
  }

  /* ==========================================================================
     7. Virtual Treatment Calculator
     ========================================================================== */
  const calcPills = document.querySelectorAll('.treatment-calc-pill');
  const calcRangeSlider = document.getElementById('calc-range-slider');
  const sliderTitleText = document.getElementById('slider-title-text');
  const sliderValBadge = document.getElementById('slider-val-badge');
  const tierCards = document.querySelectorAll('.tier-card-option');

  const totalDigitsEl = document.getElementById('calc-total-digits');
  const monthlyDigitsEl = document.getElementById('calc-monthly-digits');
  const timelineTextEl = document.getElementById('calc-timeline-text');
  const warrantyTextEl = document.getElementById('calc-warranty-text');
  const btnLockEstimate = document.getElementById('btn-lock-estimate');

  const calculatorConfig = {
    aligners: {
      name: 'Clear Aligners',
      label: 'Scope (Number of Aligners / Severity):',
      unit: 'Aligners',
      min: 4,
      max: 24,
      defaultVal: 12,
      base: 2400,
      unitPrice: 120,
      timeline: (v) => `Approx. ${Math.round(v * 0.45)}–${Math.round(v * 0.6 + 1)} Months (${v} Aligner Sets)`,
      warrantySig: '5-Year Structural Alignment Guarantee',
      warrantyBes: 'Lifetime Retainer Program & Unlimited Refinements'
    },
    veneers: {
      name: 'Porcelain Veneers',
      label: 'Number of Custom Hand-Layered Veneers:',
      unit: 'Veneers',
      min: 1,
      max: 16,
      defaultVal: 6,
      base: 800,
      unitPrice: 950,
      timeline: (v) => v > 8 ? '3 Visits • Approx. 3–4 Weeks' : '2 Visits • Approx. 10–14 Days',
      warrantySig: '10-Year Porcelain Integrity Guarantee',
      warrantyBes: 'Lifetime Full-Replacement Guarantee'
    },
    implants: {
      name: 'Dental Implants',
      label: 'Number of Swiss Titanium Implants:',
      unit: 'Implants',
      min: 1,
      max: 8,
      defaultVal: 2,
      base: 1400,
      unitPrice: 1850,
      timeline: () => 'Same-Day Temporary + 3–4 Months Bone Integration',
      warrantySig: '15-Year Structural Implant Warranty',
      warrantyBes: 'Lifetime Global Implant Warranty'
    },
    whitening: {
      name: 'Laser Whitening',
      label: 'In-Office Laser Sessions & Maintenance:',
      unit: 'Sessions',
      min: 1,
      max: 4,
      defaultVal: 1,
      base: 450,
      unitPrice: 160,
      timeline: () => 'Single 45-Min Cold Laser Session + Custom Take-Home Trays',
      warrantySig: '12-Month Shade Brightness Guarantee',
      warrantyBes: '24-Month Enamel Brightness Guarantee & Refills'
    }
  };

  let activeCalcType = 'aligners';

  function runCalculator() {
    const config = calculatorConfig[activeCalcType];
    if (!config || !calcRangeSlider) return;

    const val = parseInt(calcRangeSlider.value, 10);
    if (sliderValBadge) {
      sliderValBadge.textContent = `${val} ${val === 1 ? config.unit.slice(0, -1) : config.unit}`;
    }

    const activeRadio = document.querySelector('input[name="tier"]:checked');
    const isBespoke = activeRadio && activeRadio.value === 'bespoke';
    const multiplier = isBespoke ? 1.35 : 1.0;

    const total = Math.round((config.base + (val * config.unitPrice)) * multiplier);
    const monthly = Math.round(total / 24);

    if (totalDigitsEl) totalDigitsEl.textContent = total.toLocaleString('en-US');
    if (monthlyDigitsEl) monthlyDigitsEl.textContent = `$${monthly} / mo`;
    if (timelineTextEl) timelineTextEl.textContent = config.timeline(val);
    if (warrantyTextEl) warrantyTextEl.textContent = isBespoke ? config.warrantyBes : config.warrantySig;
  }

  calcPills.forEach(pill => {
    pill.addEventListener('click', () => {
      calcPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      activeCalcType = pill.getAttribute('data-type');
      const config = calculatorConfig[activeCalcType];
      if (config && calcRangeSlider) {
        if (sliderTitleText) sliderTitleText.textContent = config.label;
        calcRangeSlider.min = config.min;
        calcRangeSlider.max = config.max;
        calcRangeSlider.value = config.defaultVal;
      }
      runCalculator();
    });
  });

  if (calcRangeSlider) {
    calcRangeSlider.addEventListener('input', runCalculator);
  }

  tierCards.forEach(card => {
    card.addEventListener('click', function() {
      tierCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      const radio = this.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        runCalculator();
      }
    });
  });

  if (btnLockEstimate) {
    btnLockEstimate.addEventListener('click', () => {
      const treatmentSelect = document.getElementById('treatment-select');
      const notesEl = document.getElementById('notes');
      if (treatmentSelect) treatmentSelect.value = activeCalcType;
      if (notesEl && totalDigitsEl) {
        notesEl.value = `[Estimate: ${activeCalcType.toUpperCase()} estimated at $${totalDigitsEl.textContent}]`;
      }
      scrollToSection('#booking');
    });
  }

  runCalculator();

  /* ==========================================================================
     8. Consultation Booking Form Validation & Success Modal
     ========================================================================== */
  const bookingForm = document.getElementById('consultation-form');
  const bookingDateInput = document.getElementById('booking-date');
  const bookingModal = document.getElementById('booking-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDoneBtn = document.getElementById('modal-done-btn');

  if (bookingDateInput) {
    const today = new Date().toISOString().split('T')[0];
    bookingDateInput.min = today;
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById('fullName');
      const emailInput = document.getElementById('email');
      const phoneInput = document.getElementById('phone');
      const treatSelect = document.getElementById('treatment-select');
      const dateInput = document.getElementById('booking-date');

      // Helper to toggle error
      const toggleError = (input, hasError) => {
        if (!input || input.type === 'hidden') return;
        const container = input.closest('.form-group-minimal') || input.parentElement;
        if (container) {
          container.classList.toggle('has-error', hasError);
        }
      };

      // Validate Full Name
      if (!nameInput || nameInput.value.trim().length < 2) {
        toggleError(nameInput, true);
        isValid = false;
      } else {
        toggleError(nameInput, false);
      }

      // Validate Email (if visible)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput && emailInput.type !== 'hidden' && !emailRegex.test(emailInput.value.trim())) {
        toggleError(emailInput, true);
        isValid = false;
      } else if (emailInput) {
        toggleError(emailInput, false);
      }

      // Validate Phone
      if (!phoneInput || phoneInput.value.trim().length < 7) {
        toggleError(phoneInput, true);
        isValid = false;
      } else {
        toggleError(phoneInput, false);
      }

      // Validate Treatment
      if (!treatSelect || !treatSelect.value) {
        toggleError(treatSelect, true);
        isValid = false;
      } else {
        toggleError(treatSelect, false);
      }

      // Validate Date
      if (!dateInput || !dateInput.value) {
        toggleError(dateInput, true);
        isValid = false;
      } else {
        toggleError(dateInput, false);
      }

      if (!isValid) return;

      // Populate Modal Details
      const mPatient = document.getElementById('m-patient-name');
      const mTreatment = document.getElementById('m-treatment-name');
      const mDate = document.getElementById('m-date-val');
      const mDoc = document.getElementById('m-doctor-val');
      const docSelect = document.getElementById('doctor-select');

      if (mPatient) mPatient.textContent = nameInput.value.trim();
      if (mTreatment) mTreatment.textContent = treatSelect.options[treatSelect.selectedIndex].text;
      if (mDate) mDate.textContent = dateInput.value;
      if (mDoc) mDoc.textContent = docSelect ? docSelect.value : 'First Available Specialist';

      if (bookingModal) {
        bookingModal.classList.add('active');
      }

      bookingForm.reset();
    });
  }

  function hideModal() {
    if (bookingModal) bookingModal.classList.remove('active');
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', hideModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', hideModal);
  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) hideModal();
    });
  }

  /* ==========================================================================
     Testimonials: Tabs + Slide Nav + Before/After Slider
     ========================================================================== */

  const testiTabs    = document.querySelectorAll('.testi-tab');
  const testiSlides  = document.querySelectorAll('.testi-slide');
  const testiPrev    = document.getElementById('testi-prev');
  const testiNext    = document.getElementById('testi-next');
  const testiCounter = document.getElementById('testi-counter');
  const testiSection = document.querySelector('.testimonials-section');

  const categories = ['aesthetic', 'orthodontics', 'implantology', 'whitening'];
  let currentIdx = 0;
  let autoPlayTimer = null;
  let resumeTimer = null;
  const AUTO_INTERVAL = 5000;   // 5s between slides
  const RESUME_DELAY  = 8000;   // 8s after manual interaction before resuming

  function showSlide(idx) {
    currentIdx = (idx + categories.length) % categories.length;
    const cat = categories[currentIdx];

    // Update tabs
    testiTabs.forEach(t => {
      const isActive = t.dataset.category === cat;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update slides
    testiSlides.forEach(s => {
      s.classList.toggle('active', s.dataset.category === cat);
    });

    // Update counter
    if (testiCounter) {
      testiCounter.textContent = String(currentIdx + 1).padStart(2, '0') + '/' + String(categories.length).padStart(2, '0');
    }
  }

  // ── Auto-play ────────────────────────────────────────────────
  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(() => showSlide(currentIdx + 1), AUTO_INTERVAL);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) { clearInterval(autoPlayTimer); autoPlayTimer = null; }
  }

  function pauseAndResume() {
    stopAutoPlay();
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(startAutoPlay, RESUME_DELAY);
  }

  // Pause on hover
  if (testiSection) {
    testiSection.addEventListener('mouseenter', stopAutoPlay);
    testiSection.addEventListener('mouseleave', startAutoPlay);
  }

  // Tab clicks — pause then resume
  testiTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = categories.indexOf(tab.dataset.category);
      if (idx !== -1) { showSlide(idx); pauseAndResume(); }
    });
  });

  // Prev / Next — pause then resume
  if (testiPrev) testiPrev.addEventListener('click', () => { showSlide(currentIdx - 1); pauseAndResume(); });
  if (testiNext) testiNext.addEventListener('click', () => { showSlide(currentIdx + 1); pauseAndResume(); });

  // Kick off auto-play
  startAutoPlay();

  // Before / After drag sliders
  document.querySelectorAll('.before-after-container').forEach(container => {
    const afterEl   = container.querySelector('.ba-after-img');
    const dividerEl = container.querySelector('.ba-divider');

    let isDragging = false;

    function setPosition(clientX) {
      const rect = container.getBoundingClientRect();
      let pct = (clientX - rect.left) / rect.width;
      pct = Math.max(0.02, Math.min(0.98, pct));
      const pctStr = (pct * 100).toFixed(2) + '%';
      afterEl.style.width   = pctStr;
      dividerEl.style.left  = pctStr;
    }

    // Mouse
    container.addEventListener('mousedown', e => {
      isDragging = true;
      setPosition(e.clientX);
      e.preventDefault();
    });
    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      setPosition(e.clientX);
    });
    window.addEventListener('mouseup', () => { isDragging = false; });

    // Touch
    container.addEventListener('touchstart', e => {
      isDragging = true;
      setPosition(e.touches[0].clientX);
    }, { passive: true });
    container.addEventListener('touchmove', e => {
      if (!isDragging) return;
      setPosition(e.touches[0].clientX);
    }, { passive: true });
    container.addEventListener('touchend', () => { isDragging = false; });
  });

});

