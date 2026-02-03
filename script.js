// Main variables
let currentPage = 0;
const pages = document.querySelectorAll(".page");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let musicPlaying = false;
let isTyping = false;

// Letter content for typing effect
const letterContent = `My Dearest Afifa,

From the moment you came into my life, everything changed for the better.

Your smile is my sunrise, your laughter is my favorite melody, and your love is my greatest treasure.

Today, on your special day, I want the world to know how blessed I am to have someone as incredible as you.

You're not just beautiful on the outside, but your heart shines even brighter.

No matter where life takes us, my heart will always find its way back to you.

Happy Birthday, my love! May this year bring you all the happiness you so richly deserve.`;

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Hide loader after 1.5 seconds
    setTimeout(() => {
        document.body.classList.add('loaded');
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader) loader.style.display = 'none';
        }, 500);
    }, 1500);
    
    // Start continuous floating hearts
    startFloatingHearts();
    
    // Add click anywhere hearts on first page
    if (currentPage === 0) {
        document.body.addEventListener('click', createClickHeart);
    }
    
    // Setup photo click effects
    setupPhotoClickEffects();
    
    // Set up image error handling
    setupImageFallbacks();
    
    // Load music preference
    loadMusicPreference();
    
    console.log("🎉 Birthday surprise loaded for Afifa! 💖");
});

// Start continuous floating hearts
function startFloatingHearts() {
    // Create lots of hearts continuously
    setInterval(() => {
        createFloatingHeart();
    }, 300);
    
    // Create initial burst of hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createFloatingHeart(), i * 100);
    }
}

// Create a floating heart
function createFloatingHeart() {
    const heart = document.createElement("div");
    const heartTypes = ["heart-1", "heart-2", "heart-3", "heart-4", "heart-5", "heart-6", "heart-7", "heart-8", "heart-9"];
    const sizes = ["small", "", "large", "small", "", "x-large", "large", "small", ""];
    
    const heartType = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    
    heart.classList.add("heart", heartType);
    if (size) heart.classList.add(size);
    
    // Random properties
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 5 + 8) + "s";
    heart.style.setProperty('--rotation', `${Math.random() * 720 - 360}deg`);
    
    // Random color tint
    const hue = Math.random() * 60 + 300;
    heart.style.filter = `hue-rotate(${hue}deg) brightness(${1 + Math.random() * 0.3})`;
    
    document.getElementById('floating-hearts').appendChild(heart);
    
    // Remove after animation
    const duration = parseFloat(heart.style.animationDuration) * 1000;
    setTimeout(() => heart.remove(), duration);
}

// Hearts created by clicking
function createClickHeart(event) {
    const heart = document.createElement("div");
    heart.classList.add("heart", "heart-1", "large");
    heart.innerHTML = "💖";
    
    // Position at click
    heart.style.left = event.clientX + "px";
    heart.style.top = event.clientY + "px";
    heart.style.position = 'fixed';
    heart.style.animationDuration = '3s';
    heart.style.fontSize = '35px';
    heart.style.zIndex = '1000';
    
    document.getElementById('floating-hearts').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Page navigation
function nextPage() {
    playPageTransitionSound();
    createHeartBurst(8);
    
    if (currentPage < pages.length - 1) {
        pages[currentPage].classList.remove("active");
        currentPage++;
        pages[currentPage].classList.add("active");
        
        // Start typing effect on letter page (page index 3)
        if (currentPage === 3) {
            setTimeout(startTypingEffect, 800);
        }
        
        // Animate love bar on last page (page index 4)
        if (currentPage === 4) {
            setTimeout(() => {
                const loveBar = document.getElementById('loveBar');
                if (loveBar) {
                    loveBar.style.animationPlayState = 'running';
                }
            }, 500);
        }
    }
}

// Create a burst of hearts
function createHeartBurst(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => createClickHeart({
            clientX: Math.random() * window.innerWidth, 
            clientY: Math.random() * window.innerHeight
        }), i * 80);
    }
}

// Letter typing effect
function startTypingEffect() {
    if (isTyping) return;
    
    const letterElement = document.getElementById('letterText');
    if (!letterElement) return;
    
    isTyping = true;
    letterElement.innerHTML = '';
    let i = 0;
    
    function typeChar() {
        if (i < letterContent.length) {
            const char = letterContent.charAt(i);
            
            if (char === '\n') {
                letterElement.innerHTML += '<br>';
            } else {
                letterElement.innerHTML += char;
            }
            
            i++;
            
            const delay = char === '\n' ? 400 : (Math.random() * 40 + 40);
            setTimeout(typeChar, delay);
        } else {
            isTyping = false;
        }
    }
    
    setTimeout(typeChar, 300);
}

// Setup photo click effects - UPDATED VERSION: Stays until clicked
function setupPhotoClickEffects() {
    const photos = document.querySelectorAll('.photo-grid img');
    const modal = document.getElementById('complimentModal');
    const title = document.getElementById('complimentTitle');
    const text = document.getElementById('complimentText');
    
    photos.forEach(photo => {
        photo.addEventListener('click', function() {
            const compliment = this.getAttribute('data-compliment');
            
            title.textContent = "Beautiful Afifa ✨";
            text.textContent = compliment;
            
            modal.style.display = 'block';
            createHeartBurst(5);
            
            // Remove any existing auto-close timeout
            if (window.complimentTimeout) {
                clearTimeout(window.complimentTimeout);
            }
            
            // Set new auto-close timeout (10 seconds as fallback)
            window.complimentTimeout = setTimeout(() => {
                if (modal.style.display === 'block') {
                    closeCompliment();
                }
            }, 10000); // 10 seconds fallback
        });
    });
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCompliment();
        }
    });
}

// Close compliment modal - UPDATED VERSION
function closeCompliment() {
    // Clear the timeout if it exists
    if (window.complimentTimeout) {
        clearTimeout(window.complimentTimeout);
    }
    
    // Hide the modal
    const modal = document.getElementById('complimentModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Music control
function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play().then(() => {
            musicPlaying = true;
            musicBtn.innerHTML = "🎵";
            musicBtn.style.opacity = '1';
            saveMusicPreference(true);
        }).catch(error => {
            musicBtn.innerHTML = "▶️";
            musicBtn.style.opacity = '0.7';
            musicBtn.title = "Click to play music";
            console.log("Autoplay prevented");
        });
    } else {
        bgMusic.pause();
        musicBtn.innerHTML = "🔇";
        musicBtn.style.opacity = '0.7';
        musicPlaying = false;
        saveMusicPreference(false);
    }
}

// Save music preference
function saveMusicPreference(playing) {
    localStorage.setItem('birthdayMusic', playing ? 'on' : 'off');
}

// Load music preference
function loadMusicPreference() {
    const savedPref = localStorage.getItem('birthdayMusic');
    if (savedPref === 'on') {
        setTimeout(() => {
            toggleMusic();
        }, 1000);
    }
}

// Page transition sound
function playPageTransitionSound() {
    // Simple beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 523.25; // C5
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.log("Audio context not supported");
    }
}

// Image fallback setup
function setupImageFallbacks() {
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            this.src = 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=400&q=80';
            this.alt = 'Beautiful Placeholder';
            this.style.filter = 'none';
        };
    });
}

// Celebration function
function launchCelebration() {
    createMassiveConfetti();
    createPartyPoppers();
    createFireworksBurst();
    
    setTimeout(() => {
        alert("🎉🎂 HAPPY BIRTHDAY AFIFA! 🎂🎉\nYou're the most amazing person in my world!\nI love you more than words can say! ❤️");
    }, 500);
}

// Create massive confetti
function createMassiveConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    container.innerHTML = '';
    container.style.display = 'block';
    
    const colors = ['#ff6b9d', '#ffb6c1', '#ff4757', '#ffd700', '#ffa500', '#9370db', '#8a2be2', '#00ced1', '#32cd32'];
    const paperTypes = ['paper-1', 'paper-2', 'paper-3', 'paper-4', 'paper-5'];
    
    for (let i = 0; i < 200; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.classList.add(paperTypes[Math.floor(Math.random() * paperTypes.length)]);
            
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
            confetti.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
            confetti.style.opacity = '0.8';
            
            container.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 6000);
        }, i * 20);
    }
    
    setTimeout(() => {
        container.style.display = 'none';
    }, 6000);
}

// Create party poppers
function createPartyPoppers() {
    const container = document.getElementById('confetti-container');
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const popper = document.createElement('div');
            popper.classList.add('party-popper');
            popper.innerHTML = '🎉';
            popper.style.left = (Math.random() * 70 + 15) + 'vw';
            popper.style.top = (Math.random() * 60 + 20) + 'vh';
            
            container.appendChild(popper);
            
            setTimeout(() => {
                if (popper.parentNode) {
                    popper.remove();
                }
            }, 1500);
        }, i * 300);
    }
}

// Create fireworks burst
function createFireworksBurst() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.7;
            createFirework(x, y);
        }, i * 200);
    }
}

// Create firework
function createFirework(x, y) {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    firework.style.setProperty('--fire-color', `hsl(${Math.random() * 360}, 100%, 65%)`);
    
    document.getElementById('fireworks').appendChild(firework);
    
    // Create sparks
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const spark = document.createElement('div');
            spark.classList.add('spark');
            spark.style.left = x + 'px';
            spark.style.top = y + 'px';
            spark.style.setProperty('--spark-color', `hsl(${Math.random() * 360}, 100%, 65%)`);
            spark.style.animationDelay = (Math.random() * 0.2) + 's';
            
            const angle = (i / 12) * Math.PI * 2;
            const distance = 60 + Math.random() * 40;
            spark.style.setProperty('--end-x', Math.cos(angle) * distance + 'px');
            spark.style.setProperty('--end-y', Math.sin(angle) * distance + 'px');
            
            document.getElementById('fireworks').appendChild(spark);
            
            setTimeout(() => spark.remove(), 1000);
        }, i * 30);
    }
    
    setTimeout(() => firework.remove(), 1500);
}

// Restart the experience
function restart() {
    pages[currentPage].classList.remove("active");
    currentPage = 0;
    pages[currentPage].classList.add("active");
    
    // Reset love bar
    const loveBar = document.getElementById('loveBar');
    if (loveBar) {
        loveBar.style.width = '0%';
        loveBar.style.animation = 'none';
        setTimeout(() => {
            loveBar.style.animation = 'fillLove 3s ease-out forwards';
            loveBar.style.animationPlayState = 'paused';
        }, 100);
    }
    
    // Reset letter typing
    const letterElement = document.getElementById('letterText');
    if (letterElement) {
        letterElement.innerHTML = '';
        isTyping = false;
    }
    
    // Close any open compliment modal
    closeCompliment();
    
    // Re-enable click hearts on first page
    document.body.addEventListener('click', createClickHeart);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        if (currentPage < pages.length - 1) {
            nextPage();
        }
    } else if (e.key === 'r' || e.key === 'R') {
        restart();
    } else if (e.key === 'm' || e.key === 'M') {
        toggleMusic();
    } else if (e.key === 'Escape') {
        closeCompliment();
    }
});

// Auto-start music on first click
function autoStartMusic() {
    if (!musicPlaying && bgMusic.paused) {
        toggleMusic();
    }
}

// Add auto-start music listener
document.body.addEventListener('click', autoStartMusic);