import styles from './home.css';
import { ReportScene } from '../reports'
import { navigateTo } from '../../../Router';
import background from '../../../assets/images/background_modules.jpg';

export function HomeScene() {

  // generate random number between 1 an 10
  const randomNumber = Math.floor(Math.random() * 10) + 1;

  const footer = `
  <footer><p>All rights reserved.</p></footer>
  `;

  const pageContent = `
  <div class="${styles.home_elements} ${styles.hidden}" id="home_container">
    <div class=${styles.containerEditor}>
      <img src=${background} alt="background">
    </div>
    <h1>RIWI Learning Platform</h1>
    <p>Welcome to RIWI's Learning Platform, where you'll be able to step up your programming skills.</p>
    <div id="route-info"></div>
    <div id="all-routes" class="${styles.home_routes_container}"></div>

    <!-- Modal para Crear Ruta -->
    
    <p class="buttonRoute" id="buttonRoute">Add route</p>

    <div id="modalRoute" class="${styles.modal}">
        <div class="${styles['modal-content']}">
            <span class="${styles.close}">&times;</span>
            <h2>Crear Ruta</h2>
            <form id="crearRutaForm">
                <label for="rutaName">Nombre de la ruta</label>
                <input type="text" id="rutaName" name="name" placeholder="Nombre de la ruta">
                <label for="rutaDescription">Descripción</label>
                <textarea id="rutaDescription" name="description" placeholder="Descripción de la ruta"></textarea>
                <label for="rutaImage">Img</label>
                <input type="text" id="rutaImage" name="image" placeholder="URL de la imagen">
                <button type="submit" id="submitRouteBtn">Crear Ruta</button>
            </form>
        </div>
    </div>
    ${footer}
  </div>
  <div class="${styles.loader}" id="loader">
  </div>
  `;

  const logic = async () => {
    const data = await fetch('http://localhost:4000/api/routes/getallroutes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    const response = await data.json();
    const routeInfo = document.getElementById('all-routes');
    response.forEach((route, i) => {
      
      routeInfo.innerHTML += `
        <article class="${styles.home_route_card}">
          <div>
            <h2>Route: ${route.name}</h2>
            <p>${route.description}</p>
            <a id="${route.id}" class="${styles.butSeeMore} seeMoreBtns">See more</a>
          </div>
          <figure>
            <img src="${route.image}" alt="testbg">
          </figure>
        </article>
    `;})
    document.querySelector(`#loader`).classList.add(styles.hidden);
    document.getElementById('home_container').classList.remove(styles.hidden);

    document.querySelectorAll(`.seeMoreBtns`).forEach(btn => {
      btn.addEventListener('click' , (e) => {
        navigateTo(`/dashboard/routes/languages?id=${e.target.id}`)
      })
    })

    const modal = document.getElementById('modalRoute');
    const btn = document.getElementById('buttonRoute');
    const span = modal.querySelector(`.${styles.close}`);

    btn.onclick = function (event) {
        event.preventDefault();
        modal.style.display = 'block';
    };

    span.onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }


    // logica para manejar el envio del formulario
    const submitBtn = document.getElementById("submitRouteBtn")
    submitBtn.onclick = async function (event) {
      event.preventDefault()
  
      const rutaNameInput = document.getElementById('rutaName')
      const rutaDescriptionInput = document.getElementById('rutaDescription')
      const rutaImageInput = document.getElementById('rutaImage')
  
      const name = rutaNameInput.value
      const description = rutaDescriptionInput.value
      const image = rutaImageInput.value
  
      const newRoute = {
          name: name,
          description: description,
          image: image
      }
  
      try {
          const response = await fetch('http://localhost:4000/api/routes', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(newRoute)
          });
  
          if (response.ok) {
              alert('Ruta creada con éxito');
              modal.style.display = 'none';
          } else {
              alert('Error al crear la ruta');
          }
      } catch (error) {
          console.error('Error al crear la ruta:', error);
          alert('Error al crear la ruta');
      }
  }

}

  return {
    pageContent,
    logic
  }
}
