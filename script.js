// =========================
// Año dinámico en el footer
// =========================
document.getElementById('year').textContent = new Date().getFullYear();

// =========================
// HERO SLIDER (con desplazamiento y botones)
// =========================
const track = document.querySelector('.hero-track');
const slides = document.querySelectorAll('.hero-slide');
const btnPrev = document.querySelector('.hero-btn.prev');
const btnNext = document.querySelector('.hero-btn.next');

if(track && slides.length > 0 && btnPrev && btnNext){
  let heroIndex = 0;
  const total = slides.length;
  const autoMs = 5000;
  let autoTimer = null;

  function goTo(index) {
    heroIndex = (index + total) % total;
    track.style.transform = `translateX(-${heroIndex * 100}%)`;
  }

  function next() { goTo(heroIndex + 1); }
  function prev() { goTo(heroIndex - 1); }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, autoMs);
  }
  function stopAuto() {
    if(autoTimer) clearInterval(autoTimer);
  }

  btnNext.addEventListener('click', () => { next(); startAuto(); });
  btnPrev.addEventListener('click', () => { prev(); startAuto(); });

  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);

  goTo(0);
  startAuto();
}

// =========================
// FUNCIONALIDAD DE CLASES POR DÍA
// =========================
const diasNav = document.querySelectorAll('#diasNav button');
const clasesContainer = document.getElementById('clasesContainer');

// Objeto para almacenar las imágenes de cada día
const clasesDias = {
  lunes: ["lun.jpg","lu.jpg","l.jpg"],
  martes: ["m.jpg","majpg.jpg","mar.jpg"],
  miercoles: ["mi.jpg","mie.jpg","mire.jpg","mirec.jpg"],
  jueves: ["j.jpg","ju.jpg"],
  viernes: ["v.jpg","vi.jpg","vie.jpg"]
};

// Función para mostrar imágenes de un día
function mostrarClases(dia) {
  if(!clasesContainer) return;
  clasesContainer.innerHTML = ''; // Limpiar contenedor
  const imagenes = clasesDias[dia];
  if(imagenes.length === 0) {
    clasesContainer.innerHTML = '<div class="col-12 text-center text-muted">No hay imágenes aún para este día</div>';
    return;
  }
  imagenes.forEach(src => {
    const div = document.createElement('div');
    div.className = 'col-md-4';
    div.innerHTML = `<img src="${src}" class="img-fluid rounded">`;
    clasesContainer.appendChild(div);
  });
}

// Evento para cambiar de día
if(diasNav.length > 0) {
  diasNav.forEach(btn => {
    btn.addEventListener('click', () => {
      diasNav.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const dia = btn.getAttribute('data-dia');
      mostrarClases(dia);
    });
  });
}
