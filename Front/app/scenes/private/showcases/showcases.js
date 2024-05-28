export function Showcases() {
  const pageContent = `
    <h3>Bienvenidos a mi pagina de destacados</h3>
    <button id="my-btn"><a href="/dashboard/console-html">Ir a la consola de HTML</a></button>
    <button id="my-btn"><a href="/dashboard/console-css">Ir a la consola de CSS</a></button>
    <button id="my-btn"><a href="/dashboard/console-all">Ir a la consola de HTML, CSS Y JS</a></button>
    <button id="my-btn"><a href="/dashboard/console-js">Ir a la consola de JS</a></button>
  `;

  const logic = () => {
    
  }

  return {
    pageContent,
    logic
  }
}