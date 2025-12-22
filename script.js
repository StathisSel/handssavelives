document.addEventListener('DOMContentLoaded', function () {
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const form = document.getElementById('contact-form');
  const note = document.querySelector('.form-note');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (note) note.textContent = "Αποστολή...";

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
      });

      const text = await res.text();

      if (res.ok && text.trim() === "OK") {
        if (note) note.textContent = "✅ Το μήνυμα στάλθηκε. Θα επικοινωνήσουμε σύντομα!";
        form.reset();
      } else {
        if (note) note.textContent = "❌ Αποτυχία: " + text;
      }
    } catch (err) {
      if (note) note.textContent = "❌ Σφάλμα δικτύου. Δοκιμάστε ξανά.";
    }
  });
});
