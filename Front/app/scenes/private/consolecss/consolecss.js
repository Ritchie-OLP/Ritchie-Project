import styles from './consolecss.css';
export function ConsoleCSS() {
    const pageContent = `
    <div class="${styles["container"]}">
        <h2>Console HTML and CSS</h2>
            <div>
                <button id="runHtmlCss">Run</button>
            </div>
        <div>
            <textarea id="htmlWithCss"><h1>Hola Mundo</h1></textarea>
            <textarea id="cssOnly">h1 { background-color: white; }</textarea>
            <iframe id="iframeHtmlCss" sandbox="allow-scripts"></iframe>
        </div>
    </div>
    `;

    const logic = () => {
        document.getElementById('runHtmlCss').addEventListener('click', () => {
            const htmlContent = document.getElementById('htmlWithCss').value;
            const cssContent = document.getElementById('cssOnly').value;
            const fullHTML = `
                <!doctype html><html>
                    <head><style>${cssContent}</style></head>
                    <body>${htmlContent}</body>
                </html>`;
            document.getElementById('iframeHtmlCss').src = 'data:text/html,' + encodeURIComponent(fullHTML);
        });
    } 
    return {
        pageContent,
        logic
    }
}