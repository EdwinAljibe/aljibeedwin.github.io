/*--------------- Fun Facts ---------------*/
const funFacts = [
    "I usually wake up at 3:33 a.m.- perfect time to dive into my Kindle adventures.",
    "Wherever I go, my trusty sudoku puzzle tags along… because life’s too short not to play!"
];

const btn       = document.getElementById('fun-fact-btn');
const panel     = document.getElementById('fun-fact-panel');
const factText  = document.getElementById('fun-fact-text');
let   lastIndex = -1;

btn.addEventListener('click', () => {
    let idx;
    do { idx = Math.floor(Math.random() * funFacts.length); }
    while (idx === lastIndex && funFacts.length > 1);
    lastIndex = idx;

    factText.textContent = funFacts[idx];

    // Toggle visibility with re-trigger animation
    panel.classList.remove('visible');
    void panel.offsetWidth; // reflow
    panel.classList.add('visible');
});

/*--------------- Hamburger Menu ---------------*/
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
});

// Close navigation when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

/*--------------- Scroll Reveal ---------------*/
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger children in the same batch
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, 80 * (i % 4));
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/*--------------- Active nav highlighting on scroll ---------------*/
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--warm)' : '';
    });
}, { passive: true });
