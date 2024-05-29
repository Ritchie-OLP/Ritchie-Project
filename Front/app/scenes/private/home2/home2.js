import styles from './home2.css';

export function Home2Scene(){

    const pageContent = `
    
    <div id class=${styles.container}>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt culpa natus quo, libero nisi cumque, modi similique earum excepturi at architecto officia! Labore repudiandae, ab dicta possimus porro illum tempora.
        Aliquid iure sint maxime, soluta, dolore quaerat facilis voluptate atque maiores nihil repellat quisquam, nesciunt sapiente fugit totam illo minus tempore! Officiis doloribus esse similique facere. Sunt vitae quos eos!
        Vero neque animi nam expedita? Architecto tenetur voluptatibus vitae, animi reprehenderit, ex expedita similique tempora deleniti labore obcaecati. Laborum qui aliquam ducimus fuga sequi neque? Obcaecati ipsam esse nulla vitae.
        Recusandae minus modi molestias? Nobis exercitationem ducimus, ipsam, molestias ipsum, et beatae cumque quis nostrum quibusdam illum repudiandae maxime aperiam culpa necessitatibus? Iure, delectus. Eos velit repudiandae maiores saepe inventore?
        </p>
    </div>

        <!-- Modal para Crear Lenguaje -->
    <div id="modalLenguaje" class="${styles.modal}">
        <div class="${styles['modal-content']}">
            <span class="${styles.close}">&times;</span>
            <h2>Crear Lenguaje</h2>
            <form id="crearLenguajeForm">
                <label for="nombreLenguaje">Nombre del lenguaje</label>
                <input type="text" id="nombreLenguaje" name="name" placeholder="Nombre del lenguaje">
                <label for="lenguajeImage">Img</label>
                <input type="text" id="lenguajeImage" name="image" placeholder="URL de la imagen">
                <button type="submit" id="submitLenguajeBtn">Crear Lenguaje</button>
            </form>
        </div>
    </div>
    
    `
   
//     const logic = async () => {
//         // Obtener el ID de la ruta desde el path de la URL
//         const routeId = window.location.search.split('=')[1];
    
//         const modalLenguaje = document.getElementById('modalLenguaje')
//         const btnCrearLenguaje = document.getElementById('crearLenguajeBtn')
//         const spanCerrarModal = modalLenguaje.querySelector(`.${styles.close}`)
//         const submitBtnCrearLenguaje = document.getElementById('submitLenguajeBtn')
    
//         btnCrearLenguaje.onclick = function (event) {
//             event.preventDefault();
//             modalLenguaje.style.display = 'block';
//         };
    
//         spanCerrarModal.onclick = function () {
//             modalLenguaje.style.display = 'none';
//         };
    
//         window.onclick = function (event) {
//             if (event.target === modalLenguaje) {
//                 modalLenguaje.style.display = 'none';
//             }
//         };
    
//         submitBtnCrearLenguaje.onclick = async function (event) {
//             event.preventDefault();
    
//             const nombreLenguajeInput = document.getElementById('nombreLenguaje');
//             const imageInput = document.getElementById('lenguajeImage');
    
//             const nombreLenguaje = nombreLenguajeInput.value;
//             const image = imageInput.value;
    
//             const newLenguaje = {
//                 name: nombreLenguaje,
//                 route_id: routeId,
//                 image: image
//             };
    
//             try {
//                 const response = await fetch('http://localhost:3000/lenguajes', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(newLenguaje)
//                 });
    
//                 if (response.ok) {
//                     alert('Lenguaje creado con éxito');
//                     modalLenguaje.style.display = 'none';
//                 } else {
//                     alert('Error al crear el lenguaje');
//                 }
//             } catch (error) {
//                 console.error('Error al crear el lenguaje:', error);
//                 alert('Error al crear el lenguaje');
//             }
//         };
//     };
    
// }


export function Home3Scene() {
    const pageContent = `
    
    <div id class=${styles.container}>

        <!-- Modal para Crear Módulo -->
    <div id="modalModulo" class="${styles.modal}">
        <div class="${styles['modal-content']}">
            <span class="${styles.close}">&times;</span>
            <h2>Crear Módulo</h2>
            <form id="crearModuloForm">
                <label for="nombreModulo">Nombre del módulo</label>
                <input type="text" id="nombreModulo" name="name" placeholder="Nombre del módulo">
                <label for="contenidoModulo">Contenido</label>
                <textarea id="contenidoModulo" name="content" placeholder="Contenido del módulo"></textarea>
                <label for="moduloImage">Img</label>
                <input type="text" id="moduloImage" name="image" placeholder="URL de la imagen">
                <button type="submit" id="submitModuloBtn">Crear Módulo</button>
            </form>
        </div>
    </div>
    `

    const logic = async () => {
        // Obtener el ID del lenguaje desde el path de la URL
        const urlParams = new URLSearchParams(window.location.search)
        const languageId = urlParams.get('id')
    
        const modalModulo = document.getElementById('modalModulo')
        const btnCrearModulo = document.getElementById('crearModuloBtn')
        const spanCerrarModal = modalModulo.querySelector(`.${styles.close}`)
        const submitBtnCrearModulo = document.getElementById('submitModuloBtn')
    
        btnCrearModulo.onclick = function (event) {
            event.preventDefault();
            modalModulo.style.display = 'block'
        };
    
        spanCerrarModal.onclick = function () {
            modalModulo.style.display = 'none'
        };
    
        window.onclick = function (event) {
            if (event.target === modalModulo) {
                modalModulo.style.display = 'none'
            }
        }
    
        submitBtnCrearModulo.onclick = async function (event) {
            event.preventDefault();
    
            const nombreModuloInput = document.getElementById('nombreModulo');
            const contenidoModuloInput = document.getElementById('contenidoModulo');
            const imageInput = document.getElementById('moduloImage');
    
            const nombreModulo = nombreModuloInput.value;
            const contenido = contenidoModuloInput.value;
            const image = imageInput.value;
    
            const newModulo = {
                name: nombreModulo,
                content: contenido,
                language_id: languageId,
                image: image
            };
    
            try {
                const response = await fetch('http://localhost:3000/modulos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newModulo)
                });
    
                if (response.ok) {
                    alert('Módulo creado con éxito');
                    modalModulo.style.display = 'none';
                } else {
                    alert('Error al crear el módulo');
                }
            } catch (error) {
                console.error('Error al crear el módulo:', error);
                alert('Error al crear el módulo');
            }
        };
    };
    
    return {
        pageContent,
        logic
    }
}


