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
            /* Structural body padding compensation */
            body { padding-bottom: 70px; }

            /* TOP NAV */
            .glossa-top-nav {
                background: #1a1a2e;
                position: sticky;
                top: 0;
                z-index: 100;
                border-bottom: 1px solid #2a2a4a;
                width: 100%;
            }
            
            .glossa-nav-wrapper {
                max-width: 1100px;
                margin: 0 auto;
                padding: 16px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .glossa-top-nav .brand {
                color: #7c6af7;
                font-size: 26px;
                font-weight: 800;
                text-decoration: none;
                letter-spacing: 1px;
                transition: opacity 0.2s;
            }
            .glossa-top-nav .brand:hover {
                opacity: 0.9;
            }

            .glossa-top-nav .top-links {
                display: flex;
                gap: 32px;
                align-items: center;
            }
            
            .glossa-top-nav .top-links a {
                color: #aaa;
                text-decoration: none;
                font-size: 14px;
                font-weight: 600;
                transition: all 0.2s ease;
                padding: 8px 0;
                position: relative;
            }
            .glossa-top-nav .top-links a:hover { 
                color: white; 
            }
            .glossa-top-nav .top-links a.active { 
                color: #7c6af7; 
            }
            .glossa-top-nav .top-links a.active::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 0;
                right: 0;
                height: 2px;
                background: #7c6af7;
                border-radius: 2px;
                box-shadow: 0 0 8px rgba(124, 106, 247, 0.6);
            }

            /* BOTTOM MOBILE NAV */
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
                color: #666;
                font-size: 11px;
                font-weight: 600;
                padding: 6px 0;
                transition: all 0.2s ease;
                flex: 1;
            }
            .glossa-bottom-nav a .nav-icon { 
                font-size: 20px; 
                transition: transform 0.2s;
            }
            .glossa-bottom-nav a:hover { 
                color: #aaa; 
            }
            .glossa-bottom-nav a.active { 
                color: #7c6af7; 
            }
            .glossa-bottom-nav a.active .nav-icon {
                transform: translateY(-2px);
                filter: drop-shadow(0 0 6px rgba(124, 106, 247, 0.6));
            }

            /* MEDIA RESPONSIVE RULES */
            @media (max-width: 768px) {
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
            <div class="glossa-nav-wrapper">
                <a href="index.html" class="brand">Glossa</a>
                <div class="top-links">
                    ${this.links.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
                </div>
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
