import styles from './challenge.css'

export function ChallengeScene() {
    let pageContent = `
    <div class="${styles.navbar}">
        <div class="${styles['left-nav']}">
            <a href="#">Compilador JavaScript</a>
            <a href="#" id="proponerRetoBtn">Proponer retos</a>
        </div>
    </div>
    <div class="${styles.content}">
        <div class="${styles.retos}">
            <h2>Retos</h2>
            <div class="${styles.reto}">
                <span>Nombre reto</span>
                <span class="${styles.completado}">Completado</span>
                <span>(Dificultad)</span>
            </div>
            <div class="${styles.reto}">
                <span>Nombre reto</span>
                <span class="${styles.completado}">Completado</span>
                <span>(Dificultad)</span>
            </div>
            <div class="${styles.reto}">
                <span>Nombre reto</span>
                <span class="${styles['no-completado']}">No completado</span>
                <span>(Dificultad)</span>
            </div>
            <!-- Añadir más retos según sea necesario -->
        </div>
        <div class="${styles.filtros}">
            <h2>Filtros</h2>
            <div>
                <h3>Tipos de datos</h3>
                <label><input type="checkbox"> Number</label>
                <label><input type="checkbox"> Strings</label>
                <label><input type="checkbox"> Boolean</label>
            </div>
            <div>
                <h3>Métodos</h3>
                <label><input type="checkbox"> Objetos</label>
                <label><input type="checkbox"> Strings</label>
                <label><input type="checkbox"> Array</label>
            </div>
            <div>
                <h3>Dificultad</h3>
                <label><input type="checkbox"> Fácil</label>
                <label><input type="checkbox"> Medio</label>
                <label><input type="checkbox"> Difícil</label>
            </div>
        </div>
    </div>
    <div id="myModal" class="${styles.modal}">
        <div class="${styles['modal-content']}">
            <span class="${styles.close}">&times;</span>
            <h2>Propuesta reto</h2>
            <label for="name">Nombre</label>
            <input type="text" id="name" name="name" placeholder="John Doe">

            <label for="email">Correo</label>
            <input type="email" id="email" name="email" placeholder="johndoe@example.com">

            <label for="finalidad">Finalidad del reto</label>
            <textarea id="finalidad" name="finalidad">Con este reto se busca Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec sem in justo. Nullam in felis eu.</textarea>

            <label for="tipo-reto">Tipo de reto</label>
            <input type="text" id="tipo-reto" name="tipo-reto" placeholder="CSS, HTML, JavaScript" class="full-width">

            <label for="reto">Reto</label>
            <textarea id="reto" name="reto">Aqui va la informacion del reto Ejemplo: En este reto vas a utilizar toLowercase, un metodo de strings</textarea>

            <label for="resuelto">Reto resuelto</label>
            <textarea id="resuelto" name="resuelto">Llenar este espacio con la informacion del reto resuelto</textarea>

            <button id="submitBtn">Enviar información</button>
        </div>
    </div>
    <div class="${styles.loader}" id="loader"></div>
    `

    let logic = () => {
        // Obtener el modal
        const modal = document.getElementById("myModal")

        // Botón para cerrar el modal
        const span = modal.querySelector(`.${styles.close}`)

        // Botón para abrir el modal
        const btn = document.getElementById("proponerRetoBtn")

        // Abrir el modal
        btn.onclick = function (event) {
            event.preventDefault()
            modal.style.display = "block"
        };

        // Cerrar el modal
        span.onclick = function () {
            modal.style.display = "none";
        };

        // Cerrar el modal cuando se hace clic fuera del contenido del modal
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none"
            }
        }
    }

    return {
        pageContent,
        logic
    }
}
