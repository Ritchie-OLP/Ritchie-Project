import styles from './consolejs.css';

export function ConsoleJS() {
    const pageContent = `
    <div class="${styles["container"]}">
        <h2>Console JavaScript</h2>
        <button id=${"openConsoleBtn"}>RUN</button>
        <div class="${styles["console-container"]}">
            <div class="${styles["input-container"]}">
                <h3>Your Scripit</h3>
                <textarea id="jsInput">3+12</textarea>
            </div>
            <div id="outputContainer" class="${styles["output-container"]}">
                <div class="${styles["title"]}">
                    <h3>Result:</h3>
                </div>
                <div class="${styles["output"]}">
                    <input type="text" id="output" class="${styles["output-text"]}" readonly/>
                </div>
                
            </div>
        </div>
    </div>
    `
    const logic = () => {
        function espacioEjecucion (cadenaTexto){
            try {
                const result = eval(cadenaTexto);
                document.getElementById("output").value = result;
            } catch (error) {
                document.getElementById("output").value = 'Error en la expresión';
                return 'Error en la expresión';
            }
        }
        function runCode() {
            var input = document.getElementById("jsInput");
            const inputReal = input.value;
            espacioEjecucion(inputReal);   
        }
        document.getElementById('openConsoleBtn').addEventListener('click', runCode);
    }   
    return {
        pageContent,
        logic
    }
}
