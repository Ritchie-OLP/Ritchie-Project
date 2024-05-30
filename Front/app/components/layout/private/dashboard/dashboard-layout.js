import { navigateTo } from "../../../../Router";
import { logOut } from "../../../../helpers";
import { NavigationBar } from "../../../navigation-bar/navigation-bar";
import { SidebarMenu } from "../../../sidebar-menu/sidebar-menu";
import userIcon from "../../../../assets/images/user-icon.png";
import styles from './dashboard-layout.css';

export function DashboardLayout(pageContent, logic, footer, navbarData,) {

  // hace la peticion al backend.

  const root = document.getElementById('root');

  navbarData = {
    user: JSON.parse(localStorage.getItem('user')).username,
    userImage: userIcon,
  };

  const sidebar = SidebarMenu();
  const navbar = NavigationBar(navbarData);

  root.innerHTML = `
  <div id="bigContainer" class="${styles.container}">
    <div class="${styles.navbar}">
      ${navbar.pageContent}
    </div>
    <div class="${styles.mainContent}">
      <div id="sidebar" class="${styles.sidebar} ${styles.mainElement}">
        ${sidebar.pageContent}
      </div>
      <div class="${styles.main} ${styles.mainElement}">
        ${pageContent}
      </div>
    </div>
  </div>
  `;

  sidebar.logic();
  navbar.logic();
  logic();
  document.getElementById('logout').addEventListener('click', logOut);
}