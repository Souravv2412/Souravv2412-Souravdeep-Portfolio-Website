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
