import styles from './sidebar-menu.css';
import { navigateTo } from "../../Router";
import userIcon from "../../assets/images/user-icon.png";

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
  <aside id="sidebar-main" class="${styles["sidebar-menu"]}">
  <ul>
    <li class="${styles.backButton} ${styles.backButtonTwo}">
      <p>${JSON.parse(localStorage.getItem('user')).username}</p>
      <img src="${userIcon}" alt="User image">
    </li>
    <li class="${styles.backButton} ${styles.backButtonOne}"><i id="backBtn" class="fa-solid fa-circle-arrow-left"></i></li>
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

    document.addEventListener('DOMContentLoaded', function () {
      const sidebar = document.getElementById('sidebar-main');
      sidebar.style.left = '0px'; // Set initial left value
    });
  
    const backBtn = document.getElementById('backBtn');
    const sidebar = document.getElementById('sidebar-main');
    sidebar.style.left = '0px';
    backBtn.addEventListener('click', () => {
      console.log(sidebar.style.left);

      if (sidebar.style.left == '0px') {
        sidebar.style.left = '135px';
        backBtn.style.transform = 'rotate(0turn)';
      } else {
        sidebar.style.left = '0px';
        backBtn.style.transform = 'rotate(1.5turn)';
      }
    })
  }

  return {
    pageContent,
    logic
  };
}