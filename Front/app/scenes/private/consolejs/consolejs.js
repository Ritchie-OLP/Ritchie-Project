import styles from './consolejs.css';

export function ConsoleJS() {
    const pageContent = `
    <div class="${styles["container"]}">
        <h2>Consola de JavaScript</h2>
        <button id="openConsoleBtn">Ejecutar</button>
        <div>
            <label for="jsInput">Ingresa código JavaScript:</label>
            <textarea id="jsInput"></textarea>
        </div>
        <div id="outputContainer" class="${styles["outputContainer"]}">
            <h3>Resultados:</h3>
            <pre id="output"></pre>
        </div>
    </div>
    `
    let executionCount = 0;
    const MAX_EXECUTION_COUNT = 1000;
    const logic = () => {
        if (executionCount >= MAX_EXECUTION_COUNT) {
            console.error('Se ha alcanzado el límite de ejecuciones. Deteniendo la ejecución.');
            return
        }
        const jsInput = document.getElementById('jsInput').value;
        try {
            const result = eval(jsInput);
            console.log(result);

        // Abrir la consola en una nueva pestaña
            const newTab = window.open();
            if (newTab) {
                newTab.document.open();
                newTab.document.write('<html><head><title>Consola de JavaScript</title></head><body>');
                newTab.document.write(`<pre>${result}</pre>`);
                newTab.document.write('</body></html>');
                newTab.document.close();
            } else {
                console.error('No se pudo abrir la consola en una nueva pestaña');
            }

            executionCount++;

        } catch (error) {
        console.error(error);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('openConsoleBtn').addEventListener('click', logic);
    });
    return{
        pageContent,
        logic
    }
}