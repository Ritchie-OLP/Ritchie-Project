import { navigateTo } from "../../../../Router";
import { logOut } from "../../../../helpers";
import { NavigationBar } from "../../../navigation-bar/navigation-bar";
import { SidebarMenu } from "../../../sidebar-menu/sidebar-menu";
import { Footer } from "../../../footer";
import userIcon from "../../../../assets/images/user-icon.png";
import styles from './dashboard-layout.css';
const theUser = JSON.parse(localStorage.getItem('user'));

export function DashboardLayout(pageContent, logic, navbarData,) {

  // hace la peticion al backend.

  const root = document.getElementById('root');

  navbarData = {
    user: JSON.parse(localStorage.getItem('user')).username,
    userImage: userIcon,
  };

  const sidebar = SidebarMenu();
  const navbar = NavigationBar(navbarData);
  const footer = Footer();

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
        
      <div class="${styles.footer}">
      ${footer.pageContent}
    </div>
      </div>
    </div>
  </div>
  `;

  footer.logic();
  sidebar.logic();
  navbar.logic();
  logic();
  document.getElementById('logout').addEventListener('click', logOut);
}