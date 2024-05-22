import styles from './modules.css'
import background from '../../../../../assets/images/background_modules.jpg'
import iconoJS from "../../../../../assets/images/icono-js.png"
import icon1 from '../../../../../assets/iconos/icon1.svg'
import icon2 from '../../../../../assets/iconos/icon2.svg'
import icon3 from '../../../../../assets/iconos/icon3.svg'
import icon4 from '../../../../../assets/iconos/icon4.svg'
import icon5 from '../../../../../assets/iconos/icon5.svg'
import icon6 from '../../../../../assets/iconos/icon6.svg'
import icon7 from '../../../../../assets/iconos/icon7.svg'
import icon8 from '../../../../../assets/iconos/icon8.svg'

export function Modules(params){
    const pageContent = `
    <div class=${styles.newPage} id="container"></div>
    `;

    const logic = async () => {
        const arrayImages = [icon1,icon2,icon3,icon4,icon5,icon6,icon7,icon8]
        const response = await fetch("http://localhost:4000/api/users", {
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
                    if (idx > 7){
                        return
                    }
                    return `<div id="module${idx}" class="${styles.contIconModules} ${styles["mod" + (idx + 1)]}">
                    <img src=${arrayImages[idx]} class=${styles.iconMod} alt="icon + ${idx + 1}">
                    </div>
                
                `})}

                // <img src=${iconoJS} alt="js-icon" class=${styles.iconJs}>
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