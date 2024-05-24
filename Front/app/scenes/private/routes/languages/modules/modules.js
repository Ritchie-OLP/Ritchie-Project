import styles from './modules.css'
import background from '../../../../../assets/images/background_modules.jpg'

export function Modules(params){
    const languageId = params.get('id')
    console.log(languageId);

    const pageContent = `
    <div class=${styles.newPage} id="container"></div>
    `;

    const logic = async () => {
        const respLanguage = await fetch(`http://localhost:4000/api/languages/${languageId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        const language = await respLanguage.json()
        console.log(language);
        const response = await fetch(`http://localhost:4000/api/modules/language/${languageId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })//Cierre fetch
        const modules = await response.json()
        console.log(modules);

        const containerPage = document.getElementById('container')

        setTimeout(function() {

            containerPage.style.clipPath = 'circle(100% at center)';
        }, 20)

        containerPage.innerHTML = `
            <div class=${styles.imageBackground}>
                <div class=${styles.emptyDiv}></div>
                <img src=${background} alt="background-image">
            </div>

            <div class=${styles.contModules}>
                ${modules.map((module, idx) => {
                    return `<div id="module${idx}" class="${styles.contIconModules} ${styles["mod" + (idx + 1)]}">
                    </div>
                    // <img src=${module.image} class=${styles.iconMod} alt="icon + ${idx + 1}">
                    
                    `})}
                    
                    // <img src=${language.image} alt="js-icon" class=${styles.iconJs}>
                    </div>
                    
                    
            `
        
        
        // // const moveImage = function(event){

        // //     let image = document.getElementById("moving");

        // //     let mod = event.target;
        // //     let rect = mod.getBoundingClientRect();

        // //     image.style.left = rect.left + 'px';
        // //     image.style.top = rect.top + 'px'
            

        // // }

        // // modules.forEach((module,idx) => {
        // //     document.getElementById(`module${idx}`).addEventListener('click', function(event){
        // //         moveImage(event)
        // //     })
        // // });

   


    }//Cierre de la logica
    
    return {
        pageContent,
        logic
    }


}//Cierre de la funcione modules