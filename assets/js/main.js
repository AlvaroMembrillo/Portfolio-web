(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  const progressBar = document.getElementById('progressBar');
  const yearEl = document.getElementById('year');

  // Year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const currentTheme = () => root.getAttribute('data-theme') || (prefersDark.matches ? 'dark' : 'light');
  const syncThemeSwitch = () => themeToggle?.setAttribute('aria-checked', String(currentTheme() === 'dark'));

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  syncThemeSwitch();
  prefersDark.addEventListener('change', syncThemeSwitch);

  themeToggle?.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    syncThemeSwitch();
  });

  // Language
  const langToggle = document.getElementById('langToggle');
  const metaDesc = document.querySelector('meta[name="description"]');

  const translations = {
    en: {
      'meta.title': 'Álvaro Membrillo · Portfolio',
      'meta.description': 'Professional portfolio of Álvaro Membrillo — experience, projects and skills.',
      'header.lang': 'Change language',
      'header.theme': 'Dark mode',
      'header.menu': 'Open menu',
      'nav.about': 'About',
      'nav.experience': 'Experience',
      'nav.education': 'Education',
      'nav.skills': 'Skills',
      'nav.projects': 'Projects',
      'nav.contact': 'Contact',
      'hero.eyebrow': 'Professional portfolio',
      'hero.title': 'Hi, I\'m <span class="highlight">Álvaro Membrillo</span>',
      'hero.desc': 'Backend developer specialized in Java and Spring Boot, with previous experience as a full stack developer (Angular + Spring). Currently at neocheck, Seville.',
      'hero.contact': 'Get in touch',
      'hero.cv': 'Download CV',
      'about.eyebrow': '01 — Profile',
      'about.title': 'About me',
      'about.p1': 'Fullstack developer specialized in Java and Spring Boot. I started my career at Getronics (Seville) as a Junior Developer, and moved on to Full Stack Developer working with Angular and Spring for almost 3 years. Since September 2025 I have been part of neocheck as an application developer.',
      'about.p2': 'With a background in Computer Engineering (UCAM) and Web Application Development (IES Alixar), I combine that foundation with hands-on experience in Oracle databases and version control with Git/GitHub.',
      'about.fact.years': 'Years of experience',
      'about.fact.companies': 'Companies',
      'about.fact.cert': 'Certification',
      'about.location': '<strong>Location:</strong> Gines, Andalusia, Spain',
      'about.role': '<strong>Current role:</strong> Application developer at neocheck',
      'about.languages': '<strong>Languages:</strong> Spanish (native), English (conversational)',
      'exp.eyebrow': '02 — Career',
      'exp.title': 'Professional experience',
      'exp.seville': 'Seville',
      'exp1.date': 'September 2025 — Present',
      'exp1.title': 'Application Developer · <span class="timeline__company">Neocheck</span>',
      'exp1.location': 'Seville, Andalusia, Spain',
      'exp1.desc': '[Add your main responsibilities and achievements in this role here.]',
      'exp2.date': 'January 2023 — September 2025 · 2 years 9 months',
      'exp2.desc': '[Add the context, responsibilities and key contributions in this role here.]',
      'exp3.date': 'January 2023 — February 2023 · 2 months',
      'exp3.desc': '[Add a brief description of your first tasks in this role here.]',
      'edu.eyebrow': '03 — Education',
      'edu.title': 'Education and certifications',
      'edu1.date': 'Since September 2024',
      'edu1.title': 'Computer Engineering',
      'edu1.org': 'UCAM — Catholic University of San Antonio of Murcia',
      'edu2.date': '2018 — February 2022',
      'edu2.title': 'Higher Vocational Degree in Web Application Development',
      'edu3.title': 'Secondary School and Baccalaureate (Science)',
      'edu4.date': 'Certification',
      'edu4.title': 'SQL from scratch course',
      'skills.eyebrow': '04 — Skills',
      'skills.title': 'Skills &amp; technologies',
      'skills.tools': 'Tools',
      'skills.teamwork': 'Teamwork',
      'skills.communication': 'Communication',
      'skills.pm': 'Project management',
      'projects.eyebrow': '05 — Projects',
      'projects.title': 'Featured projects',
      'projects.wip': 'In progress... news coming soon',
      'project.name': '[Project name]',
      'project.desc': '[Brief project description: what problem it solves and what you did.]',
      'project.link': 'View project →',
      'contact.eyebrow': '06 — Contact',
      'contact.title': 'Let\'s talk',
      'contact.desc': 'Do you have a backend project with Java/Spring Boot or are you looking for a full stack developer? Drop me a line, I\'d be happy to talk.',
      'footer.rights': 'Álvaro Membrillo. All rights reserved.',
      'footer.top': 'Back to top ↑'
    }
  };

  // Spanish texts are read from the HTML itself
  const i18nAttrs = ['aria-label', 'title'];
  const es = {
    'meta.title': document.title,
    'meta.description': metaDesc?.getAttribute('content')
  };
  document.querySelectorAll('[data-i18n]').forEach(el => {
    es[el.dataset.i18n] ??= el.innerHTML.trim();
  });
  i18nAttrs.forEach(attr => {
    document.querySelectorAll(`[data-i18n-${attr}]`).forEach(el => {
      es[el.getAttribute(`data-i18n-${attr}`)] ??= el.getAttribute(attr);
    });
  });
  translations.es = es;

  const applyLang = (lang) => {
    const dict = translations[lang];
    root.setAttribute('lang', lang);
    langToggle?.setAttribute('aria-checked', String(lang === 'en'));
    document.title = dict['meta.title'];
    metaDesc?.setAttribute('content', dict['meta.description']);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const text = dict[el.dataset.i18n];
      if (text != null) el.innerHTML = text;
    });
    i18nAttrs.forEach(attr => {
      document.querySelectorAll(`[data-i18n-${attr}]`).forEach(el => {
        const text = dict[el.getAttribute(`data-i18n-${attr}`)];
        if (text != null) el.setAttribute(attr, text);
      });
    });
  };

  const savedLang = localStorage.getItem('lang');
  const initialLang = savedLang
    || (navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en');
  if (initialLang !== 'es') applyLang(initialLang);
  // Enable switch animations only after the initial theme/language are set, so they don't animate on load
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('switches-ready')));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let switching = false;

  langToggle?.addEventListener('click', () => {
    if (switching) return;
    const next = root.getAttribute('lang') === 'en' ? 'es' : 'en';
    localStorage.setItem('lang', next);

    if (reduceMotion.matches) {
      applyLang(next);
      return;
    }

    switching = true;
    // Flip the flag right away (it depends on <html lang>), then fade the texts out and back in
    root.setAttribute('lang', next);
    root.classList.add('lang-out');
    setTimeout(() => {
      applyLang(next);
      root.classList.replace('lang-out', 'lang-in');
      setTimeout(() => {
        root.classList.remove('lang-in');
        switching = false;
      }, 300);
    }, 180);
  });

  // Mobile nav
  navToggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  nav?.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Header scroll state + progress bar
  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
    header?.classList.toggle('scrolled', scrollTop > 10);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-visible'), (i % 6) * 60);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }
})();
