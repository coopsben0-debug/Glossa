const UIManager = {
    links: [
        { href: 'index.html', icon: '🏠', page: 'index', title: 'Dashboard' },
        { href: 'languages.html', icon: '🌍', page: 'languages', title: 'Languages' },
        { href: 'chat.html', icon: '💬', page: 'chat', title: 'Community Chat' },
        { href: 'ai-tutor.html', icon: '🤖', page: 'ai-tutor', title: 'AI Tutor' },
        { href: 'profile.html', icon: '👤', page: 'profile', title: 'My Profile' }
    ],

    init() {
        // 1. Instantly shred old top navigations before rendering layout panels
        this.stripLegacyElements();
        // 2. Inject structural style variables & visual fixes
        this.injectStyles();
        // 3. Mount UI wrap shell safely 
        this.buildShellArchitecture();
        // 4. Trace window state routes
        this.highlightActive();
    },

    stripLegacyElements() {
        // Scrapes the document context to isolate and eliminate duplicate hardcoded top-nav items
        const legacyHeaders = document.querySelectorAll('.top-nav, header, #top-bar, .nav-links');
        legacyHeaders.forEach(el => el.remove());
    },

    injectStyles() {
        // Global Design Token configuration defaults ensuring fallback properties exist
        const tokens = document.createElement('style');
        tokens.textContent = `
            :root {
                --bg-main: #06060c;
                --bg-panel: rgba(18, 18, 36, 0.7);
                --bg-input: rgba(26, 26, 54, 0.5);
                --primary: #7c3aed;
                --text-main: #f8fafc !important;
                --text-muted: #94a3b8 !important;
                --border: rgba(255, 255, 255, 0.06);
                --border-hover: rgba(124, 58, 237, 0.4);
                --radius-lg: 20px;
                --radius-md: 12px;
                --glass-blur: blur(16px);
                --accent-glow: rgba(124, 58, 237, 0.15);
                --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
        `;
        document.head.appendChild(tokens);

        const style = document.createElement('style');
        style.textContent = `
            body {
                display: flex !important;
                flex-direction: row !important;
                min-height: 100vh !important;
                margin: 0 !important;
                padding: 0 !important;
                background: radial-gradient(circle at 50% 0%, #1e1b4b 0%, #06060c 70%) !important;
                background-attachment: fixed !important;
                color: #f8fafc !important;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
                overflow-x: hidden;
            }

            /* TEXT READABILITY & CONTRAST ENGINE OVERRIDES */
            h1, h2, h3, h4, h5, h6, .main-headline, .english-translation {
                color: #ffffff !important;
                letter-spacing: -0.02em;
            }
            
            p, label, span, td, th, .text-muted, .sub-headline, .word-stats {
                color: #cbd5e1 !important; /* High contrast ash-grey for clarity */
            }

            /* FIXED REVOLUTION NAV BAR */
            #app-sidebar {
                width: 80px;
                background: rgba(10, 10, 20, 0.6);
                backdrop-filter: var(--glass-blur);
                -webkit-backdrop-filter: var(--glass-blur);
                border-right: 1px solid var(--border);
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 24px 0;
                position: fixed;
                top: 0; bottom: 0; left: 0;
                z-index: 1000;
            }

            #app-content {
                flex: 1;
                margin-left: 80px; /* Aligns page content cleanly out from behind sidebar layout */
                padding: 48px;
                min-width: 0;
                position: relative;
            }

            /* SCALING ANCIENT ALPHABET & GRAMMAR CONTENT TABLES */
            table {
                width: 100% !important;
                margin-top: 24px;
                border-collapse: separate !important;
                border-spacing: 0 !important;
                background: var(--bg-panel) !important;
                border: 1px solid var(--border) !important;
                border-radius: var(--radius-md);
                overflow: hidden;
            }

            th {
                background: rgba(255, 255, 255, 0.02) !important;
                color: #ffffff !important;
                font-weight: 700 !important;
                font-size: 16px !important;
                text-align: left;
                padding: 18px 24px !important;
                border-bottom: 1px solid var(--border) !important;
            }

            td {
                padding: 18px 24px !important;
                font-size: 18px !important; /* Scales historical character weights so letters are readable */
                border-bottom: 1px solid rgba(255, 255, 255, 0.03) !important;
                color: #ffffff !important;
            }

            tr:last-child td {
                border-bottom: none !important;
            }

            .sidebar-logo {
                width: 42px;
                height: 42px;
                border-radius: var(--radius-md);
                background: linear-gradient(135deg, var(--primary) 0%, #5b4ee4 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 900;
                font-size: 20px;
                color: #fff !important;
                cursor: pointer;
                margin-bottom: 48px;
                box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
            }

            .nav-icon {
                width: 48px;
                height: 48px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 22px;
                text-decoration: none;
                margin-bottom: 20px;
                border-radius: var(--radius-md);
                transition: var(--transition);
                opacity: 0.4;
            }

            .nav-icon:hover {
                opacity: 0.9;
                background: rgba(255, 255, 255, 0.05);
            }

            .nav-icon.active {
                opacity: 1;
                background: rgba(124, 58, 237, 0.15);
                border: 1px solid rgba(124, 58, 237, 0.25);
            }

            .sidebar-footer { margin-top: auto; }

            /* CELL PHONE VIEWS MIGRATION */
            @media (max-width: 768px) {
                body { flex-direction: column !important; }
                #app-sidebar {
                    width: 100%; height: 68px;
                    bottom: 0; top: auto; left: 0;
                    border-right: none;
                    border-top: 1px solid var(--border);
                    flex-direction: row;
                    justify-content: space-around;
                    padding: 0 16px;
                }
                #app-content { margin-left: 0; padding: 24px; padding-bottom: 88px; }
                .sidebar-logo { display: none; }
                .sidebar-footer { margin-top: 0; }
                td, th { padding: 14px 16px !important; font-size: 15px !important; }
            }
        `;
        document.head.appendChild(style);
    },

    buildShellArchitecture() {
        const sidebar = document.createElement('aside');
        sidebar.id = 'app-sidebar';

        const logo = document.createElement('div');
        logo.className = 'sidebar-logo';
        logo.textContent = 'G';
        logo.addEventListener('click', () => window.location.href = 'index.html');
        sidebar.appendChild(logo);

        const footerWrapper = document.createElement('div');
        footerWrapper.className = 'sidebar-footer';

        this.links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.className = 'nav-icon';
            a.title = link.title;
            a.setAttribute('data-page', link.page);
            a.textContent = link.icon;

            if (link.page === 'profile') {
                footerWrapper.appendChild(a);
            } else {
                sidebar.insertBefore(a, footerWrapper);
            }
        });
        sidebar.appendChild(footerWrapper);

        const contentWrapper = document.createElement('main');
        contentWrapper.id = 'app-content';
        
        while (document.body.firstChild) {
            contentWrapper.appendChild(document.body.firstChild);
        }

        document.body.appendChild(sidebar);
        document.body.appendChild(contentWrapper);
    },

    highlightActive() {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-icon').forEach(icon => {
            const pageName = icon.getAttribute('data-page');
            if (path.includes(pageName)) {
                icon.classList.add('active');
            }
        });
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => UIManager.init());
} else {
    UIManager.init();
}
