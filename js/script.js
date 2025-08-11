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
        // Removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function () {
        // Applying smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // Toggle menu/navbar script
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    
    // Owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
        }
    });
});

/* typing animation*/

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


/* Star animation in skills */
document.addEventListener("DOMContentLoaded", function () {
    const skillsSection = document.getElementById("skills");

    const animateStars = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add the class to trigger the animation
                const starsContainers = document.querySelectorAll("#skills .stars-container");
                starsContainers.forEach((container) => {
                    container.classList.remove("animate-stars"); // Reset animation
                    void container.offsetWidth; // Trigger reflow to restart animation
                    container.classList.add("animate-stars"); // Start animation
                });
            } else {
                // Remove the class when the section is out of view
                const starsContainers = document.querySelectorAll("#skills .stars-container");
                starsContainers.forEach((container) => {
                    container.classList.remove("animate-stars");
                });
            }
        });
    };

    const observer = new IntersectionObserver(animateStars, {
        threshold: 5, // Trigger when 50% of the section is visible
    });

    observer.observe(skillsSection);
});


/*Break line for skills animation in about section title*/ 

  // Function to check if the screen is small (mobile device)
  function isMobile() {
    return window.innerWidth <= 768; // Adjust the breakpoint as needed
  }

  // Add <br> tag only for mobile devices
  const textDiv = document.querySelector('.text');
  const typing3Element = document.querySelector('.typing3');

  // Example content for .typing3
  typing3Element.textContent = '';

  // Add <br> if the screen is small
  if (isMobile()) {
    const brElement = document.createElement('br');
    textDiv.insertBefore(brElement, typing3Element);
  }

  // chatbot animation

  // Array of random statements
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

// Start the conversation with the bot
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
                    <div class="option" onclick="redirect('All-Project.html')">📂 Projects</div>
                    <div class="option" onclick="redirect('index.html#skills')">💡 Skills</div>
                    <div class="option" onclick="redirect('Certificate.html')">🏅 Certifications</div>
                    <div class="option" onclick="redirect('index.html#contact')">📞 Contact</div>
                </div>`;
        }, 500);
    });
}

// Type message with delay effect
function typeMessage(message, callback) {
    let index = 0;
    const typingElement = document.getElementById('typingEffect');
    typingElement.innerHTML = `<span class="bot-emoji">🤖</span>`; // Bot emoji beside typing
    const typingInterval = setInterval(() => {
        typingElement.innerHTML += message.charAt(index);
        index++;
        if (index === message.length) {
            clearInterval(typingInterval);
            if (callback) callback();
        }
    }, 30); // Increased typing speed
}

// Redirect to specified URL
function redirect(url) {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.innerHTML = `
        <div class="bot">
            <p class="typing" id="typingEffect">
                <span class="bot-emoji">🤖</span>
            </p>
        </div>`;
    // Select a random statement
    const randomStatement = randomStatements[Math.floor(Math.random() * randomStatements.length)];
    typeMessage(randomStatement, function() {
        setTimeout(() => { window.location.href = url; }, 2000);
    });
}

// for mobile ms of dataset
document.addEventListener("DOMContentLoaded", function () {
    // Function to check if the device is a mobile device
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Get the mobile message element
    const mobileMessage = document.getElementById("mobile-message");

    // Show the message if the device is mobile
    if (isMobileDevice()) {
        mobileMessage.style.display = "block";
    }
});