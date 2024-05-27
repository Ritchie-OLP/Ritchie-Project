import styles from './language.css';
import editor from "../../../../../assets/images/editor-codigo.png"
import iconoJS from "../../../../../assets/images/icono-js.png"
import iconoCss from "../../../../../assets/images/icono-css.png"
import iconoHtml from "../../../../../assets/images/icono-html.png"
import remoteControl from "../../../../../assets/images/control-remoto.png"
import { navigateTo } from '../../../../../Router';


export function LanguageScenes() {

    const pageContent = `
      <div class= ${styles.container} id="container" >
        <h1 class="${styles.title} ${styles.fontTitles}">WELCOME TO FRONT-END LANGUAGES</h1>


        <div class=${styles.containerEditor}>
          <img src=${editor} alt="background">
        </div>

        <div class=${styles.contIconos}>

        <div class="${styles.icon3} ${styles.iconContainer}">
          <img src=${iconoHtml} alt="html-icon" class=${styles.icono} id="htmlIcon">
          <p class="${styles.pIcon} ${styles.pHtml} ${styles.fontTitles}">HTML</p>
          <img src=${remoteControl} alt="remote"  >
        </div>

        <div class="${styles.icon2} ${styles.iconContainer}">
          <img src=${iconoCss} alt="css-icon" class=${styles.icono} id="cssIcon">
          <div class=${styles.contPaRem}>
            <p class="${styles.pIcon} ${styles.pCss} ${styles.fontTitles}">CSS</p>
            <img src=${remoteControl} alt="remote" >
          </div>
        </div>

        <div class="${styles.icon1} ${styles.iconContainer}">
          <img src=${iconoJS} alt="js-icon" class=${styles.icono} id="jsIcon">
          <p class="${styles.pIcon} ${styles.pJs} ${styles.fontTitles}">JAVASCRIPT</p>
          <img src=${remoteControl} alt="remote" >
        </div>

       

       

      </div>
      `;
  
    const logic = () => {

  
      const javaScript = document.getElementById('jsIcon')
      javaScript.addEventListener('click', () => {
        navigateTo('/dashboard/routes/languages/module')
      })//Cierre evento javascript


   


    }//Cierre de la logica
  
 
    return {
      pageContent,
      logic
    }


  }//Cierre de la funcion LanguageScenes




  // Asegúrate de que el DOM esté completamente cargado antes de intentar acceder a los elementos
document.addEventListener('DOMContentLoaded', (event) => {
    // Itera sobre cada idioma
    languages.forEach((language) => {
        // Obtiene el elemento por su ID
        let imgElement = document.getElementById("img" + language.name);
        
        // Verifica si el elemento existe
        if(imgElement) {
            // Asigna un evento, por ejemplo, un evento de click
            imgElement.addEventListener('click', (event) => {
                // Aquí puedes manejar el evento, por ejemplo, mostrar el nombre del idioma
                console.log('Has hecho click en el idioma: ' + language.name);
            });
        }
    });
});



// arrastrar y pegar


   //     // Load saved positions
    //     modules.forEach((module, idx) => {
    //         const icon = document.getElementById(`${module.id}`);
    //         const savedPosition = localStorage.getItem(`iconPosition${idx}`);
    //         if (savedPosition) {
    //             const { left, top } = JSON.parse(savedPosition);
    //             icon.style.position = 'absolute';
    //             icon.style.left = left;
    //             icon.style.top = top;
    //         } else {
    //             // Ensure icons have no positioning initially
    //             icon.style.position = '';
    //             icon.style.left = '';
    //             icon.style.top = '';
    //         }
    //     });

    //     setTimeout(() => {
    //         const icons = document.querySelectorAll(`.${styles.iconMod}`);
    //         icons.forEach((icon, idx) => {
    //             icon.addEventListener('dragstart', (event) => {
    //                 event.dataTransfer.setData('text/plain', icon.id);
    //             });

    //             icon.addEventListener('dragend', (event) => {
    //                 const rect = icon.getBoundingClientRect();
    //                 const iconPosition = {
    //                     left: `${rect.left}px`,
    //                     top: `${rect.top}px`
    //                 };
    //                 localStorage.setItem(`iconPosition${idx}`, JSON.stringify(iconPosition));
    //             });
    //         });

    //         const releaseArea = document.getElementById('releaseArea');
    //         if (releaseArea) {
    //             releaseArea.addEventListener('drop', (event) => {
    //                 event.preventDefault();
    //                 const iconId = event.dataTransfer.getData('text/plain');
    //                 const draggedIcon = document.getElementById(iconId);

    //                 if (draggedIcon) {
    //                     const rect = releaseArea.getBoundingClientRect();
    //                     const x = event.clientX - rect.left;
    //                     const y = event.clientY - rect.top;

    //                     draggedIcon.style.position = 'absolute';
    //                     draggedIcon.style.left = `${x}px`;
    //                     draggedIcon.style.top = `${y}px`;

    //                     // Save position to localStorage
    //                     const iconIdx = iconId.replace('icon', '');
    //                     const iconPosition = {
    //                         left: `${x}px`,
    //                         top: `${y}px`
    //                     };
    //                     localStorage.setItem(`iconPosition${iconIdx}`, JSON.stringify(iconPosition));
    //                 }
    //             });

    //             releaseArea.addEventListener('dragover', (event) => {
    //                 event.preventDefault();
    //             });
    //         }

    //         // Reset button logic
    //         const resetButton = document.getElementById('resetButton');
    //         if (resetButton) {
    //             resetButton.addEventListener('click', () => {
    //                 // Remove all icon positions from localStorage
    //                 modules.forEach((module, idx) => {
    //                     localStorage.removeItem(`iconPosition${idx}`);
    //                 });

    //                 // Reset positions and styles
    //                 icons.forEach(icon => {
    //                     icon.style.position = '';
    //                     icon.style.left = '';
    //                     icon.style.top = '';
    //                 });

    //                 // Apply flexbox layout to center icons horizontally
    //                 releaseArea.style.display = 'flex';
    //                 releaseArea.style.justifyContent = 'center';
    //                 releaseArea.style.flexWrap = 'wrap';
    //             });
    //         }
    //     }, 100);




    // margin: 10%;
    // width: 100%;
    // height: 100%;
    // position: relative;
    // display: grid;
    // grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    // column-gap: 2vw; 
    // row-gap: 2vh;  
    // justify-items: center;