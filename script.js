document.addEventListener('DOMContentLoaded', function () {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    alert('Η φόρμα είναι demo. Προσθέστε δικό σας backend (π.χ. PHP ή υπηρεσία φόρμας) για να λαμβάνετε τα στοιχεία.');
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) contactForm.addEventListener('submit', handleFormSubmit);
});
