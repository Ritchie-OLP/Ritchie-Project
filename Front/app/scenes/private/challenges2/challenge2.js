import styles from './challenge2.css';
import background from '../../../assets/images/background_modules.jpg';

export function ChallengeScene2(params) {
    const moduleId = params.get('id');

    const pageContent = `
        <div class="${styles.newPage}" id="container"></div>
    `;

    const logic = async() => {
        const resp = await fetch(`http://localhost:4000/api/challenges/getallchallenges`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        const response = await resp.json()
        console.log(response);

        const containerPage = document.getElementById('container');

        // Apply initial styles and then start the transition
        containerPage.innerHTML = `
            <div class="${styles.imageBackground}">
                <div class="${styles.emptyDiv}"></div>
                <img src=${background} alt="background-image">
            </div>

            <h1 class=${styles.title}>Hola a todos desde ${response.name}</h1>
        `;

        setTimeout(function () {
            containerPage.style.clipPath = 'circle(100% at center)';
        }, 30);
    };

    return {
        pageContent,
        logic
    };
}
