import styles from './language.css';
import background from '../../../../../assets/images/fondo.jpg';
import remoteControl from "../../../../../assets/images/control-remoto.png";
import { navigateTo } from '../../../../../Router';


export function LanguageScenes(params) {

    const routeId = params.get('id')
  
    const pageContent = `<div class=${styles.container} id="container" ></div>`
  
    let logic = async () => {
      const resp = await fetch(`http://localhost:4000/api/languages/route/${routeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })//Cierre fetch


      const respRoutes = await fetch(`http://localhost:4000/api/routes/${routeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })//Cierre fetch

      const languages = await resp.json()
      console.log(languages, " POR ACA")

      const route = await respRoutes.json()
      console.log(route);

      const containerPage = document.getElementById('container')

      setTimeout(function () {
        containerPage.style.clipPath = 'circle(100% at center)';
     }, 15);

      
      containerPage.innerHTML = `
      <h1 class="${styles.title} ${styles.fontTitles}">Welcome to ${route.name} languages</h1>
      <div class=${styles.containerEditor}>
          <img src=${background} alt="background">
      </div>

      <div class=${styles.contIcons}>
        ${languages.map((language,idx) => {
          return `
            <div class=${styles.iconContainer}>
              <img src=${language.image} alt="languageIcon" class="${styles.icono} iconImages" id=${language.id}>
              <p class="${styles.pLanguage} ${styles.fontTitles}">${language.name}</p>
              
              <img src=${remoteControl} class=${styles.remoteControl} alt="remote">
            </div>
          
          
          `
        })}
      </div>
      
      `
        document.querySelectorAll(`.iconImages`).forEach(
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






  