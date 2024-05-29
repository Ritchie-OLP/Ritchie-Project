import { navigateTo } from "../../../../Router";
import { logOut } from "../../../../helpers";
import { NavigationBar } from "../../../navigation-bar/navigation-bar";
import { SidebarMenu } from "../../../sidebar-menu/sidebar-menu";
import styles from './dashboard-layout.css';

export function DashboardLayout(pageContent, logic, footer, navbarData,) {

  // hace la peticion al backend.

  const root = document.getElementById('root');

  navbarData = {
    user: JSON.parse(localStorage.getItem('user')).username,
    userImage: 'https://randomuser.me/api/portraits/men/75.jpg',
  };

  const sidebar = SidebarMenu();

  root.innerHTML = `
  <div id="bigContainer" class="${styles.container}">
    <div id="sidebar" class="${styles.sidebar}">
      ${sidebar.pageContent}
    </div>
    <div class="${styles.navbar}">
      ${NavigationBar(navbarData)}
    </div>
    <div class="${styles.main}">
      ${pageContent}
    </div>
  </div>
  `;

  sidebar.logic();
  logic();
  document.getElementById('logout').addEventListener('click', logOut);
}