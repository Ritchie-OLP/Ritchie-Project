import styles from './consolejs.css';

export function ConsoleJS() {
    const pageContent = `
    <div class="${styles["container"]}">
        <h2>Consola de JavaScript</h2>
        <label for="jsInput">Ingresa código JavaScript:</label>
        <button id=${"openConsoleBtn"}>Ejecutar</button>
        <div class="${styles["console-container"]}">
            <div class="${styles["input-container"]}">
                <h3>Ingresa código JavaScript:</h3>
                <textarea id="jsInput">console.log('Hello, World!');</textarea>
            </div>
            <div id="outputContainer" class="${styles["output-container"]}">
                <h3>Resultados:</h3>
                <div class="${styles["output"]}"" id="output"></div>
            </div>
        </div>
    </div>
    `
    const logic = () => {
        const workerScript = ` 
        let shouldRun = true;

        self.addEventListener('message', (event) => {
            if (event.data === 'stop') {
                shouldRun = false;
            } else {
                const code = event.data;
                try {
                    const result = eval(\`
                        (() => {
                            while (shouldRun) {
                                \${code}
                            }
                        })()
                    \`);
                    self.postMessage({ result });
                } catch (error) {
                    self.postMessage({ error: error.message });
                }
            }
        });
    `;
    
    // Create a blob URL for the worker script
        const blob = new Blob([workerScript], { type: 'application/javascript' });
        const workerUrl = URL.createObjectURL(blob);

        let worker;
        let timeout;

        function runCode() {
            const jsInput = document.getElementById('jsInput'); 
            const value = jsInput.value;

            // Terminate the previous worker if it exists
            if (worker) {
                worker.terminate();
                clearTimeout(timeout);
            }

            // Create a new Worker
            worker = new Worker(workerUrl);
            
            // Set a timeout to terminate the worker if it takes too long
            timeout = setTimeout(() => {
                worker.terminate();
                console.error('Script execution terminated due to timeout.');
                worker = null; // Mark worker as terminated
            }, 1000); 

            worker.addEventListener('message', (event) => {
                clearTimeout(timeout);
                if (event.data.error) {
                    document.getElementById('output').textContent = `Error: ${event.data.error}`;
                } else {
                    document.getElementById('output').textContent = `Result: ${event.data.result}`;
                }
                worker.terminate(); // Terminate worker after it has finished its job
                worker = null; // Mark worker as terminated
            });
            worker.postMessage(value);
        }
        document.getElementById('openConsoleBtn').addEventListener('click', runCode);
    }   
    return {
        pageContent,
        logic
    }
}
