/* ============================================
   Python For Students — script.js
   Mobile menu, copy code, smooth scroll, etc.
============================================ */

(function () {
    'use strict';

    /* ---------- Mobile Nav Toggle ---------- */
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    if (toggle && links) {
        toggle.addEventListener('click', () => {
            const isOpen = links.classList.toggle('open');
            toggle.classList.toggle('active', isOpen);
            toggle.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when a link is clicked (mobile)
        links.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                links.classList.remove('open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------- Active Link Highlight on Scroll ---------- */
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function setActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach((section) => {
            const top = section.offsetTop - 120;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach((a) => {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === '#' + id) {
                        a.classList.add('active');
                    }
                });
            }
        });
    }

    /* ---------- Back to Top Button ---------- */
    const backToTop = document.getElementById('backToTop');

    function toggleBackToTop() {
        if (!backToTop) return;
        if (window.pageYOffset > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------- Scroll Listener (throttled) ---------- */
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                setActiveLink();
                toggleBackToTop();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial call
    setActiveLink();
    toggleBackToTop();

    /* ---------- Copy Code Buttons ---------- */
    document.querySelectorAll('.copy-btn').forEach((btn) => {
        btn.addEventListener('click', async () => {
            const code = btn.getAttribute('data-copy') || '';
            try {
                await navigator.clipboard.writeText(code);
            } catch (e) {
                // Fallback for older browsers
                const ta = document.createElement('textarea');
                ta.value = code;
                document.body.appendChild(ta);
                ta.select();
                try { document.execCommand('copy'); } catch (_) {}
                document.body.removeChild(ta);
            }
            const original = btn.textContent;
            btn.textContent = '✓ Copied';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.textContent = original;
                btn.classList.remove('copied');
            }, 1800);
        });
    });

    /* ---------- Toggle Solution Buttons ---------- */
    document.querySelectorAll('.toggle-solution').forEach((btn) => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const sol = document.getElementById(targetId);
            if (!sol) return;
            const isShown = sol.classList.toggle('show');
            btn.textContent = isShown ? 'Hide Solution 🙈' : 'Show Solution 💡';
        });
    });

    /* ---------- Console Greeting ---------- */
    const styles = [
        'background: linear-gradient(120deg, #64ffda, #4cc9f0, #a78bfa)',
        'color: #0a1929',
        'font-size: 14px',
        'font-weight: bold',
        'padding: 10px 16px',
        'border-radius: 8px'
    ].join(';');
    console.log('%c🐍 Welcome to Python For Students!', styles);
    console.log('Made with ❤️ for students learning Python for the first time.');

})();
