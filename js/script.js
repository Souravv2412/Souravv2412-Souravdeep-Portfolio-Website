$(document).ready(function () {
    $(window).scroll(function () {
        // Sticky navbar on scroll script
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }

        // Scroll-up button show/hide script
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // Slide-up script
    $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function () {
        $('html').css("scrollBehavior", "smooth");
    });

    // Toggle menu/navbar script
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });
});

/* typing animation */
document.addEventListener('DOMContentLoaded', function() {
    var typed = new Typed(".typing3", {
        strings: ["Programming", "Data Visualization", "Statistical Analysis", "Business Acumen"],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var typed = new Typed(".typing2", {
        strings: ["Certified Web Developer", "Data Analytics Student", "Freelancer"],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });
});

/* Skills section scroll animations - updated for new layout */
document.addEventListener("DOMContentLoaded", function () {
    const skillsSection = document.getElementById("skills");
    let hasAnimated = false;

    const animateSkills = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                
                // Animate stat numbers
                const statNumbers = document.querySelectorAll(".stat-number");
                statNumbers.forEach((stat, index) => {
                    setTimeout(() => {
                        const target = stat.textContent;
                        const numericValue = parseFloat(target);
                        const suffix = target.replace(/[0-9.]/g, '');
                        let current = 0;
                        const increment = numericValue / 60;
                        const duration = 1500;
                        const frameTime = duration / 60;

                        stat.textContent = "0" + suffix;

                        const counter = setInterval(() => {
                            current += increment;
                            if (current >= numericValue) {
                                stat.textContent = target;
                                clearInterval(counter);
                            } else {
                                stat.textContent = Math.floor(current * 10) / 10 + suffix;
                            }
                        }, frameTime);
                    }, index * 150);
                });
            }
        });
    };

    const observer = new IntersectionObserver(animateSkills, {
        threshold: 0.3,
    });

    if (skillsSection) {
        observer.observe(skillsSection);
    }
});

/* chatbot animation */
const randomStatements = [
    "Great choice! We are preparing everything for you. Redirecting in a moment...",
    "Awesome! Just a second while we get things ready for you...",
    "Perfect! We're setting things up. Please wait a moment...",
    "Excellent choice! Redirecting you now...",
    "Hold on! We're preparing your selection. Redirecting shortly...",
    "Nice pick! We're getting everything ready for you..."
];

function toggleChat() {
    const chatbot = document.getElementById("chatbot");
    chatbot.classList.toggle("show");
    if (chatbot.classList.contains("show")) {
        startConversation();
    }
}

function cancelChat() {
    const chatbot = document.getElementById("chatbot");
    chatbot.classList.remove("show");
}

function startConversation() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.innerHTML = `
        <div class="bot">
            <p class="typing" id="typingEffect">
                <span class="bot-emoji">🤖</span>
            </p>
        </div>`;
    typeMessage("Hi there! Welcome to my portfolio.\n\nWhat would you like to explore?", function() {
        setTimeout(() => {
            chatWindow.innerHTML += `
                <div class="options-container">
                    <div class="option" onclick="redirect('index.html#projects')">📂 Projects</div>
                    <div class="option" onclick="redirect('index.html#skills')">💡 Skills</div>
                    <div class="option" onclick="redirect('Certificate.html')">🏅 Certifications</div>
                    <div class="option" onclick="redirect('index.html#contact')">📞 Contact</div>
                </div>`;
        }, 500);
    });
}

function typeMessage(message, callback) {
    let index = 0;
    const typingElement = document.getElementById('typingEffect');
    typingElement.innerHTML = `<span class="bot-emoji">🤖</span>`;
    const typingInterval = setInterval(() => {
        typingElement.innerHTML += message.charAt(index);
        index++;
        if (index === message.length) {
            clearInterval(typingInterval);
            if (callback) callback();
        }
    }, 30);
}

function redirect(url) {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.innerHTML = `
        <div class="bot">
            <p class="typing" id="typingEffect">
                <span class="bot-emoji">🤖</span>
            </p>
        </div>`;
    const randomStatement = randomStatements[Math.floor(Math.random() * randomStatements.length)];
    typeMessage(randomStatement, function() {
        setTimeout(() => { window.location.href = url; }, 2000);
    });
}

/* ===== CANVAS PARTICLE BURST ===== */
const canvas = document.getElementById("dataCanvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let w, h, particles = [];

    function resizeCanvas() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.size = Math.random() * 3 + 1;
            this.opacity = 0;
            this.targetOpacity = Math.random() * 0.8 + 0.2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if(this.x < 0 || this.x > w) this.vx *= -1;
            if(this.y < 0 || this.y > h) this.vy *= -1;
            this.opacity += (this.targetOpacity - this.opacity) * 0.02;
        }
        draw() {
            ctx.fillStyle = `rgba(34,211,238,${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
            ctx.fill();
        }
    }

    for(let i=0;i<120;i++){
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0,0,w,h);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        // Connect close particles
        for(let i=0;i<particles.length;i++){
            for(let j=i+1;j<particles.length;j++){
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if(dist < 120){
                    ctx.strokeStyle = `rgba(239,68,68,0.1)`;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    /* ===== INTRO EXIT / PHOTO & TEXT FADE IN - ONLY ONCE PER SESSION ===== */
    // Check if intro has already been shown in this session
    const introShown = sessionStorage.getItem('introShown');
    
    if (!introShown) {
        // Show intro animation
        setTimeout(() => {
            document.querySelector(".introCenter").style.opacity = 1;
            setTimeout(() => {
                const intro = document.getElementById("dataIntro");
                intro.style.transition = "1.5s";
                intro.style.opacity = 0;
                setTimeout(() => {
                    intro.remove();
                    // Mark intro as shown for this session
                    sessionStorage.setItem('introShown', 'true');
                }, 1500);
            }, 3000);
        }, 1000);
    } else {
        // Skip intro, remove it immediately
        const intro = document.getElementById("dataIntro");
        if (intro) {
            intro.remove();
        }
    }
}