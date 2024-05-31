import styles from './challenge2.css';
import background from '../../../assets/images/fondo.jpg';
import readme from '../../../assets/images/README.png'
import watching from '../../../assets/images/WATCHING.png'
import game from '../../../assets/images/GAME.png'
import hangMan1 from '../../../assets/images/hangman1.png'
import hangMan2 from '../../../assets/images/hangman2.png'
import hangMan3 from '../../../assets/images/hangman3.png'
import hangMan4 from '../../../assets/images/hangman4.png'
import hangMan5 from '../../../assets/images/hangman5.png'
import hangMan6 from '../../../assets/images/hangman6.png'
import hangMan7 from '../../../assets/images/hangman7.png'


export function ChallengeScene2(params) {

    const readmeString = "Hello, I’m Coderman, your ninja guide! Today, I'll accompany you on this wonderful learning journey. Click on me to unlock a new skill!";

    const watchingString = "Hey, great to see you again! Now we're diving into a video full of wisdom. Click on me and you'll be one step closer to becoming a tech sage.";

    const gameString = "To finish this module, let's have some fun with a hangman game. If you get it right on the first try, you'll earn 30 ninja points";

    const arrayNinjas = [readme,watching,game];

    const arrayStrings = [readmeString, watchingString,gameString];

    const moduleId = params.get('id');
    console.log(moduleId);

    const pageContent = `
        <div class="${styles.newPage}" id="container"></div>
        <div></div>
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

        containerPage.innerHTML = `
        <h2 class="${styles.title} ${styles.fontTitles}">${response.name}</h2>
            <div class="${styles.generalChallenges}">
                ${
                arrayNinjas.map((ninja,idx) => {
                    return `
                        <div class="${styles.containerChallenge} text" id="container${idx + 1}">
                            <div class="${styles.containerCards}">
                                    <img src=${ninja} alt="ninja" class="${styles.ninjaImages}">
                                 <div>
                                    <p class="${styles.stringNinja} ${styles. stringNinjaPosition}">${arrayStrings[idx]}</p>
                                 </div>
                            </div>
                        </div>
                    `

                  }).join()
                }
            </div>

        `;

        const modal1 = document.createElement('DIV')
        const modal2 = document.createElement('DIV')
        const modal3 = document.createElement('DIV')
        modal1.classList.add(styles.modal1)
        modal2.classList.add(styles.modal2)
        modal3.classList.add(styles.modal3)

        containerPage.append(modal1,modal2,modal3)



        const arrayModals = [modal1,modal2,modal3]

        setTimeout(function () {
            containerPage.style.clipPath = 'circle(100% at center)';
        }, 20);



        document.querySelectorAll(".text").forEach((image,idx) => {
            image.addEventListener('click', (e) => {
                e.preventDefault();
                const modal = arrayModals[idx];
                modal.style.clipPath = 'circle(100% at center)';


            });


        });


        arrayModals.forEach(modal =>{

            modal.innerHTML = `
                <input type="button" class="${styles.buttonClose} close" value="X" id="buttonClose">
            `

            document.querySelectorAll(".close").forEach(button => {
                button.addEventListener('click', (e)=>{
                    e.preventDefault();
                    modal.style.clipPath = 'circle(0% at center)';
                    modal.style.transition = 'clip-path 1s ease-in-out';
                })

            });

        });

        modal1.insertAdjacentHTML('beforeend', `
        <div class=${styles.containerModal1}>
            <p>
                ${response.content}
            </p>
        </div>
        `);

        modal2.insertAdjacentHTML('beforeend', `
            <div class=${styles.containerModal2}>
                <div class=${styles.containerVideo}>${response.video}</div>
            </div>
        
        `);

        modal3.insertAdjacentHTML('beforeend', `
        
            <div class=${styles.containerModal3}>

                <div class=${styles.colum}>
                    <h2>Welcome to Hangman Game</h2>
                    <p id="hiddenWord" class=${styles.pHiddenWord}></p>
                    <div id="containerAbc" class=${styles.boxABC}></div>
                    <br>
                </div>

                <div class=${styles.colum2}>
                    <div class=${styles.hangMan}>
                        <img src=${hangMan1} alt="hangMan" id="imageHangMan">
                    </div>
                </div>
            
            
            </div>
    
        
        `);

        const showAlert = (message)=> {
            alert(message);

        }

       


        let gameWon = 0
        let gameLost = 0
        const containerABC = document.getElementById('containerAbc')
        const arrayLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"]
        containerABC.innerHTML = `
            ${arrayLetters.map((letter) => {
                return `
                    <div class="${styles.containerLetter} containerBoxLetter">
                        <p class=${styles.pLetter}>
                            ${letter.toLocaleUpperCase()}
                        </p>
                    
                    </div>
                
                `

            })}
        `
        let letter = ""
        document.querySelectorAll('.containerBoxLetter').forEach( (boxLetter,idx) => {

            boxLetter.addEventListener('click', (e) => {
                e.preventDefault();
                letter = arrayLetters[idx];
                console.log(letter);
                evaluateWord();
            });

        });
      

        const replaceAt = (string, character, index) => {
            return string.substring(0, index) + character + string.substring(index + character.length);
        };

        const imageHangMan = document.getElementById('imageHangMan')
        console.log(imageHangMan);

        let stringHangMan = response.hang_word
        console.log(stringHangMan, 'hang_word');
        console.log();

        let arrayWords = [];
        if(!stringHangMan){
            arrayWords = ["software","javascript","methods","frontend","language","backend"];
        }else{
            arrayWords = stringHangMan.split(",");
        }

        console.log(arrayWords);

        console.log(arrayWords);

        let secretWord = arrayWords[Math.floor(Math.random() * arrayWords.length)];
        console.log(secretWord)
        let hiddenWord = secretWord.replace(/./g,"_ ");
        // alert(hiddenWord)
        document.getElementById('hiddenWord').innerHTML = hiddenWord;
        let errorCounter = 0;
        const evaluateWord = async () => {

     
            let error = true;

            const resetGame = () => {
                errorCounter = 0;
                secretWord = arrayWords[Math.floor(Math.random() * arrayWords.length)];
                hiddenWord = secretWord.replace(/./g, "_ ");
                document.getElementById('hiddenWord').innerHTML = hiddenWord;
                imageHangMan.src = hangMan1;
            };

            for(let i = 0; i < secretWord.length; i++){

                if(secretWord[i] === letter){
                    hiddenWord = replaceAt(hiddenWord, letter, i * 2);
                    error = false;
                };
            };
            document.getElementById('hiddenWord').innerHTML = hiddenWord;
                    
            if(error){    
                errorCounter++;
                if(errorCounter === 1){
                    imageHangMan.src = hangMan2;
                }else if(errorCounter === 2){
                    imageHangMan.src = hangMan3;
                }else if(errorCounter === 3){
                    imageHangMan.src = hangMan4;
                }else if(errorCounter === 4){
                    imageHangMan.src = hangMan5;
                }else if(errorCounter === 5){
                    imageHangMan.src = hangMan6;
                }else{
                    imageHangMan.src = hangMan7;
                    setTimeout(() => {
                        showAlert(`¡Sorry! \n You lost the game\n The right word was ${secretWord}`);
                    resetGame();
                    },300)
                    gameLost++
                    return;
                }
            };

            if(!hiddenWord.includes("_")){
                setTimeout(() => {
                    showAlert(`¡Congratulation! '\n You won the game`);
                    resetGame();
                },300)
                gameWon++
                
                let awardedPoints = 0

                console.log("intentos" + gameWon);
                if(gameWon === 1 && gameLost === 0){
                    awardedPoints = 30
                }

                const userBefore = JSON.parse(localStorage.getItem('user'));
                userBefore.points += awardedPoints;
                localStorage.setItem('user',JSON.stringify(userBefore));

                const userAfter = JSON.parse(localStorage.getItem('user'));
                let totalPoints = userAfter.points;
                console.log(totalPoints);

                let idUser = JSON.parse(localStorage.getItem('user')).id;
                await fetch(`http://localhost:4000/api/users/points/${idUser}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        points: totalPoints
                    })


                });

            };

          

        };
    };

    return {
        pageContent,
        logic
    };
}
