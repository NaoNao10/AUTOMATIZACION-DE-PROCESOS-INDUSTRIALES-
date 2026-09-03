(() => {
  const rail = document.getElementById('rail');
  const toggle = document.querySelector('.menu-toggle');
  const links = [...document.querySelectorAll('.rail-link')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  const progress = document.getElementById('progress');
  function closeMenu() { rail.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); toggle.textContent='Índice +'; }
  toggle.addEventListener('click', () => {
    const open = rail.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
    toggle.textContent = open ? 'Cerrar −' : 'Índice +';
  });
  links.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if(event.key === 'Escape' && rail.classList.contains('open')) {closeMenu();toggle.focus();} });
  function update() {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0})`;
    let current = 0;
    sections.forEach((section, i) => {if(section.getBoundingClientRect().top <= 150) current = i;});
    if(max > 0 && scrollY >= max - 3) current = sections.length - 1;
    links.forEach((link, i) => {link.classList.toggle('active',i === current);if(i===current) link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
  }

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
      });
    }, {threshold:0,rootMargin:'0px 0px -24px 0px'});
    document.querySelectorAll('.panel, .titleblock').forEach(el => {el.classList.add('reveal');observer.observe(el);});
    document.documentElement.classList.add('motion-enabled');
    reducedMotion.addEventListener('change', event => {if(event.matches) document.documentElement.classList.remove('motion-enabled');});
  }
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      const target = document.querySelector(link.getAttribute('href'));
      if(!target) return;
      target.classList.add('is-visible');
      target.classList.remove('nav-arrival');
      requestAnimationFrame(() => target.classList.add('nav-arrival'));
      setTimeout(() => target.classList.remove('nav-arrival'),1200);
    });
  });

  let queued = false;
  addEventListener('scroll', () => {if(!queued){queued=true;requestAnimationFrame(()=>{update();queued=false;});}}, {passive:true});
  addEventListener('resize', update);
  update();
})();
