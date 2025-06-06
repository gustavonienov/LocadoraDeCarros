document.addEventListener('DOMContentLoaded', () => {
    
    const navbarContainer = document.getElementById('navbar-container');
    const contentContainer = document.getElementById('content-container');

    const loadAndExecuteHTML = async (url, element) => {
        const response = await fetch(url);
        const text = await response.text();
        
        element.innerHTML = '';

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        Array.from(doc.body.children).forEach(child => {
            if (child.tagName !== 'SCRIPT') {
                element.appendChild(child);
            }
        });
        
        const scripts = doc.getElementsByTagName('script');
        for (const oldScript of scripts) {
            const newScript = document.createElement('script');
            newScript.textContent = oldScript.textContent;
            element.appendChild(newScript);
        };
    };

    const setupNavLinks = () => {
        navbarContainer.addEventListener('click', (event) => {
            const link = event.target.closest('a[data-page]');
            if (link) {
                event.preventDefault();
                const page = link.getAttribute('data-page');
                loadAndExecuteHTML(page, contentContainer);
            }
        });
    };

    const initialize = async () => {
        await loadAndExecuteHTML('navbar.html', navbarContainer);
        setupNavLinks();
    };

    initialize();
});