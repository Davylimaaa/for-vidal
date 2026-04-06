document.addEventListener('DOMContentLoaded', () => {
    const accessGate = document.getElementById('accessGate');
    const accessForm = document.getElementById('accessForm');
    const accessPassword = document.getElementById('accessPassword');
    const accessFeedback = document.getElementById('accessFeedback');
    const specialButton = document.getElementById('specialButton');
    const closeOverlay = document.getElementById('closeOverlay');
    const loveOverlay = document.getElementById('loveOverlay');
    const loveGalaxy = document.getElementById('loveGalaxy');
    const poemButton = document.getElementById('poemButton');
    const closePoems = document.getElementById('closePoems');
    const poemsWall = document.getElementById('poemsWall');
    const validPassword = 'rafael';

    const phrases = [
        'Te amo',
        'Te amo muito',
        'Te amo daqui até o infinito',
        'Te amo em cada detalhe',
        'Te amo com calma',
        'Te amo por inteira',
        'Te amo nos dias leves',
        'Te amo nos dias difíceis',
        'Te amo mais do que consigo dizer',
        'Te amo em silêncio também',
        'Te amo com flores',
        'Te amo com o coração inteiro'
    ];

    function createGalaxy() {
        if (!loveGalaxy || loveGalaxy.childElementCount > 0) {
            return;
        }

        for (let index = 0; index < 42; index += 1) {
            const phrase = document.createElement('span');
            const radius = 90 + Math.random() * 380;
            const duration = 8 + Math.random() * 11;
            const delay = Math.random() * -16;
            const size = 0.95 + Math.random() * 1.4;
            const palette = ['#fff6c5', '#ffd54f', '#ffe9a3', '#f9c7d1'];

            phrase.className = 'love-phrase';
            phrase.textContent = phrases[Math.floor(Math.random() * phrases.length)];
            phrase.style.setProperty('--radius', `${radius}px`);
            phrase.style.animationDuration = `${duration}s`;
            phrase.style.animationDelay = `${delay}s`;
            phrase.style.fontSize = `${size}rem`;
            phrase.style.color = palette[Math.floor(Math.random() * palette.length)];

            loveGalaxy.appendChild(phrase);
        }
    }

    function openOverlay() {
        createGalaxy();
        document.body.classList.add('overlay-open');
        loveOverlay.classList.add('is-open');
        loveOverlay.setAttribute('aria-hidden', 'false');
    }

    function closeLoveOverlay() {
        document.body.classList.remove('overlay-open');
        loveOverlay.classList.remove('is-open');
        loveOverlay.setAttribute('aria-hidden', 'true');
    }

    function unlockPage() {
        if (!accessGate) {
            return;
        }

        sessionStorage.setItem('unlocked', '1');
        accessGate.classList.add('is-hidden');
        accessGate.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('gate-locked');
    }

    function lockPage() {
        if (!accessGate) {
            return;
        }

        document.body.classList.add('gate-locked');
        accessGate.classList.remove('is-hidden');
        accessGate.setAttribute('aria-hidden', 'false');
    }

    if (sessionStorage.getItem('unlocked') === '1') {
        unlockPage();
    } else {
        lockPage();
    }

    if (accessForm && accessPassword && accessFeedback) {
        accessForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (accessPassword.value.trim().toLowerCase() === validPassword) {
                accessFeedback.textContent = '';
                unlockPage();
                accessForm.reset();
                return;
            }

            accessFeedback.textContent = 'Essa não é. Tenta o nome do maior fã.';
            accessPassword.focus();
            accessPassword.select();
        });
    }

    if (specialButton && closeOverlay && loveOverlay) {
        specialButton.addEventListener('click', openOverlay);
        closeOverlay.addEventListener('click', closeLoveOverlay);
        loveOverlay.addEventListener('click', (event) => {
            if (event.target === loveOverlay) {
                closeLoveOverlay();
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && loveOverlay.classList.contains('is-open')) {
                closeLoveOverlay();
            }
        });
    }

    if (poemButton && poemsWall && closePoems) {
        poemButton.addEventListener('click', () => {
            poemsWall.classList.add('is-visible');
            poemsWall.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closePoems.hidden = false;
        });

        closePoems.addEventListener('click', () => {
            poemsWall.classList.remove('is-visible');
            closePoems.hidden = true;
            poemButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
});