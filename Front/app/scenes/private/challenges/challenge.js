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
            <h2>Filters</h2>
            <br>
            <div>
                <h3>Challenges</h3>
                <label><input type="checkbox" id="checkboxCompleted" value="SI"> Completado</label>
        <label><input type="checkbox" id="checkboxNoCompleted" value="NO"> No completado</label>
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

        // Select elements
        const rutaSelect = document.getElementById('ruta');
        const lenguajeSelect = document.getElementById('lenguaje');
        const moduloSelect = document.getElementById('modulo');
    
        // Lógica para abrir y cerrar el modal
        btn.onclick = function (event) {
            event.preventDefault();
            modal.style.display = "block";
            fetchRoutes();
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

        // Función para renderizar desafíos
        const renderChallenges = (filteredChallenges) => {
            challengesContainer.innerHTML = ''
            filteredChallenges.forEach((challenge) => {
                challengesContainer.innerHTML += `
                <div class="${styles.reto}">
                    <span class="${styles['name-challenge']}">Nombre del reto: ${challenge.name}</span>
                    <p>Reto: ${challenge.content}</p>
                    <span class="${challenge.completed ? styles.completado : styles['no-completado']}">${challenge.completed ? 'Completado' : 'No completado'}</span>
                </div>
                `
            })
        }

        renderChallenges(challenges)

        const checkboxCompleted = document.getElementById('checkboxCompleted');
        const checkboxNoCompleted = document.getElementById('checkboxNoCompleted');

        const filterChallenges = () => {
            const showCompleted = checkboxCompleted.checked
            const showNoCompleted = checkboxNoCompleted.checked

            const filteredChallenges = challenges.filter(challenge => {
                if (showCompleted && challenge.completed) {
                    return true
                }
                if (showNoCompleted && !challenge.completed) {
                    return true
                }
                return false
            })

            renderChallenges(filteredChallenges)
        }

        checkboxCompleted.addEventListener('change', filterChallenges)
        checkboxNoCompleted.addEventListener('change', filterChallenges)

        filterChallenges()

        // Function to fetch and render routes
        const fetchRoutes = async () => {
            const response = await fetch('http://localhost:4000/api/routes/getallroutes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const routes = await response.json();
            rutaSelect.innerHTML = '<option value="" disabled selected>Lista de rutas disponibles</option>';
            routes.forEach(route => {
                const option = document.createElement('option');
                option.value = route.id;
                option.text = route.name;
                rutaSelect.appendChild(option);
            });
        }

        // Function to fetch and render languages based on selected route
        const fetchLanguages = async (routeId) => {
            const response = await fetch(`http://localhost:4000/api/languages/route/${routeId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const languages = await response.json();
            lenguajeSelect.innerHTML = '<option value="" disabled selected>Lista de lenguajes disponibles para la ruta elegida</option>';
            languages.forEach(language => {
                const option = document.createElement('option');
                option.value = language.id;
                option.text = language.name;
                lenguajeSelect.appendChild(option);
            });
        }

        // Function to fetch and render modules based on selected language
        const fetchModules = async (languageId) => {
            const response = await fetch(`http://localhost:4000/api/modules/language/${languageId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const modules = await response.json();
            moduloSelect.innerHTML = '<option value="" disabled selected>Lista de módulos disponibles para el lenguaje elegido</option>';
            modules.forEach(module => {
                const option = document.createElement('option');
                option.value = module.id;
                option.text = module.name;
                moduloSelect.appendChild(option);
            });
        }

        // Event listeners for select elements
        rutaSelect.addEventListener('change', () => {
            const routeId = rutaSelect.value;
            fetchLanguages(routeId);
        });

        lenguajeSelect.addEventListener('change', () => {
            const languageId = lenguajeSelect.value;
            fetchModules(languageId);
        });

        submitBtn.onclick = async function (event) {
            event.preventDefault()
        
            const nameChallenge = document.getElementById('nombreReto').value.trim()
            const contentChallenge = document.getElementById('descripcionReto').value.trim()
            const route = Boolean(document.getElementById('ruta').value) ? document.getElementById('ruta').value : null
            const language = Boolean(document.getElementById('lenguaje').value) ? document.getElementById('lenguaje').value : null 
            const moduleId = Boolean(document.getElementById('modulo').value) ? document.getElementById('modulo').value : null
            console.log(`name:${nameChallenge} Content: ${contentChallenge} route: ${route} language: ${language} module: ${moduleId} userId: ${user_id}`)
        
            if (!nameChallenge || !contentChallenge) {
                alert('Por favor, complete todos los campos.')
                return
            }
            
            const newChallenge = {
                name: nameChallenge,
                userId: user_id,
                content: contentChallenge,
                routeId: route,
                languageId: language,
                moduleId: moduleId
            }
        
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