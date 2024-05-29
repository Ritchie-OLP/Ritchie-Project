import styles from './language.css';
import background from '../../../../../assets/images/background_modules.jpg';
import remoteControl from "../../../../../assets/images/control-remoto.png"
import { navigateTo } from '../../../../../Router';


export function LanguageScenes(params) {

    const routeId = params.get('id')
  
    const pageContent = `
    <div class=${styles.container} id="container" ></div>

    <!-- Modal para Crear Lenguaje -->

    <p class="buttonLanguage" id="buttonLanguage">Add route</p>

    <div id="modalLanguage" class="${styles.modal}">
        <div class="${styles['modal-content']}">
            <span class="${styles.close}">&times;</span>
            <h2>Crear Lenguaje</h2>
            <form id="createLanguageForm">
                <label for="nombreLenguaje">Nombre del lenguaje</label>
                <input type="text" id="nameLanguage" name="name" placeholder="Nombre del lenguaje">
                <label for="lenguajeImage">Img</label>
                <input type="text" id="languageImage" name="image" placeholder="URL de la imagen">
                <button type="submit" id="submitLanguageBtn">Crear Lenguaje</button>
            </form>
        </div>
    </div>
    `
  
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
              <img src=${language.image} alt="languageIcon" class=${styles.icono} id=${language.id}>
              <p class="${styles.pLanguage} ${styles.fontTitles}">${language.name}</p>
              
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

      const modalLanguage = document.getElementById("modalLanguage")
      const btnCreateLanguage = document.getElementById("buttonLanguage")
      const span = modalLanguage.querySelector(`.${styles.close}`)
      const submitBtnCrearLenguage = document.getElementById('submitLanguageBtn')

      btnCreateLanguage.onclick = function (event) {
        event.preventDefault()
        modalLanguage.style.display = 'block'
      }

      span.onclick = function () {
        modalLanguage.style.display = 'none'
      }

      window.onclick = function (event) {
        if (event.target === modalLanguage) {
          modalLanguage.style.display = 'none'
        }
      }

// Creacion de un nuevo lenguaje
      submitBtnCrearLenguage.onclick = async function (event) {
        event.preventDefault()

        const nameLanguage = document.getElementById('nameLanguage').value
        const imageLanguage = document.getElementById('languageImage').value

        const newLanguage = {
          name: nameLanguage,
          image: imageLanguage,
          routeId: routeId
        }

        try {
          const response = await fetch('http://localhost:4000/api/languages/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(newLanguage)
          })
  
          if(response.ok) {
            alert('Lenguaje creado con exito')
            modalLanguage.style.display = 'none'
          } else {
            const errorData = await response.json();
            alert(`Error al crear el lenguaje: ${errorData.message}`);
          }
        } catch (error) {
          console.error('Error al crear el lenguaje', error)
          alert('Error al crear lenguaje')
        }
      }

    }//Cierre de la logica

 
    return {
      pageContent,
      logic
    }


  }//Cierre de la funcion LanguageScenes






  