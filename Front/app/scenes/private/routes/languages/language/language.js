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



  