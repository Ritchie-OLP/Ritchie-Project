import styles from './language.css';
import editor from "../../../../../assets/images/editor-codigo.png"
import iconoJS from "../../../../../assets/images/icono-js.png"
import iconoCss from "../../../../../assets/images/icono-css.png"
import iconoHtml from "../../../../../assets/images/icono-html.png"
import remoteControl from "../../../../../assets/images/control-remoto.png"
import { navigateTo } from '../../../../../Router';


export function LanguageScenes(params) {

    const pageContent = `<div class= ${styles.container} id="container" ></div>`
  
    let logic = async () => {
      const arrayImages = [iconoHtml,iconoCss,iconoJS]
      const resp = await fetch('http://localhost:4000/api/languages/route/1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })//Cierre fetch

      const languages = await resp.json()
      console.log(languages)

      const containerPage = document.getElementById('container')
      
      containerPage.innerHTML = `
      <h1 class="${styles.title} ${styles.fontTitles}">WELCOME TO FRONT-END LANGUAGES</h1>
      <div class=${styles.containerEditor}>
          <img src=${editor} alt="background">
      </div>

      <div class=${styles.contIcons}>
        ${languages.map((language,idx) => {
          return `
            <div class=${styles.iconContainer}>
              <img src=${arrayImages[idx]} alt="languageIcon" class=${styles.icono} id=${"img" + language.name}>
              <p class=${styles.pLanguage}>${language.name}</p>
              
              <img src=${remoteControl} class=${styles.remoteControl} alt="remote">
            </div>
          
          
          `
        }).join('')}
      </div>
      
      `

    document.addEventListener('DOMContentLoaded', (event) => {

      languages.forEach(language => {

        let imgElement = document.getElementById("img" + language.name )


      })


    })  

    }//Cierre de la logica

 
    return {
      pageContent,
      logic
    }


  }//Cierre de la funcion LanguageScenes






  