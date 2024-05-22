import styles from './challenge.css'

export function ChallengeScene() {
    let pageContent = `
    <div class="${styles.navbar}">
        <div class="${styles['left-nav']}">
            <a href="#">Compilador JavaScript</a>
            <a href="#" id="proponerRetoBtn">Proponer retos</a>
        </div>
    </div>
    <div class="${styles.content}">
        <div class="${styles.retos}" id="challengesContainer">
            <h2>Retos</h2>
        </div>
        <div class="${styles.filtros}">
            <h2>Filtros</h2>
            <div>
                <h3>Tipos de datos</h3>
                <label><input type="checkbox" value="HTML"> HTML</label>
                <label><input type="checkbox" value="CSS"> CSS</label>
                <label><input type="checkbox" value="JavaScript"> JavaScript</label>
            </div>
        </div>
    </div>
    <div id="myModal" class="${styles.modal}">
        <div class="${styles['modal-content']}">
            <span class="${styles.close}">&times;</span>
            <h2>Propuesta reto</h2>
            <label for="name">Nombre</label>
            <input type="text" id="name" name="name" placeholder="John Doe">

            <label for="email">Correo</label>
            <input type="email" id="email" name="email" placeholder="johndoe@example.com">

            <label for="finalidad">Finalidad del reto</label>
            <textarea id="finalidad" name="finalidad">Con este reto se busca Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec sem in justo. Nullam in felis eu.</textarea>

            <label for="tipo-reto">Tipo de reto</label>
            <input type="text" id="tipo-reto" name="tipo-reto" placeholder="CSS, HTML, JavaScript" class="full-width">

            <label for="reto">Reto</label>
            <textarea id="reto" name="reto">Aqui va la informacion del reto Ejemplo: En este reto vas a utilizar toLowercase, un metodo de strings</textarea>

            <label for="resuelto">Reto resuelto</label>
            <textarea id="resuelto" name="resuelto">Llenar este espacio con la informacion del reto resuelto</textarea>

            <button id="submitBtn">Enviar información</button>
        </div>
    </div>
    <div class="${styles.loader}" id="loader"></div>
    `;

    let logic = async () => {
        const modal = document.getElementById("myModal");
        const span = modal.querySelector(`.${styles.close}`);
        const btn = document.getElementById("proponerRetoBtn");
        const challengesContainer = document.getElementById("challengesContainer");
    
        // Lógica para abrir y cerrar el modal
        btn.onclick = function (event) {
            event.preventDefault();
            modal.style.display = "block";
        };
    
        span.onclick = function () {
            modal.style.display = "none";
        };
    
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    
        // Lógica para llamar al API y mostrar los desafíos
        const response = await fetch('http://localhost:3000/retos');
        const challenges = await response.json();
    
        challenges.forEach(challenge => {
            const { "Nombre reto": nombreReto, Reto: reto, "estado del reto": estado, "tipo de reto": tipo } = challenge;
            const challengeElement = document.createElement('div');
            challengeElement.classList.add(styles.reto);
        
            challengeElement.innerHTML = `
                <span>Nombre reto: ${nombreReto}</span>
                <span>Estado: ${estado ? `<span class="${styles.completado}">Completado</span>` : '<span>No completado</span>'}</span>
                <span>Tipo de reto: ${tipo}</span>
                <p>Reto: ${reto}</p>
            `;
            challengesContainer.appendChild(challengeElement);
        });      

        const checkboxHTML = document.querySelector('input[value="HTML"]');
        const checkboxJavaScript = document.querySelector('input[value="JavaScript"]');
        const checkboxCSS = document.querySelector('input[value="CSS"]');

        const filterChallenges = () => {
            const checkboxes = {
                HTML: checkboxHTML.checked,
                CSS: checkboxCSS.checked, 
                JavaScript: checkboxJavaScript.checked
            }

            challengesContainer.innerHTML = ''

            challenges.forEach(challenges => {
                const {"Nombre reto": nombreReto, Reto: reto, "estado del reto": estado, "tipo de reto": tipo } = challenges

                if ((checkboxes.HTML && tipo === 'html') ||
                (checkboxes.CSS && tipo === 'css') ||
                (checkboxes.JavaScript && tipo === 'js')) {
                    const challengeElement = document.createElement('div')
                    challengeElement.classList.add(styles.reto)

                    challengeElement.innerHTML = `
                    <span>Nombre reto: ${nombreReto}</span>
                    <span>Estado: ${estado ? `<span class="${styles.completado}">Completado</span>` : '<span>No completado</span>'}</span>
                    <span>Tipo de reto: ${tipo}</span>
                    <p>Reto: ${reto}</p>
                `;
                challengesContainer.appendChild(challengeElement);
                }
            })
        }

        checkboxHTML.addEventListener('change', filterChallenges);
    checkboxCSS.addEventListener('change', filterChallenges);
    checkboxJavaScript.addEventListener('change', filterChallenges);

    filterChallenges();

    }
    
    return {
        pageContent,
        logic
    };
}
