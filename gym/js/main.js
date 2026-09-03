// TITAN ATHLETICS - High Performance Interactive Script
document.addEventListener('DOMContentLoaded', () => {

  // 0.1 Header Sliding Indicator & Scroll Shrink Listener
  const mainHeader = document.getElementById('main-header');
  const navMenu = document.getElementById('nav-menu');
  const navIndicator = document.getElementById('nav-indicator');
  const navItems = document.querySelectorAll('.nav-item');

  function updateNavIndicator(targetEl) {
    if (!targetEl || !navIndicator || !navMenu) return;
    const itemRect = targetEl.getBoundingClientRect();
    const menuRect = navMenu.getBoundingClientRect();
    const leftOffset = itemRect.left - menuRect.left;

    navIndicator.style.width = `${itemRect.width}px`;
    navIndicator.style.transform = `translateX(${leftOffset}px)`;
  }

  const activeNavItem = document.querySelector('.nav-item.active') || navItems[0];
  if (activeNavItem) {
    setTimeout(() => updateNavIndicator(activeNavItem), 100);
  }

  navItems.forEach(item => {
    item.addEventListener('mouseenter', () => updateNavIndicator(item));
    item.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      updateNavIndicator(item);
    });
  });

  if (navMenu) {
    navMenu.addEventListener('mouseleave', () => {
      const currentActive = document.querySelector('.nav-item.active') || navItems[0];
      if (currentActive) updateNavIndicator(currentActive);
    });
  }

  window.addEventListener('scroll', () => {
    if (mainHeader) {
      if (window.scrollY > 40) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }
  });

  // Mobile Navigation Drawer Toggle Handler
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenuToggle.classList.toggle('active');
      navMenu.classList.toggle('mobile-open');
      document.body.classList.toggle('menu-open');
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('mobile-open') && !navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('mobile-open');
        mobileMenuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        mobileMenuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // 0. Custom High-Tech Athletic Cursor Logic
  const cursorDot = document.getElementById('cursor-dot');
  const cursorFollower = document.getElementById('cursor-follower');

  if (cursorDot && cursorFollower && window.innerWidth > 1024) {
    let mousePosX = 0;
    let mousePosY = 0;
    let followerX = 0;
    let followerY = 0;

    window.addEventListener('mousemove', (e) => {
      mousePosX = e.clientX;
      mousePosY = e.clientY;

      cursorDot.style.left = `${mousePosX}px`;
      cursorDot.style.top = `${mousePosY}px`;
    });

    function renderCursor() {
      followerX += (mousePosX - followerX) * 0.18;
      followerY += (mousePosY - followerY) * 0.18;

      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;

      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const hoverTargets = 'a, button, input, select, textarea, .program-list-item, .facility-img-frame, .pricing-column, .coach-row, .q-btn, .fac-progress-step';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverTargets)) {
        cursorDot.classList.add('hovered');
        cursorFollower.classList.add('hovered');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverTargets)) {
        cursorDot.classList.remove('hovered');
        cursorFollower.classList.remove('hovered');
      }
    });

    document.addEventListener('mousedown', () => {
      cursorFollower.classList.add('pressed');
    });

  }

  // ==========================================
  // TITAN ATHLETICS - HERO SPORTS LAB ENGINE
  // ==========================================

  // 1. CINEMATIC PAGE LOAD SEQUENCE & STAT COUNTERS
  const videoWrapper = document.getElementById('video-wrapper');
  const textLeftBlock = document.getElementById('text-left-block');
  const textRightBlock = document.getElementById('text-right-block');
  const btnJoin = document.getElementById('btn-join');
  const athleteStatusBadge = document.getElementById('athlete-status-badge');
  const statDividerElements = document.querySelectorAll('.stat-divider');

  function runCinematicPageLoad() {
    setTimeout(() => {
      if (videoWrapper) videoWrapper.style.opacity = '1';
    }, 300);

    setTimeout(() => {
      if (textLeftBlock) textLeftBlock.style.opacity = '1';
    }, 600);

    setTimeout(() => {
      animateStatNumbers();
      statDividerElements.forEach(div => div.classList.add('expanded'));
    }, 900);

    setTimeout(() => {
      if (btnJoin) btnJoin.style.opacity = '1';
    }, 1200);

    setTimeout(() => {
      if (athleteStatusBadge) athleteStatusBadge.style.opacity = '1';
    }, 1500);
  }

  function animateStatNumbers() {
    const stat1 = document.getElementById('stat-num-1');
    const stat2 = document.getElementById('stat-num-2');
    const stat3 = document.getElementById('stat-num-3');

    function countUp(el, start, end, duration, decimals, suffix) {
      if (!el) return;
      const startTime = performance.now();
      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = start + (end - start) * easeProgress;
        el.textContent = currentVal.toFixed(decimals) + suffix;
        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }
      requestAnimationFrame(update);
    }

    countUp(stat1, 0, 99.4, 2000, 1, '%');
    countUp(stat2, 0, 24, 1800, 0, '/7');
    countUp(stat3, 0, 50, 1800, 0, '+');
  }

  runCinematicPageLoad();

  // 2. GUARANTEED CINEMATIC PROGRESSIVE THANOS SNAP DISINTEGRATION & RECONSTRUCTION ENGINE
  const headlineWrapper = document.getElementById('headline-wrapper');
  const headlineText = document.getElementById('headline-text');
  const headlineCanvas = document.getElementById('headline-canvas');

  if (headlineWrapper && headlineText && headlineCanvas) {
    const phrases = [
      { line1: "NO", line2: "LIMITS." },
      { line1: "PURE", line2: "POWER." },
      { line1: "BE", line2: "TITAN." },
      { line1: "STAY", line2: "ELITE." }
    ];
    let currentPhraseIdx = 0;

    function renderHeadlineHTML(p) {
      if (!p) return '';
      const line1HTML = `<span class="line-top">${p.line1 || ''}</span>`;
      const line2HTML = p.line2 ? `<br><span class="gradient-text line-bottom">${p.line2}</span>` : '';
      return `${line1HTML}${line2HTML}`;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      headlineText.style.opacity = '1';
      return;
    }

    const ctx = headlineCanvas.getContext('2d');
    let dpr = window.devicePixelRatio || 1;
    let particles = [];
    let canvasWidth = 850;
    let canvasHeight = 420;

    function resizeCanvas() {
      const rect = headlineWrapper.getBoundingClientRect();
      canvasWidth = Math.max(Math.ceil(rect.width) + 200, 850);
      canvasHeight = Math.max(Math.ceil(rect.height) + 250, 420);

      dpr = window.devicePixelRatio || 1;
      headlineCanvas.width = canvasWidth * dpr;
      headlineCanvas.height = canvasHeight * dpr;
      headlineCanvas.style.width = `${canvasWidth}px`;
      headlineCanvas.style.height = `${canvasHeight}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // True Pixel-Level Glyph Sampler (Guaranteed exact letter shape extraction)
    function sampleHeadlinePixels(phrase) {
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');

      const rect = headlineText.getBoundingClientRect();
      const parentRect = headlineWrapper.getBoundingClientRect();
      const offsetX = Math.max(0, rect.left - parentRect.left);
      const offsetY = Math.max(0, rect.top - parentRect.top);
      const width = Math.max(rect.width, 350);
      const height = Math.max(rect.height, 140);

      offscreen.width = canvasWidth;
      offscreen.height = canvasHeight;
      offCtx.clearRect(0, 0, canvasWidth, canvasHeight);

      const computed = window.getComputedStyle(headlineText);
      const fontSize = Math.round(parseFloat(computed.fontSize)) || (window.innerWidth > 1024 ? 56 : 38);
      const lineHeight = fontSize * 1.06;

      // Standard W3C font specification
      offCtx.font = `900 ${fontSize}px 'Outfit', 'Inter', Arial, sans-serif`;
      offCtx.textBaseline = 'top';
      offCtx.fillStyle = '#090d16';

      // Draw exact uppercase typography onto offscreen canvas
      const text1 = (phrase.line1 || '').toUpperCase();
      const text2 = (phrase.line2 || '').toUpperCase();

      offCtx.fillText(text1, offsetX, offsetY);
      if (text2) {
        offCtx.fillText(text2, offsetX, offsetY + lineHeight);
      }

      const imgData = offCtx.getImageData(0, 0, canvasWidth, canvasHeight);
      const data = imgData.data;
      const points = [];
      const step = 2; // Step 2x2 px captures exact letter contours and solid body

      for (let y = 0; y < canvasHeight; y += step) {
        for (let x = 0; x < canvasWidth; x += step) {
          const idx = (y * canvasWidth + x) * 4;
          const alpha = data[idx + 3];
          if (alpha > 25) {
            points.push({
              x: x,
              y: y,
              alpha: alpha / 255
            });
          }
        }
      }

      return {
        points: points,
        offsetX: offsetX,
        offsetY: offsetY,
        width: width,
        height: height
      };
    }

    class ThanosGymParticle {
      constructor(x, y, alpha) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.startX = x;
        this.startY = y;
        this.targetX = x;
        this.targetY = y;
        this.color = '#090d16';
        this.alpha = alpha !== undefined ? alpha : 1.0;
        this.targetAlpha = 1.0;
        this.vx = 0;
        this.vy = 0;
        this.size = Math.random() * 1.4 + 1.2;
        this.isDissolved = false;
        this.dissolveDelay = 0;
        this.dissolveStartTime = 0;
        this.assembleDelay = 0;
        this.curlOffset = (Math.random() - 0.5) * 40;
        this.noiseOffset = Math.random() * 1000;
        this.decay = Math.random() * 0.016 + 0.008;
        this.turbulence = Math.random() * 6 + 2;
      }
    }

    let currentSample = sampleHeadlinePixels(phrases[currentPhraseIdx]);
    particles = currentSample.points.map(pt => new ThanosGymParticle(pt.x, pt.y, pt.alpha));

    let state = 'STABLE'; // STABLE -> DISINTEGRATING -> ASSEMBLING
    let stateStartTime = Date.now();

    function updateDOMText(phrase) {
      headlineText.innerHTML = renderHeadlineHTML(phrase);
    }

    function startCinematicDustEngine() {
      resizeCanvas();

      function animLoop() {
        const now = Date.now();
        const elapsed = (now - stateStartTime) / 1000;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        if (state === 'STABLE') {
          // Keep headlineText hidden so only the crisp assembled particle letters show with zero pop
          headlineText.style.opacity = '0';

          // Render the assembled letter particles seamlessly during STABLE
          ctx.fillStyle = '#090d16';
          particles.forEach(p => {
            ctx.globalAlpha = p.alpha;
            ctx.fillRect(p.targetX - p.size * 0.5, p.targetY - p.size * 0.5, p.size, p.size);
          });

          // Stable for 2.8 seconds before Thanos snap initiates
          if (elapsed > 2.8) {
            state = 'DISINTEGRATING';
            stateStartTime = Date.now();

            currentSample = sampleHeadlinePixels(phrases[currentPhraseIdx]);
            const pts = currentSample.points;

            while (particles.length < pts.length) {
              particles.push(new ThanosGymParticle(pts[particles.length].x, pts[particles.length].y, pts[particles.length].alpha));
            }
            if (particles.length > pts.length) {
              particles.length = pts.length;
            }

            // Left-to-right progressive sweep delay with organic edge
            particles.forEach((p, i) => {
              p.x = pts[i].x;
              p.y = pts[i].y;
              p.originX = pts[i].x;
              p.originY = pts[i].y;
              p.targetX = pts[i].x;
              p.targetY = pts[i].y;
              p.alpha = pts[i].alpha;
              p.isDissolved = false;

              const relX = Math.max(0, pts[i].x - currentSample.offsetX);
              const sweepProgress = relX / currentSample.width;
              p.dissolveDelay = sweepProgress * 0.75 + (Math.sin(pts[i].y * 0.08) * 0.1) + (Math.random() * 0.08);
              p.vx = (Math.random() - 0.2) * 3.8 + 0.9; // Blowing rightward
              p.vy = Math.random() * 4.0 + 1.2;          // Downward ash fall
            });
          }
        } else if (state === 'DISINTEGRATING') {
          // PROPER THANOS SNAP EFFECT:
          // 1. Intact pixels ahead of the dissolution wave remain SOLID on screen.
          // 2. Pixels reached by the wave break off into floating, swirling ash dust particles.
          ctx.fillStyle = '#090d16';

          particles.forEach(p => {
            if (!p.isDissolved) {
              if (elapsed >= p.dissolveDelay) {
                p.isDissolved = true;
                p.dissolveStartTime = elapsed;
              } else {
                // Intact solid letter pixel
                ctx.globalAlpha = p.alpha;
                ctx.fillRect(p.originX - p.size * 0.5, p.originY - p.size * 0.5, p.size, p.size);
                return;
              }
            }

            // Dissolved ash particle in flight
            if (p.isDissolved) {
              const dt = elapsed - p.dissolveStartTime;
              p.vx *= 0.985;
              p.vy *= 0.985;
              p.x += p.vx + Math.sin(dt * p.turbulence + p.noiseOffset) * 0.8;
              p.y += p.vy + 0.16; // Downward acceleration
              p.alpha = Math.max(0.1, p.alpha - p.decay);

              ctx.globalAlpha = p.alpha;
              ctx.fillRect(p.x - p.size * 0.5, p.y - p.size * 0.5, p.size, p.size);
            }
          });

          // Disintegration complete across the entire word -> morph directly into next phrase
          if (elapsed > 1.9) {
            state = 'ASSEMBLING';
            stateStartTime = Date.now();

            const nextPhraseIdx = (currentPhraseIdx + 1) % phrases.length;
            const nextSample = sampleHeadlinePixels(phrases[nextPhraseIdx]);
            const nextPts = nextSample.points;
            const targetCount = nextPts.length;

            while (particles.length < targetCount) {
              const randP = particles[Math.floor(Math.random() * particles.length)] || { x: nextSample.offsetX, y: nextSample.offsetY };
              const newP = new ThanosGymParticle(randP.x + (Math.random() - 0.5) * 80, randP.y + (Math.random() - 0.5) * 80, 0.3);
              particles.push(newP);
            }

            // Assign every airborne ash particle its EXACT destination coordinate in the new phrase!
            particles.forEach((p, i) => {
              const targetPt = nextPts[i % targetCount];
              p.startX = p.x;
              p.startY = p.y;
              p.targetX = targetPt.x;
              p.targetY = targetPt.y;
              p.targetAlpha = targetPt.alpha;
              p.curlOffset = (Math.random() - 0.5) * 45;
              const relX = Math.max(0, targetPt.x - nextSample.offsetX);
              p.assembleDelay = (relX / nextSample.width) * 0.35 + Math.random() * 0.08;
            });

            currentPhraseIdx = nextPhraseIdx;
          }
        } else if (state === 'ASSEMBLING') {
          // Dust particles fly from air and assemble the EXACT letters of the new phrase
          ctx.fillStyle = '#090d16';

          particles.forEach(p => {
            const pElapsed = Math.max(0, elapsed - p.assembleDelay);
            const pProgress = Math.min(pElapsed / 1.15, 1.0);
            // Smooth cubic ease out
            const ease = 1 - Math.pow(1 - pProgress, 3);

            p.x = p.startX + (p.targetX - p.startX) * ease + Math.sin((1 - ease) * Math.PI) * p.curlOffset;
            p.y = p.startY + (p.targetY - p.startY) * ease + Math.cos((1 - ease) * Math.PI) * p.curlOffset;

            if (pProgress >= 0.95) {
              p.x = p.targetX;
              p.y = p.targetY;
              p.alpha = 1.0;
            } else {
              p.alpha = Math.min(1.0, 0.3 + ease * 0.7);
            }

            ctx.globalAlpha = p.alpha;
            ctx.fillRect(p.x - p.size * 0.5, p.y - p.size * 0.5, p.size, p.size);
          });

          // Particles have 100% formed the complete letters! Stay in formed particle state
          if (elapsed > 1.7) {
            state = 'STABLE';
            stateStartTime = Date.now();
            updateDOMText(phrases[currentPhraseIdx]);
            headlineText.style.opacity = '0';
          }
        }

        requestAnimationFrame(animLoop);
      }

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          currentSample = sampleHeadlinePixels(phrases[currentPhraseIdx]);
          particles = currentSample.points.map(pt => new ThanosGymParticle(pt.x, pt.y, pt.alpha));
        });
      }

      animLoop();
    }

    startCinematicDustEngine();
  }

  // 3. PERFORMANCE SCANNER & ENERGY PULSE SCHEDULER
  const scanLine = document.getElementById('athlete-scan-line');
  const energyPulse = document.getElementById('hero-energy-pulse');
  const hudPower = document.getElementById('hud-power');
  const hudStrength = document.getElementById('hud-strength');
  const hudSpeed = document.getElementById('hud-speed');
  const hudRecovery = document.getElementById('hud-recovery');

  function triggerScannerSequence() {
    if (scanLine) {
      scanLine.classList.remove('scanning');
      void scanLine.offsetWidth;
      scanLine.classList.add('scanning');
    }

    if (energyPulse) {
      energyPulse.classList.remove('pulsing');
      void energyPulse.offsetWidth;
      energyPulse.classList.add('pulsing');
    }

    setTimeout(() => {
      if (hudRecovery) {
        hudRecovery.classList.add('hud-active');
        setTimeout(() => hudRecovery.classList.remove('hud-active'), 1200);
      }
    }, 400);

    setTimeout(() => {
      if (hudSpeed) {
        hudSpeed.classList.add('hud-active');
        setTimeout(() => hudSpeed.classList.remove('hud-active'), 1200);
      }
    }, 1000);

    setTimeout(() => {
      if (hudStrength) {
        hudStrength.classList.add('hud-active');
        setTimeout(() => hudStrength.classList.remove('hud-active'), 1200);
      }
    }, 1600);

    setTimeout(() => {
      if (hudPower) {
        hudPower.classList.add('hud-active');
        setTimeout(() => hudPower.classList.remove('hud-active'), 1200);
      }
    }, 2200);
  }

  setInterval(triggerScannerSequence, 5200);
  setTimeout(triggerScannerSequence, 1800);

  // 4. INTERACTIVE ATHLETE 3D PARALLAX & GRID DISTORTION
  const gridEnergyField = document.getElementById('grid-energy-field');
  const athleteRadialGlow = document.getElementById('athlete-radial-glow');
  const watermarkBg = document.getElementById('hero-watermark');

  if (videoWrapper && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 1024) return;
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;

      const posX = (e.clientX / innerWidth) * 100;
      const posY = (e.clientY / innerHeight) * 100;

      if (gridEnergyField) {
        gridEnergyField.style.setProperty('--mouse-x', `${posX}%`);
        gridEnergyField.style.setProperty('--mouse-y', `${posY}%`);
      }
      if (athleteRadialGlow) {
        athleteRadialGlow.style.setProperty('--mouse-x', `${posX}%`);
        athleteRadialGlow.style.setProperty('--mouse-y', `${posY}%`);
      }
    });

    function animate3DParallax() {
      if (window.innerWidth >= 1024) {
        targetX += (mouseX - targetX) * 0.06;
        targetY += (mouseY - targetY) * 0.06;

        const moveX = -targetX * 12;
        const moveY = -targetY * 8;
        const rotY = targetX * 4;
        const rotX = -targetY * 3.5;

        videoWrapper.style.transform = `translate(calc(-50% + ${moveX}px), ${moveY}px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;

        if (watermarkBg) {
          watermarkBg.style.transform = `translate3d(${targetX * 15}px, 0, 0)`;
        }
      } else {
        videoWrapper.style.transform = '';
      }

      requestAnimationFrame(animate3DParallax);
    }
    animate3DParallax();

    window.addEventListener('resize', () => {
      if (window.innerWidth < 1024 && videoWrapper) {
        videoWrapper.style.transform = '';
      }
    });
  }

  // 2. Global Scroll Parallax Listener
  const parallaxElements = document.querySelectorAll('[data-parallax-speed]');

  window.addEventListener('scroll', () => {
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.1;
      const rect = el.parentElement.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const yPos = (rect.top - window.innerHeight / 2) * speed;
        el.style.transform = `translateY(${yPos}px)`;
      }
    });
  });

  // 3. Interactive Split Program Showcase (5-Second Auto Rotation)
  const programData = [
    {
      badge: "PRO HYPERTROPHY",
      title: "TITAN HYPER-LOAD 500",
      desc: "High-density mechanical tension protocols designed for rapid muscular volume and maximum neural drive.",
      stat1: "60 MIN",
      stat2: "1,200+",
      stat3: "5 DAYS/WK"
    },
    {
      badge: "METABOLIC METCON",
      title: "VO2 MAX ACCELERATOR",
      desc: "Sub-maximal aerobic threshold drills and sprint interval science to double cardiovascular stamina.",
      stat1: "45 MIN",
      stat2: "950+",
      stat3: "4 DAYS/WK"
    },
    {
      badge: "COMBAT STRENGTH",
      title: "APEX COMBAT CONDITIONING",
      desc: "Explosive rotational power, kinetic chain strike transfer, and grip endurance for elite fight preparation.",
      stat1: "75 MIN",
      stat2: "1,400+",
      stat3: "6 DAYS/WK"
    },
    {
      badge: "RECOVERY SCIENCE",
      title: "BIOMETRIC REGEN LAB",
      desc: "Whole-body cryotherapy, infrared hyper-baric saunas, and lymphatic compression to eliminate systemic fatigue.",
      stat1: "30 MIN",
      stat2: "0%",
      stat3: "DAILY"
    }
  ];

  const programItems = document.querySelectorAll('.program-list-item');
  const detailTag = document.getElementById('detail-tag');
  const detailTitle = document.getElementById('detail-title');
  const detailDesc = document.getElementById('detail-desc');
  const dVal1 = document.getElementById('d-val-1');
  const dVal2 = document.getElementById('d-val-2');
  const dVal3 = document.getElementById('d-val-3');
  const detailDisplay = document.querySelector('.program-detail-display');

  let currentProgIdx = 0;
  let progAutoTimer = null;

  function selectProgram(idx) {
    currentProgIdx = idx;
    programItems.forEach((item, i) => {
      item.classList.toggle('active', i === currentProgIdx);
    });

    const data = programData[currentProgIdx];
    if (data && detailDisplay) {
      detailDisplay.style.opacity = '0';
      detailDisplay.style.transform = 'translateY(10px)';
      detailDisplay.style.transition = 'all 0.25s ease';

      setTimeout(() => {
        if (detailTag) detailTag.textContent = data.badge;
        if (detailTitle) detailTitle.textContent = data.title;
        if (detailDesc) detailDesc.textContent = data.desc;
        if (dVal1) dVal1.textContent = data.stat1;
        if (dVal2) dVal2.textContent = data.stat2;
        if (dVal3) dVal3.textContent = data.stat3;

        detailDisplay.style.opacity = '1';
        detailDisplay.style.transform = 'translateY(0)';
      }, 200);
    }
  }

  function startProgAutoRotate() {
    stopProgAutoRotate();
    progAutoTimer = setInterval(() => {
      const nextIdx = (currentProgIdx + 1) % programData.length;
      selectProgram(nextIdx);
    }, 5000);
  }

  function stopProgAutoRotate() {
    if (progAutoTimer) clearInterval(progAutoTimer);
  }

  programItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      selectProgram(idx);
      startProgAutoRotate();
    });
  });

  startProgAutoRotate();

  // 4. NEXT-GEN FACILITIES & LABS INTERACTIVE SHOWCASE
  const facilityRows = document.querySelectorAll('.facility-row-visual');
  const progressSteps = document.querySelectorAll('.fac-progress-step');
  const progressFill = document.getElementById('fac-progress-fill');

  const facilityModalData = [
    {
      tag: "01 • STRENGTH ARCHITECTURE",
      title: "Stealth Power Arena",
      img: "assets/images/facility_power_arena.jpg",
      desc: "Calibrated Eleiko competition platforms, custom laser-cut power cages, and automated bar speed tracking sensors engineered for maximum neural drive.",
      bullets: [
        "Calibrated 50mm Eleiko Competition Barbells & Bumper Plates",
        "Custom Laser-Cut 3x3 Power Cages with Safety Straps",
        "OptoJump Bar Velocity & Power Tracking Telemetry",
        "Chalk Bar Stations & Olympic Lifting Wood Platforms"
      ],
      pills: ["Eleiko Certified", "Smart Speed Sensors", "Chalk Bar Station"]
    },
    {
      tag: "02 • HYPER-RECOVERY SCIENCE",
      title: "Sub-Zero Cryo Chamber",
      img: "assets/images/facility_cryo_chamber.jpg",
      desc: "Whole-body nitrogen cryotherapy unit operating at -160°C to accelerate muscular cellular repair, reduce inflammation, and release natural endorphins.",
      bullets: [
        "Whole-Body Nitrogen Cryo Chamber (-160°C Temperature Threshold)",
        "Full-Spectrum Infrared Sauna Booths with Chromotherapy",
        "Normatec 3 Sequential Compression Leg & Arm Sleeves",
        "Anti-Inflammatory Cellular Oxygenation Sessions"
      ],
      pills: ["-160°C Cryo", "Infrared Saunas", "Normatec Sleeves"]
    },
    {
      tag: "03 • KINETIC TURF & SPRINT",
      title: "Sprint & Biometric Turf",
      img: "assets/images/facility_sprint_turf.jpg",
      desc: "60-meter high-density sled turf equipped with optical velocity timers and kinetic force measurement plates to optimize rate of force development.",
      bullets: [
        "60-Meter High-Density Shock-Absorbing Sled Track",
        "Kinetic Force Measurement Plates & Speed Gates",
        "Calibrated Rogue Sleds, Trap Bars & Heavy Plyo Boxes",
        "Real-Time Athletic Velocity & Acceleration Telemetry"
      ],
      pills: ["60m Sprint Track", "Force Plates", "Weighted Sleds"]
    },
    {
      tag: "04 • THERMAL IMMERSION",
      title: "Hydro-Therapy Contrast Pools",
      img: "assets/images/facility_hydro_pool.jpg",
      desc: "Dual hot and ice contrast immersion pools engineered with active water filtration and mineral oxygenation to flush lactic acid and rejuvenate joints.",
      bullets: [
        "Dual-Temperature Contrast Plunge Pools (Ice Bath 4°C / Thermal 40°C)",
        "Active Micro-Bubble Oxygenation & Mineral Water Filtration",
        "Hydro-Massage Jets for Deep Muscular Tissue Release",
        "Dedicated Towel Warmers & Recovery Lounge"
      ],
      pills: ["Ice Bath (4°C)", "Thermal Spa (40°C)", "Oxygenated Water"]
    }
  ];

  const facWrapper = document.querySelector('.facilities-interactive-wrapper');

  function updateFacilityScroll() {
    if (!facilityRows.length || !facWrapper) return;

    const windowHeight = window.innerHeight;
    const viewportTarget = windowHeight * 0.45;

    let activeIndex = 0;
    let minDistance = Infinity;

    facilityRows.forEach((row, i) => {
      const rect = row.getBoundingClientRect();
      const rowCenter = rect.top + rect.height * 0.4;
      const distance = Math.abs(rowCenter - viewportTarget);

      if (distance < minDistance) {
        minDistance = distance;
        activeIndex = i;
      }
    });

    facilityRows.forEach((row, i) => {
      row.classList.toggle('active', i === activeIndex);
    });

    progressSteps.forEach((step, i) => {
      step.classList.toggle('passed', i < activeIndex);
      step.classList.toggle('active', i === activeIndex);
    });

    if (progressFill && progressSteps.length > 1) {
      const firstRow = facilityRows[0].getBoundingClientRect();
      const lastRow = facilityRows[facilityRows.length - 1].getBoundingClientRect();
      const startY = firstRow.top + firstRow.height * 0.3;
      const endY = lastRow.top + lastRow.height * 0.3;
      const totalDist = endY - startY;

      let progress = 0;
      if (totalDist > 0) {
        progress = (viewportTarget - startY) / totalDist;
        progress = Math.max(0, Math.min(1, progress));
      }

      progressFill.style.height = `${(progress * 100).toFixed(1)}%`;
    }
  }

  let facScrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!facScrollTicking) {
      requestAnimationFrame(() => {
        updateFacilityScroll();
        facScrollTicking = false;
      });
      facScrollTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateFacilityScroll);
  updateFacilityScroll();

  progressSteps.forEach(step => {
    step.addEventListener('click', () => {
      const idx = parseInt(step.getAttribute('data-step')) || 0;
      if (facilityRows[idx]) {
        facilityRows[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isTouchDevice && !prefersReducedMotion) {
    const imgFrames = document.querySelectorAll('.facility-img-frame');

    imgFrames.forEach(frame => {
      const img = frame.querySelector('.facility-img');
      if (!img) return;

      frame.addEventListener('mousemove', (e) => {
        const rect = frame.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        img.style.transform = `scale(1.06) translate(${x * -16}px, ${y * -16}px)`;
      });

      frame.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1) translate(0, 0)';
      });
    });
  }

  const facModal = document.getElementById('facility-modal');
  const facModalClose = document.getElementById('fac-modal-close');
  const facModalImg = document.getElementById('fac-modal-img');
  const facModalTag = document.getElementById('fac-modal-tag');
  const facModalTitle = document.getElementById('fac-modal-title');
  const facModalDesc = document.getElementById('fac-modal-desc');
  const facModalBullets = document.getElementById('fac-modal-bullets');
  const facModalPills = document.getElementById('fac-modal-pills');
  const facModalTourBtn = document.getElementById('fac-modal-tour-btn');

  function openFacilityModal(index) {
    const data = facilityModalData[index];
    if (!data || !facModal) return;

    if (facModalImg) facModalImg.src = data.img;
    if (facModalTag) facModalTag.textContent = data.tag;
    if (facModalTitle) facModalTitle.textContent = data.title;
    if (facModalDesc) facModalDesc.textContent = data.desc;

    if (facModalBullets) {
      facModalBullets.innerHTML = data.bullets.map(b => `<li>${b}</li>`).join('');
    }

    if (facModalPills) {
      facModalPills.innerHTML = data.pills.map(p => `<span class="pill">${p}</span>`).join('');
    }

    facModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeFacilityModal() {
    if (facModal) {
      facModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  facilityRows.forEach((row, idx) => {
    const imgFrame = row.querySelector('.facility-img-frame');
    const exploreBtn = row.querySelector('.facility-explore-btn');

    if (imgFrame) {
      imgFrame.addEventListener('click', () => openFacilityModal(idx));
    }
    if (exploreBtn) {
      exploreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openFacilityModal(idx);
      });
    }
  });

  if (facModalClose) facModalClose.addEventListener('click', closeFacilityModal);
  if (facModal) {
    facModal.addEventListener('click', (e) => {
      if (e.target === facModal) closeFacilityModal();
    });
  }

  if (facModalTourBtn) {
    facModalTourBtn.addEventListener('click', closeFacilityModal);
  }

  // 5. INTERACTIVE PRICING EXPERIENCE
  const pricingToggle = document.getElementById('pricing-toggle');
  const priceAmounts = document.querySelectorAll('#pricing .amount');
  const monthlyLabel = document.getElementById('monthly-label');
  const annualLabel = document.getElementById('annual-label');
  const pricingColumns = document.querySelectorAll('.pricing-column');
  const userTierSelect = document.getElementById('user-tier');
  const joinSection = document.getElementById('join');

  // Rolling Number Animation Helper
  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.textContent = end;
      }
    };
    window.requestAnimationFrame(step);
  }

  if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
      const isAnnual = pricingToggle.checked;

      if (isAnnual) {
        if (annualLabel) annualLabel.classList.add('active');
        if (monthlyLabel) monthlyLabel.classList.remove('active');
      } else {
        if (monthlyLabel) monthlyLabel.classList.add('active');
        if (annualLabel) annualLabel.classList.remove('active');
      }

      priceAmounts.forEach(amt => {
        const startVal = parseInt(amt.textContent) || 0;
        const targetVal = parseInt(isAnnual ? amt.getAttribute('data-annual') : amt.getAttribute('data-monthly')) || 0;

        amt.style.opacity = '0.5';
        animateValue(amt, startVal, targetVal, 300);
        setTimeout(() => {
          amt.style.opacity = '1';
        }, 300);
      });
    });
  }

  // Plan Selection Handler
  pricingColumns.forEach(col => {
    const btn = col.querySelector('.btn-select-tier');
    const continueAction = col.querySelector('.btn-continue-action');
    const tierName = btn ? btn.getAttribute('data-tier') : '';

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();

        // Deselect previous plans
        pricingColumns.forEach(c => {
          c.classList.remove('selected');
          const b = c.querySelector('.btn-select-tier');
          const ca = c.querySelector('.btn-continue-action');
          if (b) {
            b.classList.remove('selected');
            const originalText = b.getAttribute('data-tier') === 'Titan Elite' ? 'Claim Titan Elite →' : 'Claim Pass →';
            const btnSpan = b.querySelector('.btn-text');
            if (btnSpan) btnSpan.textContent = originalText;
            else b.textContent = originalText;
          }
          if (ca) ca.style.display = 'none';
        });

        // Select clicked plan
        col.classList.add('selected');
        btn.classList.add('selected');

        const btnSpan = btn.querySelector('.btn-text');
        if (btnSpan) btnSpan.textContent = '✓ Plan Selected';
        else btn.textContent = '✓ Plan Selected';

        if (continueAction) continueAction.style.display = 'inline-flex';
        if (userTierSelect) userTierSelect.value = tierName;

        showToast(`✓ Selected Plan: ${tierName}. Click Continue to complete signup.`);
      });
    }
  });

  // Expandable Benefits Handler
  const expandBtns = document.querySelectorAll('.expand-benefits-btn');
  expandBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetList = document.getElementById(targetId);

      if (targetList) {
        const isHidden = targetList.style.display === 'none' || targetList.style.display === '';
        if (isHidden) {
          targetList.style.display = 'flex';
          btn.textContent = 'Hide Benefits ↑';
        } else {
          targetList.style.display = 'none';
          btn.textContent = 'View All Benefits ↓';
        }
      }
    });
  });

  // Compare Plans Modal Handler
  const compareModal = document.getElementById('compare-modal');
  const openCompareBtn = document.getElementById('open-compare-btn');
  const compareModalClose = document.getElementById('compare-modal-close');
  const compareModalJoinBtn = document.getElementById('compare-modal-join-btn');

  if (openCompareBtn && compareModal) {
    openCompareBtn.addEventListener('click', () => {
      compareModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeCompareModal() {
    if (compareModal) {
      compareModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (compareModalClose) compareModalClose.addEventListener('click', closeCompareModal);
  if (compareModalJoinBtn) compareModalJoinBtn.addEventListener('click', closeCompareModal);
  if (compareModal) {
    compareModal.addEventListener('click', (e) => {
      if (e.target === compareModal) closeCompareModal();
    });
  }

  // Mobile Membership Pricing Cards Auto-Scroll Carousel Engine
  const mobileDots = document.querySelectorAll('#pricing-mobile-dots .dot');
  const pricingTrack = document.getElementById('pricing-columns-track');
  const pricingCards = document.querySelectorAll('.pricing-column');

  if (pricingTrack && pricingCards.length > 0) {
    let autoScrollTimer = null;
    let currentCardIndex = 0;
    let isUserInteracting = false;

    function scrollNextPricingCard() {
      if (window.innerWidth >= 1024 || isUserInteracting) return;
      currentCardIndex = (currentCardIndex + 1) % pricingCards.length;
      scrollToCardIndex(currentCardIndex);
    }

    function scrollToCardIndex(index) {
      if (!pricingCards[index]) return;
      const card = pricingCards[index];
      const trackLeft = pricingTrack.getBoundingClientRect().left;
      const cardLeft = card.getBoundingClientRect().left;
      const scrollOffset = pricingTrack.scrollLeft + (cardLeft - trackLeft) - (pricingTrack.offsetWidth - card.offsetWidth) / 2;

      pricingTrack.scrollTo({
        left: scrollOffset,
        behavior: 'smooth'
      });

      updateMobileDots(index);
    }

    function updateMobileDots(activeIndex) {
      if (mobileDots.length === 0) return;
      mobileDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });
    }

    function startAutoScroll() {
      stopAutoScroll();
      autoScrollTimer = setInterval(() => {
        scrollNextPricingCard();
      }, 3500);
    }

    function stopAutoScroll() {
      if (autoScrollTimer) {
        clearInterval(autoScrollTimer);
        autoScrollTimer = null;
      }
    }

    let scrollTimeout = null;
    pricingTrack.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const trackWidth = pricingTrack.offsetWidth;
        const scrollLeft = pricingTrack.scrollLeft;
        const calculatedIndex = Math.min(
          pricingCards.length - 1,
          Math.max(0, Math.round(scrollLeft / (trackWidth * 0.8)))
        );
        currentCardIndex = calculatedIndex;
        updateMobileDots(currentCardIndex);
      }, 60);
    });

    let userInteractionTimeout = null;
    function pauseForUserInteraction() {
      isUserInteracting = true;
      stopAutoScroll();
      clearTimeout(userInteractionTimeout);
      userInteractionTimeout = setTimeout(() => {
        isUserInteracting = false;
        if (window.innerWidth < 1024) startAutoScroll();
      }, 5000);
    }

    pricingTrack.addEventListener('touchstart', pauseForUserInteraction, { passive: true });
    pricingTrack.addEventListener('mouseenter', pauseForUserInteraction);

    mobileDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        currentCardIndex = idx;
        scrollToCardIndex(idx);
        pauseForUserInteraction();
      });
    });

    const nextBtn = document.getElementById('pricing-next-btn');
    const prevBtn = document.getElementById('pricing-prev-btn');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex + 1) % pricingCards.length;
        scrollToCardIndex(currentCardIndex);
        pauseForUserInteraction();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex - 1 + pricingCards.length) % pricingCards.length;
        scrollToCardIndex(currentCardIndex);
        pauseForUserInteraction();
      });
    }

    if (window.innerWidth < 1024) {
      startAutoScroll();
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth < 1024) {
        if (!autoScrollTimer && !isUserInteracting) startAutoScroll();
      } else {
        stopAutoScroll();
      }
    });
  }

  // 6. Testimonial Quote Slider (5-Second Auto Rotation)
  const reviewsData = [
    {
      quote: "The biometric recovery lab alone is worth 10x the membership. My squat jumped 65 lbs in 12 weeks while staying completely injury-free.",
      initials: "JD",
      name: "Jason Drake",
      meta: "Competitive Powerlifter • Member 2 Yrs",
      stat: "+65 lbs Squat PR"
    },
    {
      quote: "Titan Athletics is in a league of its own. The coaches understand biomechanics at a medical level. Best decision for my athletic career.",
      initials: "SL",
      name: "Sophia Laurier",
      meta: "Sprinter & Triathlete • Member 1 Yr",
      stat: "-18% Body Fat / +VO2"
    },
    {
      quote: "24/7 keyless access fits my erratic schedule. The Eleiko platforms and cold plunge pools keep me operating at peak condition every day.",
      initials: "DK",
      name: "Damon Thorne",
      meta: "CrossFit Master • Member 3 Yrs",
      stat: "+22 lbs Lean Muscle"
    }
  ];

  let reviewIdx = 0;
  let quoteAutoTimer = null;
  const quoteText = document.getElementById('quote-text');
  const quoteAvatar = document.getElementById('quote-avatar');
  const quoteName = document.getElementById('quote-name');
  const quoteMeta = document.getElementById('quote-meta');
  const quoteStat = document.getElementById('quote-stat');
  const qPrev = document.getElementById('q-prev');
  const qNext = document.getElementById('q-next');
  const qDotsContainer = document.getElementById('q-dots');

  function startQuoteAutoRotate() {
    stopQuoteAutoRotate();
    quoteAutoTimer = setInterval(() => {
      updateQuote(reviewIdx + 1);
    }, 5000);
  }

  function stopQuoteAutoRotate() {
    if (quoteAutoTimer) clearInterval(quoteAutoTimer);
  }

  function updateQuote(index) {
    if (index < 0) reviewIdx = reviewsData.length - 1;
    else if (index >= reviewsData.length) reviewIdx = 0;
    else reviewIdx = index;

    const data = reviewsData[reviewIdx];
    if (!data) return;

    if (quoteText) {
      quoteText.style.opacity = '0';
      setTimeout(() => {
        quoteText.textContent = `"${data.quote}"`;
        if (quoteAvatar) quoteAvatar.textContent = data.initials;
        if (quoteName) quoteName.textContent = data.name;
        if (quoteMeta) quoteMeta.textContent = data.meta;
        if (quoteStat) quoteStat.textContent = data.stat;
        quoteText.style.opacity = '1';
      }, 200);
    }

    if (qDotsContainer) {
      qDotsContainer.innerHTML = '';
      reviewsData.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `dot ${idx === reviewIdx ? 'active' : ''}`;
        dot.addEventListener('click', () => {
          updateQuote(idx);
          startQuoteAutoRotate();
        });
        qDotsContainer.appendChild(dot);
      });
    }
  }

  if (qPrev) qPrev.addEventListener('click', () => {
    updateQuote(reviewIdx - 1);
    startQuoteAutoRotate();
  });

  if (qNext) qNext.addEventListener('click', () => {
    updateQuote(reviewIdx + 1);
    startQuoteAutoRotate();
  });

  updateQuote(0);
  startQuoteAutoRotate();

  // 7. Select Tier Buttons, Program Unlocks & Booking Triggers
  const detailCtaBtn = document.getElementById('detail-cta');
  if (detailCtaBtn) {
    detailCtaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentProgTitle = document.getElementById('detail-title')?.textContent || 'Program';
      if (joinSection) joinSection.scrollIntoView({ behavior: 'smooth' });
      showToast(`⚡ ${currentProgTitle} unlocked! Claim your 7-Day Free Pass below.`);
    });
  }

  const bookingBtns = document.querySelectorAll('.open-booking-btn');
  bookingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const coachName = btn.getAttribute('data-coach');
      showToast(`⚡ Consultation queued with ${coachName}. Claim pass to confirm.`);
      if (joinSection) joinSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 8. Membership Signup Form Handler
  const membershipForm = document.getElementById('membership-form');
  const joinHeroBtn = document.getElementById('btn-join');

  if (joinHeroBtn) {
    joinHeroBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (joinSection) joinSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (membershipForm) {
    membershipForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('user-name').value;
      const tier = document.getElementById('user-tier').value;

      showToast(`🎉 Welcome to Titan Athletics, ${name}! Your 24/7 ${tier} key pass is active.`);
      membershipForm.reset();
    });
  }

  // 9. Custom Toast Notification
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
        background: #0d121c;
        color: #ccff00;
        border: 1px solid rgba(204, 255, 0, 0.4);
        padding: 1rem 1.8rem;
        border-radius: 50px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.95rem;
        font-weight: 800;
        box-shadow: 0 10px 35px rgba(204, 255, 0, 0.35);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 0.8rem;
      ">
        ${message}
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.5s ease';
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }

  // 10. Interactive "Find Your Titan Tier" VIP Assessment Quiz Logic
  const openQuizBtn = document.getElementById('open-quiz-btn');
  const navQuizBtn = document.getElementById('nav-quiz-btn');
  const quizModal = document.getElementById('quiz-modal');
  const quizModalClose = document.getElementById('quiz-modal-close');
  const quizProgressFill = document.getElementById('quiz-progress-fill');
  const quizStepIndicator = document.getElementById('quiz-step-indicator');

  const stepPanels = [
    document.getElementById('quiz-step-1'),
    document.getElementById('quiz-step-2'),
    document.getElementById('quiz-step-3'),
    document.getElementById('quiz-result-step')
  ];

  let currentQuizStep = 0;
  const userAnswers = { goal: '', freq: '', rec: '' };

  if (quizModal) {
    if (openQuizBtn) {
      openQuizBtn.addEventListener('click', () => {
        resetQuiz();
        quizModal.classList.add('open');
      });
    }

    if (navQuizBtn) {
      navQuizBtn.addEventListener('click', () => {
        resetQuiz();
        quizModal.classList.add('open');
      });
    }

    if (quizModalClose) {
      quizModalClose.addEventListener('click', () => {
        quizModal.classList.remove('open');
      });
    }

    quizModal.addEventListener('click', (e) => {
      if (e.target === quizModal) quizModal.classList.remove('open');
    });
  }

  function resetQuiz() {
    currentQuizStep = 0;
    userAnswers.goal = '';
    userAnswers.freq = '';
    userAnswers.rec = '';
    updateQuizStepUI();
  }

  function updateQuizStepUI() {
    stepPanels.forEach((panel, idx) => {
      if (panel) panel.classList.toggle('active', idx === currentQuizStep);
    });

    if (currentQuizStep < 3) {
      const pct = ((currentQuizStep + 1) / 3) * 100;
      if (quizProgressFill) quizProgressFill.style.width = `${pct}%`;
      if (quizStepIndicator) quizStepIndicator.textContent = `STEP ${currentQuizStep + 1} OF 3`;
    } else {
      if (quizProgressFill) quizProgressFill.style.width = '100%';
      if (quizStepIndicator) quizStepIndicator.textContent = 'RECOMMENDED MATCH';
    }
  }

  document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const goal = btn.getAttribute('data-goal');
      const freq = btn.getAttribute('data-freq');
      const rec = btn.getAttribute('data-rec');

      if (goal) userAnswers.goal = goal;
      if (freq) userAnswers.freq = freq;
      if (rec) userAnswers.rec = rec;

      currentQuizStep++;
      if (currentQuizStep === 3) {
        calculateQuizResult();
      }
      updateQuizStepUI();
    });
  });

  function calculateQuizResult() {
    const tierNameEl = document.getElementById('quiz-tier-name');
    const priceTagEl = document.getElementById('quiz-price-tag');
    const resultDescEl = document.getElementById('quiz-result-desc');
    const highlightsEl = document.getElementById('quiz-highlights');
    const claimBtn = document.getElementById('quiz-claim-btn');

    let tier = 'TITAN ELITE';
    let price = '$169 / month';
    let matchPct = '98% PERFECT MATCH';
    let desc = 'Based on your training frequency and recovery priorities, Titan Elite delivers unlimited Cryo access, VO2 scans, and full strength arena privileges.';
    let bulletList = [
      '✓ Unlimited Sub-Zero Cryotherapy & Hydro Pools',
      '✓ Monthly VO2 Max & Biometric Body Scans',
      '✓ 2 Master Coach Sessions Included Per Month'
    ];

    if (userAnswers.rec === 'vip' || userAnswers.freq === '6-7') {
      tier = 'PRO ATHLETE';
      price = '$299 / month';
      matchPct = '99.4% CHAMPIONSHIP MATCH';
      desc = 'Engineered for dedicated competitors requiring daily sub-zero regen, reserved private lockers, and weekly master coaching.';
      bulletList = [
        '✓ Unlimited Daily Cryo & Hydro Contrast Access',
        '✓ Weekly VO2 Body Scans & Custom Nutrition Blueprint',
        '✓ 4 Master Coach 1-on-1 Sessions Per Month'
      ];
    } else if (userAnswers.rec === 'basic' && userAnswers.freq === '2-3') {
      tier = 'STEALTH PASS';
      price = '$99 / month';
      matchPct = '95% MATCH';
      desc = 'Ideal for independent athletes focused on raw barbell lifts, sprint turf, and essential locker room access.';
      bulletList = [
        '✓ 24/7 Biometric Keyless Club Access',
        '✓ Full Access to Stealth Power Arena & Sprint Turf',
        '✓ Mineral Showers & Locker Room Access'
      ];
    }

    if (tierNameEl) tierNameEl.textContent = tier;
    if (priceTagEl) priceTagEl.textContent = price;
    if (resultDescEl) resultDescEl.textContent = desc;
    const matchEl = document.getElementById('quiz-match-pct');
    if (matchEl) matchEl.textContent = matchPct;

    if (highlightsEl) {
      highlightsEl.innerHTML = bulletList.map(b => `<li>${b}</li>`).join('');
    }

    if (claimBtn) {
      claimBtn.innerHTML = `<span>⚡ Claim 7-Day Free VIP Pass for ${tier} →</span>`;
      claimBtn.onclick = () => {
        if (quizModal) quizModal.classList.remove('open');
        const userTierSelect = document.getElementById('user-tier');
        if (userTierSelect) {
          userTierSelect.value = (tier === 'STEALTH PASS') ? 'Stealth Pass' : (tier === 'PRO ATHLETE') ? 'Pro Athlete' : 'Titan Elite';
        }
        const joinSection = document.getElementById('join');
        if (joinSection) {
          joinSection.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }
    playSuccessSound();
  }

  // 11. SYNTHESIZED WEB AUDIO SOUND ENGINE
  let audioCtx = null;
  let isSoundEnabled = true;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Unlock AudioContext on first user interaction anywhere
  window.addEventListener('click', initAudioContext, { once: true });
  window.addEventListener('keydown', initAudioContext, { once: true });

  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');
  const soundLabel = document.getElementById('sound-label');

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      initAudioContext();
      isSoundEnabled = !isSoundEnabled;
      soundToggleBtn.classList.toggle('muted', !isSoundEnabled);

      if (soundIcon) soundIcon.textContent = isSoundEnabled ? '🔊' : '🔇';
      if (soundLabel) soundLabel.textContent = isSoundEnabled ? 'SOUND: ON' : 'MUTED';

      if (isSoundEnabled) {
        playClickSound();
        showToast('🔊 Audio feedback activated.');
      }
    });
  }

  function playClickSound() {
    if (!isSoundEnabled) return;
    initAudioContext();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (err) { }
  }

  function playHoverSound() {
    if (!isSoundEnabled) return;
    initAudioContext();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, audioCtx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.025);
    } catch (err) { }
  }

  function playSuccessSound() {
    if (!isSoundEnabled) return;
    initAudioContext();
    if (!audioCtx) return;

    try {
      const freqs = [523.25, 659.25, 783.99];
      freqs.forEach((f, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, audioCtx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.1, audioCtx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime + idx * 0.08);
        osc.stop(audioCtx.currentTime + idx * 0.08 + 0.25);
      });
    } catch (err) { }
  }

  document.querySelectorAll('.cta-pill-button, .contact-link, .open-booking-btn, .quiz-opt-btn, .quiz-trigger-pill-btn').forEach(btn => {
    btn.addEventListener('click', playClickSound);
  });

  document.querySelectorAll('.nav-item, .program-list-item, .pricing-column, .coach-row').forEach(el => {
    el.addEventListener('mouseenter', playHoverSound);
  });

  // =========================================================================
  // TITAN AI CHATBOT CONTROLLER (OPENAI INTEGRATION)
  // =========================================================================
  // PASTE YOUR OPENAI API KEY BELOW
  // Example: const OPENAI_API_KEY = "sk-proj-...";
  const OPENAI_API_KEY = ""; // Insert your OpenAI API Key here if needed
  const OPENAI_MODEL = "gpt-3.5-turbo";

  const SYSTEM_PROMPT = `You are TITAN AI, the virtual performance coach for TITAN ATHLETICS gym.
Information about TITAN ATHLETICS:
- 24/7 Biometric Keyless Access (facial scanner at Gate 1).
- Facilities: Stealth Power Arena, Sub-Zero Cryotherapy Chamber (-160°C), Sprint & Force Turf, Hydro Contrast Pools, Biometric Recovery Lab.
- Membership Tiers: Executive Access ($149/mo), Elite Pro Athlete ($249/mo), Titan Apex Unlimited ($399/mo). Free 7-day trial pass available.
- Tone: High-performance, motivating, direct, expert, and concise.`;

  const chatbotTrigger = document.getElementById('chatbotTrigger');
  const chatbotWindow = document.getElementById('chatbotWindow');
  const chatbotCloseBtn = document.getElementById('chatbotCloseBtn');
  const chatbotClearBtn = document.getElementById('chatbotClearBtn');
  const chatbotForm = document.getElementById('chatbotForm');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatbotTyping = document.getElementById('chatbotTyping');

  let chatHistory = [
    { role: "system", content: SYSTEM_PROMPT }
  ];

  if (chatbotTrigger && chatbotWindow) {
    chatbotTrigger.addEventListener('click', () => {
      const isOpen = chatbotWindow.classList.contains('open');
      if (isOpen) {
        chatbotWindow.classList.remove('open');
        chatbotWindow.setAttribute('aria-hidden', 'true');
      } else {
        chatbotWindow.classList.add('open');
        chatbotWindow.setAttribute('aria-hidden', 'false');
        chatbotInput.focus();
      }
    });

    if (chatbotCloseBtn) {
      chatbotCloseBtn.addEventListener('click', () => {
        chatbotWindow.classList.remove('open');
        chatbotWindow.setAttribute('aria-hidden', 'true');
      });
    }

    if (chatbotClearBtn) {
      chatbotClearBtn.addEventListener('click', () => {
        chatHistory = [{ role: "system", content: SYSTEM_PROMPT }];
        chatbotMessages.innerHTML = `
          <div class="chat-msg bot-msg">
            <div class="msg-avatar">⚡</div>
            <div class="msg-bubble">
              <p>Chat cleared! How can I assist your training goals today?</p>
            </div>
          </div>
          <div class="chat-suggestions" id="chatSuggestions">
            <button class="suggestion-chip" data-query="What membership tiers do you offer?">💳 Membership Tiers</button>
            <button class="suggestion-chip" data-query="Tell me about your Cryotherapy & Recovery Facilities.">❄️ Recovery Lab</button>
            <button class="suggestion-chip" data-query="How does biometric 24/7 keyless access work?">🔑 24/7 Access</button>
            <button class="suggestion-chip" data-query="What master training programs are available?">🏋️ Programs</button>
          </div>
        `;
        rebindSuggestions();
      });
    }

    function rebindSuggestions() {
      const chips = chatbotMessages.querySelectorAll('.suggestion-chip');
      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          const query = chip.getAttribute('data-query');
          if (query) handleUserMessage(query);
        });
      });
    }
    rebindSuggestions();

    if (chatbotForm) {
      chatbotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userText = chatbotInput.value.trim();
        if (!userText) return;
        chatbotInput.value = '';
        handleUserMessage(userText);
      });
    }

    async function handleUserMessage(userText) {
      appendUserMessage(userText);
      showTyping(true);

      try {
        const botReply = await fetchAIResponse(userText);
        showTyping(false);
        appendBotMessage(botReply);
      } catch (err) {
        showTyping(false);
        appendBotMessage("⚠️ System error. Please try again.");
      }
    }

    function appendUserMessage(text) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'chat-msg user-msg';
      msgDiv.innerHTML = `
        <div class="msg-bubble">
          <p>${escapeHTML(text)}</p>
        </div>
      `;
      chatbotMessages.appendChild(msgDiv);
      scrollToBottom();
    }

    function appendBotMessage(text) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'chat-msg bot-msg';
      msgDiv.innerHTML = `
        <div class="msg-avatar">⚡</div>
        <div class="msg-bubble">
          ${formatMarkdown(text)}
        </div>
      `;
      chatbotMessages.appendChild(msgDiv);
      scrollToBottom();
    }

    function showTyping(show) {
      if (chatbotTyping) {
        chatbotTyping.style.display = show ? 'flex' : 'none';
        if (show) scrollToBottom();
      }
    }

    function scrollToBottom() {
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function escapeHTML(str) {
      return str.replace(/[&<>'"]/g,
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
      );
    }

    function formatMarkdown(text) {
      let formatted = escapeHTML(text)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
      return `<p>${formatted}</p>`;
    }

    async function fetchAIResponse(userMessage) {
      chatHistory.push({ role: "user", content: userMessage });

      // Check if OpenAI API Key is provided
      if (OPENAI_API_KEY && OPENAI_API_KEY.trim() !== "" && !OPENAI_API_KEY.includes("YOUR_OPENAI_API_KEY")) {
        try {
          const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${OPENAI_API_KEY.trim()}`
            },
            body: JSON.stringify({
              model: OPENAI_MODEL,
              messages: chatHistory,
              temperature: 0.7,
              max_tokens: 350
            })
          });

          if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error?.message || `HTTP ${response.status}`);
          }

          const data = await response.json();
          const reply = data.choices[0].message.content;
          chatHistory.push({ role: "assistant", content: reply });
          return reply;
        } catch (err) {
          console.warn("OpenAI API call failed, falling back to local response:", err);
        }
      }

      // Intelligent Local Fallback Engine (when API Key is blank or waiting for user configuration)
      return getLocalFallback(userMessage);
    }

    function getLocalFallback(userMessage) {
      const lower = userMessage.toLowerCase();
      let reply = "";

      if (lower.includes("tier") || lower.includes("price") || lower.includes("membership") || lower.includes("cost") || lower.includes("join")) {
        reply = "⚡ **TITAN Membership Tiers:**\n• **Executive Access ($149/mo):** 24/7 Access + Core Arena\n• **Elite Pro Athlete ($249/mo):** Cryotherapy + Group Coaching\n• **Titan Apex ($399/mo):** Unlimited Access + Personal Coach + Biometric Lab\n\n*Click 'Claim 7-Day Free Pass' to start your trial!*";
      } else if (lower.includes("cryo") || lower.includes("recovery") || lower.includes("pool") || lower.includes("facility") || lower.includes("lab")) {
        reply = "❄️ **Recovery Facilities:**\nOur high-performance lab includes:\n• Sub-Zero Cryo Chamber (-160°C)\n• Hydro Contrast Therapy Pools\n• Hyperbaric Oxygen Chambers\n• Infrared Sauna & Biometric Scanners";
      } else if (lower.includes("access") || lower.includes("hour") || lower.includes("time") || lower.includes("24/7") || lower.includes("open") || lower.includes("key")) {
        reply = "🔑 **24/7 Biometric Access:**\nTITAN ATHLETICS is open 24 hours a day, 365 days a year. Members enter securely using encrypted facial biometric scanners at Gate 1.";
      } else if (lower.includes("program") || lower.includes("train") || lower.includes("workout") || lower.includes("coach")) {
        reply = "🏆 **Elite Training Programs:**\n• Hypertrophy & Force Generation\n• Olympic Weightlifting & Power\n• Tactical Endurance & VO2 Max\n• Biometric Athletic Rehab";
      } else {
        reply = `⚡ Hello! I am TITAN AI, your virtual performance coach.\n\nYou can ask me about **memberships**, **recovery facilities**, **24/7 biometric access**, or **training programs**.\n\n*(💡 Developer Note: Insert your OpenAI API Key into \`const OPENAI_API_KEY\` in \`js/main.js\` to activate live OpenAI GPT completions!)*`;
      }

      chatHistory.push({ role: "assistant", content: reply });
      return reply;
    }
  }
});
