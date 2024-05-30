import styles from './consolejs.css';

export function ConsoleJS() {
    const pageContent = `
    <div class="${styles["container"]}">
        <h2>Console JavaScript</h2>
        <label for="jsInput">Ingresa código JavaScript:</label>
        <button id=${"openConsoleBtn"}>Ejecutar</button>
        <div class="${styles["console-container"]}">
            <div class="${styles["input-container"]}">
                <h3>Ingresa código JavaScript:</h3>
                <textarea id="jsInput">console.log('Hello, World!');</textarea>
            </div>
            <div id="outputContainer" class="${styles["output-container"]}">
                <div class="${styles["title"]}">
                    <h3>Resultados:</h3>
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
