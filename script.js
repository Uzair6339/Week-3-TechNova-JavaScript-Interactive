// TechNova Week 3 - Interactive JavaScript

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const themeToggle = document.getElementById("themeToggle");
  const exploreBtn = document.getElementById("exploreBtn");
  const heroMessage = document.getElementById("heroMessage");
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");
  const scrollTop = document.getElementById("scrollTop");
  const currentYear = document.getElementById("currentYear");

  // Mobile navigation
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Close mobile menu after selecting a link
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    });
  });

  // Dark / light mode with localStorage
  const savedTheme = localStorage.getItem("technova-theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
    themeToggle.setAttribute("aria-label", "Switch to light mode");
  }

  themeToggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark-mode");
    localStorage.setItem("technova-theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  });

  // Hero interaction
  exploreBtn.addEventListener("click", () => {
    heroMessage.textContent = "Great choice! Explore the services section below.";
    setTimeout(() => {
      heroMessage.textContent = "";
    }, 3000);
  });

  // Contact form validation and dynamic success message
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formSuccess.textContent = "";

    let valid = true;

    if (name.value.trim().length < 2) {
      nameError.textContent = "Please enter at least 2 characters.";
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    }

    if (message.value.trim().length < 10) {
      messageError.textContent = "Message should contain at least 10 characters.";
      valid = false;
    }

    if (!valid) return;

    formSuccess.textContent = `Thanks, ${name.value.trim()}! Your message has been submitted successfully.`;
    contactForm.reset();
  });

  // Scroll-to-top button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      scrollTop.classList.add("show");
    } else {
      scrollTop.classList.remove("show");
    }
  });

  scrollTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Reveal sections on scroll using IntersectionObserver
  const revealElements = document.querySelectorAll(
    ".service-card, .about-box, .contact-box, .hero-card"
  );

  revealElements.forEach((element) => element.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observerInstance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => observer.observe(element));

  // Dynamic copyright year
  currentYear.textContent = new Date().getFullYear();
});
