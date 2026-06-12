/**
 * Portfolio Interactivity & Animation Controller
 * Author: Aditya Dhamane
 */

document.addEventListener('DOMContentLoaded', () => {



  /* ==========================================================================
     CINEMATIC ENTER EXPERIENCE & AUTOPLAY HANDLER
     ========================================================================== */
  const heroVideo = document.getElementById('hero-video');
  const splashOverlay = document.getElementById('splash-overlay');
  const enterBtn = document.getElementById('enter-btn');

  if (heroVideo && splashOverlay && enterBtn) {
    // Autoplay the video muted immediately in the background behind the blur overlay
    heroVideo.muted = true;
    heroVideo.play().catch(err => console.log("Background autoplay failed:", err));

    enterBtn.addEventListener('click', () => {
      // Reset video to the beginning, unmute and ensure it plays with sound (approved by browser click gesture)
      heroVideo.muted = false;
      heroVideo.volume = 1.0;
      heroVideo.currentTime = 0;
      
      heroVideo.play().then(() => {
        console.log("Video playing unmuted successfully!");
      }).catch(err => {
        console.log("Playback failed on click gesture:", err);
      });

      // Dismiss the splash screen with a fade-out transition
      splashOverlay.classList.add('fade-out');
    });
  }

  // Play/Pause Video Playback Controller
  const playbackToggleBtn = document.getElementById('playback-toggle-btn');
  const playbackIcon = playbackToggleBtn ? playbackToggleBtn.querySelector('i') : null;

  if (playbackToggleBtn && heroVideo) {
    playbackToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (heroVideo.paused) {
        heroVideo.play().then(() => {
          if (playbackIcon) playbackIcon.className = 'fa-solid fa-pause';
          playbackToggleBtn.setAttribute('aria-label', 'Pause Video');
        }).catch(err => console.log("Playback failed:", err));
      } else {
        heroVideo.pause();
        if (playbackIcon) playbackIcon.className = 'fa-solid fa-play';
        playbackToggleBtn.setAttribute('aria-label', 'Play Video');
      }
    });
  }

  /* ==========================================================================
     TYPING TITLES ANIMATION
     ========================================================================== */
  const typedTitleElement = document.getElementById('typed-title');
  if (typedTitleElement) {
    const titles = [
      "computer engineer",
      "Software Engineer",
      "Full-stack developer",
      "Vibe Coder",
      "AI-Augmented Full-Stack Developer"
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentTitle = titles[titleIndex];
      
      if (isDeleting) {
        typedTitleElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typedTitleElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentTitle.length) {
        typingSpeed = 1800; // Pause when title fully typed
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500; // Pause when word is completely deleted
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  /* ==========================================================================
     MOBILE WARNING POPUP CONTROLLER
     ========================================================================== */
  const warningPopup = document.getElementById('mobile-warning-popup');
  const warningOkBtn = document.getElementById('warning-ok-btn');

  if (warningPopup && warningOkBtn) {
    warningOkBtn.addEventListener('click', () => {
      warningPopup.classList.add('hidden');
    });
  }

});
