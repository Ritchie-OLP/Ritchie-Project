import styles from './language.css';
import editor from "../../../../../assets/images/editor-codigo.png"
import remoteControl from "../../../../../assets/images/control-remoto.png"
import { navigateTo } from '../../../../../Router';


export function LanguageScenes(params) {

    const routeId = params.get('id')

    const pageContent = `<div class= ${styles.container} id="container" ></div>`
  
    let logic = async () => {
      const resp = await fetch(`http://localhost:4000/api/languages/route/${routeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })//Cierre fetch

      const languages = await resp.json()
      console.log(languages, " POR ACA")

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
              <img src=${language.image} alt="languageIcon" class=${styles.icono} id=${language.id}>
              <p class=${styles.pLanguage}>${language.name}</p>
              
              <img src=${remoteControl} class=${styles.remoteControl} alt="remote">
            </div>
          
          
          `
        })}
      </div>
      
      `
        document.querySelectorAll(`.${styles.icono}`).forEach(
          image => {
            image.addEventListener('click', (e) => {
              navigateTo(`/dashboard/routes/languages/module?id=${e.target.id}`)
            })
          }
        )

    }//Cierre de la logica

 
    return {
      pageContent,
      logic
    }


  }//Cierre de la funcion LanguageScenes






  