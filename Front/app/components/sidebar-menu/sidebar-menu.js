import styles from './sidebar-menu.css';
import menu from '../../assets/iconos/menu.svg'

export function SidebarMenu(data = []) {

  const path = window.location.pathname;

  // if path === href, add active class
  data.forEach((item) => {
    if (path === item.href) {
      item.active = true;
    }
  });

  return `
    <aside class="${styles["sidebar-menu"]}">
      <div class="${styles["menu-button"]}" id="menuButton">
        <img src=${menu} class= ${styles.menu} id="iconMenu" alt="Menu Icon">
      </div>
      <div class= ${styles.containerUl}> 
      <ul class = ${styles.sidebar}>
      ${data.map((item) => `
        <li class="${item.active ? styles.active : ''}">
          ${item.icon? `<img src="${item.icon}" alt="icon" class="${styles.icon}">` : ''}
          <button id="${item.href}" type="button">${item.name}</button>
        </li>
      `).join('')}
      <li><button id="logout" type="button">Logout</button></li>
    </ul>
      </div>
    </aside>
  `;
}
