// /src/View/script.js

document.addEventListener('DOMContentLoaded', () => {
    
    const navbarContainer = document.getElementById('navbar-container');
    const contentContainer = document.getElementById('content-container');

    /**
     * Carrega e executa o conteúdo de uma página HTML, incluindo seus scripts.
     * A PALAVRA 'async' AQUI É ESSENCIAL
     */
    const loadAndExecuteHTML = async (url, element) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro de rede ao buscar ${url}: ${response.statusText}`);
            }
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
            }
        } catch (error) {
            console.error(`Falha crítica ao carregar a página ${url}:`, error);
            element.innerHTML = `<p class="alert alert-danger">Não foi possível carregar o conteúdo.</p>`;
        }
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