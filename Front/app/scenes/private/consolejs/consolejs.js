import styles from './consolejs.css';

export function ConsoleJS() {
    const pageContent = `
        <div class="${styles["container"]}">
            ${createConsoleSection('htmlCssJs', 'Consola de HTML, CSS y JavaScript', true, true, true)}
        </div>
    `;

    const logic = () => {
        setupConsole('htmlCssJs');
    };

    return {
        pageContent,
        logic
    };
}

function createConsoleSection(id, title, includeHtml, includeCss, includeJs) {
    return `
        <div class="${styles["console-section"]}">
            <h2>${title}</h2>
            <button id="run${capitalize(id)}">Run</button>
            ${includeHtml ? `<textarea id="${id}Html"><span id="span">a span</span></textarea>` : ''}
            ${includeCss ? `<textarea id="${id}Css">span { color: green; }</textarea>` : ''}
            ${includeJs ? `<textarea id="${id}Js">span.onclick = () => span.style.color = 'yellow';</textarea>` : ''}
            <iframe id="iframe${capitalize(id)}" sandbox="allow-scripts"></iframe>
        </div>
    `;
}

function setupConsole(id) {
    document.getElementById(`run${capitalize(id)}`).addEventListener('click', () => {
        const htmlContent = document.getElementById(`${id}Html`)?.value || '';
        const cssContent = document.getElementById(`${id}Css`)?.value || '';
        const jsContent = document.getElementById(`${id}Js`)?.value || '';

        const fullHTML = `
            <!doctype html><html>
                <head><style>${cssContent}</style></head>
                <body>${htmlContent}<script>${jsContent}<\/script></body>
            </html>`;
        document.getElementById(`iframe${capitalize(id)}`).src = 'data:text/html,' + encodeURIComponent(fullHTML);
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
