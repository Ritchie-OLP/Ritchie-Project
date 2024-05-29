import styles from './navigation-bar.css';
import navLogo from '../../assets/images/riwi_nav_logo.png';

export function NavigationBar(
  { user, userImage } =
    { user: 'User', userImage: 'https://via.placeholder.com/150' }
) {

  return `
  <div class="${styles.container}">
    <figure>
      <a href="/dashboard/user-view"><img src="${ navLogo }" alt="Riwi"></a>
    </figure>
    <p>${user}</p>
    <img src="${userImage}" alt="User image">
  </div>
  `;
}