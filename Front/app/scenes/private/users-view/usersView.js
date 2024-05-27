import styles from './usersView.css';
import background from '../../../assets/backgroundUsers.jpg'
import fire from '../../../assets/fire-icon.png'
import rocket from '../../../assets/rocket.gif';
import goku from '../../../assets/goku.jpeg';


export function UserView() {
    const theUser = JSON.parse(localStorage.getItem('user'));
    const nameUser = theUser.username
    const pageContent = `
    <div class="${styles["container"]}">
        <div class="${styles["content"]}">
            <div class="${styles["left-colum"]}">
                <div class="${styles["left-colum-picture"]}">
                    <img src="${goku}" alt="profile picture">
                </div>
                <div class="${styles["left-colum-info"]}">
                    <h2>${theUser.username}</h2>
                    <h3>Tu usuario</h3>
                </div>
            </div>
            <div class="${styles["center-colum"]}">
                <h2>Hola ${theUser.username}, bienvenido a la vista de tu perfil</h2>
                <p>Nombre de usuario: ${theUser.username}</p>
                <p>Correo: ${theUser.email}</p>
                <p>Fecha de creación del perfil: ${theUser.createdAt}</p>
                <p>Ultimo acceso: ${theUser.updatedAt}</p>
            </div>
            <div class="${styles["right-colum"]}">
                <div class="${styles["right-colum-icon"]}">
                    <img src="${fire}" alt="fire icon"/>
                </div>
                <div class="${styles["info-points"]}">
                    <h2>Tus puntos</h2>
                    <p>${theUser.points}</p>
                    <h2>Tu nivel</h2>
                    <p>${theUser.level}</p>
                </div>
            </div>
        </div>
    </div>

    `; //Aqui va el html
    const logic = () => {
        console.log( theUser);
        console.log(nameUser);
        //Aqui va la logica de JS
    }
    return {
        pageContent,
        logic
    }
}