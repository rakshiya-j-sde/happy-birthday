/**
 * Happy Birthday Akash V! - Interactive Surprise Website Scripts
 * 20th Birthday Celebration • 24/10/2026 • Akshuu
 * Countdown Experience, Greeting Letter Popup, Full Original Story & Tamil Audio
 */

(function () {
  "use strict";

  // Default fallback data for Akash V (guarantees offline & file:// compatibility)
  const defaultData = {
    greeting: "Hey",
    name: "Akash V",
    nickname: "Akshuu",
    birthdayDate: "24/10/2026",
    milestone: "20th Birthday",
    greetingText: "Today is all about celebrating you!",
    wishHeading: "Happy Birthday, Akash V.! 🎂",
    wishSubheading: "24/10/2026 • Happyyyy 20th Birthdayyy Akshuu! 🎉💙",
    wishText: "Happy Birthday, Akash V.! 🎉💙 Wishing you many more happy returns of the day, endless happiness, good health, success in everything you pursue, and countless beautiful memories. May this new chapter of your life bring you exciting opportunities, peaceful moments, genuine smiles, and everything your heart wishes for. Keep shining, keep smiling, and never stop being the amazing person you are. Have the most wonderful birthday!",
    imagePath: "img/akash.jpg",
    audioPath: "audio/birthday-song.mp3",
    text1: "It's your special day, Akash! 🎉",
    textInChatBox: "Happy 20th birthday to you!! Wishing you many many happy returns of the day Akshuu...",
    sendButtonLabel: "Send 💙",
    text2: "Sending a plain text message was an option...",
    text3: "But then I stopped.",
    text4: "I realised, I wanted to do something truly",
    text4Adjective: "special & magical",
    text5Entry: "Because,",
    text5Content: "You are extraordinary, Akash",
    smiley: "✨",
    bigTextPart1: "S",
    bigTextPart2: "O",
    outroText: "Hope this brought a bright smile to your face today, Akshuu!",
    replayText: "Click here if you want to watch the story again 💜",
    outroSmiley: "🎂"
  };

  // -------------------------------------------------------------
  // 1. Safe Data Fetching & Dynamic Node Injection
  // -------------------------------------------------------------
  const applyDataToDOM = (data) => {
    const keys = Object.keys(data);
    keys.forEach((key) => {
      // Use exact attribute matching to prevent substring overwrite conflicts
      const elements = document.querySelectorAll(`[data-node-name="${key}"]`);
      elements.forEach((el) => {
        if (key === "imagePath") {
          el.setAttribute("src", data[key]);
        } else {
          el.innerText = data[key];
        }
      });
    });

    // Fallback for avatar photos
    const avatars = document.querySelectorAll("img[src*='akash'], .letter-avatar-img, .story-avatar-img");
    avatars.forEach((img) => {
      img.onerror = () => {
        console.warn("Avatar image failed to load, falling back to default image.");
        img.onerror = null;
        img.src = "img/lydia2.png";
      };
    });
  };

  const fetchData = () => {
    applyDataToDOM(defaultData);

    fetch("customize.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then((data) => {
        const merged = Object.assign({}, defaultData, data);
        applyDataToDOM(merged);
      })
      .catch((err) => {
        console.warn("Using default birthday data (customize.json fallback):", err);
      });
  };

  // -------------------------------------------------------------
  // 2. Theme Toggle (Light / Dark Mode with LocalStorage)
  // -------------------------------------------------------------
  const initTheme = () => {
    const themeText = document.getElementById("theme-text");
    const savedTheme = localStorage.getItem("akash_birthday_theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTheme = savedTheme || (prefersDark ? "dark" : "light");

    const setTheme = (theme) => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("akash_birthday_theme", theme);
      if (themeText) {
        themeText.innerText = theme === "dark" ? "Dark" : "Light";
      }
    };

    setTheme(currentTheme);

    window.toggleTheme = () => {
      const activeTheme = document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = activeTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    };
  };

  // -------------------------------------------------------------
  // 3. Lightweight Background Stars Particle Canvas
  // -------------------------------------------------------------
  const initParticles = () => {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const particles = [];
    const particleCount = Math.min(width > 768 ? 45 : 25, 50);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        alpha: Math.random() * 0.7 + 0.3,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: (Math.random() - 0.5) * 0.35,
        color: ["#c4b5fd", "#93c5fd", "#fbcfe8", "#ffffff"][Math.floor(Math.random() * 4)]
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();

        if (!prefersReducedMotion) {
          p.x += p.speedX;
          p.y += p.speedY;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }
      });

      if (!prefersReducedMotion) {
        requestAnimationFrame(drawParticles);
      }
    };

    drawParticles();

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      if (prefersReducedMotion) drawParticles();
    });
  };

  // -------------------------------------------------------------
  // 4. Lightweight Confetti Cannon Engine
  // -------------------------------------------------------------
  const triggerConfetti = (durationMs = 3200) => {
    const canvas = document.getElementById("confetti-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const confettiPieces = [];
    const colors = ["#a78bfa", "#38bdf8", "#f472b6", "#fbbf24", "#818cf8", "#34d399", "#ffffff"];
    const count = 100;

    for (let i = 0; i < count; i++) {
      confettiPieces.push({
        x: width / 2 + (Math.random() - 0.5) * 260,
        y: height * 0.4 + (Math.random() - 0.5) * 120,
        vx: (Math.random() - 0.5) * 14,
        vy: -(Math.random() * 12 + 6),
        gravity: 0.38,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 1
      });
    }

    const startTime = Date.now();

    const animateConfetti = () => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, width, height);

      let activePieces = 0;

      confettiPieces.forEach((p) => {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (elapsed > durationMs - 1000) {
          p.opacity = Math.max(0, 1 - (elapsed - (durationMs - 1000)) / 1000);
        }

        if (p.y < height && p.opacity > 0) {
          activePieces++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      if (activePieces > 0 && elapsed < durationMs) {
        requestAnimationFrame(animateConfetti);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    animateConfetti();
  };
  window.triggerConfetti = triggerConfetti;

  // -------------------------------------------------------------
  // 5. Rising Balloons Spawner
  // -------------------------------------------------------------
  const launchBalloons = () => {
    const layer = document.getElementById("page-balloons-layer");
    if (!layer) return;

    const balloonImages = ["img/ballon1.svg", "img/ballon2.svg", "img/ballon3.svg"];
    const balloonCount = 18;

    for (let i = 0; i < balloonCount; i++) {
      const balloon = document.createElement("img");
      balloon.src = balloonImages[i % balloonImages.length];
      balloon.className = "rising-balloon";
      balloon.style.left = `${Math.random() * 90 + 5}%`;
      balloon.style.width = `${Math.random() * 30 + 50}px`;
      balloon.style.animationDelay = `${Math.random() * 2}s`;
      balloon.style.animationDuration = `${Math.random() * 3 + 6}s`;

      layer.appendChild(balloon);

      setTimeout(() => {
        balloon.remove();
      }, 9500);
    }
  };
  window.launchBalloons = launchBalloons;

  // -------------------------------------------------------------
  // 6. Toast Notification Helper
  // -------------------------------------------------------------
  const showToast = (message) => {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  };
  window.showToast = showToast;

  // -------------------------------------------------------------
  // 7. Audio Controller (Tamil Song + Melodic Fallback)
  // -------------------------------------------------------------
  let audioCtx = null;
  let isPlayingAudio = false;
  let synthMelodyTimeout = null;

  const playSynthesizedNote = (freq, duration, startTime) => {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.18, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration - 0.05);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {
      console.error(e);
    }
  };

  const playPip = (freq = 660) => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === "suspended") audioCtx.resume();
    playSynthesizedNote(freq, 0.15, audioCtx.currentTime);
  };

  const playCelebrationFanfare = () => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === "suspended") audioCtx.resume();

    const now = audioCtx.currentTime;
    playSynthesizedNote(523.25, 0.25, now);        // C5
    playSynthesizedNote(659.25, 0.25, now + 0.15); // E5
    playSynthesizedNote(783.99, 0.35, now + 0.3);  // G5
    playSynthesizedNote(1046.5, 0.8, now + 0.45);  // C6
  };

  const playSynthesizedMelody = () => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === "suspended") audioCtx.resume();

    const melodyNotes = [
      { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.25 }, { f: 293.66, d: 0.6 },
      { f: 261.63, d: 0.6 },  { f: 349.23, d: 0.6 },  { f: 329.63, d: 1.1 },
      { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.25 }, { f: 293.66, d: 0.6 },
      { f: 261.63, d: 0.6 },  { f: 392.00, d: 0.6 },  { f: 349.23, d: 1.1 },
      { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.25 }, { f: 523.25, d: 0.6 },
      { f: 440.00, d: 0.6 },  { f: 349.23, d: 0.6 },  { f: 329.63, d: 0.6 },
      { f: 293.66, d: 0.8 },  { f: 466.16, d: 0.35 }, { f: 466.16, d: 0.25 },
      { f: 440.00, d: 0.6 },  { f: 349.23, d: 0.6 },  { f: 392.00, d: 0.6 },
      { f: 349.23, d: 1.4 }
    ];

    let currentNoteTime = audioCtx.currentTime + 0.1;
    let totalDuration = 0;

    melodyNotes.forEach((n) => {
      playSynthesizedNote(n.f, n.d, currentNoteTime);
      currentNoteTime += n.d + 0.08;
      totalDuration += n.d + 0.08;
    });

    synthMelodyTimeout = setTimeout(() => {
      stopAudio();
    }, totalDuration * 1000);
  };

  const updateAudioUI = (playing) => {
    const audioBtn = document.getElementById("audio-toggle-btn");
    const label = document.getElementById("melody-label");

    if (audioBtn) {
      audioBtn.setAttribute("aria-pressed", playing ? "true" : "false");
      if (playing) {
        audioBtn.classList.add("active");
        if (label) label.innerText = "Playing";
      } else {
        audioBtn.classList.remove("active");
        if (label) label.innerText = "Music";
      }
    }
  };

  const startAudio = () => {
    const audioEl = document.getElementById("birthday-audio");
    isPlayingAudio = true;
    updateAudioUI(true);

    if (audioEl) {
      const playPromise = audioEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            showToast("Playing Birthday Music 🎵");
          })
          .catch((err) => {
            console.info("Using Web Audio celebration melody fallback:", err);
            playSynthesizedMelody();
            showToast("Playing Birthday Melody 🎶");
          });
      }
    } else {
      playSynthesizedMelody();
      showToast("Playing Birthday Melody 🎶");
    }
  };
  window.startAudio = startAudio;

  const stopAudio = () => {
    const audioEl = document.getElementById("birthday-audio");
    isPlayingAudio = false;
    updateAudioUI(false);

    if (audioEl) audioEl.pause();
    if (synthMelodyTimeout) clearTimeout(synthMelodyTimeout);
  };
  window.stopAudio = stopAudio;

  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopAudio();
      showToast("Music paused ⏸️");
    } else {
      startAudio();
    }
  };
  window.toggleAudio = toggleAudio;

  // -------------------------------------------------------------
  // 8. Countdown Experience (3 -> 2 -> 1 -> Banner -> Letter Popup)
  // -------------------------------------------------------------
  let countdownTimer = null;

  const startCountdownExperience = () => {
    const overlay = document.getElementById("countdown-overlay");
    const display = document.getElementById("countdown-display");
    const banner = document.getElementById("countdown-banner");

    if (!overlay || !display || !banner) return;

    // Reset overlay elements
    display.style.display = "block";
    display.innerText = "3";
    banner.style.display = "none";

    overlay.style.display = "flex";
    setTimeout(() => { overlay.classList.add("active"); }, 20);

    playPip(520);
    let count = 3;

    if (countdownTimer) clearInterval(countdownTimer);

    countdownTimer = setInterval(() => {
      count--;

      if (count > 0) {
        display.innerText = count.toString();
        playPip(count === 2 ? 660 : 780);
      } else if (count === 0) {
        clearInterval(countdownTimer);
        display.style.display = "none";
        banner.style.display = "block";

        playCelebrationFanfare();
        triggerConfetti(3500);
        launchBalloons();
        startAudio();

        // After the milestone banner shows, open the Greeting Letter POPUP!
        setTimeout(() => {
          closeCountdown();
          openLetterModal();
        }, 1800);
      }
    }, 1000);
  };
  window.startCountdownExperience = startCountdownExperience;

  const closeCountdown = () => {
    const overlay = document.getElementById("countdown-overlay");
    if (countdownTimer) clearInterval(countdownTimer);
    if (overlay) {
      overlay.classList.remove("active");
      setTimeout(() => { overlay.style.display = "none"; }, 350);
    }
  };
  window.closeCountdown = closeCountdown;

  const skipCountdown = () => {
    closeCountdown();
    startAudio();
    triggerConfetti(3000);
    launchBalloons();
    openLetterModal();
  };
  window.skipCountdown = skipCountdown;

  // -------------------------------------------------------------
  // 9. Greeting Letter Popup Modal
  // -------------------------------------------------------------
  const openLetterModal = () => {
    const modal = document.getElementById("letter-modal");
    if (!modal) return;

    modal.style.display = "flex";
    setTimeout(() => { modal.classList.add("active"); }, 20);
    triggerConfetti(2800);

    // Also smoothly scroll to letter section in background
    const surpriseSection = document.getElementById("surprise-section");
    if (surpriseSection) {
      surpriseSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  window.openLetterModal = openLetterModal;

  const closeLetterModal = () => {
    const modal = document.getElementById("letter-modal");
    if (!modal) return;

    modal.classList.remove("active");
    setTimeout(() => { modal.style.display = "none"; }, 350);
  };
  window.closeLetterModal = closeLetterModal;

  // -------------------------------------------------------------
  // 10. Interactive Story Player (All Original Messages Fully Working!)
  // -------------------------------------------------------------
  let currentScene = 0;
  const totalScenes = 7;
  let autoplayTimer = null;
  let isAutoplayActive = true;
  let isSceneTransitioning = false;

  const showScene = (index) => {
    if (index < 0 || index >= totalScenes || isSceneTransitioning) return;

    isSceneTransitioning = true;
    currentScene = index;

    // Update scenes
    const scenes = document.querySelectorAll(".story-scene");
    scenes.forEach((scene, i) => {
      if (i === currentScene) {
        scene.classList.add("active");
      } else {
        scene.classList.remove("active");
      }
    });

    // Update progress dots
    const dots = document.querySelectorAll(".story-dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentScene);
    });

    // Update scene indicator text
    const indicator = document.getElementById("story-step-indicator");
    if (indicator) {
      indicator.innerText = `Scene ${currentScene + 1} of ${totalScenes}`;
    }

    // Update Prev / Next buttons
    const prevBtn = document.getElementById("story-prev-btn");
    const nextBtn = document.getElementById("story-next-btn");

    if (prevBtn) prevBtn.disabled = currentScene === 0;
    if (nextBtn) {
      if (currentScene === totalScenes - 1) {
        nextBtn.innerText = "Letter 💌";
      } else {
        nextBtn.innerText = "Next \u2192";
      }
    }

    // Grand portrait reveal celebration
    if (currentScene === 5) {
      triggerConfetti(2500);
      launchBalloons();
    }

    setTimeout(() => {
      isSceneTransitioning = false;
    }, 450);
  };
  window.showScene = showScene;

  const nextScene = () => {
    if (currentScene < totalScenes - 1) {
      showScene(currentScene + 1);
    } else {
      closeStoryModal();
      openLetterModal();
    }
  };
  window.nextScene = nextScene;

  const prevScene = () => {
    if (currentScene > 0) {
      showScene(currentScene - 1);
    }
  };
  window.prevScene = prevScene;

  const startStoryAutoplay = () => {
    stopStoryAutoplay();
    isAutoplayActive = true;
    updateAutoplayUI(true);

    autoplayTimer = setInterval(() => {
      if (currentScene < totalScenes - 1) {
        nextScene();
      } else {
        stopStoryAutoplay();
      }
    }, 4600);
  };
  window.startStoryAutoplay = startStoryAutoplay;

  const stopStoryAutoplay = () => {
    isAutoplayActive = false;
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
    updateAutoplayUI(false);
  };
  window.stopStoryAutoplay = stopStoryAutoplay;

  const toggleStoryAutoplay = () => {
    if (isAutoplayActive) {
      stopStoryAutoplay();
      showToast("Story paused ⏸️");
    } else {
      startStoryAutoplay();
      showToast("Story playing ▶️");
    }
  };
  window.toggleStoryAutoplay = toggleStoryAutoplay;

  const updateAutoplayUI = (active) => {
    const icon = document.getElementById("story-autoplay-icon");
    const text = document.getElementById("story-autoplay-text");
    if (icon) icon.innerText = active ? "⏸️" : "▶️";
    if (text) text.innerText = active ? "Pause" : "Play";
  };

  const openStoryModal = () => {
    const modal = document.getElementById("story-modal");
    if (!modal) return;

    modal.style.display = "flex";
    setTimeout(() => { modal.classList.add("active"); }, 20);
    showScene(0);
    startStoryAutoplay();
  };
  window.openStoryModal = openStoryModal;

  const closeStoryModal = () => {
    const modal = document.getElementById("story-modal");
    stopStoryAutoplay();

    if (modal) {
      modal.classList.remove("active");
      setTimeout(() => { modal.style.display = "none"; }, 350);
    }
  };
  window.closeStoryModal = closeStoryModal;

  // Chatbox Send message interaction
  const sendChatMsg = () => {
    const btn = document.getElementById("story-send-btn");
    if (btn) {
      btn.style.backgroundColor = "#0284c7";
      btn.innerText = "Sent! 💙";
      triggerConfetti(1500);
      setTimeout(nextScene, 600);
    }
  };
  window.sendChatMsg = sendChatMsg;

  // Candle Wish interaction
  let candleBlown = false;
  const blowCandle = () => {
    const flame = document.getElementById("candle-flame");
    const label = document.getElementById("candle-label");

    if (!candleBlown) {
      candleBlown = true;
      if (flame) flame.innerText = "💨";
      if (label) label.innerText = "Wish Made! ✨";
      triggerConfetti(2200);
      showToast("Your 20th birthday wish has been sent to the stars, Akshuu! 🌟");

      setTimeout(() => {
        if (flame) flame.innerText = "✨";
        if (label) label.innerText = "Make Another Wish";
        candleBlown = false;
      }, 4000);
    }
  };
  window.blowCandle = blowCandle;

  // Copy Letter Text
  const copyLetterText = () => {
    const textToCopy = `Dearest Akash V (Akshuu),\n\nHappy Birthday, Akash V.! 🎉💙\n\nWishing you many more happy returns of the day, endless happiness, good health, success in everything you pursue, and countless beautiful memories. May this new chapter of your life bring you exciting opportunities, peaceful moments, genuine smiles, and everything your heart wishes for. Keep shining, keep smiling, and never stop being the amazing person you are. Have the most wonderful birthday!\n\nDate: 24th October, 2026 • 20th Milestone Birthday ✨`;

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        const copyBtnText = document.getElementById("copy-btn-text");
        if (copyBtnText) copyBtnText.innerText = "Copied! 💙";
        showToast("Birthday letter copied to clipboard! 📋");
        setTimeout(() => {
          if (copyBtnText) copyBtnText.innerText = "Copy Letter";
        }, 2500);
      })
      .catch(() => {
        showToast("You can select and copy the letter text!");
      });
  };
  window.copyLetterText = copyLetterText;

  // -------------------------------------------------------------
  // 11. Event Listeners & Binding
  // -------------------------------------------------------------
  const initEventListeners = () => {
    const surpriseBtn = document.getElementById("open-surprise-btn");
    if (surpriseBtn) {
      surpriseBtn.addEventListener("click", startCountdownExperience);
    }

    const heroStoryBtn = document.getElementById("hero-story-btn");
    if (heroStoryBtn) {
      heroStoryBtn.addEventListener("click", openStoryModal);
    }

    // Keyboard support
    document.addEventListener("keydown", (e) => {
      const storyModal = document.getElementById("story-modal");
      const countdownOverlay = document.getElementById("countdown-overlay");
      const letterModal = document.getElementById("letter-modal");

      if (e.key === "Escape") {
        if (storyModal && storyModal.classList.contains("active")) closeStoryModal();
        if (countdownOverlay && countdownOverlay.classList.contains("active")) closeCountdown();
        if (letterModal && letterModal.classList.contains("active")) closeLetterModal();
      }

      if (storyModal && storyModal.classList.contains("active")) {
        if (e.key === "ArrowRight") nextScene();
        if (e.key === "ArrowLeft") prevScene();
      }
    });
  };

  // -------------------------------------------------------------
  // Initialize Everything on DOM Ready
  // -------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initParticles();
    fetchData();
    initEventListeners();
  });
})();