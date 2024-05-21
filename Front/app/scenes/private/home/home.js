import styles from './home.css';
import { ReportScene } from '../reports'
import testbg from '../../../assets/testbg.gif'
import testbg2 from '../../../assets/testbg2.gif'

export function HomeScene() {

  // generate random number between 1 an 10
  const randomNumber = Math.floor(Math.random() * 10) + 1;

  const footer = `
  <footer><p>All rights reserved.</p></footer>
  `;

  const pageContent = `
  <div class="${styles.home_elements} ${styles.hidden}" id="home_container">
    <h1>RIWI Learning Platform</h1>
    <p>Welcome to RIWI's Learning Platform, where you'll be able to step up your programming skills.</p>
    <div id="user-info"></div>
    <div id="all-users" class="${styles.home_users_container}"></div>
    ${footer}
  </div>
  <div class="${styles.loader}" id="loader">
  </div>
  `;

  const logic = () => {
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
        const imgs = [testbg, testbg2]
        data.forEach((user, i) => {
          if (i > 1){
            return;
          }
          userInfo.innerHTML += `
            <article class="${styles.home_user_card}">
              <div>
                <h2>Route: ${user.id}</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc lectus, aliquam vitae volutpat id, vestibulum ac ante. Nam eleifend feugiat dui id laoreet. Fusce sodales molestie fringilla. Praesent vestibulum aliquam urna, eu feugiat quam. Cras tincidunt, risus eu aliquam pulvinar, est nibh congue purus, sed mollis nunc velit porta mi. Phasellus vitae ultricies velit. Etiam sem dolor, pretium a augue at, tincidunt sollicitudin purus. Cras tempus accumsan quam, non pretium massa congue et. Aenean in mattis orci. Proin ipsum arcu, scelerisque vel ultrices vitae, eleifend at dui. Mauris vel enim ac ipsum gravida viverra. Donec tempus enim quis lorem interdum, vitae efficitur nisi vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis feugiat arcu faucibus ipsum posuere, quis pretium augue auctor.</p>
                <a href="/dashboard/users/${user.id}">See more</a>
              </div>
              <figure>
                <img src="${imgs[i]}" alt="testbg">
              </figure>
            </article>
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
