/**
 * ANIMATIONS MODULE — HASAN RAHEEM DIGITAL STORYTELLING
 * GSAP + ScrollTrigger + SplitText Choreography
 * Editorial, restrained, cinematic, and responsive
 */

// 1. Accessible SplitText Helper (lines & words)
export function prepareSplitText() {
  const titles = document.querySelectorAll('.js-split-title, .js-split-line');

  titles.forEach((el) => {
    const originalText = el.textContent.trim();
    el.setAttribute('aria-label', originalText);

    // Split text by lines (<br>) then words
    const htmlLines = el.innerHTML.split(/<br\s*\/?>/i);
    const wrappedHtml = htmlLines.map((line) => {
      const words = line.trim().split(/\s+/);
      const wrappedWords = words
        .map((w) => `<span class="split-word" aria-hidden="true">${w}</span>`)
        .join(' ');
      return `<span class="split-line" aria-hidden="true">${wrappedWords}</span>`;
    }).join('');

    el.innerHTML = wrappedHtml;
  });
}

// 2. Main Animation Initializer
export function initAnimations() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) {
    // Show all elements statically for reduced motion users
    gsap.set('.split-word, .img-cover, .hero__bg-img, .ledger__row, .top3__card, .ghost-num, .tl-item, .js-meta-item, .js-fade-body', {
      opacity: 1,
      y: 0,
      scale: 1
    });
    return;
  }

  // Setup Mobile Swipe Counters for Karachi and Momentum
  initMobileSwipeCounters();

  // Responsive Animation Setup with gsap.matchMedia()
  const mm = gsap.matchMedia();

  // ==========================================
  // DESKTOP ANIMATIONS (>= 901px)
  // ==========================================
  mm.add('(min-width: 901px)', () => {
    // --- GHOST NUMBERS PARALLAX ---
    document.querySelectorAll('.ghost-num').forEach((ghost) => {
      const parentSection = ghost.closest('section');
      if (parentSection) {
        gsap.fromTo(ghost, 
          { y: 30, opacity: 0 },
          {
            y: -30,
            opacity: 0.045,
            ease: 'none',
            scrollTrigger: {
              trigger: parentSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2
            }
          }
        );
      }
    });

    // --- HERO SEQUENCE ---
    const heroTl = gsap.timeline({ delay: 0.05 });
    heroTl
      .from('.hero .js-meta-item', {
        opacity: 0,
        y: -15,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1
      })
      .from('.hero__title .split-word', {
        y: '100%',
        opacity: 0,
        duration: 1.0,
        ease: 'power4.out',
        stagger: 0.07
      }, '-=0.5')
      .from('.hero__bottom', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4');

    // Hero background subtle scale on initial scroll
    gsap.to('.hero__bg-img', {
      scale: 1,
      y: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    // --- 01 GILGIT ---
    const gilgitTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#gilgit',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });
    gilgitTl
      .from('#gilgit .js-meta-item', {
        opacity: 0,
        y: 18,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('#gilgit .chapter__title .split-word', {
        y: '100%',
        opacity: 0,
        duration: 1.1,
        stagger: 0.07,
        ease: 'power4.out'
      }, '-=0.6')
      .from('#gilgit .chapter__statement .split-word', {
        y: '100%',
        opacity: 0,
        duration: 0.9,
        stagger: 0.05,
        ease: 'power3.out'
      }, '-=0.5')
      .from('#gilgit .js-fade-body', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4');

    // Gilgit Image Parallax & Scale Normalization
    gsap.fromTo('#gilgit .js-parallax-img',
      { scale: 1.04, y: 25 },
      {
        scale: 1.0,
        y: -35,
        ease: 'none',
        scrollTrigger: {
          trigger: '#gilgit',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      }
    );

    // --- 02 KARACHI (Asymmetric 3-image depth parallax) ---
    const karachiTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#karachi',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });
    karachiTl
      .from('#karachi .js-meta-item', {
        opacity: 0,
        y: 18,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('#karachi .chapter__title .split-word', {
        y: '100%',
        opacity: 0,
        duration: 1.1,
        stagger: 0.07,
        ease: 'power4.out'
      }, '-=0.6')
      .from('#karachi .chapter__statement .split-word', {
        y: '100%',
        opacity: 0,
        duration: 0.9,
        stagger: 0.05,
        ease: 'power3.out'
      }, '-=0.5');

    // Karachi 3-image multi-plane parallax
    gsap.fromTo('#karachi .js-parallax-img',
      { scale: 1.04, y: 20 },
      {
        scale: 1.0,
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: '#karachi',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      }
    );
    gsap.fromTo('#karachi .js-parallax-sub1',
      { scale: 1.04, y: 40 },
      {
        scale: 1.0,
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: '#karachi',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      }
    );
    gsap.fromTo('#karachi .js-parallax-sub2',
      { scale: 1.04, y: 30 },
      {
        scale: 1.0,
        y: -45,
        ease: 'none',
        scrollTrigger: {
          trigger: '#karachi',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      }
    );

    // --- 03 MEDICINE (Restrained Pause & Sequential Ledger) ---
    const medTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#medicine',
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });
    medTl
      .from('#medicine .js-meta-item', {
        opacity: 0,
        y: 18,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('#medicine .chapter__title .split-word', {
        y: '100%',
        opacity: 0,
        duration: 1.1,
        stagger: 0.07,
        ease: 'power4.out'
      }, '-=0.6')
      .from('#medicine .medicine-line', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      .from('#medicine .ledger__row', {
        opacity: 0,
        x: 25,
        duration: 0.7,
        stagger: 0.09,
        ease: 'power3.out'
      }, '-=0.4');

    // --- 04 EXPERIMENTATION (Floating Photos) ---
    const expTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#experiment',
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });
    expTl
      .from('#experiment .js-meta-item', {
        opacity: 0,
        y: 18,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('#experiment .chapter__title .split-word', {
        y: '100%',
        opacity: 0,
        duration: 1.1,
        stagger: 0.07,
        ease: 'power4.out'
      }, '-=0.6')
      .from('#experiment .chapter__body', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      .from('#experiment .ph--a', {
        opacity: 0,
        y: 40,
        rotation: -6,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=0.6')
      .from('#experiment .ph--b', {
        opacity: 0,
        y: 40,
        rotation: 8,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=0.8');

    // Opposing scroll drift for experimental photos
    gsap.to('#experiment .ph--a', {
      y: -35,
      ease: 'none',
      scrollTrigger: {
        trigger: '#experiment',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      }
    });
    gsap.to('#experiment .ph--b', {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: '#experiment',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.6
      }
    });

    // --- 05 PAAS (Quiet Vinyl Sleeve Reveal) ---
    const paasTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#paas',
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });
    paasTl
      .from('#paas .js-meta-item', {
        opacity: 0,
        y: 15,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('#paas .js-paas-cover', {
        scale: 0.92,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=0.5')
      .from('#paas .chapter__title .split-word', {
        y: '100%',
        opacity: 0,
        duration: 1.1,
        stagger: 0.07,
        ease: 'power4.out'
      }, '-=0.7')
      .from('#paas .chapter__statement .split-word', {
        y: '100%',
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out'
      }, '-=0.5');

    // --- 06 AISAY KAISAY (The Breakthrough — Major Turning Point) ---
    const aisayTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#aisay-kaisay',
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });
    aisayTl
      .from('#aisay-kaisay .js-meta-item', {
        opacity: 0,
        y: 18,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('#aisay-kaisay .chapter__title .split-word', {
        y: '100%',
        opacity: 0,
        duration: 1.2,
        stagger: 0.09,
        ease: 'power4.out'
      }, '-=0.6')
      .from('#aisay-kaisay .chapter__statement .split-word', {
        y: '100%',
        opacity: 0,
        duration: 0.9,
        stagger: 0.05,
        ease: 'power3.out'
      }, '-=0.5')
      .from('#aisay-kaisay .js-fade-body', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4');

    // Scrubbed background scale
    gsap.to('.js-aisay-bg', {
      scale: 1,
      y: 40,
      ease: 'none',
      scrollTrigger: {
        trigger: '#aisay-kaisay',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      }
    });

    // ========================================================
    // 07 MOMENTUM (PINNED HORIZONTAL TIMELINE SEQUENCE)
    // As the user scrolls vertically, the timeline moves smoothly
    // horizontally from left to right, revealing milestones sequentially.
    // ========================================================
    const growthSection = document.getElementById('growth');
    const track = document.getElementById('growth-timeline');
    const axisFill = document.getElementById('timeline-axis-fill');

    if (growthSection && track) {
      const items = track.querySelectorAll('.tl-item');
      
      // Calculate total horizontal distance to travel
      const getScrollDistance = () => {
        return track.scrollWidth - window.innerWidth + 280;
      };

      // Create Pinned Horizontal Timeline
      const momentumTl = gsap.timeline({
        scrollTrigger: {
          trigger: growthSection,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${Math.max(getScrollDistance(), 1400) + 600}`,
          invalidateOnRefresh: true,
        }
      });

      // 1. Title is already in place; horizontal brass axis line draws
      if (axisFill) {
        momentumTl.to(axisFill, {
          width: '100%',
          ease: 'none',
          duration: 1
        }, 0);
      }

      // 2. Track travels horizontally
      momentumTl.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        duration: 1
      }, 0);

      // 3. Milestones enter sequentially
      items.forEach((item, index) => {
        // Initial state for all items
        gsap.set(item, { opacity: 0.35 });

        // Highlight as scroll arrives at this milestone
        const progressPos = index / (items.length - 1);
        momentumTl.to(item, {
          opacity: 1,
          duration: 0.15,
          ease: 'power2.out',
          onStart: () => {
            items.forEach((it) => it.classList.remove('is-active'));
            item.classList.add('is-active');
          },
          onReverseComplete: () => {
            if (index > 0) {
              items[index - 1].classList.add('is-active');
            }
          }
        }, Math.max(0, progressPos - 0.08));
      });
    }

    // --- 08 GLOBAL (Concert Stage & Tour Roster) ---
    const globalTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#global',
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });
    globalTl
      .from('#global .js-meta-item', {
        opacity: 0,
        y: 18,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('#global .global__title .split-word', {
        y: '100%',
        opacity: 0,
        duration: 1.2,
        stagger: 0.07,
        ease: 'power4.out'
      }, '-=0.6')
      .from('.global__cities span', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.09,
        ease: 'power3.out'
      }, '-=0.5');

    gsap.to('.js-global-bg', {
      scale: 1,
      y: 35,
      ease: 'none',
      scrollTrigger: {
        trigger: '#global',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      }
    });

    // --- 09 MY TOP 3 (Song Cards Stagger) ---
    gsap.from('.top3__card', {
      opacity: 0,
      y: 40,
      duration: 0.9,
      stagger: 0.16,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#top-three',
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });

    // --- 10 TODAY ---
    const todayTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#today',
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });
    todayTl
      .from('#today .js-meta-item', {
        opacity: 0,
        y: 18,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('#today .chapter__title .split-word', {
        y: '100%',
        opacity: 0,
        duration: 1.1,
        stagger: 0.07,
        ease: 'power4.out'
      }, '-=0.6')
      .from('#today .js-fade-body', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      .fromTo('#today .js-parallax-img',
        { scale: 1.04, opacity: 0.5 },
        {
          scale: 1.0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out'
        },
        '-=0.6'
      );

    // --- 11 WHAT REMAINS ---
    gsap.from('#what-remains .remains__wrap', {
      opacity: 0,
      y: 30,
      duration: 1.4,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#what-remains',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ==========================================
  // MOBILE ANIMATIONS (< 900px)
  // Intentional reveals, touch sliders, zero jank
  // ==========================================
  mm.add('(max-width: 900px)', () => {
    // Hero entry
    gsap.from('.hero__title .split-word', {
      opacity: 0,
      y: 25,
      duration: 0.9,
      stagger: 0.05,
      ease: 'power3.out'
    });

    // Generic smooth reveals for mobile chapters
    const mobileChapters = document.querySelectorAll('section.chapter');
    mobileChapters.forEach((ch) => {
      gsap.from(ch.querySelectorAll('.chapter__title .split-word, .chapter__statement, .js-fade-body, .js-reveal-ph'), {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ch,
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Mobile Top 3 cards reveal
    gsap.from('.top3__card', {
      opacity: 0,
      y: 25,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#top-three',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
}

// 3. Mobile Swipe Track Counters
function initMobileSwipeCounters() {
  // Karachi swipe tracker
  const karachiTrack = document.getElementById('karachi-media-track');
  const karachiCounter = document.getElementById('m-karachi-counter');
  if (karachiTrack && karachiCounter) {
    karachiTrack.addEventListener('scroll', () => {
      const scrollLeft = karachiTrack.scrollLeft;
      const slideWidth = karachiTrack.clientWidth * 0.85;
      const index = Math.min(3, Math.floor((scrollLeft + slideWidth / 2) / slideWidth) + 1);
      karachiCounter.textContent = `${index} / 3`;
    }, { passive: true });
  }

  // Momentum swipe tracker
  const momentumTrack = document.getElementById('growth-timeline');
  const momentumCounter = document.getElementById('m-timeline-counter');
  if (momentumTrack && momentumCounter) {
    momentumTrack.addEventListener('scroll', () => {
      const scrollLeft = momentumTrack.scrollLeft;
      const cardWidth = momentumTrack.clientWidth * 0.85;
      const index = Math.min(7, Math.floor((scrollLeft + cardWidth / 2) / cardWidth) + 1);
      momentumCounter.textContent = `${index} / 7`;
    }, { passive: true });
  }
}
