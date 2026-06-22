/* ── EmailJS Contact Form ─────────────────────────────────── */
(function () {
    // ★ Replace these three values after EmailJS setup (see instructions below)
    var EMAILJS_PUBLIC_KEY  = '9MOhwVL6rEnMEyFZT';
    var EMAILJS_SERVICE_ID  = 'service_va8tcqc';
    var EMAILJS_TEMPLATE_ID = 'template_zymu7bk';

    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

    var form   = document.getElementById('contact-form');
    var btn    = document.getElementById('cf-btn');
    var status = document.getElementById('cf-status');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            btn.textContent = 'Sending…';
            btn.disabled = true;
            status.style.display = 'none';

            var templateParams = {
                from_name:    document.getElementById('cf-name').value.trim(),
                reply_to:     document.getElementById('cf-email').value.trim(),
                subject:      document.getElementById('cf-subject').value.trim(),
                message:      document.getElementById('cf-message').value.trim(),
                // This produces the email subject line in the template
                email_subject: 'Portfolio Message - ' + document.getElementById('cf-name').value.trim()
            };

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(function () {
                    status.textContent = '✅ Message sent! I\'ll get back to you soon.';
                    status.style.color = '#4ade80';
                    status.style.display = 'block';
                    form.reset();
                    btn.textContent = 'Send message';
                    btn.disabled = false;
                }, function (err) {
                    status.textContent = '❌ Something went wrong. Please email me directly at singh.s.deep800@gmail.com';
                    status.style.color = '#f87171';
                    status.style.display = 'block';
                    btn.textContent = 'Send message';
                    btn.disabled = false;
                });
        });
    }
})();
/* ─────────────────────────────────────────────────────────── */

$(document).ready(function () {
    let scrollingTick = false;

    function handleScrollEffects() {
        const y = window.scrollY || window.pageYOffset;

        if (y > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }

        if (y > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }

        scrollingTick = false;
    }

    window.addEventListener('scroll', function () {
        if (!scrollingTick) {
            window.requestAnimationFrame(handleScrollEffects);
            scrollingTick = true;
        }
    }, { passive: true });

    $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function () {
        $('html').css("scrollBehavior", "smooth");
    });

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
        strings: ["Data Analyst", "Business Intelligence Analyst", "Business Analytics Graduate", "Analytics Consultant"],
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

/* ===== SCROLL REVEAL ===== */
document.addEventListener('DOMContentLoaded', function() {
    const srObs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.sr-anim,.sr-left,.sr-right').forEach(el => srObs.observe(el));
});

/* ===== HERO COUNTER ANIMATION ===== */
document.addEventListener('DOMContentLoaded', function() {
    const cObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.querySelectorAll('.hs-num[data-target]').forEach(el => {
                    const target = parseInt(el.dataset.target);
                    let cur = 0; const step = target / 60;
                    const tmr = setInterval(() => {
                        cur = Math.min(cur + step, target);
                        el.textContent = Math.floor(cur) + '+';
                        if (cur >= target) clearInterval(tmr);
                    }, 25);
                });
                cObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });
    const statsRow = document.querySelector('.hero-stats-row');
    if (statsRow) cObs.observe(statsRow);
});

/* ===== PROJECT FILTER (index.html) ===== */
function filterIdx(cat, btn) {
    document.querySelectorAll('.pf-btn-new').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    document.querySelectorAll('.idx-section').forEach(s => s.style.display = 'none');
    const sec = document.getElementById('idx-' + cat);
    if (sec) {
        sec.style.display = 'block';
        setTimeout(() => {
            sec.querySelectorAll('.sr-anim').forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add('in');
            });
        }, 50);
    }
}

/* ===== AI CHATBOT ===== */
// ---------------------------------------------------------------
// SETUP: Get your FREE Gemini API key at https://aistudio.google.com/app/apikey
// Paste it below. The free tier gives 15 requests/min — more than enough.
// ---------------------------------------------------------------
const GEMINI_KEY = 'YOUR_GEMINI_API_KEY';

const SOURAV_CONTEXT = `You are an intelligent, friendly portfolio assistant for Souravdeep Singh. You behave like a real AI assistant (similar to ChatGPT) — conversational, warm, smart, and helpful. Handle casual small talk naturally, answer professional questions precisely, and always tie answers back to Souravdeep's profile when relevant. Keep responses concise (under 180 words). Do NOT use em dashes (—). Use commas or semicolons instead.

ABOUT SOURAVDEEP:
Name: Souravdeep Singh | Nickname: Sourav
Location: Windsor, Ontario, Canada
Email: singh.s.deep800@gmail.com | Phone: +1 548 332-1627
LinkedIn: linkedin.com/in/sourav2312/ | GitHub: github.com/Souravv2412

PERSONALITY & PERSONAL:
- Hobbies: Cricket (state-level player), Dancing (award-winning), Sketch art
- Friendly, driven, data-obsessed professional
- Loves turning messy data into clear stories
- Enjoys mentoring and student leadership

WORK AUTHORIZATION (CANADA):
- Holds a Post-Graduation Work Permit (PGWP)
- Fully authorized to work full-time in Canada WITHOUT employer sponsorship
- LMIA is NOT required
- Completely legal to work for any Canadian employer
- Available immediately
- NOT on LMIA, NOT illegal, NOT on a study permit anymore

EDUCATION:
1. Post-Graduate Diploma in Data Analytics for Business, St. Clair College, Windsor ON (Sep 2024 - Apr 2026) - Academic Honours, GPA 3.5
2. BBA (Computer Applications), SPPU Pune University, India (Aug 2020 - Jul 2023) - CGPA 8.0, Distinction

EXPERIENCE:
- Data Analytics Co-op, Halight (Sep 2025 - Apr 2026): Built production-grade dashboard with live AWS Athena data, used by leadership daily. Agile/Scrum environment.
- VP, Student Representative Council, St. Clair College (May 2025 - Apr 2026): Represented 10,000+ students, co-chaired board meetings, led advocacy.
- Volunteer, Advisory Board, Transit Windsor (Oct 2025 - Oct 2026): SRC student representative in City of Windsor municipal transit planning.
- Receptionist and Counselor, EEC Global, India (Oct 2023 - Mar 2024): International study counseling (Canada, USA), IELTS/GRE/PTE guidance, front-desk operations.

SKILLS:
- Python: Pandas, NumPy, scikit-learn, XGBoost, LightGBM
- SQL: HackerRank Advanced
- Tableau, Power BI (DAX), Excel
- AWS: S3, Athena (production use)
- Statistical Analysis, A/B Testing, Hypothesis Testing
- Model Evaluation and Validation, Cross-validation, ROC/AUC
- ETL, Data Wrangling, Feature Engineering
- Git, Jira, Agile/Scrum
- Web Dev: HTML, CSS, JavaScript, PHP, MySQL

PROJECTS:
1. Healthcare 30-Day Readmission Prediction: 101,766 patient records, LightGBM/XGBoost models, live Flask app at healthcare-readmission-analytics.onrender.com
2. E-Commerce Churn Analysis: 52% churner recall, AUC 0.88, Tableau retention dashboard
3. SRC Class Rep Portal: Real operational deployment, 80% workflow automated, 70% time saved
4. Movie Ticket Booking System: Live PHP/MySQL full-stack app at moviebookapp.kesug.com
5. Real Estate Listings: Live PHP/MySQL app

ACHIEVEMENTS:
- Academic Honours at St. Clair College (GPA 3.5)
- Graduated with Distinction from SPPU (CGPA 8.0)
- State-level cricket player representing regional teams
- Award-winning dancer with competition achievements
- Represented 10,000+ students as VP of SRC
- Built a live production analytics dashboard used by leadership at Halight

CERTIFICATES: SQL Advanced (HackerRank), Full Stack Web Development, AWS Data Engineering Foundations, End-to-End Machine Learning, Feature Engineering, Model Validation, Hyperparameter Tuning, Tree-Based Models, Cluster Analysis (DataCamp)

OPEN TO WORK:
- Full-time Data Analyst, Business Intelligence Analyst, Analytics Consultant
- Anywhere in Canada (remote or in-person)
- Can start immediately

RULES:
1. Handle small talk naturally - "how are you", "good morning", jokes etc - respond warmly and briefly before pivoting to Sourav's profile
2. Work authorization questions: ALWAYS clarify he holds PGWP, is legal to work, NOT on LMIA, NOT illegal, can work for any employer without sponsorship
3. If asked about salary, say: "For that conversation, please reach out directly at singh.s.deep800@gmail.com"
4. If question is totally unrelated to the profile and not small talk, say you can only help with Souravdeep's professional profile and suggest contacting him
5. NEVER produce illegal, adult, or harmful content - refuse politely
6. Do NOT use em dashes (—) anywhere in your response`;


async function callGemini(msg) {
    if (!GEMINI_KEY || GEMINI_KEY === 'YOUR_GEMINI_API_KEY') return getRuleReply(msg);
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: SOURAV_CONTEXT + '\n\nRecruiter question: ' + msg }] }],
                generationConfig: { temperature: 0.6, maxOutputTokens: 300 }
            })
        });
        const data = await res.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || getRuleReply(msg);
    } catch(e) { return getRuleReply(msg); }
}

// ===== SMART RULE-BASED FALLBACK =====
function getRuleReply(msg) {
    const m = msg.toLowerCase().trim();

    // Block harmful/adult content
    if (/sex|porn|nude|xxx|adult content|18\+|nsfw|explicit|rape|pedophil|bomb|hack the|malware|exploit|ransomware/.test(m)) {
        return "Sorry, I can't help with that. 🙏 I'm here strictly for questions about Souravdeep's professional profile. Please keep it professional!";
    }

    // Greetings & small talk
    if (/^(hi|hello|hey|yo|sup|howdy|hiya|greetings)[!\s?.]*$/.test(m) || /^good\s*(morning|afternoon|evening|night)[!\s?.]*$/.test(m)) {
        const h = new Date().getHours();
        const g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
        return g + "! 👋 I'm Sourav's AI assistant.\n\nI can tell you about his <b>skills, experience, projects, education, or work status</b> in Canada. What would you like to know?";
    }
    if (/how are you|how('?s| is) it going|what'?s up|you good|you ok/.test(m)) {
        return "I'm doing great, thanks for asking! 😊\n\nSouravdeep is also doing well, actively looking for full-time <b>Data Analyst</b> or <b>BI Analyst</b> roles in Canada. Want to know more about him?";
    }
    if (/what'?s your name|who are you|are you (a bot|ai|human|real)|are you chatgpt/.test(m)) {
        return "I'm Sourav's virtual portfolio assistant, powered by AI! 🤖\n\nI know everything about his skills, experience, projects, education, and Canadian work status. Fire away!";
    }
    if (/thank|thanks|cheers|appreciate it/.test(m)) {
        return "You're welcome! 😊 Feel free to ask anything else about Souravdeep's profile.";
    }
    if (/bye|goodbye|see you|take care|ciao|later/.test(m)) {
        return "Goodbye! 👋 Feel free to come back anytime. You can also reach Souravdeep at 📧 <a href='mailto:singh.s.deep800@gmail.com'>singh.s.deep800@gmail.com</a>";
    }
    if (/joke|funny|make me laugh/.test(m)) {
        return "Here's a data joke for you: Why did the data analyst break up with the spreadsheet? Too many rows and not enough columns! 😄\n\nOn a serious note, Souravdeep is great at making sense of those rows. Want to know about his projects?";
    }

    // Work authorization (including tricky/sensitive phrasing)
    if (/lmia|illegal|legal to work|work status|work permit|pgwp|work auth|visa|immigration|sponsor|permanent resident|pr status|citizen|study permit/.test(m)) {
        return '🇨🇦 <b>Work Authorization:</b>\n\nSouravdeep holds a <b>Post-Graduation Work Permit (PGWP)</b>, completely legal to work in Canada.\n\n✅ No LMIA required\n✅ No employer sponsorship needed\n✅ Can work for ANY Canadian employer\n✅ NOT on a study permit, NOT illegal\n✅ Available to start immediately\n\n📧 <a href="mailto:singh.s.deep800@gmail.com">singh.s.deep800@gmail.com</a>';
    }

    // Availability / hiring
    if (/hire|availab|open to work|looking for job|job search|opportunit|full.?time|remote|relocat|start when/.test(m)) {
        return '✅ <b>Souravdeep is actively seeking full-time roles!</b>\n\nTarget roles:\n- Data Analyst\n- Business Intelligence Analyst\n- Analytics Consultant\n\n📍 Windsor, Ontario, Canada\n🇨🇦 PGWP holder, no sponsorship needed, starts immediately.\n\n📧 <a href="mailto:singh.s.deep800@gmail.com">singh.s.deep800@gmail.com</a>\n👉 <a href="#contact">Contact form ↗</a>';
    }

    // Skills
    if (/skill|python|pandas|numpy|scikit|sql|tableau|power.?bi|dax|aws|athena|s3|excel|machine.?learn|\bml\b|xgboost|lightgbm|etl|git|jira|agile|scrum|statistic|a\/b test|hypothesis|feature engine|model valid|data.?wrangl/.test(m)) {
        return '🛠️ <b>Core Technical Skills:</b>\n\n🐍 <b>Python</b>: Pandas, NumPy, scikit-learn, XGBoost, LightGBM\n📊 <b>SQL</b>: HackerRank Advanced\n📈 <b>Tableau & Power BI</b>: dashboards, DAX measures\n☁️ <b>AWS</b>: S3, Athena (production at Halight)\n📐 <b>Stats</b>: A/B testing, hypothesis testing, model validation\n🌐 <b>Web Dev</b>: HTML, CSS, JS, PHP, MySQL\n\n👉 <a href="#skills">Full Skills section ↗</a>';
    }

    // Projects
    if (/project|github|healthcare|readmission|churn|ecommerce|e-commerce|src portal|class rep|movie ticket|real estate|flask|deploy|live app/.test(m)) {
        return '🚀 <b>Key Projects:</b>\n\n🏥 <b>Healthcare Readmission Prediction</b>\n101,766 records, LightGBM/XGBoost: <a href="https://healthcare-readmission-analytics.onrender.com" target="_blank">Live App ↗</a>\n\n📉 <b>E-Commerce Churn Analysis</b>\n52% churner recall, AUC 0.88, Tableau dashboard\n\n🏫 <b>SRC Class Rep Portal</b>\nLive deployment, 80% workflows automated\n\n🎬 <b>Movie Ticket Booking</b>: <a href="https://moviebookapp.kesug.com/" target="_blank">Live ↗</a>\n\n👉 <a href="#projects">All Projects ↗</a> | <a href="project.html">Full page ↗</a>';
    }

    // Experience
    if (/experience|work history|career|halight|co-?op|internship|\beec\b|transit windsor|\bsrc\b|council|vp|vice president|employment|job history/.test(m)) {
        return '💼 <b>Work Experience:</b>\n\n🏢 <b>Data Analytics Co-op, Halight</b> (Sep 2025–Apr 2026)\nProduction AWS Athena dashboard used by leadership daily.\n\n🎓 <b>VP, Student Representative Council</b> (May 2025–Apr 2026)\nRepresented 10,000+ students, chaired board meetings.\n\n🚌 <b>Advisory Board, Transit Windsor</b> (Oct 2025–Oct 2026)\nVolunteer, City of Windsor transit planning.\n\n🌐 <b>Counselor, EEC Global</b> (Oct 2023–Mar 2024)\nInternational study advising for Canada and USA.\n\n👉 <a href="#experience">Full timeline ↗</a>';
    }

    // Education
    if (/education|degree|diploma|college|university|\bgpa\b|\bcgpa\b|st.?clair|sppu|pune|\bbba\b|study|graduated|distinction|honours|academic/.test(m)) {
        return '🎓 <b>Education:</b>\n\n📘 <b>PG Diploma in Data Analytics for Business</b>\nSt. Clair College, Windsor ON (Sep 2024–Apr 2026)\nAcademic Honours, GPA 3.5\n\n📗 <b>BBA (Computer Applications)</b>\nSPPU Pune University, India (Aug 2020–Jul 2023)\nGraduated with Distinction, CGPA 8.0\n\n👉 <a href="#experience">Education section ↗</a>';
    }

    // Achievements
    if (/achievement|award|accomplish|proud|honour|honor|recognition|win|won|distinction/.test(m)) {
        return '🏆 <b>Achievements:</b>\n\n🎓 Academic Honours, St. Clair College (GPA 3.5)\n📚 Distinction, SPPU Pune University (CGPA 8.0)\n🏏 State-level cricket player\n💃 Award-winning dancer\n🎓 Represented 10,000+ students as VP of SRC\n📊 Production analytics dashboard at Halight, used daily by leadership\n\n👉 <a href="#about">About section ↗</a>';
    }

    // Hobbies / personal
    if (/hobby|hobbies|personal|outside work|free time|cricket|danc|sketch|art|sport|passion|interest|fun fact/.test(m)) {
        return '🙌 <b>Beyond the Data:</b>\n\nSouravdeep is a <b>state-level cricketer</b>, representing his region competitively.\n\nHe is also an <b>award-winning dancer</b> with stage performance experience, and enjoys <b>sketch art</b> as a creative outlet.\n\nAnalytical at work, creative at heart! 🎭🏏🎨\n\n👉 <a href="#about">About section ↗</a>';
    }

    // Certificates
    if (/certif|certificate|course|credential|badge|hackerrank|datacamp/.test(m)) {
        return '🏅 <b>Certificates:</b>\n\n- SQL Advanced (HackerRank)\n- Full Stack Web Development\n- AWS Data Engineering Foundations\n- End-to-End Machine Learning\n- Feature Engineering\n- Model Validation\n- Hyperparameter Tuning\n- Tree-Based Models\n- Cluster Analysis (DataCamp)\n\n👉 <a href="Certificate.html">View all certificates ↗</a>';
    }

    // Contact
    if (/contact|email|phone|reach out|call|linkedin|github|social|connect|get in touch|number/.test(m)) {
        return '📬 <b>Contact Souravdeep:</b>\n\n📧 <a href="mailto:singh.s.deep800@gmail.com">singh.s.deep800@gmail.com</a>\n📞 +1 548 332-1627\n💼 <a href="https://www.linkedin.com/in/sourav2312/" target="_blank">LinkedIn ↗</a>\n🐙 <a href="https://github.com/Souravv2412" target="_blank">GitHub ↗</a>\n\n👉 <a href="#contact">Contact form ↗</a>';
    }

    // About / general
    if (/who is sourav|tell me about (him|sourav)|about sourav|introduce|background|profile|summary/.test(m)) {
        return '👤 <b>Souravdeep Singh</b>\n\nData analytics professional in Windsor, Ontario, Canada. Turns complex data into actionable business insights using Python, SQL, Power BI, Tableau, and AWS.\n\nCurrently seeking full-time Data Analyst or BI Analyst roles. Holds a PGWP, no sponsorship needed.\n\nHobbies: Cricket, Dancing, Sketch art.\n\n👉 <a href="#about">Full About section ↗</a>';
    }

    // Salary deflect
    if (/salary|pay |compensat|wage|earn|rate|package|ctc/.test(m)) {
        return "For salary discussions, it's best to connect with Souravdeep directly!\n\n📧 <a href='mailto:singh.s.deep800@gmail.com'>singh.s.deep800@gmail.com</a>\n📞 +1 548 332-1627";
    }

    // Fallback
    return "Hmm, that's a bit outside what I know about Souravdeep's profile. 🤔\n\nI'm best at answering about his <b>skills, experience, projects, education, or work authorization</b>.\n\nFor anything else, contact him directly:\n📧 <a href='mailto:singh.s.deep800@gmail.com'>singh.s.deep800@gmail.com</a>\n📞 +1 548 332-1627";
}

let chatNewOpen = false, chatNewInit = false;

function toggleChatNew() {
    chatNewOpen = !chatNewOpen;
    document.getElementById('chat-win-new').classList.toggle('open', chatNewOpen);
    if (chatNewOpen && !chatNewInit) {
        chatNewInit = true;
        setTimeout(() => addBotMsgNew("Hi! 👋 I'm Sourav's AI assistant. Ask me anything about his skills, experience, projects, or work authorization in Canada. I'll answer instantly!\n\nClick a quick button below or type your question."), 400);
    }
}

function addBotMsgNew(text) {
    const msgs = document.getElementById('chat-msgs-new');
    const typing = document.createElement('div');
    typing.className = 'cmn bot';
    typing.innerHTML = '<div class="cbbln"><div class="typing-ind-new"><span></span><span></span><span></span></div></div>';
    msgs.appendChild(typing);
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => {
        msgs.removeChild(typing);
        const d = document.createElement('div'); d.className = 'cmn bot';
        const now = new Date();
        d.innerHTML = `<div class="cbbln">${text.replace(/\n/g,'<br>')}</div><div class="ctn">${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}</div>`;
        msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
    }, 800 + Math.random() * 400);
}

function addUserMsgNew(text) {
    const msgs = document.getElementById('chat-msgs-new');
    const d = document.createElement('div'); d.className = 'cmn usr';
    const now = new Date();
    d.innerHTML = `<div class="cbbln">${text}</div><div class="ctn">${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}</div>`;
    msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
}

async function sendChatNew() {
    const inp = document.getElementById('chat-input-new');
    const text = inp.value.trim(); if (!text) return; inp.value = '';
    addUserMsgNew(text);
    const reply = await callGemini(text);
    setTimeout(() => addBotMsgNew(reply), 200);
}

function askNew(q) {
    addUserMsgNew(q);
    callGemini(q).then(reply => setTimeout(() => addBotMsgNew(reply), 200));
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
            if (this.x < 0 || this.x > w) this.vx *= -1;
            if (this.y < 0 || this.y > h) this.vy *= -1;
            this.opacity += (this.targetOpacity - this.opacity) * 0.02;
        }
        draw() {
            ctx.fillStyle = `rgba(34,211,238,${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const lowPerfDevice = window.matchMedia('(prefers-reduced-motion: reduce)').matches || ((navigator.hardwareConcurrency || 8) <= 4);
    const particleCount = lowPerfDevice ? 50 : 90;

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        if (!lowPerfDevice) {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.strokeStyle = `rgba(239,68,68,0.1)`;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    /* ===== INTRO EXIT / PHOTO & TEXT FADE IN - ONLY ONCE PER SESSION ===== */
    const intro = document.getElementById("dataIntro");
    const introCenter = document.querySelector(".introCenter");
    const skipIntroBtn = document.getElementById("skipIntroBtn");

    function removeIntro(immediate = false) {
        if (!intro) return;
        if (immediate) {
            intro.remove();
            sessionStorage.setItem('introShown', 'true');
            return;
        }

        intro.style.transition = "1.0s";
        intro.style.opacity = 0;
        setTimeout(() => {
            intro.remove();
            sessionStorage.setItem('introShown', 'true');
        }, 1000);
    }

    if (skipIntroBtn) {
        skipIntroBtn.addEventListener('click', () => removeIntro(true));
    }

    const introShown = sessionStorage.getItem('introShown');

    if (!introShown) {
        setTimeout(() => {
            if (introCenter) introCenter.style.opacity = 1;
            setTimeout(() => removeIntro(false), 2600);
        }, 600);
    } else {
        removeIntro(true);
    }
}

// ===== FLUID ANIMATION FOR HOME SECTION - MOBILE OPTIMIZED & SOFTER COLORS =====
(function() {
  const DISABLE_FLUID_ANIMATION = true;
  const config = {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1440,
    CAPTURE_RESOLUTION: 512,
    DENSITY_DISSIPATION: 3.5,
    VELOCITY_DISSIPATION: 2,
    PRESSURE: 0.1,
    PRESSURE_ITERATIONS: 20,
    CURL: 3,
    SPLAT_RADIUS: 0.2,
    SPLAT_FORCE: 6000,
    SHADING: true,
    COLOR_UPDATE_SPEED: 10,
    PAUSED: false,
    BACK_COLOR: { r: 0.5, g: 0, b: 0 },
    TRANSPARENT: true
  };

  // Only initialize if we're on the home page and the fluid canvas exists
  const fluidCanvas = document.getElementById("fluid");
  if (DISABLE_FLUID_ANIMATION) {
    if (fluidCanvas) fluidCanvas.style.display = "none";
    return;
  }
  if (!fluidCanvas) return;

  // Add flag to track if we're on mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Disable heavy simulation on mobile/reduced-motion devices for smooth scrolling
  if (isMobile || prefersReducedMotion) {
    fluidCanvas.style.display = "none";
    return;
  }

  // Pointer interface
  function pointerPrototype() {
    return {
      id: -1,
      texcoordX: 0,
      texcoordY: 0,
      prevTexcoordX: 0,
      prevTexcoordY: 0,
      deltaX: 0,
      deltaY: 0,
      down: false,
      moved: false,
      color: { r: 0, g: 0, b: 0 }
    };
  }

  // Global variables
  let canvas = fluidCanvas;
  let gl, ext;
  let pointers = [pointerPrototype()];
  let dye, velocity, divergence, curlFBO, pressureFBO;
  let lastUpdateTime = Date.now();
  let colorUpdateTimer = 0.0;
  let isScrolling = false;
  let scrollTimeout;
  let touchStartY = 0;
  let touchStartX = 0;
  let lastTouchY = 0;

  // Programs
  let copyProgram, clearProgram, splatProgram, advectionProgram;
  let divergenceProgram, curlProgram, vorticityProgram, pressureProgram;
  let gradienSubtractProgram, displayMaterial;

  function initializeWebGL() {
    const params = {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false
    };

    gl =
      canvas.getContext("webgl2", params) ||
      canvas.getContext("webgl", params) ||
      canvas.getContext("experimental-webgl", params);

    if (!gl) {
      console.error("Unable to initialize WebGL.");
      return false;
    }

    const isWebGL2 = "drawBuffers" in gl;
    let supportLinearFiltering = false;
    let halfFloat = null;

    if (isWebGL2) {
      gl.getExtension("EXT_color_buffer_float");
      supportLinearFiltering = !!gl.getExtension("OES_texture_float_linear");
    } else {
      halfFloat = gl.getExtension("OES_texture_half_float");
      supportLinearFiltering = !!gl.getExtension("OES_texture_half_float_linear");
    }

    gl.clearColor(0, 0, 0, 0); // Transparent background

    const halfFloatTexType = isWebGL2
      ? gl.HALF_FLOAT
      : (halfFloat && halfFloat.HALF_FLOAT_OES) || 0;

    let formatRGBA, formatRG, formatR;

    if (isWebGL2) {
      formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
      formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
      formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
    } else {
      formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    }

    ext = {
      formatRGBA,
      formatRG,
      formatR,
      halfFloatTexType,
      supportLinearFiltering
    };

    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 256;
      config.SHADING = false;
    }

    return true;
  }

  function getSupportedFormat(gl, internalFormat, format, type) {
    if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
      if ("drawBuffers" in gl) {
        switch (internalFormat) {
          case gl.R16F:
            return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
          case gl.RG16F:
            return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
          default:
            return null;
        }
      }
      return null;
    }
    return { internalFormat, format };
  }

  function supportRenderTextureFormat(gl, internalFormat, format, type) {
    const texture = gl.createTexture();
    if (!texture) return false;

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

    const fbo = gl.createFramebuffer();
    if (!fbo) return false;

    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0
    );
    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    return status === gl.FRAMEBUFFER_COMPLETE;
  }

  function hashCode(s) {
    if (!s.length) return 0;
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
      hash = (hash << 5) - hash + s.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }

  function addKeywords(source, keywords) {
    if (!keywords) return source;
    let keywordsString = "";
    for (const keyword of keywords) {
      keywordsString += `#define ${keyword}\n`;
    }
    return keywordsString + source;
  }

  function compileShader(type, source, keywords = null) {
    const shaderSource = addKeywords(source, keywords);
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
    }
    return shader;
  }

  function createProgram(vertexShader, fragmentShader) {
    if (!vertexShader || !fragmentShader) return null;
    const program = gl.createProgram();
    if (!program) return null;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
    }
    return program;
  }

  function getUniforms(program) {
    let uniforms = {};
    const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
      const uniformInfo = gl.getActiveUniform(program, i);
      if (uniformInfo) {
        uniforms[uniformInfo.name] = gl.getUniformLocation(
          program,
          uniformInfo.name
        );
      }
    }
    return uniforms;
  }

  class Program {
    constructor(vertexShader, fragmentShader) {
      this.program = createProgram(vertexShader, fragmentShader);
      this.uniforms = this.program ? getUniforms(this.program) : {};
    }

    bind() {
      if (this.program) gl.useProgram(this.program);
    }
  }

  class Material {
    constructor(vertexShader, fragmentShaderSource) {
      this.vertexShader = vertexShader;
      this.fragmentShaderSource = fragmentShaderSource;
      this.programs = {};
      this.activeProgram = null;
      this.uniforms = {};
    }

    setKeywords(keywords) {
      let hash = 0;
      for (const kw of keywords) {
        hash += hashCode(kw);
      }
      let program = this.programs[hash];
      if (program == null) {
        const fragmentShader = compileShader(
          gl.FRAGMENT_SHADER,
          this.fragmentShaderSource,
          keywords
        );
        program = createProgram(this.vertexShader, fragmentShader);
        this.programs[hash] = program;
      }
      if (program === this.activeProgram) return;
      if (program) {
        this.uniforms = getUniforms(program);
      }
      this.activeProgram = program;
    }

    bind() {
      if (this.activeProgram) {
        gl.useProgram(this.activeProgram);
      }
    }
  }

  function initializeShaders() {
    const baseVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;

        void main () {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `
    );

    const copyShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;

        void main () {
            gl_FragColor = texture2D(uTexture, vUv);
        }
      `
    );

    const clearShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;

        void main () {
            gl_FragColor = value * texture2D(uTexture, vUv);
        }
      `
    );

    const displayShaderSource = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uDithering;
      uniform vec2 ditherScale;
      uniform vec2 texelSize;

      vec3 linearToGamma (vec3 color) {
          color = max(color, vec3(0));
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
      }

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          
          // Subtle color enhancement - much softer than before
          c = c * 1.1; // Very slight brightness boost
          
          // Very subtle saturation boost
          float gray = dot(c, vec3(0.299, 0.587, 0.114));
          c = mix(vec3(gray), c, 1.1); // 1.1 = very subtle saturation
          
          #ifdef SHADING
              vec3 lc = texture2D(uTexture, vL).rgb;
              vec3 rc = texture2D(uTexture, vR).rgb;
              vec3 tc = texture2D(uTexture, vT).rgb;
              vec3 bc = texture2D(uTexture, vB).rgb;

              float dx = length(rc) - length(lc);
              float dy = length(tc) - length(bc);

              vec3 n = normalize(vec3(dx, dy, length(texelSize)));
              vec3 l = vec3(0.0, 0.0, 1.0);

              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
              c *= diffuse;
          #endif

          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a * 0.6); // More transparent
      }
    `;

    const splatShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;

        void main () {
            vec2 p = vUv - point.xy;
            p.x *= aspectRatio;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, vUv).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }
      `
    );

    const advectionShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform vec2 dyeTexelSize;
        uniform float dt;
        uniform float dissipation;

        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
            vec2 st = uv / tsize - 0.5;
            vec2 iuv = floor(st);
            vec2 fuv = fract(st);

            vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
            vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
            vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
            vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

            return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
        }

        void main () {
            #ifdef MANUAL_FILTERING
                vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
                vec4 result = bilerp(uSource, coord, dyeTexelSize);
            #else
                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                vec4 result = texture2D(uSource, coord);
            #endif
            float decay = 1.0 + dissipation * dt;
            gl_FragColor = result / decay;
        }
      `,
      ext.supportLinearFiltering ? null : ["MANUAL_FILTERING"]
    );

    const divergenceShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).x;
            float R = texture2D(uVelocity, vR).x;
            float T = texture2D(uVelocity, vT).y;
            float B = texture2D(uVelocity, vB).y;

            vec2 C = texture2D(uVelocity, vUv).xy;
            if (vL.x < 0.0) { L = -C.x; }
            if (vR.x > 1.0) { R = -C.x; }
            if (vT.y > 1.0) { T = -C.y; }
            if (vB.y < 0.0) { B = -C.y; }

            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
      `
    );

    const curlShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).y;
            float R = texture2D(uVelocity, vR).y;
            float T = texture2D(uVelocity, vT).x;
            float B = texture2D(uVelocity, vB).x;
            float vorticity = R - L - T + B;
            gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }
      `
    );

    const vorticityShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float curl;
        uniform float dt;

        void main () {
            float L = texture2D(uCurl, vL).x;
            float R = texture2D(uCurl, vR).x;
            float T = texture2D(uCurl, vT).x;
            float B = texture2D(uCurl, vB).x;
            float C = texture2D(uCurl, vUv).x;

            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
            force /= length(force) + 0.0001;
            force *= curl * C;
            force.y *= -1.0;

            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity += force * dt;
            velocity = min(max(velocity, -1000.0), 1000.0);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `
    );

    const pressureShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            float C = texture2D(uPressure, vUv).x;
            float divergence = texture2D(uDivergence, vUv).x;
            float pressure = (L + R + B + T - divergence) * 0.25;
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
      `
    );

    const gradientSubtractShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity.xy -= vec2(R - L, T - B);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `
    );

    // Initialize programs
    copyProgram = new Program(baseVertexShader, copyShader);
    clearProgram = new Program(baseVertexShader, clearShader);
    splatProgram = new Program(baseVertexShader, splatShader);
    advectionProgram = new Program(baseVertexShader, advectionShader);
    divergenceProgram = new Program(baseVertexShader, divergenceShader);
    curlProgram = new Program(baseVertexShader, curlShader);
    vorticityProgram = new Program(baseVertexShader, vorticityShader);
    pressureProgram = new Program(baseVertexShader, pressureShader);
    gradienSubtractProgram = new Program(
      baseVertexShader,
      gradientSubtractShader
    );
    displayMaterial = new Material(baseVertexShader, displayShaderSource);
  }

  // Fullscreen triangle setup
  let blit;

  function initializeBlit() {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
      gl.STATIC_DRAW
    );
    const elemBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elemBuffer);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array([0, 1, 2, 0, 2, 3]),
      gl.STATIC_DRAW
    );
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    blit = (target, doClear = false) => {
      if (!gl) return;
      if (!target) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      if (doClear) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };
  }

  // FBO creation functions
  function createFBO(w, h, internalFormat, format, type, param) {
    gl.activeTexture(gl.TEXTURE0);
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0
    );
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const texelSizeX = 1 / w;
    const texelSizeY = 1 / h;

    return {
      texture,
      fbo,
      width: w,
      height: h,
      texelSizeX,
      texelSizeY,
      attach(id) {
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        return id;
      }
    };
  }

  function createDoubleFBO(w, h, internalFormat, format, type, param) {
    const fbo1 = createFBO(w, h, internalFormat, format, type, param);
    const fbo2 = createFBO(w, h, internalFormat, format, type, param);
    return {
      width: w,
      height: h,
      texelSizeX: fbo1.texelSizeX,
      texelSizeY: fbo1.texelSizeY,
      read: fbo1,
      write: fbo2,
      swap() {
        const tmp = this.read;
        this.read = this.write;
        this.write = tmp;
      }
    };
  }

  function getResolution(resolution) {
    const w = gl.drawingBufferWidth;
    const h = gl.drawingBufferHeight;
    const aspectRatio = w / h;
    let aspect = aspectRatio < 1 ? 1 / aspectRatio : aspectRatio;
    const min = Math.round(resolution);
    const max = Math.round(resolution * aspect);
    if (w > h) {
      return { width: max, height: min };
    }
    return { width: min, height: max };
  }

  function scaleByPixelRatio(input) {
    const pixelRatio = window.devicePixelRatio || 1;
    return Math.floor(input * pixelRatio);
  }

  function initFramebuffers() {
    const simRes = getResolution(config.SIM_RESOLUTION);
    const dyeRes = getResolution(config.DYE_RESOLUTION);

    const texType = ext.halfFloatTexType;
    const rgba = ext.formatRGBA;
    const rg = ext.formatRG;
    const r = ext.formatR;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
    gl.disable(gl.BLEND);

    if (!dye) {
      dye = createDoubleFBO(
        dyeRes.width,
        dyeRes.height,
        rgba.internalFormat,
        rgba.format,
        texType,
        filtering
      );
    }

    if (!velocity) {
      velocity = createDoubleFBO(
        simRes.width,
        simRes.height,
        rg.internalFormat,
        rg.format,
        texType,
        filtering
      );
    }

    divergence = createFBO(
      simRes.width,
      simRes.height,
      r.internalFormat,
      r.format,
      texType,
      gl.NEAREST
    );
    curlFBO = createFBO(
      simRes.width,
      simRes.height,
      r.internalFormat,
      r.format,
      texType,
      gl.NEAREST
    );
    pressureFBO = createDoubleFBO(
      simRes.width,
      simRes.height,
      r.internalFormat,
      r.format,
      texType,
      gl.NEAREST
    );
  }

  function updateKeywords() {
    const displayKeywords = [];
    if (config.SHADING) displayKeywords.push("SHADING");
    displayMaterial.setKeywords(displayKeywords);
  }

  // Color and utility functions
  function HSVtoRGB(h, s, v) {
    let r = 0,
      g = 0,
      b = 0;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }
    return { r, g, b };
  }

  // MORE VIBRANT color generation - increased saturation and brightness
  function generateColor() {
    // Use more vibrant, saturated colors
    let hue;
    
    // Vibrant color palette - warm and cool tones
    if (Math.random() > 0.5) {
      hue = 0.0 + (Math.random() * 0.15); // Vibrant reds/oranges (0-0.15)
    } else {
      hue = 0.55 + (Math.random() * 0.25); // Vibrant blues/purples (0.55-0.8)
    }
    
    // INCREASED saturation (0.75-0.95) for more vibrancy
    // INCREASED brightness (0.7-0.9) for more visibility
    const c = HSVtoRGB(hue, 0.75 + (Math.random() * 0.2), 0.7 + (Math.random() * 0.2));
    
    // INCREASED intensity boost for more vibrant appearance
    const intensity = 0.6 + (Math.random() * 0.3); // 0.6-0.9 range (much higher than before)
    
    c.r *= intensity;
    c.g *= intensity;
    c.b *= intensity;
    
    return c;
  }

  function wrap(value, min, max) {
    const range = max - min;
    if (range === 0) return min;
    return ((value - min) % range) + min;
  }

  // Simulation functions
  function updateFrame() {
    const dt = calcDeltaTime();
    if (resizeCanvas()) initFramebuffers();
    updateColors(dt);
    applyInputs();
    step(dt);
    render(null);
    requestAnimationFrame(updateFrame);
  }

  function calcDeltaTime() {
    const now = Date.now();
    let dt = (now - lastUpdateTime) / 1000;
    dt = Math.min(dt, 0.016666);
    lastUpdateTime = now;
    return dt;
  }

  function resizeCanvas() {
    const width = scaleByPixelRatio(canvas.clientWidth);
    const height = scaleByPixelRatio(canvas.clientHeight);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      return true;
    }
    return false;
  }

  function updateColors(dt) {
    colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
    if (colorUpdateTimer >= 1) {
      colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
      pointers.forEach((p) => {
        p.color = generateColor();
      });
    }
  }

  function applyInputs() {
    for (const p of pointers) {
      if (p.moved) {
        p.moved = false;
        splatPointer(p);
      }
    }
  }

  function step(dt) {
    gl.disable(gl.BLEND);

    // Curl
    curlProgram.bind();
    if (curlProgram.uniforms.texelSize) {
      gl.uniform2f(
        curlProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
    }
    if (curlProgram.uniforms.uVelocity) {
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
    }
    blit(curlFBO);

    // Vorticity
    vorticityProgram.bind();
    if (vorticityProgram.uniforms.texelSize) {
      gl.uniform2f(
        vorticityProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
    }
    if (vorticityProgram.uniforms.uVelocity) {
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
    }
    if (vorticityProgram.uniforms.uCurl) {
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curlFBO.attach(1));
    }
    if (vorticityProgram.uniforms.curl) {
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
    }
    if (vorticityProgram.uniforms.dt) {
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
    }
    blit(velocity.write);
    velocity.swap();

    // Divergence
    divergenceProgram.bind();
    if (divergenceProgram.uniforms.texelSize) {
      gl.uniform2f(
        divergenceProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
    }
    if (divergenceProgram.uniforms.uVelocity) {
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
    }
    blit(divergence);

    // Clear pressure
    clearProgram.bind();
    if (clearProgram.uniforms.uTexture) {
      gl.uniform1i(clearProgram.uniforms.uTexture, pressureFBO.read.attach(0));
    }
    if (clearProgram.uniforms.value) {
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
    }
    blit(pressureFBO.write);
    pressureFBO.swap();

    // Pressure
    pressureProgram.bind();
    if (pressureProgram.uniforms.texelSize) {
      gl.uniform2f(
        pressureProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
    }
    if (pressureProgram.uniforms.uDivergence) {
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
    }
    for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
      if (pressureProgram.uniforms.uPressure) {
        gl.uniform1i(
          pressureProgram.uniforms.uPressure,
          pressureFBO.read.attach(1)
        );
      }
      blit(pressureFBO.write);
      pressureFBO.swap();
    }

    // Gradient Subtract
    gradienSubtractProgram.bind();
    if (gradienSubtractProgram.uniforms.texelSize) {
      gl.uniform2f(
        gradienSubtractProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
    }
    if (gradienSubtractProgram.uniforms.uPressure) {
      gl.uniform1i(
        gradienSubtractProgram.uniforms.uPressure,
        pressureFBO.read.attach(0)
      );
    }
    if (gradienSubtractProgram.uniforms.uVelocity) {
      gl.uniform1i(
        gradienSubtractProgram.uniforms.uVelocity,
        velocity.read.attach(1)
      );
    }
    blit(velocity.write);
    velocity.swap();

    // Advection - velocity
    advectionProgram.bind();
    if (advectionProgram.uniforms.texelSize) {
      gl.uniform2f(
        advectionProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
    }
    if (!ext.supportLinearFiltering && advectionProgram.uniforms.dyeTexelSize) {
      gl.uniform2f(
        advectionProgram.uniforms.dyeTexelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
    }
    const velocityId = velocity.read.attach(0);
    if (advectionProgram.uniforms.uVelocity) {
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
    }
    if (advectionProgram.uniforms.uSource) {
      gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
    }
    if (advectionProgram.uniforms.dt) {
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
    }
    if (advectionProgram.uniforms.dissipation) {
      gl.uniform1f(
        advectionProgram.uniforms.dissipation,
        config.VELOCITY_DISSIPATION
      );
    }
    blit(velocity.write);
    velocity.swap();

    // Advection - dye
    if (!ext.supportLinearFiltering && advectionProgram.uniforms.dyeTexelSize) {
      gl.uniform2f(
        advectionProgram.uniforms.dyeTexelSize,
        dye.texelSizeX,
        dye.texelSizeY
      );
    }
    if (advectionProgram.uniforms.uVelocity) {
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
    }
    if (advectionProgram.uniforms.uSource) {
      gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
    }
    if (advectionProgram.uniforms.dissipation) {
      gl.uniform1f(
        advectionProgram.uniforms.dissipation,
        config.DENSITY_DISSIPATION
      );
    }
    blit(dye.write);
    dye.swap();
  }

  function render(target) {
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);
    drawDisplay(target);
  }

  function drawDisplay(target) {
    const width = target ? target.width : gl.drawingBufferWidth;
    const height = target ? target.height : gl.drawingBufferHeight;
    displayMaterial.bind();
    if (config.SHADING && displayMaterial.uniforms.texelSize) {
      gl.uniform2f(displayMaterial.uniforms.texelSize, 1 / width, 1 / height);
    }
    if (displayMaterial.uniforms.uTexture) {
      gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
    }
    blit(target, false);
  }

  // Interaction functions
  function splatPointer(pointer) {
    const dx = pointer.deltaX * config.SPLAT_FORCE;
    const dy = pointer.deltaY * config.SPLAT_FORCE;
    splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
  }

  // VIBRANT click splat - increased multiplier
  function clickSplat(pointer) {
    const color = generateColor();
    // INCREASED multiplier for more vibrant clicks (was 5-10, now 15-25)
    const multiplier = 15 + (Math.random() * 10);
    color.r *= multiplier;
    color.g *= multiplier;
    color.b *= multiplier;
    
    const dx = 5 * (Math.random() - 0.5);
    const dy = 15 * (Math.random() - 0.5);
    splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
  }

  // VIBRANT splat with slightly higher velocity
  function splat(x, y, dx, dy, color) {
    splatProgram.bind();
    if (splatProgram.uniforms.uTarget) {
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
    }
    if (splatProgram.uniforms.aspectRatio) {
      gl.uniform1f(
        splatProgram.uniforms.aspectRatio,
        canvas.width / canvas.height
      );
    }
    if (splatProgram.uniforms.point) {
      gl.uniform2f(splatProgram.uniforms.point, x, y);
    }
    
    // Slightly higher velocity multiplier for more vibrant movement
    const velocityMultiplier = 1.0; // Increased from 0.8
    if (splatProgram.uniforms.color) {
      gl.uniform3f(splatProgram.uniforms.color, dx * velocityMultiplier, dy * velocityMultiplier, 0);
    }
    
    if (splatProgram.uniforms.radius) {
      gl.uniform1f(
        splatProgram.uniforms.radius,
        correctRadius(config.SPLAT_RADIUS / 100)
      );
    }
    blit(velocity.write);
    velocity.swap();

    // Dye splat - this is where the color appears
    if (splatProgram.uniforms.uTarget) {
      gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
    }
    if (splatProgram.uniforms.color) {
      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
    }
    blit(dye.write);
    dye.swap();
  }

  function correctRadius(radius) {
    const aspectRatio = canvas.width / canvas.height;
    if (aspectRatio > 1) radius *= aspectRatio;
    return radius;
  }

  function updatePointerDownData(pointer, id, posX, posY) {
    pointer.id = id;
    pointer.down = true;
    pointer.moved = false;
    pointer.texcoordX = posX / canvas.width;
    pointer.texcoordY = 1 - posY / canvas.height;
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.deltaX = 0;
    pointer.deltaY = 0;
    pointer.color = generateColor();
  }

  function updatePointerMoveData(pointer, posX, posY, color) {
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.texcoordX = posX / canvas.width;
    pointer.texcoordY = 1 - posY / canvas.height;
    pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
    pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
    pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
    pointer.color = color;
  }

  function correctDeltaX(delta) {
    const aspectRatio = canvas.width / canvas.height;
    if (aspectRatio < 1) delta *= aspectRatio;
    return delta;
  }

  function correctDeltaY(delta) {
    const aspectRatio = canvas.width / canvas.height;
    if (aspectRatio > 1) delta /= aspectRatio;
    return delta;
  }

  // FIXED: Event listeners with proper mobile handling - SMOOTH SCROLLING
  function setupEventListeners() {
    let touchStartTime = 0;
    let touchStartY = 0;
    let touchStartX = 0;
    let isTouchMoving = false;
    
    // Mouse events (desktop) - keep as is
    window.addEventListener("mousedown", (e) => {
      const pointer = pointers[0];
      const posX = scaleByPixelRatio(e.clientX);
      const posY = scaleByPixelRatio(e.clientY);
      updatePointerDownData(pointer, -1, posX, posY);
      clickSplat(pointer);
    });

    window.addEventListener("mousemove", (e) => {
      const pointer = pointers[0];
      const posX = scaleByPixelRatio(e.clientX);
      const posY = scaleByPixelRatio(e.clientY);
      const color = pointer.color;
      updatePointerMoveData(pointer, posX, posY, color);
    });

    // FIXED: Touch events for mobile - COMPLETELY REWRITTEN FOR SMOOTH SCROLLING
    // Use PASSIVE listeners for scroll, ACTIVE only when needed for fluid
    
    // Touch start - detect if interactive element, otherwise passive
    window.addEventListener("touchstart", (e) => {
      touchStartTime = Date.now();
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      isTouchMoving = false;
      
      // Check if clicking on interactive element
      const target = e.target;
      const isInteractive = target.closest('a') || 
                           target.closest('button') || 
                           target.closest('input') ||
                           target.closest('textarea') ||
                           target.closest('select') ||
                           target.closest('.menu-btn') || 
                           target.closest('.navbar') || 
                           target.closest('#chatIcon') || 
                           target.closest('.social-icon') ||
                           target.closest('.menu') ||
                           target.closest('nav');
      
      if (!isInteractive) {
        // Only prevent default on non-interactive elements
        // This allows scrolling to work naturally
        const pointer = pointers[0];
        const posX = scaleByPixelRatio(e.touches[0].clientX);
        const posY = scaleByPixelRatio(e.touches[0].clientY);
        updatePointerDownData(pointer, 0, posX, posY);
      }
    }, { passive: true });

    // Touch move - handle fluid effect without blocking scroll
    window.addEventListener("touchmove", (e) => {
      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const deltaY = Math.abs(currentY - touchStartY);
      const deltaX = Math.abs(currentX - touchStartX);
      
      // If we've moved significantly, mark as moving
      if (deltaY > 5 || deltaX > 5) {
        isTouchMoving = true;
      }
      
      // Only apply fluid effect for horizontal-ish movements or very small vertical movements
      // This prevents scroll blocking while allowing fluid interaction
      if (deltaX > deltaY && deltaX > 10) {
        // Horizontal movement - apply fluid effect
        e.preventDefault(); // Prevent scroll only for horizontal swipes
        const pointer = pointers[0];
        const posX = scaleByPixelRatio(currentX);
        const posY = scaleByPixelRatio(currentY);
        updatePointerMoveData(pointer, posX, posY, pointer.color);
      }
      // Vertical movements > 10px are treated as scroll - do nothing, let browser handle it
      
    }, { passive: false });

    // Touch end - handle click vs scroll
    window.addEventListener("touchend", (e) => {
      const pointer = pointers[0];
      pointer.down = false;
      
      const touchDuration = Date.now() - touchStartTime;
      
      // If it was a short tap without much movement, treat as click
      if (!isTouchMoving && touchDuration < 200) {
        clickSplat(pointer);
      }
      
      isTouchMoving = false;
    }, { passive: true });

    window.addEventListener("touchcancel", (e) => {
      const pointer = pointers[0];
      pointer.down = false;
      isTouchMoving = false;
    }, { passive: true });
  }

  // Initialize everything
  function init() {
    try {
      if (!initializeWebGL()) return;
      initializeShaders();
      initializeBlit();
      updateKeywords();
      initFramebuffers();
      setupEventListeners();
      updateFrame();
    } catch (error) {
      console.error("Failed to initialize fluid simulation:", error);
    }
  }

  // Start when page loads
  init();
})();
