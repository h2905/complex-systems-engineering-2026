const header = document.querySelector(".site-header");
const updateHeader = () => {
  if (header) header.classList.toggle("scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealTargets = document.querySelectorAll(
  ".entry, .report-banner, .doc-section > *"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -24px" }
  );

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.transitionDelay = `${Math.min(index % 5, 4) * 38}ms`;
    observer.observe(element);
  });
} else {
  revealTargets.forEach((element) => element.classList.add("visible"));
}

window.setTimeout(() => {
  revealTargets.forEach((element) => element.classList.add("visible"));
}, 900);
