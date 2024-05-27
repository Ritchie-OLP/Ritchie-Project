import styles from './consolehtml.css';

export function ConsoleHTML() {
    const pageContent = `
    <div class="${styles["container"]}">
        <h2>Consola de solo HTML</h2>
        
        <div class="${styles["button-container"]}">
            <button id="runHtml">Run</button>
        </div>
        <div class="${styles["content"]}">
            <div class="${styles["textareas"]}">
                <textarea id="htmlOnly"><h1>Hola Mundo</h1></textarea>
            </div>
            <div class="${styles["iframe-container"]}">
                <iframe id="iframeHtml" sandbox="allow-scripts"></iframe>
            </div>
        </div>
    </div>

    `;

    const logic = () => {
        document.getElementById('runHtml').addEventListener('click', () => {
            const htmlContent = document.getElementById('htmlOnly').value;
            const fullHTML = `
                <!doctype html><html>
                    <body>${htmlContent}</body>
                </html>`;
            document.getElementById('iframeHtml').src = 'data:text/html,' + encodeURIComponent(fullHTML);
        });
    };

    return {
        pageContent,
        logic
    };
}
