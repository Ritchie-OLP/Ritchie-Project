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
            <a id="${route.id}" class=${styles.butSeeMore}>See more</a>
          </div>
          <figure>
            <img src="${route.image}" alt="testbg">
          </figure>
        </article>
    `;})
    document.querySelector(`#loader`).classList.add(styles.hidden);
    document.getElementById('home_container').classList.remove(styles.hidden);

    document.querySelectorAll(`.${styles.butSeeMore}`).forEach(btn => {
      btn.addEventListener('click' , (e) => {
        navigateTo(`/dashboard/routes/languages?id=${e.target.id}`)
      })
    })

  };

  return {
    pageContent,
    logic
  }
}
