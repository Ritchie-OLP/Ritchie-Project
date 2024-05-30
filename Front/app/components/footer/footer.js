import ig from '../../assets/iconos/icono-ig.png'
import facebook from '../../assets/iconos/facebook.png'
import twitter from '../../assets/iconos/twitter.png'
import riwi from '../../assets/iconos/riwi.svg'
import styles from './footer.css';

export function Footer () {

    const pageContent = `
    <footer class="${styles.footer}">
        <div class="${styles["footer-container"]}">
        
        <!-- Social Media Section -->
        <div class="${styles["footer-social"]}">
            <a href="https://facebook.com" target="_blank" class="${styles["footer-social-link"]}">
            <img src="${facebook}" alt="Facebook" class="${styles["footer-social-icon"]}">
            </a>
            <a href="https://twitter.com" target="_blank" class="${styles["footer-social-link"]}">
            <img src="${twitter}" alt="Twitter" class="${styles["footer-social-icon"]}">
            </a>
            <a href="https://www.instagram.com/" target="_blank" class="${styles["footer-social-link"]}">
            <img src="${ig}" alt="Instagram" class="${styles["footer-social-icon"]}">
            </a>
        </div>
        
        <!-- Partners Section -->
        <div class="${styles["footer-partners"]}">
            <p class="${styles["footer-partners-title"]}">Socios:</p>
            <a href="https://riwi.io/" target="_blank" class="${styles["footer-partners-link"]}">
            <img src="${riwi}" alt="RIWI" class="${styles["footer-partners-logo"]}">
            </a>
        </div>
        
        <!-- Navigation Section -->
        <div class="${styles["footer-nav"]}">
            <ul class="${styles["footer-nav-list"]}">
            <li class="${styles["footer-nav-item"]}">
                <a href="/challenges" class="${styles["footer-nav-link"]}">Challenges</a>
            </li>
            <li class="${styles["footer-nav-item"]}">
                <a href="/learning-paths" class="${styles["footer-nav-link"]}">Rutas de Aprendizaje</a>
            </li>
            <li class="${styles["footer-nav-item"]}">
                <a href="/games" class="${styles["footer-nav-link"]}">Juegos</a>
            </li>
            </ul>
        </div>
        
        </div>
        <div class="${styles["footer-bottom"]}">
        <p>&copy; 2024 Your Learning Code Website. Todos los derechos reservados.</p>
        </div>
    </footer>
`;

    const logic = () => {

    };

    return {
        pageContent,
        logic
    }
}

