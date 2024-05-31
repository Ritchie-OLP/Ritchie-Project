import styles from './showcases.css';

export function Showcases() {
  const pageContent = `
  <div class="${styles.consolesBox}">
    <h3>Bienvenidos a mi pagina de destacados</h3>
    <button id="my-btn"><a href="/dashboard/console-html">Console HTML</a></button>
    <button id="my-btn"><a href="/dashboard/console-css">Console CSS</a></button>
    <button id="my-btn"><a href="/dashboard/console-all">Console HTML, CSS Y JS</a></button>
    <button id="my-btn"><a href="/dashboard/console-js">Console JS</a></button>
  </div>
  `;

  const logic = () => {
    
  }

  return {
    pageContent,
    logic
  }
}