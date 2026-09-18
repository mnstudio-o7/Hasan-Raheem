/**
 * MEDIA MODULE — HASAN RAHEEM DIGITAL STORYTELLING
 * Anime.js SVG waveform & image load handling
 */

export function initMedia() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Anime.js Waveform Drawing in Section 04 (Experimentation)
  const waveformPath = document.getElementById('waveform-path');
  if (waveformPath && window.anime && !isReducedMotion) {
    // Set initial dashoffset
    const pathLength = waveformPath.getTotalLength ? waveformPath.getTotalLength() : 400;
    waveformPath.style.strokeDasharray = pathLength;
    waveformPath.style.strokeDashoffset = pathLength;

    // Trigger Anime.js draw when Section 04 enters viewport
    if (window.ScrollTrigger) {
      window.ScrollTrigger.create({
        trigger: '#experiment',
        start: 'top 70%',
        once: true,
        onEnter: () => {
          window.anime({
            targets: waveformPath,
            strokeDashoffset: [pathLength, 0],
            easing: 'easeInOutCubic',
            duration: 2200,
            complete: () => {
              // Subtle gentle pulse oscillation
              window.anime({
                targets: waveformPath,
                opacity: [0.65, 0.9, 0.65],
                duration: 3200,
                easing: 'easeInOutSine',
                loop: true
              });
            }
          });
        }
      });
    }
  }

  // 2. Graceful image load error handling
  const allImages = document.querySelectorAll('img');
  allImages.forEach((img) => {
    img.addEventListener('error', () => {
      console.warn(`[Image Warning] Fallback triggered for: ${img.getAttribute('src')}`);
      // Fall back gracefully to background placeholder styling
      img.style.opacity = '0';
    });
  });
}
