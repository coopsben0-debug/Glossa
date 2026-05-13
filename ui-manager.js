// ui-manager.js
const UIManager = {
    init() {
        // 1. Wrap the existing page content so the sidebar can sit next to it
        this.injectShell();
        // 2. Highlight which page the user is currently on
        this.highlightActive();
    },

    injectShell() {
        // Store whatever is currently on the HTML page
        const originalContent = document.body.innerHTML;
        
        // Rewrite the body to include the Sidebar + the Original Content
        document.body.innerHTML = `
            <aside id="app-sidebar">
                <div class="sidebar-logo" onclick="window.location.href='dashboard.html'">G</div>
                
                <a href="dashboard.html" class="nav-icon" data-page="dashboard" title="Dashboard">🏠</a>
                <a href="languages.html" class="nav-icon" data-page="languages" title="Languages">🌍</a>
                <a href="chat.html" class="nav-icon" data-page="chat" title="Community Chat">💬</a>
                <a href="ai-tutor.html" class="nav-icon" data-page="ai-tutor" title="AI Tutor">🤖</a>
                
                <div style="margin-top: auto;">
                    <a href="profile.html" class="nav-icon" data-page="profile" title="My Profile">👤</a>
                </div>
            </aside>
            <main id="app-content">
                ${originalContent}
            </main>
        `;
    },

    highlightActive() {
        // Look at the URL and light up the matching icon
        const path = window.location.pathname;
        document.querySelectorAll('.nav-icon').forEach(icon => {
            const pageName = icon.getAttribute('data-page');
            if (path.includes(pageName)) {
                icon.classList.add('active');
            }
        });
    }
};

// Run this as soon as the page is ready
document.addEventListener('DOMContentLoaded', () => UIManager.init());
