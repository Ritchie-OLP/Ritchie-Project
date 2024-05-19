import styles from './home.css';
import { ReportScene } from '../reports'

export function HomeScene() {

  // generate random number between 1 an 10
  const randomNumber = Math.floor(Math.random() * 10) + 1;

  const footer = `
  <footer><p>All rights reserved.</p></footer>
  `;

  const pageContent = `
  <div class="${styles.home_elements} ${styles.hidden}" id="home_container">
    <div>
      <h2>Home</h2>
      <p>Welcome to the home view.</p>
    </div>
    <div id="user-info"></div>
    <div id="all-users" class="${styles.home_users_container}"></div>
    ${footer}
  </div>
  <div class="${styles.loader}" id="loader">
  </div>
  `;

  const logic = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${randomNumber}`)
      .then(response => response.json())
      // .then(json => {
      //   // Primero, obtenemos el elemento en dodne deseamos insetar el usuario
      //   const userInfo = document.getElementById('user-info');
      //   // Luego, creamos dos elementos de tipo p
      //   const pId = document.createElement('p');
      //   const pName = document.createElement('p');
      //   // Luego, mostramos el ID
      //   pId.innerText = `User: ${json.id}`;
      //   // Luego, mostramos el nombre
      //   pName.innerText = `Name: ${json.name}`;
      //   // Acto seguido insertamos los elementos en el div
      //   userInfo.appendChild(pId);
      //   userInfo.appendChild(pName);
      //   // Finalmente, mostramos el div
      //   document.getElementById('home_container').classList.remove(styles.hidden);
      // })
      .then(({
        id, name, username, email, address: {
          street, suite, city, zipcode, geo: {
            lat, lng
          }
        },
        phone, website, company: {
          name: companyName, catchPhrase, bs
        }
      }) => {
        const theUser = JSON.parse(localStorage.getItem('user'));
        const userInfo = document.getElementById('user-info');
        userInfo.innerHTML = `
        <p>User: ${theUser.id}</p>
        <p>Name: ${name}</p>
        <p>Username: ${theUser.username}</p>
        <p>Email: ${theUser.email}</p>
        <p>Address: ${street}, ${suite}, ${city}, ${zipcode}</p>
        <p>Geo: ${lat}, ${lng}</p>
        <p>Phone: ${phone}</p>
        <p>Website: ${website}</p>
        <p>Company: ${companyName}</p>
        <p>Catch Phrase: ${catchPhrase}</p>
        <p>BS: ${bs}</p>
        `;
        // Finalmente, ocultamos el loader y mostramos el div
      })

    fetch('http://localhost:4000/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const userInfo = document.getElementById('all-users');
        data.forEach(user => {
          userInfo.innerHTML += `
          <div><a href="/dashboard/users/${user.id}" class="${styles.home_user_card}">
            <p>User: ${user.id}</p>
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>Points: ${user.points}</p>
          </a></div>
        `;})
        document.querySelector(`#loader`).classList.add(styles.hidden);
        document.getElementById('home_container').classList.remove(styles.hidden);
      })
  };

  return {
    pageContent,
    logic
  }
}
