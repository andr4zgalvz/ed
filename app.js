/* app.js - mejoras: comprobaciones, botones semánticos, teclado, Esc, retorno de foco */

const items = [
  { icon: "🌸", text: "Eres una persona con una luz increíble.", image: "https://picsum.photos/400/300?random=1" },
  { icon: "🌼", text: "Nunca dejes de sonreír.", image: "" },
  { icon: "🌻", text: "Cada día es una nueva oportunidad para florecer.", image: "https://picsum.photos/400/300?random=2" },
  { icon: "💐", text: "Gracias por estar aquí.", image: "https://picsum.photos/400/300?random=3" },
  { icon: "🌺", text: "Todo lo que buscas está en tu interior.", image: "" }
];

/* Referencias DOM (con comprobación) */
const garden = document.getElementById('garden');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalText = document.getElementById('modal-text');
const closeBtn = document.getElementById('close-btn');

if (!garden || !modal || !modalText || !closeBtn) {
  console.error('Estructura HTML requerida ausente. Asegúrate de que #garden, #modal, #modal-text y #close-btn existen.');
} else {
  let lastFocused = null;

  /* Limpiar el contenedor por si ya había contenido */
  garden.innerHTML = '';

  /* Crear flores (botones) */
  items.forEach(item => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'flower';
    btn.setAttribute('aria-label', item.text || 'Flor');
    btn.innerHTML = `<span class="icon">${item.icon ?? '🌸'}</span>`;
    btn.addEventListener('click', () => openModal(item, btn));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(item, btn);
      }
    });
    garden.appendChild(btn);
  });

  function openModal(data, triggerEl) {
    lastFocused = triggerEl || document.activeElement;

    modalText.textContent = data.text || '';
    if (data.image) {
      modalImg.src = data.image;
      modalImg.alt = data.text || 'Imagen';
      modalImg.classList.remove('hidden');
    } else {
      modalImg.src = '';
      modalImg.alt = '';
      modalImg.classList.add('hidden');
    }

    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    // evitar scroll de fondo
    document.body.style.overflow = 'hidden';
    // mover foco al botón de cierre
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // restaurar foco al elemento que abrió el modal
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  /* Listeners para cerrar */
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    // clic en el fondo (no en modal-content)
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}
