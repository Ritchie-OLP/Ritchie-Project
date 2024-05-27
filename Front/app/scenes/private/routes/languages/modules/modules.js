import styles from './modules.css';
import background from '../../../../../assets/images/background_modules.jpg';
import { navigateTo } from '../../../../../Router';

export function Modules(params) {
    const languageId = params.get('id');

    const pageContent = `
    <div class=${styles.newPage} id="container"></div>
    <div class="${styles.tooltip}" id="tooltip"></div>
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
        }, 20);

        containerPage.innerHTML = `
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
    };

    return {
        pageContent,
        logic
    };
}
