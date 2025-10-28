/**
 * Portfolio Website JavaScript
 * Author: Vineet Kalosiya
 * Data Scientist & AI Engineer
 *
 * This file contains all the interactive functionality for the portfolio website
 * including 3D animations, scroll effects, and dynamic content.
 */

// ===================================================================
// Typed.js Initialization - Dynamic Text Effects
// ===================================================================

document.addEventListener("DOMContentLoaded", function () {
  new Typed("#typed-text", {
    strings: [
      "Skilled in deep learning and machine learning, ready to turn data into valuable insights for innovative solutions.",
      "Experienced in building production-ready AI systems and MLOps pipelines.",
      "Passionate about creating intelligent solutions that drive business impact.",
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: "|",
  });
});

// ===================================================================
// Three.js 3D Background Animation System
// ===================================================================

let scene, camera, renderer, particles;

/**
 * Initialize Three.js 3D particle system
 * Creates an animated background with floating particles
 */
function initThree() {
  // Initialize scene, camera, and renderer
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("three-canvas"),
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Create particle system with random positions and colors
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const colors = [];

  // Generate 1000 particles with random positions
  for (let i = 0; i < 1000; i++) {
    vertices.push(
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000
    );

    // Data science themed colors (blue, purple, pink)
    const color = new THREE.Color();
    const colorOptions = [0x00d4ff, 0x8b5cf6, 0xf472b6];
    color.setHex(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
    colors.push(color.r, color.g, color.b);
  }

  // Set geometry attributes
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  // Create material with transparency and additive blending
  const material = new THREE.PointsMaterial({
    size: 3,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });

  // Create and add particles to scene
  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Position camera
  camera.position.z = 1000;

  // Start animation loop
  animate();
}

/**
 * Animation loop for Three.js particle system
 * Handles rotation and wave motion of particles
 */
function animate() {
  requestAnimationFrame(animate);

  // Rotate entire particle system
  particles.rotation.x += 0.0005;
  particles.rotation.y += 0.001;

  // Create wave motion effect
  const positions = particles.geometry.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.1;
  }
  particles.geometry.attributes.position.needsUpdate = true;

  // Render the scene
  renderer.render(scene, camera);
}

/**
 * Handle window resize events for Three.js canvas
 */
function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize Three.js when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initThree();
});

// Handle window resize
window.addEventListener("resize", handleResize);

// ===================================================================
// Navigation & Scroll Effects
// ===================================================================

/**
 * Smooth scrolling for navigation links
 */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

/**
 * Navbar scroll effect - changes appearance on scroll
 */
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===================================================================
// Intersection Observer - Fade In Animation
// ===================================================================

/**
 * Fade in animation on scroll using Intersection Observer
 * Triggers when elements enter the viewport
 */
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, observerOptions);

// Observe all fade-in sections
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".fade-in-section").forEach((section) => {
    observer.observe(section);
  });
});

// ===================================================================
// Mobile Menu Toggle
// ===================================================================

/**
 * Mobile hamburger menu functionality
 */
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      // Animate hamburger menu
      menuToggle.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });
  }
});

// ===================================================================
// Performance Optimization
// ===================================================================

/**
 * Throttle scroll events for better performance
 */
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply throttling to scroll event
const throttledScrollHandler = throttle(() => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}, 16);

window.addEventListener("scroll", throttledScrollHandler);

// ===================================================================
// Additional Interactive Features
// ===================================================================

/**
 * Add loading state to buttons
 */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      // Add click animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });
});

/**
 * Lazy load images when they come into view
 */
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.classList.add("loaded");
        imageObserver.unobserve(img);
      }
    }
  });
});

// Observe all lazy load images
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
});

/**
 * Add parallax effect to floating elements
 */
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".floating-element");

  parallaxElements.forEach((element, index) => {
    const speed = (index + 1) * 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

/**
 * Console welcome message
 */
console.log(`
🚀 Welcome to Vineet Kalosiya's Portfolio
📊 Data Scientist & AI Engineer
🌟 Built with modern web technologies

💻 Tech Stack:
- HTML5 & CSS3
- JavaScript ES6+
- Three.js for 3D animations
- Intersection Observer API
- CSS Grid & Flexbox

📫 Contact: vineetkalosiya@alumni.iitm.ac.in
🔗 GitHub: https://github.com/iamvnt
`);

// ===================================================================
// Error Handling & Fallbacks
// ===================================================================

/**
 * Handle Three.js initialization errors
 */
window.addEventListener("error", (e) => {
  if (e.message.includes("THREE") || e.message.includes("WebGL")) {
    console.warn("3D animations disabled due to WebGL/Three.js issues");
    // Hide the canvas if Three.js fails
    const canvas = document.getElementById("three-canvas");
    if (canvas) {
      canvas.style.display = "none";
    }
  }
});

/**
 * Reduced motion preference detection
 */
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // Disable animations for users who prefer reduced motion
  document.documentElement.style.setProperty("--animation-duration", "0s");

  // Stop Three.js animations
  if (typeof animate === "function") {
    animate = () => {}; // Override animate function
  }
}
