import styles from './navigation-bar.css';
import navLogo from '../../assets/images/riwi_nav_logo.png';

export function NavigationBar(
  { user, userImage } =
    { user: 'User', userImage: 'https://via.placeholder.com/150' }
) {

  const pageContent = `
  <div class="${styles.container}">
    <figure>
      <a href="/dashboard/user-view"><img src="${navLogo}" alt="Riwi"></a>
    </figure>
    <p>${user}</p>
    <img src="${userImage}" alt="User image">
    <i id="burBtn" class="fa-solid fa-bars"></i>
  </div>
  `;

  const logic = () => {

    document.addEventListener('DOMContentLoaded', function () {
      const sidebar = document.getElementById('sidebar-main');
      sidebar.style.left = '0px'; // Set initial left value
    });

    const burBtn = document.getElementById('burBtn');
    const sidebar = document.getElementById('sidebar-main');

    // Set initial toggle state
    let isToggled = false;

    // Define media queries and their corresponding left values

    burBtn.addEventListener('click', () => {
      let leftValue;
      if (window.matchMedia("(max-width: 475px)").matches) {
        leftValue = '100%';
      } else if (window.matchMedia("(max-width: 950px)").matches) {
        leftValue = '250px';
      }
      console.log(window.innerWidth);
      if (!isToggled) {
        burBtn.style.transform = 'rotate(.25turn)';
        burBtn.style.color = '#181E4B';
        sidebar.style.left = leftValue;
        isToggled = true;
      } else {
        burBtn.style.transform = 'rotate(0turn)';
        burBtn.style.color = '#6B5CFF';
        sidebar.style.left = '0';
        isToggled = false;
      }
    });
  }

  return {
    pageContent,
    logic
  };
}