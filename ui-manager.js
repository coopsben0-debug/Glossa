const UIManager = {
    links: [
        { href: 'index.html', icon: '🏠', page: 'index', title: 'Dashboard' },
        { href: 'languages.html', icon: '🌍', page: 'languages', title: 'Languages' },
        { href: 'chat.html', icon: '💬', page: 'chat', title: 'Community Chat' },
        { href: 'ai-tutor.html', icon: '🤖', page: 'ai-tutor', title: 'AI Tutor' },
        { href: 'profile.html', icon: '👤', page: 'profile', title: 'My Profile' }
    ],

    init() {
        this.injectStyles();
        this.buildShellArchitecture();
        this.highlightActive();
    },

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Core Shell Alignment Layout */
            body {
                display: flex !important;
                flex-direction: row !important;
                min-height: 100vh !important;
                overflow-x: hidden;
                margin: 0;
                background: #06060c;
            }

            /* PREMIUM GLASS SIDEBAR */
            #app-sidebar {
                width: 80px;
                background: rgba(10, 10, 20, 0.6);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border-right: 1px solid rgba(255, 255, 255, 0.06);
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 24px 0;
                position: fixed;
                top: 0;
                bottom: 0;
                left: 0;
                z-index: 1000;
            }

            /* Content Area Pushing clear of Sidebar */
            #app-content {
                flex: 1;
                margin-left: 80px;
                min-width: 0;
                position: relative;
            }

            .sidebar-logo {
                width: 42px;
                height: 42px;
                border-radius: var(--radius-md, 12px);
                background: linear-gradient(135deg, var(--primary, #7c3aed) 0%, #5b4ee4 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 900;
                font-size: 20px;
                color: #fff;
                cursor: pointer;
                margin-bottom: 48px;
                box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
                transition: transform 0.2s ease;
            }
            .sidebar-logo:hover {
                transform: scale(1.05);
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
                border-radius: var(--radius-md, 12px);
                transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                opacity: 0.4;
                filter: grayscale(40%);
            }

            .nav-icon:hover {
                opacity: 0.8;
                background: rgba(255, 255, 255, 0.04);
                transform: translateX(2px);
            }

            .nav-icon.active {
                opacity: 1;
                filter: grayscale(0%);
                background: rgba(124, 58, 237, 0.15);
                border: 1px solid rgba(124, 58, 237, 0.25);
            }

            .nav-icon.active::before {
                content: '';
                position: absolute;
                left: -12px;
                top: 25%;
                height: 50%;
                width: 4px;
                background: var(--primary, #7c3aed);
                border-radius: 0 4px 4px 0;
                box-shadow: 0 0 10px var(--primary, #7c3aed);
            }

            .sidebar-footer {
                margin-top: auto;
            }

            /* RESPONSIVE LAYOUT CONVERSION FOR MOBILE SHELLS */
            @media (max-width: 768px) {
                body { flex-direction: column !important; }
                
                #app-sidebar {
                    width: 100%;
                    height: 68px;
                    bottom: 0;
                    top: auto;
                    border-right: none;
                    border-top: 1px solid rgba(255, 255, 255, 0.06);
                    flex-direction: row;
                    justify-content: space-around;
                    padding: 0 16px;
                }
                
                #app-content { 
                    margin-left: 0; 
                    padding-bottom: 80px; 
                }
                
                .sidebar-logo { display: none; }
                .nav-icon { margin-bottom: 0; }
                .sidebar-footer { margin-top: 0; }
                .nav-icon.active::before {
                    left: 25%;
                    top: auto;
                    bottom: -6px;
                    width: 50%;
                    height: 3px;
                    border-radius: 4px 4px 0 0;
                }
            }
        `;
        document.head.appendChild(style);
    },

    buildShellArchitecture() {
        // Create elements cleanly using standard DOM nodes to secure functional code architecture listeners
        const sidebar = document.createElement('aside');
        sidebar.id = 'app-sidebar';

        const logo = document.createElement('div');
        logo.className = 'sidebar-logo';
        logo.textContent = 'G';
        logo.addEventListener('click', () => window.location.href = 'index.html');
        sidebar.appendChild(logo);

        const footerWrapper = document.createElement('div');
        footerWrapper.className = 'sidebar-footer';

        // Loop array maps safely
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

        // Safely capture entire page body content without disrupting existing node reference trees
        const contentWrapper = document.createElement('main');
        contentWrapper.id = 'app-content';
        
        while (document.body.firstChild) {
            contentWrapper.appendChild(document.body.firstChild);
        }

        // Re-inject shell structures safely back to viewport
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

// Fire UI execution cleanly
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => UIManager.init());
} else {
    UIManager.init();
}
