const UIManager = {
    links: [
        { href: 'index.html', icon: '🏠', page: 'index', title: 'Dashboard' },
        { href: 'languages.html', icon: '🌍', page: 'languages', title: 'Languages' },
        { href: 'chat.html', icon: '💬', page: 'chat', title: 'Community Chat' },
        { href: 'ai-tutor.html', icon: '🤖', page: 'ai-tutor', title: 'AI Tutor' },
        { href: 'profile.html', icon: '👤', page: 'profile', title: 'My Profile' }
    ],

    init() {
        this.stripLegacyElements();
        this.injectStyles();
        this.buildShellArchitecture();
        this.highlightActive();
    },

    stripLegacyElements() {
        // Forcefully removes hardcoded legacy horizontal navs present in your screenshots
        const legacyHeaders = document.querySelectorAll('.top-nav, header, #top-bar, .nav-links');
        legacyHeaders.forEach(el => el.remove());
    },

    injectStyles() {
        if (!document.getElementById('ui-manager-styles')) {
            const style = document.createElement('style');
            style.id = 'ui-manager-styles';
            style.textContent = `
                :root {
                    --bg-main: #06060c;
                    --bg-panel: rgba(16, 16, 32, 0.6);
                    --bg-input: rgba(30, 30, 60, 0.6);
                    --primary: #7c3aed;
                    --primary-hover: #9333ea;
                    --text-main: #f8fafc;
                    --text-muted: #94a3b8;
                    --border: rgba(255, 255, 255, 0.08);
                    --radius-lg: 20px;
                    --radius-md: 12px;
                    --glass-blur: blur(20px);
                }

                body {
                    display: flex !important;
                    flex-direction: row !important;
                    min-height: 100vh !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    background: radial-gradient(circle at 50% 0%, #121034 0%, #06060c 80%) !important;
                    background-attachment: fixed !important;
                    color: var(--text-main) !important;
                    font-family: system-ui, -apple-system, sans-serif !important;
                }

                #app-sidebar {
                    width: 80px;
                    background: rgba(8, 8, 16, 0.7);
                    backdrop-filter: var(--glass-blur);
                    -webkit-backdrop-filter: var(--glass-blur);
                    border-right: 1px solid var(--border);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 24px 0;
                    position: fixed;
                    top: 0; bottom: 0; left: 0;
                    z-index: 2000;
                }

                #app-content {
                    flex: 1;
                    margin-left: 80px;
                    padding: 40px;
                    min-width: 0;
                    position: relative;
                    z-index: 1;
                }

                .sidebar-logo {
                    width: 44px;
                    height: 44px;
                    border-radius: var(--radius-md);
                    background: linear-gradient(135deg, var(--primary) 0%, #5b4ee4 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 900;
                    font-size: 20px;
                    color: #fff !important;
                    cursor: pointer;
                    margin-bottom: 40px;
                }

                .nav-icon {
                    width: 48px;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 22px;
                    text-decoration: none;
                    margin-bottom: 16px;
                    border-radius: var(--radius-md);
                    transition: all 0.2s ease;
                    opacity: 0.4;
                }

                .nav-icon:hover {
                    opacity: 0.9;
                    background: rgba(255, 255, 255, 0.05);
                }

                .nav-icon.active {
                    opacity: 1;
                    background: rgba(124, 58, 237, 0.16);
                    border: 1px solid rgba(124, 58, 237, 0.3);
                }

                .sidebar-footer { margin-top: auto; }

                @media (max-width: 768px) {
                    body { flex-direction: column !important; }
                    #app-sidebar {
                        width: 100%; height: 64px;
                        bottom: 0; top: auto; left: 0;
                        border-right: none; border-top: 1px solid var(--border);
                        flex-direction: row; justify-content: space-around; padding: 0;
                    }
                    #app-content { margin-left: 0; padding: 20px; padding-bottom: 90px; }
                    .sidebar-logo { display: none; }
                    .sidebar-footer { margin-top: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    },

    buildShellArchitecture() {
        if (document.getElementById('app-sidebar')) return;

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
            // Keeps parent track highlighted when diving deep into Greek files
            if (path.includes(pageName) || (path.includes('greek') && pageName === 'languages')) {
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
