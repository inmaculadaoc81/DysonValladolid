
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dropdown-toggle').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const box = btn.closest('.dropdown');
      const willOpen = !box.classList.contains('open');
      document.querySelectorAll('.dropdown.open').forEach(el => el.classList.remove('open'));
      document.querySelectorAll('.dropdown-toggle[aria-expanded="true"]').forEach(el => el.setAttribute('aria-expanded','false'));
      if (willOpen) {
        box.classList.add('open');
        btn.setAttribute('aria-expanded','true');
      }
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown.open').forEach(el => el.classList.remove('open'));
    document.querySelectorAll('.dropdown-toggle[aria-expanded="true"]').forEach(el => el.setAttribute('aria-expanded','false'));
  });

  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const button = form.querySelector('button[type="submit"],button:not([type])');
    const old = button ? button.textContent : '';
    if (button) { button.disabled = true; button.textContent = 'Enviando…'; }
    if (status) { status.textContent = 'Enviando consulta…'; status.className=''; }
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      let data = {};
      try { data = await response.json(); } catch (_) {}
      if (!response.ok) throw new Error(data.code || data.error || 'SEND_FAILED');
      form.reset();
      if (status) { status.textContent = '✓ Consulta enviada correctamente.'; status.className='success'; }
    } catch (err) {
      console.error(err);
      if (status) {
        status.textContent = err.message === 'MISSING_ENVIRONMENT_VARIABLES'
          ? 'La configuración del correo no está completa en Vercel.'
          : 'No se pudo enviar la consulta. Puedes contactarnos por WhatsApp o teléfono.';
        status.className='error';
      }
    } finally {
      if (button) { button.disabled = false; button.textContent = old; }
    }
  });
});
