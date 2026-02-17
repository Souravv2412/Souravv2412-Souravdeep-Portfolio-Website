// E-Commerce Churn Project JavaScript
// Souravdeep Singh Portfolio

$(document).ready(function() {
    // Initialize AOS animations
    initAnimations();
    
    // Counter animation for metrics
    animateMetrics();
    
    // Mobile warning dismissal
    initMobileWarning();
    
    // Dataset preview functionality
    initDatasetPreview();
    
    // Video player functionality
    initVideoPlayer();
});

// ===== ANIMATIONS =====
function initAnimations() {
    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== METRIC COUNTERS =====
function animateMetrics() {
    const metrics = document.querySelectorAll('.metric-value[data-target]');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);
    
    metrics.forEach(metric => observer.observe(metric));
}

function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== MOBILE WARNING =====
function initMobileWarning() {
    const warning = document.getElementById('mobile-warning');
    if (!warning) return;
    
    // Check if user previously dismissed
    if (sessionStorage.getItem('mobileWarningDismissed')) {
        warning.style.display = 'none';
    }
}

function dismissWarning() {
    const warning = document.getElementById('mobile-warning');
    warning.style.display = 'none';
    sessionStorage.setItem('mobileWarningDismissed', 'true');
}

// ===== DATASET SWITCHING =====
function switchDataset(type) {
    // Update tabs
    const tabs = document.querySelectorAll('.dataset-tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.closest('.dataset-tab-btn').classList.add('active');
    
    // Update content
    const contents = document.querySelectorAll('.dataset-content');
    contents.forEach(content => content.classList.remove('active'));
    document.getElementById(`${type}-dataset`).classList.add('active');
}

// ===== DATASET PREVIEW =====
function initDatasetPreview() {
    // Dataset preview is loaded on demand to improve page load speed
    window.loadDataPreview = loadDataPreview;
}

async function loadDataPreview(type) {
    const container = document.getElementById(`${type}-table-container`);
    const loadingState = container.querySelector('.loading-state');
    
    // Show loading
    loadingState.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        <p>Loading dataset preview...</p>
    `;
    
    try {
        // Fetch data from Hugging Face
        const url = type === 'raw' 
            ? 'https://huggingface.co/datasets/souravv24112/Port_Dataset/raw/main/data_ecommerce/E-Commerce%20Churn%20Data.csv'
            : 'https://huggingface.co/datasets/souravv24112/Port_Dataset/raw/main/data_ecommerce/E-Commerce_Cleaned.csv';
        
        const response = await fetch(url);
        const csvText = await response.text();
        
        // Parse CSV (first 10 rows)
        const rows = csvText.split('\n').slice(0, 11); // Header + 10 rows
        const headers = rows[0].split(',');
        
        // Build table HTML
        let tableHTML = '<table class="data-table"><thead><tr>';
        headers.forEach(header => {
            tableHTML += `<th>${header.trim()}</th>`;
        });
        tableHTML += '</tr></thead><tbody>';
        
        for (let i = 1; i < rows.length; i++) {
            if (rows[i].trim()) {
                const cells = rows[i].split(',');
                tableHTML += '<tr>';
                cells.forEach(cell => {
                    tableHTML += `<td>${cell.trim()}</td>`;
                });
                tableHTML += '</tr>';
            }
        }
        
        tableHTML += '</tbody></table>';
        
        // Display table
        container.innerHTML = tableHTML;
        
        // Add success message
        setTimeout(() => {
            const successMsg = document.createElement('div');
            successMsg.style.cssText = 'padding: 15px; background: #d4edda; color: #155724; border-radius: 5px; margin-bottom: 15px; text-align: center; border: 1px solid #c3e6cb;';
            successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Dataset loaded successfully! Showing first 10 rows.';
            container.insertBefore(successMsg, container.firstChild);
        }, 100);
        
    } catch (error) {
        console.error('Error loading dataset:', error);
        container.innerHTML = `
            <div class="loading-state">
                <i class="fas fa-exclamation-triangle" style="color: #e74c3c;"></i>
                <p style="color: #666;">Unable to load preview. Please use the download button to access the full dataset.</p>
                <p style="color: #999; font-size: 14px; margin-top: 10px;">Error: ${error.message}</p>
            </div>
        `;
    }
}

// ===== VIDEO PLAYER =====
function initVideoPlayer() {
    const video = document.getElementById('projectVideo');
    const overlay = document.getElementById('videoOverlay');
    
    if (!video || !overlay) return;
    
    window.playVideo = function() {
        video.play();
        overlay.classList.add('hidden');
    };
    
    video.addEventListener('pause', function() {
        if (video.currentTime < video.duration) {
            overlay.classList.remove('hidden');
        }
    });
    
    video.addEventListener('ended', function() {
        overlay.classList.remove('hidden');
    });
}

// ===== SMOOTH SCROLLING =====
$('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    const target = $(this.getAttribute('href'));
    if (target.length) {
        $('html, body').stop().animate({
            scrollTop: target.offset().top - 70
        }, 1000);
    }
});

// ===== SCROLL TO TOP BUTTON =====
$(window).scroll(function() {
    if (this.scrollY > 500) {
        $('.scroll-up-btn').addClass("show");
    } else {
        $('.scroll-up-btn').removeClass("show");
    }
});

$('.scroll-up-btn').click(function() {
    $('html').animate({scrollTop: 0});
    $('html').css("scrollBehavior", "auto");
});

// ===== NAVBAR SCROLL EFFECT =====
$(window).scroll(function() {
    if (this.scrollY > 20) {
        $('.navbar').addClass("sticky");
    } else {
        $('.navbar').removeClass("sticky");
    }
});

// ===== MOBILE MENU TOGGLE =====
$('.menu-btn').click(function() {
    $('.navbar .menu').toggleClass("active");
    $('.menu-btn i').toggleClass("active");
});

// ===== PROGRESS BAR ANIMATION =====
$(window).on('load', function() {
    $('.stat-fill').each(function() {
        const width = $(this).css('width');
        $(this).css('width', '0');
        setTimeout(() => {
            $(this).css('width', width);
        }, 500);
    });
});

// ===== INSIGHTS LAB - CODE BLOCKS =====
function initCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        // Add copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-code-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        copyBtn.onclick = function() {
            const code = block.querySelector('code').textContent;
            navigator.clipboard.writeText(code);
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            }, 2000);
        };
        
        block.insertBefore(copyBtn, block.firstChild);
    });
}

// Initialize code blocks if on insights page
if (document.querySelector('.code-block')) {
    initCodeBlocks();
}

// ===== TABLEAU DASHBOARD RESPONSIVE =====
function makeTableauResponsive() {
    const tableauViz = document.getElementById('tableauViz');
    if (!tableauViz) return;
    
    function resizeViz() {
        const containerWidth = tableauViz.parentElement.offsetWidth;
        const containerHeight = window.innerHeight * 0.8;
        
        // Update Tableau viz dimensions
        const viz = tableauViz.querySelector('object');
        if (viz) {
            viz.style.width = containerWidth + 'px';
            viz.style.height = containerHeight + 'px';
        }
    }
    
    window.addEventListener('resize', resizeViz);
    resizeViz();
}

// Initialize if on dashboard page
if (document.getElementById('tableauViz')) {
    makeTableauResponsive();
}

// ===== STRATEGY ROADMAP INTERACTIONS =====
function initRoadmapInteractions() {
    const phases = document.querySelectorAll('.phase-card');
    
    phases.forEach((phase, index) => {
        phase.addEventListener('click', function() {
            // Remove active from all
            phases.forEach(p => p.classList.remove('active-phase'));
            
            // Add active to clicked
            this.classList.add('active-phase');
            
            // Update detail view
            updatePhaseDetails(index);
        });
    });
}

function updatePhaseDetails(phaseIndex) {
    // Implementation for showing detailed phase information
    // This would show expanded details for the selected phase
    console.log(`Showing details for phase ${phaseIndex + 1}`);
}

// Initialize if on strategy page
if (document.querySelector('.phase-card')) {
    initRoadmapInteractions();
}

// ===== PRINT FUNCTIONALITY =====
function printPage() {
    window.print();
}

// ===== EXPORT TO PDF =====
function exportToPDF() {
    // This would integrate with a library like jsPDF
    console.log('Exporting to PDF...');
    alert('PDF export functionality coming soon!');
}

// ===== SHARE FUNCTIONALITY =====
function shareProject() {
    if (navigator.share) {
        navigator.share({
            title: 'E-Commerce Churn Prediction Project',
            text: 'Check out this data analytics project on customer churn prediction',
            url: window.location.href
        }).catch(error => console.log('Error sharing:', error));
    } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    }
}

// ===== LAZY LOADING IMAGES =====
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// ===== PERFORMANCE TRACKING =====
window.addEventListener('load', function() {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                     window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message);
    // You could send this to an analytics service
});

// ===== UTILITY FUNCTIONS =====
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatCurrency(num) {
    return '$' + formatNumber(Math.round(num));
}

function formatPercentage(num) {
    return num.toFixed(1) + '%';
}

// Export utility functions
window.projectUtils = {
    formatNumber,
    formatCurrency,
    formatPercentage,
    shareProject,
    exportToPDF,
    printPage
};

// Console welcome message
console.log('%cE-Commerce Churn Prediction Project', 'font-size: 20px; font-weight: bold; color: #dc143c;');
console.log('%cBy Souravdeep Singh', 'font-size: 14px; color: #666;');
console.log('%cGitHub: https://github.com/Souravv2412/ecommerce-churn-prediction', 'font-size: 12px; color: #999;');