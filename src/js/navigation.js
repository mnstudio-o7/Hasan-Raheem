/**
 * NAVIGATION MODULE — HASAN RAHEEM DIGITAL STORYTELLING
 * Desktop Persistent Rail & Mobile Chapter Tracking
 */

export function initNavigation(lenis) {
  const railItems = document.querySelectorAll('.rail__item');
  const mobileChapterText = document.getElementById('m-active-chapter');
  const chapters = document.querySelectorAll('header.hero, section.chapter');

  if (!railItems.length || !chapters.length) return;

  // 1. Click-to-scroll with Lenis
  railItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSelector = item.getAttribute('data-target');
      const targetEl = document.querySelector(targetSelector);
      if (!targetEl) return;

      if (lenis) {
        lenis.scrollTo(targetEl, {
          offset: 0,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Hero scroll button click
  const heroScrollBtn = document.getElementById('hero-scroll-btn');
  if (heroScrollBtn) {
    heroScrollBtn.addEventListener('click', () => {
      const gilgit = document.getElementById('gilgit');
      if (gilgit) {
        if (lenis) {
          lenis.scrollTo(gilgit, { duration: 1.2 });
        } else {
          gilgit.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // 2. Chapter tracking via GSAP ScrollTrigger
  let currentActiveTitle = null;

  if (window.gsap && window.ScrollTrigger) {
    chapters.forEach((chapter) => {
      const id = chapter.id;
      const chapterTitle = chapter.getAttribute('data-chapter-title') || id.toUpperCase();
      const matchingRailItem = document.querySelector(`.rail__item[data-target="#${id}"]`);

      window.ScrollTrigger.create({
        trigger: chapter,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => setActive(matchingRailItem, chapterTitle),
        onEnterBack: () => setActive(matchingRailItem, chapterTitle),
      });
    });
  }

  function setActive(activeItem, titleText) {
    railItems.forEach((item) => item.classList.remove('is-current'));
    if (activeItem) {
      activeItem.classList.add('is-current');
    }
    if (mobileChapterText && titleText) {
      if (currentActiveTitle === null) {
        currentActiveTitle = titleText;
        mobileChapterText.textContent = titleText;
        mobileChapterText.style.opacity = '1';
        mobileChapterText.style.transform = 'translateY(0)';
      } else if (titleText !== currentActiveTitle) {
        currentActiveTitle = titleText;
        mobileChapterText.style.opacity = '0';
        mobileChapterText.style.transform = 'translateY(-3px)';
        setTimeout(() => {
          mobileChapterText.textContent = titleText;
          mobileChapterText.style.opacity = '1';
          mobileChapterText.style.transform = 'translateY(0)';
        }, 160);
      }
    }
  }
}
