// Consultation des maquettes
function voirDemo(nomProjet) {
  alert(`Ouverture de la structure optimisée pour le secteur : ${nomProjet}.`);
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

// Traitement du Formulaire et Redirection Stripe
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

// Ton vrai lien Stripe
const STRIPE_PAYMENT_URL = "https://buy.stripe.com/6oU6oJaod0COg13d1B73G00"; 

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.innerText = "Validation en cours...";
  submitBtn.disabled = true;

  const data = new FormData(form);
  
  try {
    // Si tu utilises Formspree, l'envoi se fait ici
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
      feedback.style.color = '#0044ff';
      feedback.innerText = "Cahier des charges validé. Redirection vers le paiement...";
      
      setTimeout(() => {
        window.location.href = STRIPE_PAYMENT_URL;
      }, 1500);

    } else {
      feedback.style.color = '#d32f2f';
      feedback.innerText = "Erreur de connexion. Vérifiez votre lien Formspree.";
      submitBtn.innerText = "Valider et procéder au paiement — 200 €";
      submitBtn.disabled = false;
    }
  } catch (error) {
    feedback.style.color = '#d32f2f';
    feedback.innerText = "Connexion impossible.";
    submitBtn.innerText = "Valider et procéder au paiement — 200 €";
    submitBtn.disabled = false;
  }
});
