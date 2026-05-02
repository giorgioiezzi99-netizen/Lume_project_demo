const nav = document.querySelector(".nav");
const revealItems = document.querySelectorAll(".reveal");

const updateNav = () => {
  nav.classList.toggle("is-solid", window.scrollY > 32);
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, { threshold: 0.14 });

revealItems.forEach((item) => observer.observe(item));
updateNav();
window.addEventListener("scroll", updateNav, { passive: true });