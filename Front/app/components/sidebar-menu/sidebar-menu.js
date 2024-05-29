import styles from './sidebar-menu.css';
import { navigateTo } from "../../Router";

export function SidebarMenu() {

  const path = window.location.pathname;

  const data = [
    { href: '/dashboard', name: 'Home' },
    { href: '/dashboard/user-view', name: 'Profile' },
    { href: '/dashboard/show-cases', name: 'Consoles' },
    { href: '/dashboard/challenges', name: 'Challenges'},
  ];

  // if path === href, add active class
  data.forEach((item) => {
    if (path === item.href) {
      item.active = true;
    }
  });

  const icons = [
    'fa-solid fa-house-chimney-window',
    'fa-regular fa-user',
    'fa-solid fa-code',
    'fa-solid fa-list-check',
  ]

  const pageContent = `
  <aside class="${styles["sidebar-menu"]}">
  <ul>
    <li class="${styles.backButton}"><i id="backBtn" class="fa-solid fa-circle-arrow-left"></i></li>
    ${data.map((item, ind) => `
      <li id="${item.href}" class="${item.active ? styles.active : ''} ${styles.sidebarOptions}">
        <button type="button">${item.name}</button>
        <i class="${icons[ind]} ${styles.sidebarIcons}"></i>
      </li>
    `).join('')}
    <li id="logout" class="${styles.sidebarOptions}">
      <button type="button">Logout</button>
      <i class="fa-solid fa-arrow-right-from-bracket ${styles.sidebarIcons}"></i>
    </li>
  </ul>
</aside>
  `;

  const logic = () => {
    data.forEach(({ href, icon, label }) => {
      document.getElementById(href).addEventListener('click', () => {
        navigateTo(href);
      });
    });
  
    const backBtn = document.getElementById('backBtn');
    backBtn.addEventListener('click', () => {
      const bigContainer = document.getElementById('bigContainer');
      const sidebar = document.getElementById('sidebar');
      console.log(sidebar.style.left);

      if (sidebar.style.left == '0px') {
        sidebar.style.left = '-135px';
        bigContainer.style.gridTemplateColumns = '60px 1fr';
        backBtn.style.transform = 'rotate(1.5turn)';
      } else {
        sidebar.style.left = '0px';
        bigContainer.style.gridTemplateColumns = '200px 1fr';
        backBtn.style.transform = 'rotate(0turn)';
      }
    })
  }

  return {
    pageContent,
    logic
  };
}