/**
 * MAIN ENTRY POINT — HASAN RAHEEM DIGITAL STORYTELLING
 * Coordination of Lenis, GSAP, SplitText, Motion, and Anime.js
 */

import { prepareSplitText, initAnimations } from './animations.js';
import { initNavigation } from './navigation.js';
import { initInteractions } from './interactions.js';
import { initMedia } from './media.js';

document.addEventListener('DOMContentLoaded', () => {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lenisInstance = null;

  // 1. Initialize Lenis for Smooth Scrolling (Desktop & Non-Reduced Motion)
  if (!isReducedMotion && typeof window.Lenis !== 'undefined') {
    try {
      lenisInstance = new window.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        infinite: false
      });

      // Synchronize Lenis with GSAP ScrollTrigger
      if (window.ScrollTrigger && window.gsap) {
        lenisInstance.on('scroll', window.ScrollTrigger.update);
        window.gsap.ticker.add((time) => {
          lenisInstance.raf(time * 1000);
        });
        window.gsap.ticker.lagSmoothing(0);
      } else {
        // Fallback requestAnimationFrame loop
        function raf(time) {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    } catch (err) {
      console.warn('[Lenis Initialization Warning]:', err);
    }
  }

  // 2. Prepare Accessible SplitText
  try {
    prepareSplitText();
  } catch (err) {
    console.warn('[SplitText Preparation Warning]:', err);
  }

  // 3. Initialize GSAP Choreography & ScrollTriggers
  try {
    initAnimations();
  } catch (err) {
    console.warn('[Animations Initialization Warning]:', err);
  }

  // 4. Initialize Rail & Chapter Navigation
  try {
    initNavigation(lenisInstance);
  } catch (err) {
    console.warn('[Navigation Initialization Warning]:', err);
  }

  // 5. Initialize Motion Micro-interactions
  try {
    initInteractions();
  } catch (err) {
    console.warn('[Interactions Initialization Warning]:', err);
  }

  // 6. Initialize Anime.js Waveform & Media
  try {
    initMedia();
  } catch (err) {
    console.warn('[Media Initialization Warning]:', err);
  }

  // 7. Refresh ScrollTrigger when web fonts are loaded
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
    });
  }

  // 8. Refresh ScrollTrigger once all images have completed loading
  window.addEventListener('load', () => {
    if (window.ScrollTrigger) {
      window.ScrollTrigger.refresh();
    }
  });
});
