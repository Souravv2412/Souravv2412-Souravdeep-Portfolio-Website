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

// ===== FLUID ANIMATION FOR HOME SECTION - MOBILE FIXED VERSION =====
(function() {
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
  if (!fluidCanvas) return;

  // Add flag to track if we're on mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Disable on mobile or reduce interaction
  if (isMobile) {
    // On mobile, just show static effect or reduce interaction
    config.SPLAT_FORCE = 2000; // Reduce force
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

  // Programs
  let copyProgram, clearProgram, splatProgram, advectionProgram;
  let divergenceProgram, curlProgram, vorticityProgram, pressureProgram;
  let gradienSubtractProgram, displayMaterial;

  // Helper function to check if we should handle touch
  function shouldHandleTouch(e) {
    // Don't handle touch if we're scrolling
    if (isScrolling) return false;
    
    // Check if the target is interactive
    const target = e.target;
    const interactiveElements = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'OPTION'];
    if (interactiveElements.includes(target.tagName) || 
        target.closest('.menu-btn') || 
        target.closest('.navbar') || 
        target.closest('#chatIcon') || 
        target.closest('.social-icon')) {
      return false;
    }
    
    return true;
  }

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
          
          // Boost color saturation and brightness for more vibrant output
          c = c * 1.3; // Boost overall brightness
          
          // Saturation boost
          float gray = dot(c, vec3(0.299, 0.587, 0.114));
          c = mix(vec3(gray), c, 1.4); // 1.4 = saturation multiplier
          
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
          gl_FragColor = vec4(c, a * 0.8); // Keep transparency
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

  // UPDATED: More vibrant color generation
  function generateColor() {
    // Create vibrant colors with high saturation and brightness
    let hue;
    
    // Mix between warm and cool colors for variety
    if (Math.random() > 0.5) {
      hue = 0.0 + (Math.random() * 0.15); // Warm range (reds, oranges, yellows)
    } else {
      hue = 0.6 + (Math.random() * 0.3); // Cool range (blues, purples)
    }
    
    // High saturation (0.9-1.0) and high brightness (0.9-1.0)
    const c = HSVtoRGB(hue, 0.95, 0.95);
    
    // Boost intensity to 0.5-0.9 range
    const intensity = 0.5 + (Math.random() * 0.4);
    
    c.r *= intensity;
    c.g *= intensity;
    c.b *= intensity;
    
    // Randomly boost one channel for more variety
    const channelBoost = Math.floor(Math.random() * 3);
    if (channelBoost === 0) c.r *= 1.5;
    else if (channelBoost === 1) c.g *= 1.5;
    else c.b *= 1.5;
    
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

  // UPDATED: More vibrant click splat
  function clickSplat(pointer) {
    const color = generateColor();
    // Increase multiplier for more impact (15-25 range)
    const multiplier = 15 + (Math.random() * 10);
    color.r *= multiplier;
    color.g *= multiplier;
    color.b *= multiplier;
    
    const dx = 10 * (Math.random() - 0.5);
    const dy = 30 * (Math.random() - 0.5);
    splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
  }

  // UPDATED: Enhanced splat with velocity multiplier
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
    
    // Velocity splat - increase force for more energetic movement
    const velocityMultiplier = 1.5;
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

  // FIXED: Event listeners with proper mobile handling
  function setupEventListeners() {
    let touchStartTime = 0;
    let touchStartY = 0;
    
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

    // FIXED: Touch events for mobile
    window.addEventListener(
      "touchstart",
      (e) => {
        // Store touch start time and position for scroll detection
        touchStartTime = Date.now();
        touchStartY = e.touches[0].clientY;
        
        // Check if we should handle this touch
        if (!shouldHandleTouch(e)) {
          return; // Let the browser handle normally
        }
        
        e.preventDefault();
        const touches = e.targetTouches;
        const pointer = pointers[0];
        for (let i = 0; i < touches.length; i++) {
          const posX = scaleByPixelRatio(touches[i].clientX);
          const posY = scaleByPixelRatio(touches[i].clientY);
          updatePointerDownData(pointer, touches[i].identifier, posX, posY);
          clickSplat(pointer);
        }
      },
      { passive: false }
    );

    window.addEventListener(
      "touchmove",
      (e) => {
        // Detect if this is a scroll gesture
        const touchY = e.touches[0].clientY;
        const deltaY = Math.abs(touchY - touchStartY);
        const touchDuration = Date.now() - touchStartTime;
        
        // If movement is primarily vertical and quick, it's likely a scroll
        if (deltaY > 20 && touchDuration < 300) {
          isScrolling = true;
          // Clear the scrolling flag after a delay
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            isScrolling = false;
          }, 300);
        }
        
        // Check if we should handle this touch
        if (!shouldHandleTouch(e) || isScrolling) {
          return; // Let the browser handle scrolling
        }
        
        e.preventDefault();
        const touches = e.targetTouches;
        const pointer = pointers[0];
        for (let i = 0; i < touches.length; i++) {
          const posX = scaleByPixelRatio(touches[i].clientX);
          const posY = scaleByPixelRatio(touches[i].clientY);
          updatePointerMoveData(pointer, posX, posY, pointer.color);
        }
      },
      { passive: false }
    );

    window.addEventListener("touchend", (e) => {
      const pointer = pointers[0];
      pointer.down = false;
      
      // Reset scroll flag after touch ends
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100);
    });

    window.addEventListener("touchcancel", (e) => {
      const pointer = pointers[0];
      pointer.down = false;
      isScrolling = false;
    });
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
