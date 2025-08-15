// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;
    
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Cerrar menú al hacer clic en un enlace
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(event) {
            if (!mobileNav.contains(event.target) && !menuToggle.contains(event.target) && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
    
    // Animación de entrada para elementos al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.sector-item, .management-item, .client-logo');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Inicializar los elementos con opacidad 0 y transformación
    const elementsToAnimate = document.querySelectorAll('.sector-item, .management-item, .client-logo');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ejecutar la animación al cargar la página y al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar para elementos visibles inicialmente
    
    // Control de visibilidad del botón de WhatsApp flotante
    const whatsappFloat = document.querySelector('.whatsapp-float');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Mostrar/ocultar botón de WhatsApp basado en dirección de scroll
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            // Scroll hacia abajo y más allá de 300px desde el top
            whatsappFloat.style.transform = 'translateY(0)';
            whatsappFloat.style.opacity = '1';
        } else if (scrollTop < 300) {
            // Cerca del top de la página
            whatsappFloat.style.transform = 'translateY(100px)';
            whatsappFloat.style.opacity = '0';
        } else {
            // Scroll hacia arriba
            whatsappFloat.style.transform = 'translateY(0)';
            whatsappFloat.style.opacity = '1';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Efecto hover para los sectores
    const sectorItems = document.querySelectorAll('.sector-item');
    
    sectorItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.sector-icon img');
            icon.style.filter = 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.sector-icon img');
            icon.style.filter = 'brightness(0) invert(1)';
        });
    });

    /* ====== PRODUCTOS ====== */
    /* ====== Slider de productos (pro) ====== */
(()=>{'use strict';
  const slides = Array.from(document.querySelectorAll('.np-slide'));
  if(!slides.length) return;

  let current = 0;

  // Oculta todo el contenido de tabs y deja ambos botones sin activar (estado inicial)
  function resetTabs(slide){
    const tabs   = slide.querySelectorAll('.np-tab');
    const panels = slide.querySelectorAll('.np-panel');
    tabs.forEach(t=>{
      t.classList.remove('is-active');
      t.setAttribute('aria-selected','false');
    });
    panels.forEach(p=>{
      p.classList.remove('is-active');
      p.setAttribute('hidden','');
    });
  }

  function showSlide(i){
    slides.forEach((s, idx)=>{
      const active = idx === i;
      s.classList.toggle('is-active', active);
      if(active) resetTabs(s); // en cada slide activo: sin panel por defecto
    });
  }
  showSlide(current);

  // Prev/Next (con loop)
  const prevBtn = document.getElementById('np-prev');
  const nextBtn = document.getElementById('np-next');

  function goPrev(){ current = (current - 1 + slides.length) % slides.length; showSlide(current); }
  function goNext(){ current = (current + 1) % slides.length; showSlide(current); }

  prevBtn?.addEventListener('click', goPrev);
  nextBtn?.addEventListener('click', goNext);

  // Teclado ← →
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowLeft')  goPrev();
    if(e.key === 'ArrowRight') goNext();
  });

  // Swipe en móvil
  let startX = null;
  const stage = document.querySelector('.np-stage');
  stage?.addEventListener('touchstart', e=>{ startX = e.touches[0].clientX; }, {passive:true});
  stage?.addEventListener('touchend', e=>{
    if(startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if(Math.abs(dx) > 40){ dx < 0 ? goNext() : goPrev(); }
    startX = null;
  }, {passive:true});

  // Tabs: muestran panel solo al hacer click
  document.addEventListener('click', (e)=>{
    const tab = e.target.closest('.np-tab');
    if(!tab) return;

    const slide = tab.closest('.np-slide');
    if(!slide.classList.contains('is-active')) return;

    const target = tab.dataset.tab; // "desc" | "usos"

    // Estado visual tabs
    slide.querySelectorAll('.np-tab').forEach(t=>{
      const active = t === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    // Mostrar solo el panel elegido
    slide.querySelectorAll('.np-panel').forEach(p=>{
      const match = p.dataset.panel === target;
      p.classList.toggle('is-active', match);
      if(match) p.removeAttribute('hidden'); else p.setAttribute('hidden','');
    });
  });
})();
  /* ====== VISION Y MISION ====== */
;(()=>{ 'use strict';
  const section = document.querySelector('.mvx');
  if(!section) return;

  const cards = section.querySelectorAll('.mvx-card');
  // 1) Scroll reveal
  const io = new IntersectionObserver(es=>{
    for(const e of es){ if(e.isIntersecting) e.target.classList.add('mvx-in'); }
  }, {threshold:0.15});
  cards.forEach(c=>io.observe(c));

  // 2) Tilt 3D (solo desktop/hover)
  const isTouch = matchMedia('(hover: none), (pointer: coarse)').matches;
  if(!isTouch){
    cards.forEach(card=>{
      let raf=null;
      const onMove = ev=>{
        const r = card.getBoundingClientRect();
        const x = (ev.clientX - r.left)/r.width - .5;
        const y = (ev.clientY - r.top) /r.height - .5;
        const rotX = (y * -10);
        const rotY = (x *  10);
        if(raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(()=>{
          card.style.transform = 'perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)';
        });
      };
      const reset = ()=>{
        if(raf) cancelAnimationFrame(raf);
        card.style.transition = 'transform .6s cubic-bezier(.2,.8,.2,1)';
        card.style.transform  = 'translateY(0) scale(1)'; // vuelve suave
        setTimeout(()=> card.style.transition = '', 600);
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', reset);
      card.addEventListener('blur', reset);

      // 3) Magnetismo del icono
      const icon = card.querySelector('.mvx-icon');
      if(icon){
        const iconMove = ev=>{
          const r = icon.getBoundingClientRect();
          const dx = ev.clientX - (r.left + r.width/2);
          const dy = ev.clientY - (r.top  + r.height/2);
          icon.style.transform = 'translate(${dx*0.06}px, ${dy*0.06}px) scale(1.06)';
        };
        const iconReset = ()=> icon.style.transform = '';
        card.addEventListener('mousemove', iconMove);
        card.addEventListener('mouseleave', iconReset);
      }
    });
  }

  // 4) Parallax leve del fondo con el scroll
  let ticking=false;
  window.addEventListener('scroll', ()=>{
    if(ticking) return; ticking=true;
    requestAnimationFrame(()=>{
      const y = window.scrollY * 0.06;
      section.style.setProperty('--mvx-par', '${y}px');
      ticking=false;
    });
  }, {passive:true});
})();
/* ====== VALORES ====== */
;(()=>{'use strict';
  const section = document.querySelector('.vals');
  if(!section) return;

  const cards = section.querySelectorAll('.val-card');
  const reveals = section.querySelectorAll('.val-reveal');

  // 1) Scroll reveal (stagger con --i)
  const io = new IntersectionObserver(es=>{
    for(const e of es){ if(e.isIntersecting) e.target.classList.add('in'); }
  }, { threshold: 0.18 });
  reveals.forEach(el=>io.observe(el));

  // 2) Tilt 3D con spring (solo desktop/hover)
  const isTouch = matchMedia('(hover: none), (pointer: coarse)').matches;
  if(!isTouch){
    cards.forEach(card=>{
      let rx=0, ry=0, tx=0, ty=0;      // estado actual
      let TRX=0, TRY=0, TTX=0, TTY=0;  // objetivos
      let raf=null;

      const SPRING = 0.12;  // seguimiento
      const MAXROT = 12;    // grados
      const MAXTX  = 10;    // px

      const loop = ()=>{
        rx += (TRX - rx) * SPRING;
        ry += (TRY - ry) * SPRING;
        tx += (TTX - tx) * SPRING;
        ty += (TTY - ty) * SPRING;
        card.style.transform =
          'perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translate(${tx}px, ${ty}px)';
        if (Math.abs(TRX-rx)>0.01 || Math.abs(TRY-ry)>0.01 ||
            Math.abs(TTX-tx)>0.1 || Math.abs(TTY-ty)>0.1){
          raf = requestAnimationFrame(loop);
        } else { raf = null; }
      };

      const onMove = (ev)=>{
        const r = card.getBoundingClientRect();
        const nx = (ev.clientX - r.left)/r.width  - 0.5; // -0.5..0.5
        const ny = (ev.clientY - r.top )/r.height - 0.5;
        TRX = (-ny * MAXROT);
        TRY = ( nx * MAXROT);
        TTX = ( nx * MAXTX);
        TTY = ( ny * MAXTX);
        if(!raf) raf = requestAnimationFrame(loop);
      };

      const reset = ()=>{
        TRX=0; TRY=0; TTX=0; TTY=0;
        if(!raf) raf = requestAnimationFrame(loop);
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', reset);
      card.addEventListener('blur', reset);
    });
  }
})();
/* QUIÉNES SOMOS — reveal al hacer scroll */
;(()=>{'use strict';
  const p = document.querySelector('.about .about-text');
  if(!p) return;
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting) p.classList.add('in'); });
  }, {threshold:0.15});
  io.observe(p);
})();
});
/* ===== WhatsApp Switcher (WSP) ===== */
document.addEventListener('DOMContentLoaded', () => {
  // 3 contactos (formato: 51XXXXXXXXX, SIN '+')
  const wswContacts = [
    { name: 'Representante de ventas', role: 'Fiorella Gómez', phone: '51974522848', avatar: null },
    { name: 'Administración', role: '', phone: '51958982554', avatar: null },
    { name: 'Asistente administrativo', role: '', phone: '51965370817', avatar: null }
  ];

  const defaultMsg = 'Hola Insumos Ganesha, quisiera más información.';

  const list = document.getElementById('wsw-list');
  if (!list) return; // si el HTML no está, salimos limpio

  const makeInitials = (t) =>
    t.trim().split(/\s+/).slice(0,2).map(p => p[0]).join('').toUpperCase();

  // Render de los contactos
  list.innerHTML = wswContacts.map(c => {
    const href = `https://wa.me/${c.phone}?text=${encodeURIComponent(defaultMsg)}`;
    const avatar = c.avatar
      ? `<img src="${c.avatar}" alt="${c.name}">`
      : makeInitials(c.name || 'IG');
    return `
      <div class="wsw-item">
        <div class="wsw-avatar">${avatar}</div>
        <div>
          <div class="wsw-name">${c.name}</div>
          <div class="wsw-role">${c.role || ''}</div>
        </div>
        <div class="wsw-meta">
          <a class="wsw-whats" href="${href}" target="_blank" rel="noopener" aria-label="Chatear con ${c.name}">
            <i class="fab fa-whatsapp" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    `;
  }).join('');

  // Interacción abrir/cerrar panel
  const root  = document.getElementById('wsw-root');
  const fab   = root?.querySelector('.wsw-fab');
  const teaser= root?.querySelector('.wsw-teaser');
  const panel = root?.querySelector('.wsw-panel');
  const close = root?.querySelector('.wsw-close');

  if (!fab || !panel || !close) return;

  const open  = () => { panel.classList.add('is-open'); panel.setAttribute('aria-hidden','false'); };
  const hide  = () => { panel.classList.remove('is-open'); panel.setAttribute('aria-hidden','true'); };

  fab.addEventListener('click', open);
  teaser?.addEventListener('click', open);           // también abre desde la pastilla
  close.addEventListener('click', hide);
  panel.addEventListener('click', (e) => { if (e.target === panel) hide(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); });
});


