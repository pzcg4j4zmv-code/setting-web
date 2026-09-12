// Consultation des maquettes
function voirDemo(nomProjet) {
  alert(`Setting Web : Ouverture du projet d'exemple [${nomProjet}].`);
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

// Traitement Asynchrone du Formulaire de Contact
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
      feedback.innerText = "Votre demande a été transmise à Setting Web. Un accusé vous sera adressé sous peu.";
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