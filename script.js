document.addEventListener('DOMContentLoaded', () => {

  // 1. CURSEUR INTERACTIF & IMMERSIF
  const dot = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');

  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      dot.style.transform = `translate3d(${posX - 4}px, ${posY - 4}px, 0)`;
      outline.style.transform = `translate3d(${posX - 18}px, ${posY - 18}px, 0)`;
    });

    const hoverables = document.querySelectorAll('a, button, .tilt-card, .faq-question');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
    });
  }

  // 2. EFFET 3D "TILT" AU SURVOL DES CARTES
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // 3. BOUTONS MAGNÉTIQUES
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // 4. ANIMATIONS D'APPARITION AU SCROLL (GSAP)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.reveal-text').forEach(element => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });
  }

  // 5. ACCORDÉON FAQ
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  // 6. FORMULAIRE DE CONTACT FORMSPREE
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      status.style.color = '#0052cc';
      status.textContent = "Envoi en cours...";

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          status.style.color = '#00b67a';
          status.textContent = "Merci ! Votre message a été envoyé avec succès.";
          form.reset();
        } else {
          status.style.color = '#e53e3e';
          status.textContent = "Une erreur est survenue lors de l'envoi.";
        }
      } catch (error) {
        status.style.color = '#e53e3e';
        status.textContent = "Impossible de joindre le serveur.";
      }
    });
  }
});
