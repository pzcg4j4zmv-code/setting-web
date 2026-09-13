document.addEventListener("DOMContentLoaded", () => {
  // Initialisation du Smooth Scroll avec Lenis
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Curseur personnalise
  const cursor = document.querySelector(".custom-cursor");
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // Compteur dynamique (7 jours à partir d'aujourd'hui)
  let countdownDate = new Date();
  countdownDate.setDate(countdownDate.getDate() + 7);

  function updateTimer() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
      const timerElement = document.getElementById("countdown");
      if (timerElement) timerElement.innerHTML = "Offre expirée";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const timerElement = document.getElementById("countdown");
    if (timerElement) {
      timerElement.innerHTML = `${days}j ${hours}h ${minutes}m ${seconds}s`;
    }
  }

  setInterval(updateTimer, 1000);
  updateTimer();

  // Animations au défilement GSAP
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".reveal-text").forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
    });
  });
});
