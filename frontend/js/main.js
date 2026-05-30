document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const mainHeader = document.querySelector('.main-header');
    const postInput = document.getElementById('post-input');
    const postButton = document.getElementById('post-button');
    const feedList = document.getElementById('feed-list');
    const pageTitle = document.getElementById('page-title');

    // View switching
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = item.getAttribute('data-view');

            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Hide all views
            views.forEach(view => view.classList.remove('active'));

            // Show selected view
            const viewToShow = document.getElementById(`${viewId}-view`);
            if (viewToShow) {
                viewToShow.classList.add('active');
                pageTitle.textContent = item.textContent.trim();
            }
        });
    });

    // Sidebar toggle for mobile
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        if (sidebar.classList.contains('collapsed')) {
            sidebar.style.width = '70px';
            mainContent.style.marginLeft = '70px';
            mainHeader.style.left = '70px';
            // Hide text labels
            document.querySelectorAll('.sidebar-header h1, .nav-item span, .user-info span').forEach(el => {
                el.style.display = 'none';
            });
        } else {
            sidebar.style.width = '250px';
            mainContent.style.marginLeft = '250px';
            mainHeader.style.left = '250px';
            // Show text labels
            document.querySelectorAll('.sidebar-header h1, .nav-item span, .user-info span').forEach(el => {
                el.style.display = 'block';
            });
        }
    });

    // Post submission (mock)
    postButton.addEventListener('click', () => {
        const content = postInput.value.trim();
        if (content) {
            const postCard = document.createElement('div');
            postCard.className = 'feed-card';
            postCard.innerHTML = `
                <div class="feed-header">
                    <img src="assets/default-avatar.png" alt="Avatar" class="feed-avatar">
                    <div class="feed-user-info">
                        <h3>Fernando</h3>
                        <p>Agora</p>
                    </div>
                </div>
                <div class="feed-content">${escapeHtml(content)}</div>
                <div class="feed-actions">
                    <button class="action-btn"><i class="fas fa-thumbs-up"></i> Curtir</button>
                    <button class="action-btn"><i class="fas fa-comment"></i> Comentario</button>
                    <button class="action-btn"><i class="fas fa-share-alt"></i> Compartilhar</button>
                    <span class="reaction-count">0</span>
                </div>
            `;
            feedList.prepend(postCard);
            postInput.value = '';
            postInput.focus();
        }
    });

    // Allow Enter to submit post (with Ctrl+Enter for newline)
    postInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.ctrlKey) {
            e.preventDefault();
            postButton.click();
        }
    });

    // Helper function to escape HTML
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    // Initialize with home view active
    document.querySelector('[data-view="home"]').click();
});