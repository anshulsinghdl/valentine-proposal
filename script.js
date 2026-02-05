// Create animated particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const hearts = ['💕', '💖', '💗', '💝', '💓', '💞'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => heart.remove(), 12000);
    }, 800);
}

// Envelope opening animation
const envelopeWrapper = document.getElementById('envelopeWrapper');
const envelope = document.querySelector('.envelope');
const mainContent = document.getElementById('mainContent');

envelope.addEventListener('click', function() {
    envelope.classList.add('opening');
    
    setTimeout(() => {
        envelopeWrapper.style.opacity = '0';
        envelopeWrapper.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            envelopeWrapper.style.display = 'none';
            mainContent.classList.add('show');
        }, 600);
    }, 1000);
});

// Get elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const response = document.getElementById('response');
const hint = document.getElementById('hint');
const card = document.querySelector('.card');

// Track states
let hasClickedYes = false;
let noClickCount = 0;
const hintMessages = [
    "The 'No' button seems shy... 😊",
    "Maybe try the other button? 💕",
    "The 'Yes' button is looking pretty good! ✨",
    "I promise the 'Yes' button won't run away! 💖",
    "Come on, you know you want to click 'Yes'! 😉"
];

// Yes button click
yesBtn.addEventListener('click', function() {
    if (hasClickedYes) return;
    
    hasClickedYes = true;
    
    // Create response with SVG heart gradient
    const svg = `
        <svg width="0" height="0">
            <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ff6b9d;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#f5576c;stop-opacity:1" />
                </linearGradient>
            </defs>
        </svg>
    `;
    
    response.classList.remove('hidden');
    response.classList.add('success');
    response.innerHTML = svg + '🎉 Yay! This makes me so happy! 💕<br><small style="font-size:0.8em; margin-top:10px; display:block;">I can\'t wait for our special Valentine\'s Day together! 🌹</small>';
    
    // Hide buttons and hint
    document.querySelector('.button-container').style.display = 'none';
    hint.classList.remove('show');
    
    // Start confetti
    startConfetti();
    
    // Update title
    const titleMain = document.querySelector('.title-main');
    titleMain.textContent = "You Made My Day! 💖";
    
    // Add extra sparkle effect
    createSparkles();
});

// No button hover effect - make it run away
let noBtnPosition = { x: 0, y: 0 };

noBtn.addEventListener('mouseenter', function() {
    moveNoButton();
    noClickCount++;
    
    // Show hint message
    if (noClickCount <= hintMessages.length) {
        hint.textContent = hintMessages[noClickCount - 1];
        hint.classList.add('show');
    }
    
    // Make Yes button bigger
    yesBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        if (!hasClickedYes) yesBtn.style.transform = 'scale(1)';
    }, 300);
});

function moveNoButton() {
    // Get the button container dimensions instead of card
    const container = document.querySelector('.button-container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate safe movement area within container
    const maxX = containerRect.width - btnRect.width - 20;
    const maxY = containerRect.height - btnRect.height - 20;
    
    // Generate random position
    const newX = Math.random() * Math.max(maxX, 50);
    const newY = Math.random() * Math.max(maxY, 20);
    
    noBtnPosition = { x: newX, y: newY };
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.transition = 'all 0.3s ease';
}

// Mobile: if they somehow click No
noBtn.addEventListener('click', function(e) {
    e.preventDefault();
    moveNoButton();
    noClickCount++;
    
    if (noClickCount <= hintMessages.length) {
        hint.textContent = hintMessages[noClickCount - 1];
        hint.classList.add('show');
    }
    
    // On mobile, also move it
    setTimeout(moveNoButton, 100);
});

// Sparkle effect
function createSparkles() {
    const sparkleCount = 30;
    
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.left = Math.random() * window.innerWidth + 'px';
            sparkle.style.top = Math.random() * window.innerHeight + 'px';
            sparkle.style.fontSize = (Math.random() * 20 + 20) + 'px';
            sparkle.textContent = ['✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 4)];
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 2000);
        }, i * 50);
    }
}

// Add sparkle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 0;
            transform: translateY(0) scale(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-100px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-200px) scale(0);
        }
    }
`;
document.head.appendChild(style);

// Confetti animation
function startConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiCount = 200;
    const confetti = [];
    
    const colors = ['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#ffd700', '#ff6b9d', '#c06c84'];
    
    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * confettiCount,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 10,
            tiltAngleIncremental: Math.random() * 0.07 + 0.05,
            tiltAngle: 0
        });
    }
    
    let animationFrame;
    
    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach((c, index) => {
            ctx.beginPath();
            ctx.lineWidth = c.r / 2;
            ctx.strokeStyle = c.color;
            ctx.moveTo(c.x + c.tilt + c.r / 4, c.y);
            ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 4);
            ctx.stroke();
            
            // Update position
            c.tiltAngle += c.tiltAngleIncremental;
            c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
            c.x += Math.sin(c.d);
            c.tilt = Math.sin(c.tiltAngle - index / 3) * 15;
            
            // Reset if out of view
            if (c.y > canvas.height) {
                confetti[index] = {
                    x: Math.random() * canvas.width,
                    y: -20,
                    r: c.r,
                    d: c.d,
                    color: c.color,
                    tilt: c.tilt,
                    tiltAngleIncremental: c.tiltAngleIncremental,
                    tiltAngle: c.tiltAngle
                };
            }
        });
        
        animationFrame = requestAnimationFrame(drawConfetti);
    }
    
    drawConfetti();
    
    // Stop confetti after 10 seconds
    setTimeout(() => {
        cancelAnimationFrame(animationFrame);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 10000);
}

// Handle window resize
window.addEventListener('resize', function() {
    const canvas = document.getElementById('confetti');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Initialize effects
createParticles();
createFloatingHearts();

// Add SVG gradient to document
const svgGradient = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svgGradient.setAttribute('width', '0');
svgGradient.setAttribute('height', '0');
svgGradient.innerHTML = `
    <defs>
        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#ff6b9d;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f5576c;stop-opacity:1" />
        </linearGradient>
    </defs>
`;
document.body.appendChild(svgGradient);
