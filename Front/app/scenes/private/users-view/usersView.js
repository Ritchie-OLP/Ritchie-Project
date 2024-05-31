import styles from './usersView.css';
import fire from '../../../assets/fire-icon.png'
import ninja from '../../../assets/images/goku-ninja.jpg';


export function UserView() {
    const theUser = JSON.parse(localStorage.getItem('user'));
    const creationDate = theUser.creationDate.slice(0, 10);
    const pageContent = `
    <div class="${styles["container"]}">
        <div class="${styles["content"]}">
            <div class="${styles["left-colum"]}">
                <div class="${styles["left-colum-picture"]}">
                    <img src="${ninja}" alt="profile picture">
                </div>
                <div class="${styles["left-colum-info"]}">
                    <h2>${theUser.username}</h2>
                    <h3>Your User</h3>
                </div>
            </div>
            <div class="${styles["center-colum"]}">
                <div class="${styles["center-colum-hello"]}">
                    <h2>Hello ${theUser.username}, Welcome To Your Profile</h2>
                </div>
                <div class="${styles["center-colum-info"]}">
                    <p>User Name: ${theUser.username}</p>
                    <p>Email: ${theUser.email}</p>
                    <p>Profile Creation Data: ${creationDate}</p>
                </div>
            </div>
            <div class="${styles["right-colum"]}">
                <div class="${styles["right-colum-icon"]}">
                    <img src="${fire}" alt="fire icon"/>
                </div>
                <div class="${styles["info-points"]}">
                    <h2>Your Points</h2>
                    <p>${theUser.points}</p>
                </div>
            </div>
        </div>
    </div>

    `; //Aqui va el html
    const logic = () => {
        
        //Aqui va la logica de JS
    }
    return {
        pageContent,
        logic
    }
}