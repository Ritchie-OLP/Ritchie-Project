import styles from './challenge2.css';
import background from '../../../assets/images/fondo.jpg';
import readme from '../../../assets/images/README.png'
import watching from '../../../assets/images/WATCHING.png'
import trueFalse from '../../../assets/images/TRUE_FALSE.png'
import tryConsole from '../../../assets/images/TRY_CONSOLE.png'
import game from '../../../assets/images/GAME.png'

export function ChallengeScene2(params) {

    const readmeString = "Hello, I’m Coderman, your ninja guide! Today, I'll accompany you on this wonderful learning journey. Click on me to unlock a new skill! Complete this mission and you'll earn 10 ninja points.";

    const watchingString = "Hey, great to see you again! Now we're diving into a video full of wisdom. Click on me and you'll be one step closer to becoming a tech sage. Complete this task and you'll earn 20 ninja points.";

    const trueFalseString = "Awesome, you've made it this far! Now you have the knowledge to take on this fun challenge and show what you've learned. If you get it right on the first try, you'll earn 30 ninja points. Good luck!";

    const tryConsoleString = "Congratulations, you're almost a ninja genius! Now let's try writing some lines of code to dive deeper into this world full of challenges and learning. Complete this task and you'll earn 20 ninja points.";

    const gameString = "Oh, we've reached the end of this module! But don't worry, you'll keep gaining new knowledge. Now, let's have some fun with a hangman game where you'll guess a word related to what you've learned. If you get it right on the first try, you'll earn 50 ninja points. Good luck, and may the code be with you!";

    const arrayNinjas = [readme,watching,trueFalse,tryConsole,game];

    const arrayStrings = [readmeString, watchingString, trueFalseString, tryConsoleString, gameString];

    const moduleId = params.get('id');
    console.log(moduleId);

    const pageContent = `
        <div class="${styles.newPage}" id="container"></div>
    `;

    const logic = async() => {
        const resp = await fetch(`http://localhost:4000/api/modules/${moduleId}`,{
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
        <h2 class="${styles.title} ${styles.fontTitles}">${response.name}</h2>
            <div class="${styles.imageBackground}">
                <div class="${styles.emptyDiv}"></div>
                <img src=${background} alt="background-image">
            </div>

            <div>
                ${
                arrayNinjas.map((ninja,idx) => {
                    return `
                        <div class=${styles.containerChallenge}>

                            <img src=${ninja} alt="ninja" class=${styles.challengeImage}>
                            <p class=${styles.stringNinja}>${arrayStrings[idx]}</p>

                        </div>
                    
                    
                    `

                  })
                }
            </div>
            
        `;

        setTimeout(function () {
            containerPage.style.clipPath = 'circle(100% at center)';
        }, 15);



    };

    return {
        pageContent,
        logic
    };
}
