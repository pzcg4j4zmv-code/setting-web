// Consultation des démonstrations
function voirDemo(nomProjet) {
  alert(`Setting Web : Démonstration de l'interface [${nomProjet}].`);
}

// Module Accordéon FAQ
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    
    document.querySelectorAll('.faq-item').forEach(item => {
      if (item !== faqItem) {
        item.classList.remove('active');
      }
    });

    faqItem.classList.toggle('active');
  });
});

// Compte à rebours dynamique (Effet d'urgence)
function startTimer(durationInSeconds) {
  let timer = durationInSeconds;
  const timerElement = document.getElementById('timer');

  setInterval(() => {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;

    if (timerElement) {
      timerElement.textContent = 
        `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
    }

    if (--timer < 0) {
      timer = durationInSeconds; // Recommence le compte à rebours
    }
  }, 1000);
}

startTimer(16335); // 4 heures, 32 min, 15 sec

// Traitement du Formulaire de Contact (Formspree)
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const data = new FormData(form);
  
  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
      feedback.style.color = '#0052cc';
      feedback.innerText = "Merci ! Vos éléments ont bien été transmis à Setting Web. Nous revenons vers vous sous 24h.";
      form.reset();
    } else {
      feedback.style.color = '#d32f2f';
      feedback.innerText = "Une erreur technique s'est produite lors de l'envoi.";
    }
  } catch (error) {
    feedback.style.color = '#d32f2f';
    feedback.innerText = "Connexion au serveur impossible.";
  }
});
