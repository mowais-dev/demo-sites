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
     2. Smooth Scroll Helper
     ========================================================================== */
  window.scrollToSection = function(selector) {
    const el = document.querySelector(selector);
    if (el) {
      const offset = 70;
      const topPos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: topPos, behavior: 'smooth' });
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
    card.addEventListener('mouseenter', () => {
      serviceCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });

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

    card.addEventListener('click', () => {
      const isCurrentlyActive = card.classList.contains('active');
      serviceCards.forEach(c => c.classList.remove('active'));
      if (!isCurrentlyActive) {
        card.classList.add('active');
      }
    });
  });

  // Automatically close all cards when cursor leaves the services container
  if (servicesAccordion) {
    servicesAccordion.addEventListener('mouseleave', () => {
      serviceCards.forEach(c => c.classList.remove('active'));
    });
  }

  /* ==========================================================================
     6. Specialists Section: Horizontal Carousel Slider & View All
     ========================================================================== */
  const specialistsTrack = document.getElementById('specialists-track');
  const btnPrev = document.getElementById('slider-prev');
  const btnNext = document.getElementById('slider-next');
  const currentSlideEl = document.getElementById('current-slide');
  const totalSlidesEl = document.getElementById('total-slides');
  const btnViewAll = document.getElementById('btn-view-all');
  const doctorCards = document.querySelectorAll('.doctor-card');
  const totalCards = doctorCards.length;
  let currentIndex = 0;
  let isGridView = false;

  if (totalSlidesEl) {
    totalSlidesEl.textContent = totalCards < 10 ? `0${totalCards}` : totalCards;
  }

  function updateSlider() {
    if (!specialistsTrack || !doctorCards.length) return;
    if (isGridView) return;

    const cardWidth = doctorCards[0].offsetWidth || 300;
    const computedGap = parseFloat(window.getComputedStyle(specialistsTrack).gap) || 20;
    const step = cardWidth + computedGap;
    const maxIndex = Math.max(0, totalCards - 1);

    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    const offset = currentIndex * step;
    specialistsTrack.style.transform = `translateX(-${offset}px)`;

    if (currentSlideEl) {
      const activeNum = currentIndex + 1;
      currentSlideEl.textContent = activeNum < 10 ? `0${activeNum}` : activeNum;
    }

    if (btnPrev) {
      btnPrev.disabled = currentIndex === 0;
      btnPrev.classList.toggle('active', currentIndex > 0);
    }
    if (btnNext) {
      btnNext.disabled = currentIndex >= maxIndex;
      btnNext.classList.toggle('active', currentIndex < maxIndex);
    }
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentIndex < totalCards - 1) {
        currentIndex++;
        updateSlider();
      }
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });
  }

  if (btnViewAll) {
    btnViewAll.addEventListener('click', () => {
      isGridView = !isGridView;
      if (isGridView) {
        specialistsTrack.classList.add('grid-view');
        btnViewAll.classList.add('active');
        btnViewAll.innerHTML = `<span>Show carousel</span> <span class="arrow-right">←</span>`;
      } else {
        specialistsTrack.classList.remove('grid-view');
        btnViewAll.classList.remove('active');
        btnViewAll.innerHTML = `<span>View all specialists</span> <span class="arrow-right">→</span>`;
        updateSlider();
      }
    });
  }

  // Touch swipe support for mobile & tablet
  const sliderWrapper = document.querySelector('.specialists-slider-wrapper');
  let touchStartX = 0;
  if (sliderWrapper) {
    sliderWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX;
    }, { passive: true });

    sliderWrapper.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].pageX;
      const diff = touchStartX - touchEndX;
      if (diff > 45 && currentIndex < totalCards - 1) {
        currentIndex++;
        updateSlider();
      } else if (diff < -45 && currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    }, { passive: true });
  }

  // Clicking doctor card scrolls to booking
  doctorCards.forEach(card => {
    card.addEventListener('click', () => {
      const docName = card.getAttribute('data-doc');
      const messageField = document.getElementById('consultation-notes');
      if (messageField && docName) {
        messageField.value = `Requesting consultation with ${docName}`;
      }
      window.scrollToSection('#booking');
    });
  });

  window.addEventListener('resize', () => {
    if (!isGridView) updateSlider();
  }, { passive: true });

  updateSlider();

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

      // Validate Full Name
      if (!nameInput || nameInput.value.trim().length < 2) {
        nameInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        nameInput.parentElement.classList.remove('has-error');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        emailInput.parentElement.classList.remove('has-error');
      }

      // Validate Phone
      if (!phoneInput || phoneInput.value.trim().length < 7) {
        phoneInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        phoneInput.parentElement.classList.remove('has-error');
      }

      // Validate Treatment
      if (!treatSelect || !treatSelect.value) {
        treatSelect.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        treatSelect.parentElement.classList.remove('has-error');
      }

      // Validate Date
      if (!dateInput || !dateInput.value) {
        dateInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        dateInput.parentElement.classList.remove('has-error');
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

});
