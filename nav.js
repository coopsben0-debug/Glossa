const GLOSSA_NAV = {
    links: [
        { href: 'index.html', icon: '🏠', label: 'Home' },
        { href: 'languages.html', icon: '🌍', label: 'Languages' },
        { href: 'chat.html', icon: '💬', label: 'Chat' },
        { href: 'ai-tutor.html', icon: '🤖', label: 'AI Tutor' },
        { href: 'profile.html', icon: '👤', label: 'Profile' },
    ],

    init() {
        this.injectStyles();
        this.renderTopNav();
        this.renderBottomNav();
        this.setActiveLinks();
    },

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; background: #0f0f1a; color: white; padding-bottom: 70px; }

            /* TOP NAV */
            .glossa-top-nav {
                background: #1a1a2e;
                padding: 16px 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: sticky;
                top: 0;
                z-index: 100;
                border-bottom: 1px solid #2a2a4a;
            }
            .glossa-top-nav .brand {
                color: #7c6af7;
                font-size: 24px;
                font-weight: 800;
                text-decoration: none;
                letter-spacing: 1px;
            }
            .glossa-top-nav .top-links {
                display: flex;
                gap: 25px;
                align-items: center;
            }
            .glossa-top-nav .top-links a {
                color: #aaa;
                text-decoration: none;
                font-size: 14px;
                font-weight: 600;
                transition: color 0.2s;
                padding: 6px 0;
                position: relative;
            }
            .glossa-top-nav .top-links a:hover { color: white; }
            .glossa-top-nav .top-links a.active { color: #7c6af7; }
            .glossa-top-nav .top-links a.active::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: #7c6af7;
                border-radius: 2px;
            }

            /* BOTTOM NAV */
            .glossa-bottom-nav {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: #1a1a2e;
                border-top: 1px solid #2a2a4a;
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding: 8px 0;
                z-index: 100;
                display: none;
            }
            .glossa-bottom-nav a {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                text-decoration: none;
                color: #555;
                font-size: 10px;
                font-weight: 600;
                padding: 6px 16px;
                border-radius: 12px;
                transition: all 0.2s;
                flex: 1;
            }
            .glossa-bottom-nav a .nav-icon { font-size: 22px; }
            .glossa-bottom-nav a:hover { color: #aaa; }
            .glossa-bottom-nav a.active { color: #7c6af7; }
            .glossa-bottom-nav a.active .nav-icon {
                filter: drop-shadow(0 0 6px rgba(124, 106, 247, 0.8));
            }

            /* RESPONSIVE */
            @media (max-width: 768px) {
                .glossa-top-nav { padding: 14px 20px; }
                .glossa-top-nav .top-links { display: none; }
                .glossa-bottom-nav { display: flex; }
                body { padding-bottom: 80px; }
            }
        `;
        document.head.appendChild(style);
    },

    renderTopNav() {
        const nav = document.createElement('nav');
        nav.className = 'glossa-top-nav';
        nav.innerHTML = `
            <a href="index.html" class="brand">Glossa</a>
            <div class="top-links">
                ${this.links.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
            </div>
        `;
        document.body.insertBefore(nav, document.body.firstChild);
    },

    renderBottomNav() {
        const nav = document.createElement('nav');
        nav.className = 'glossa-bottom-nav';
        nav.innerHTML = this.links.map(l => `
            <a href="${l.href}">
                <span class="nav-icon">${l.icon}</span>
                <span>${l.label}</span>
            </a>
        `).join('');
        document.body.appendChild(nav);
    },

    setActiveLinks() {
        const current = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.glossa-top-nav .top-links a, .glossa-bottom-nav a').forEach(a => {
            if (a.getAttribute('href') === current) {
                a.classList.add('active');
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => GLOSSA_NAV.init());
