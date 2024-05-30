import styles from './modules.css';
import background from '../../../../../assets/images/background_modules.jpg';
import { navigateTo } from '../../../../../Router';

export function Modules(params) {
    const languageId = params.get('id');

    const pageContent = `
    <div class=${styles.newPage} id="container"></div>
    <div class="${styles.tooltip}" id="tooltip"></div>

    <!-- Modal para Crear Módulo -->

    <div id="modalModule" class="${styles.modal}">
        <div class="${styles['modal-content']}">
            <span class="${styles.close}">&times;</span>
            <h2>Create module</h2>
            <form id="createModuleForm" class="${styles.formModal}">
                <label for="nombreModulo">Module name</label>
                <input type="text" id="nameModule" name="name" placeholder="Module name">
                <label for="moduloImage">Img</label>
                <input type="text" id="imageModule" name="image" placeholder="Image URL">
                <label for="contenidoModulo">Contenido</label>
                <textarea id="contentModule" name="content" placeholder="Module content"></textarea>
                <button type="submit" id="submitModuleBtn">Create module</button>
            </form>
        </div>
    </div>
    `;

    const logic = async () => {

        const respLanguage = await fetch(`http://localhost:4000/api/languages/${languageId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const language = await respLanguage.json();
        console.log(language);

        const response = await fetch(`http://localhost:4000/api/modules/language/${languageId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const modules = await response.json();
        console.log(modules);

        const containerPage = document.getElementById('container');

        setTimeout(function () {
            containerPage.style.clipPath = 'circle(100% at center)';
        }, 15);

        containerPage.innerHTML = `
            <button class="${styles.add_module_btn}" id="buttonModule">Add module</button>

            <h1 class="${styles.title} ${styles.fontTitles}">Welcome to ${language.name} modules</h1>
    
            <div class="${styles.imageBackground}">
                <div class="${styles.emptyDiv}"></div>
                <img src=${background} alt="background-image">
            </div>

            <div class=${styles.mainContainerIcons}>
                <div class=${styles.contIconLanguage}>
                     <img src=${language.image} alt="icon" class="${styles.mainIcon}">
                </div>

                <div class="${styles.contModules}" id="releaseArea">
                    ${modules.map((module, idx) => {
                        return `
                        <div id="module${idx}" class="${styles.contIconModules} ${styles["mod" + (idx + 1)]}">
                            <img src=${module.image} class="${styles.iconMod} ${styles["iconMod" + (idx + 1)]}" id=${module.id} alt="icon ${idx + 1}" data-description="${module.name}">
                        </div>
                        `;
                    }).join('')}
                
                </div>
            </div>
        `;

        // Tooltip functionality
        const tooltip = document.getElementById('tooltip');

        document.querySelectorAll(`.${styles.iconMod}`).forEach(icon => {
            icon.addEventListener('mouseover', (e) => {
                const description = icon.getAttribute('data-description');
                tooltip.textContent = description;
                tooltip.style.display = 'block';
                tooltip.style.left = `${e.pageX}px`;
                tooltip.style.top = `${e.pageY + 20}px`;
            });

            icon.addEventListener('mouseout', () => {
                tooltip.style.display = 'none';
            });

            icon.addEventListener('mousemove', (e) => {
                tooltip.style.left = `${e.pageX}px`;
                tooltip.style.top = `${e.pageY + 20}px`;
            });

            icon.addEventListener('click', (e) => {
                navigateTo(`/dashboard/challenges2?id=${e.target.id}`);
            });
        });

        const modalModule = document.getElementById('modalModule')
        const buttonModule = document.getElementById('buttonModule')
        const span = modalModule.querySelector(`.${styles.close}`)
        const submitModuleBtn = document.getElementById('submitModuleBtn')

        buttonModule.onclick = function (event) {
            event.preventDefault()
            modalModule.style.display = 'block'
        }

        span.onclick = function () {
            modalModule.style.display = 'none'
        }

        window.onclick = function (event) {
            if (event.target === modalModule) {
            modalModule.style.display = 'none'
            }
        }
        submitModuleBtn.onclick = async function (event) {
            event.preventDefault()

            const nameModule = document.getElementById('nameModule').value.trim()
            const contentModule = document.getElementById('contentModule').value.trim()
            const image = document.getElementById('imageModule').value.trim()

            if (!nameModule || !contentModule || !imageModule) {
                alert('Por favor, complete todos los campos.')
                return
            }

            const newModule = {
                name: nameModule,
                content: contentModule,
                image: image,
                languageId: languageId
            }

            try {
                const response = await fetch('http://localhost:4000/api/modules/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(newModule)
                })

                if (response.ok) {
                    alert('Modulo creado con exito')
                    modalModule.style.display = 'none'
                } else {
                    const errorData = await response.json()
                    alert(`Error al crear el modulo: ${errorData.message}`)
                }
            } catch (error) {
                console.error('Error al crear el modulo', error)
                alert('Error al crear el modulo')
            }
        }

    };

    return {
        pageContent,
        logic
    };
}
