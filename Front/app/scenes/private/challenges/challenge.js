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

            <label for="nombreReto">Nombre del reto</label>
            <input type="text" id="nombreReto" name="nombreReto" placeholder="Lorem ipsum dolor sit amet, con">

            <label for="descripcionReto">Contenido del reto(Reto y teoria relacionada))</label>
            <textarea id="descripcionReto" name="descripcionReto" placeholder="Describa el reto y la teoría necesaria..."></textarea>

            <label for="ruta">Asignar ruta</label>
            <select id="ruta" name="ruta">
                <option value="" disabled selected>Lista de rutas disponibles</option>
            </select>

            <label for="lenguaje">Asignar lenguaje</label>
            <select id="lenguaje" name="lenguaje">
                <option value="" disabled selected>Lista de lenguajes disponibles para la ruta elegida</option>
            </select>

            <label for="modulo">Asignar módulo</label>
            <select id="modulo" name="modulo">
                <option value="" disabled selected>Lista de módulos disponibles para el lenguaje elegido</option>
            </select>

            <button type="submit" id="submitBtn">Enviar información</button>
        </div>
    </div>
    <div class="${styles.loader}" id="loader"></div>
    `;

    let logic = async () => {
        const modal = document.getElementById("myModal");
        const span = modal.querySelector(`.${styles.close}`);
        const btn = document.getElementById("proponerRetoBtn");
        const challengesContainer = document.getElementById("challengesContainer");
        const submitBtn = document.getElementById('submitBtn')
        const user_id = JSON.parse(localStorage.getItem('user')).id
    
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
        const response = await fetch('http://localhost:4000/api/challenges/getallchallenges', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const challenges = await response.json();

        challenges.forEach((challenge) => {

            challengesContainer.innerHTML += `
            <div class="${styles.reto}">
                <span class="${styles['name-challenge']}">Nombre del reto: ${challenge.name}</span>
                <p>Reto: ${challenge.content}</p>
                <span>Estado: <span class="${challenge.completed ? styles.completado : styles['no-completado']}">${challenge.completed ? 'Completado' : 'No completado'}</span></span>
            </div>
            `;
        });      

    //     const checkboxHTML = document.querySelector('input[value="HTML"]')
    //     const checkboxJavaScript = document.querySelector('input[value="JavaScript"]')
    //     const checkboxCSS = document.querySelector('input[value="CSS"]')

    //     const filterChallenges = () => {
    //         const checkboxes = {
    //             HTML: checkboxHTML.checked,
    //             CSS: checkboxCSS.checked, 
    //             JavaScript: checkboxJavaScript.checked
    //         }

    //         challengesContainer.innerHTML = ''

    //         challenges.forEach(challenges => {
    //             const {"Nombre reto": nombreReto, Reto: reto, "estado del reto": estado, "tipo de reto": tipo } = challenges

    //             if ((checkboxes.HTML && tipo === 'html') ||
    //             (checkboxes.CSS && tipo === 'css') ||
    //             (checkboxes.JavaScript && tipo === 'js')) {
    //                 const challengeElement = document.createElement('div')
    //                 challengeElement.classList.add(styles.reto)

    //                 challengeElement.innerHTML = `
    //                 <span>Nombre reto: ${nombreReto}</span>
    //                 <span>Estado: ${estado ? `<span class="${styles.completado}">Completado</span>` : '<span>No completado</span>'}</span>
    //                 <span>Tipo de reto: ${tipo}</span>
    //                 <p>Reto: ${reto}</p>
    //             `;
    //             challengesContainer.appendChild(challengeElement)
    //             }
    //         })
    //     }

    // checkboxHTML.addEventListener('change', filterChallenges)
    // checkboxCSS.addEventListener('change', filterChallenges)
    // checkboxJavaScript.addEventListener('change', filterChallenges)

    // filterChallenges()

    submitBtn.onclick = async function (event) {
        event.preventDefault();
    
        const nameChallenge = document.getElementById('nombreReto').value;
        const contentChallenge = document.getElementById('descripcionReto').value;
        const route = Boolean(document.getElementById('ruta').value)? document.getElementById('ruta').value : null;
        const language = Boolean(document.getElementById('lenguaje').value)? document.getElementById('lenguaje').value : null ;
        const moduleId = Boolean(document.getElementById('modulo').value)?document.getElementById('modulo').value:null;
        console.log(`name:${nameChallenge} Content: ${contentChallenge} route: ${route} language: ${language} module: ${moduleId} userId: ${user_id}`)
    
        const newChallenge = {
            name: nameChallenge,
            userId: user_id,
            content: contentChallenge,
            routeId: route,
            languageId: language,
            moduleId: moduleId
        };
    
        try {
            const response = await fetch('http://localhost:4000/api/challenges/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newChallenge)
            })
    
            if (response.ok) {
                alert('Reto enviado con éxito')
                modal.style.display = "none"
            } else {
                const errorData = await response.json();
                alert(`Error al crear el reto: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error al enviar el reto:', error)
            alert('Error al enviar el reto')
        }
    }    

    }
    
    return {
        pageContent,
        logic
    }
}
