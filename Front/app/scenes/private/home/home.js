import styles from './home.css';
import { ReportScene } from '../reports'
import { navigateTo } from '../../../Router';
import background from '../../../assets/images/fondo.jpg';

export function HomeScene() {


  const footer = `
  <footer><p>All rights reserved.</p></footer>
  `;

  const pageContent = `
  <div class="${styles.home_elements} ${styles.hidden}" id="home_container">
  <button class="${styles.add_route_btn}" id="buttonRoute">Add route</button>
  
    <div class=${styles.containerEditor}>
      <img src=${background} alt="background">
    </div>
    <h1>RIWI Learning Platform</h1>
    <p>Welcome to RIWI's Learning Platform, where you'll be able to step up your programming skills.</p>
    <div id="route-info"></div>
    <div id="all-routes" class="${styles.home_routes_container}"></div>

    <!-- Modal para Crear Ruta -->

    <div id="modalRoute" class="${styles.modal}">
      <div class="${styles['modal-content']}">
          <span class="${styles.close}">&times;</span>
          <h2>Create route</h2>
          <br>
          <form id="crearRutaForm" class="${styles.form}">
            <div class="${styles.formGroup}">
                <label for="rutaName">Route's name</label>
                <input type="text" id="rutaName" name="name" placeholder="Route name">
            </div>
            <div class="${styles.formGroup}">
                <label for="rutaImage">Image</label>
                <input type="text" id="rutaImage" name="image" placeholder="Image URL">
            </div>
            <div class="${styles.formGroup}">
                <label for="rutaDescription">Description</label>
                <textarea id="rutaDescription" name="description" placeholder="Route's description" rows="4" cols="50"></textarea>
            </div>
            <div style="text-align: center;">
                <button type="submit" id="submitRouteBtn" class="${styles.submitBtn}">Create route</button>
            </div>
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
  
      const rutaNameInput = document.getElementById('rutaName').value
      const rutaDescriptionInput = document.getElementById('rutaDescription').value
      const rutaImageInput = document.getElementById('rutaImage').value
  
      const name = rutaNameInput.trim()
    const description = rutaDescriptionInput.trim()
    const image = rutaImageInput.trim()

    if (!name || !description || !image) {
        alert('Por favor, complete todos los campos.')
        return
    }

    const newRoute = {
        name: name,
        description: description,
        image: image
    }
  
      try {
          const response = await fetch('http://localhost:4000/api/routes', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify(newRoute)
          });
  
          if (response.ok) {
              alert('Ruta creada con éxito');
              modal.style.display = 'none';
          } else {
            const errorData = await response.json();
            alert(`Error al crear la ruta: ${errorData.message}`);
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
