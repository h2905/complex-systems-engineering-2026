const slides = [...document.querySelectorAll(".slide")];
const stage = document.querySelector(".deck-stage");
const counter = document.querySelector(".counter");
const progress = document.querySelector(".progress span");
let current = Math.max(0, Math.min(slides.length - 1, Number(location.hash.replace("#slide-", "")) - 1 || 0));

function fitStage() {
  const scale = Math.min((window.innerWidth - 24) / 1280, (window.innerHeight - 24) / 720);
  stage.style.transform = `scale(${scale})`;
}

function showSlide(index) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === current);
    slide.setAttribute("aria-hidden", String(i !== current));
  });
  slides[current].querySelectorAll("a, button").forEach((item) => item.removeAttribute("tabindex"));
  slides.forEach((slide, i) => {
    if (i !== current) slide.querySelectorAll("a, button").forEach((item) => item.setAttribute("tabindex", "-1"));
  });
  counter.textContent = `${String(current + 1).padStart(2, "0")} / ${slides.length}`;
  progress.style.width = `${((current + 1) / slides.length) * 100}%`;
  history.replaceState(null, "", `#slide-${current + 1}`);
}

document.querySelector("[data-prev]").addEventListener("click", () => showSlide(current - 1));
document.querySelector("[data-next]").addEventListener("click", () => showSlide(current + 1));
document.querySelector("[data-print]").addEventListener("click", () => window.print());

document.addEventListener("keydown", (event) => {
  if (["ArrowRight", "PageDown", " "].includes(event.key)) {
    event.preventDefault();
    showSlide(current + 1);
  }
  if (["ArrowLeft", "PageUp"].includes(event.key)) {
    event.preventDefault();
    showSlide(current - 1);
  }
  if (event.key === "Home") showSlide(0);
  if (event.key === "End") showSlide(slides.length - 1);
});

let wheelLocked = false;
document.addEventListener("wheel", (event) => {
  if (wheelLocked || Math.abs(event.deltaY) < 18) return;
  wheelLocked = true;
  showSlide(current + (event.deltaY > 0 ? 1 : -1));
  window.setTimeout(() => { wheelLocked = false; }, 420);
}, { passive: true });

window.addEventListener("resize", fitStage);
fitStage();
showSlide(current);
