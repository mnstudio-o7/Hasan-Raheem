/**
 * INTERACTIONS MODULE — HASAN RAHEEM DIGITAL STORYTELLING
 * Motion-powered micro-interactions & Song Cards
 */

export const songsConfig = {
  dilKayParday: {
    id: "dil-kay-parday",
    title: "DIL KAY PARDAY",
    url: "https://music.youtube.com/watch?v=wvPqTrK7zRg&si=xvrUhPRQ7pkQLiuf"
  },
  kanwal: {
    id: "kanwal",
    title: "KANWAL",
    url: "https://music.youtube.com/watch?v=VszzbwvWW_g&si=qIVRXk8ZjRPSuTGZ"
  },
  khoj: {
    id: "khoj",
    title: "KHOJ",
    url: "https://music.youtube.com/watch?v=vpjF5DW8axw&si=8ud7wivv7sALy7ee"
  }
};

export function initInteractions() {
  const songCards = document.querySelectorAll('.js-song-card');
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Use Motion library (window.Motion or window.motion) for micro-interactions
  const motionLib = window.Motion || window.motion;

  songCards.forEach((card) => {
    const arrow = card.querySelector('.top3__arrow');
    const songTitle = card.querySelector('.top3__song');
    const cardMedia = card.querySelector('.top3__card-img');

    if (isReducedMotion) return;

    // Desktop hover micro-interactions via Motion
    card.addEventListener('mouseenter', () => {
      if (motionLib && motionLib.animate) {
        motionLib.animate(card, { y: -4 }, { duration: 0.35, easing: [0.16, 1, 0.3, 1] });
        if (arrow) {
          motionLib.animate(arrow, { x: 5, y: -3, opacity: 1 }, { duration: 0.25, easing: 'ease-out' });
        }
        if (cardMedia) {
          motionLib.animate(cardMedia, { scale: 1.04 }, { duration: 0.5, easing: [0.16, 1, 0.3, 1] });
        }
      }
    });

    card.addEventListener('mouseleave', () => {
      if (motionLib && motionLib.animate) {
        motionLib.animate(card, { y: 0 }, { duration: 0.35, easing: [0.16, 1, 0.3, 1] });
        if (arrow) {
          motionLib.animate(arrow, { x: 0, y: 0, opacity: 0.6 }, { duration: 0.25, easing: 'ease-out' });
        }
        if (cardMedia) {
          motionLib.animate(cardMedia, { scale: 1 }, { duration: 0.5, easing: [0.16, 1, 0.3, 1] });
        }
      }
    });

    // Touch tap feedback
    card.addEventListener('touchstart', () => {
      if (motionLib && motionLib.animate) {
        motionLib.animate(card, { scale: 0.98 }, { duration: 0.15 });
      }
    }, { passive: true });

    card.addEventListener('touchend', () => {
      if (motionLib && motionLib.animate) {
        motionLib.animate(card, { scale: 1 }, { duration: 0.25 });
      }
    }, { passive: true });
  });
}
