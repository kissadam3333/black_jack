
const startButton = document.querySelector('.start-button');
startButton.addEventListener('click', () => {
    startButton.parentElement.style.display = "none";
    document.querySelector('.gameDisplay').style.visibility = 'visible';
    gameLogic()
})

//helper functions
function showImg(src, id = '#images-player') {
    let img = document.createElement("img");
    img.src = `./cardsImg/${src}.svg`;
    document.querySelector(id).appendChild(img);
    return img;
}
function selectRandom(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    let temp = array[randomIndex];
    array.splice(randomIndex, 1);
    return temp;
}
function pointAndAceCalculation(storedValuesArray) {
    let points = 0;
    for (let i = 0; i < storedValuesArray.length; i++) {
        points += storedValuesArray[i].value;
    }

    for (let i = 0; i < storedValuesArray.length; i++) {
        if (points > 21 && storedValuesArray[i].value === 11) {
            storedValuesArray[i].value = 1;
            points -= 10;
        }
    }
    return points;

}
function playerLose() {
    document.querySelector('.hit-button').style.display = 'none';
    document.querySelector('.stay-button').style.display = 'none';
    document.querySelector('hr').style.visibility = 'hidden';
    document.querySelector('.lost-or-won').style.display = 'block';
    let restart = document.querySelector('.restart')
    restart.style.display = 'block';

    let timeCounter = 10;
    const interval = setInterval(() => {
        timeCounter--;
        if (timeCounter === 0) {
            clearInterval(interval);
            location.reload();
        }
        restart.textContent = `restart in ${timeCounter} seconds`

    }, 1000);
}
function playerWin() {
    document.querySelector('.hit-button').style.display = 'none';
    document.querySelector('.stay-button').style.display = 'none';
    document.querySelector('hr').style.visibility = 'hidden';

    let lostOrWon = document.querySelector('.lost-or-won')
    lostOrWon.style.display = 'block';
    lostOrWon.style.color = '#339933';
    lostOrWon.textContent = 'YOU WON'


    let restart = document.querySelector('.restart')
    restart.style.display = 'block';
    restart.style.color = '#339933';

    let timeCounter = 10;
    const interval = setInterval(() => {
        timeCounter--;
        if (timeCounter === 0) {
            clearInterval(interval);
            location.reload();
        }
        restart.textContent = `restart in ${timeCounter} seconds`

    }, 1000);
}
function changeBackCard(src) {
    let img = document.createElement("img");
    img.src = `./cardsImg/${src}.svg`;
    return img;
}


function gameLogic() {
    const cards = [
        { name: 'Ace of clubs', value: 11 },
        { name: '2 of clubs', value: 2 },
        { name: '3 of clubs', value: 3 },
        { name: '4 of clubs', value: 4 },
        { name: '5 of clubs', value: 5 },
        { name: '6 of clubs', value: 6 },
        { name: '7 of clubs', value: 7 },
        { name: '8 of clubs', value: 8 },
        { name: '9 of clubs', value: 9 },
        { name: '10 of clubs', value: 10 },
        { name: 'Jack of clubs', value: 10 },
        { name: 'Queen of clubs', value: 10 },
        { name: 'King of clubs', value: 10 },

        { name: 'Ace of diamonds', value: 11 },
        { name: '2 of diamonds', value: 2 },
        { name: '3 of diamonds', value: 3 },
        { name: '4 of diamonds', value: 4 },
        { name: '5 of diamonds', value: 5 },
        { name: '6 of diamonds', value: 6 },
        { name: '7 of diamonds', value: 7 },
        { name: '8 of diamonds', value: 8 },
        { name: '9 of diamonds', value: 9 },
        { name: '10 of diamonds', value: 10 },
        { name: 'Jack of diamonds', value: 10 },
        { name: 'Queen of diamonds', value: 10 },
        { name: 'King of diamonds', value: 10 },

        { name: 'Ace of hearts', value: 11 },
        { name: '2 of hearts', value: 2 },
        { name: '3 of hearts', value: 3 },
        { name: '4 of hearts', value: 4 },
        { name: '5 of hearts', value: 5 },
        { name: '6 of hearts', value: 6 },
        { name: '7 of hearts', value: 7 },
        { name: '8 of hearts', value: 8 },
        { name: '9 of hearts', value: 9 },
        { name: '10 of hearts', value: 10 },
        { name: 'Jack of hearts', value: 10 },
        { name: 'Queen of hearts', value: 10 },
        { name: 'King of hearts', value: 10 },

        { name: 'Ace of spades', value: 11 },
        { name: '2 of spades', value: 2 },
        { name: '3 of spades', value: 3 },
        { name: '4 of spades', value: 4 },
        { name: '5 of spades', value: 5 },
        { name: '6 of spades', value: 6 },
        { name: '7 of spades', value: 7 },
        { name: '8 of spades', value: 8 },
        { name: '9 of spades', value: 9 },
        { name: '10 of spades', value: 10 },
        { name: 'Jack of spades', value: 10 },
        { name: 'Queen of spades', value: 10 },
        { name: 'King of spades', value: 10 },
    ];
    const playerValues = [];
    const bankValues = [];

    const randomPlayerCard1 = selectRandom(cards);
    showImg(randomPlayerCard1.name);

    const randomPlayerCard2 = selectRandom(cards);
    showImg(randomPlayerCard2.name);

    const backSideCardNode = showImg('back side', '#images-bank');//back card
    const randomBankCard1 = selectRandom(cards);
    showImg(randomBankCard1.name, '#images-bank');

    playerValues.push(randomPlayerCard1, randomPlayerCard2);
    bankValues.push(randomBankCard1);

    console.log(bankValues);
    document.querySelector('.bank-points').textContent = `Bank's Points: ${pointAndAceCalculation(bankValues)}`;
    document.querySelector('.your-points').textContent = `Your Points: ${pointAndAceCalculation(playerValues)}`;

    //HIT
    const hitButton = document.querySelector('.hit-button');
    hitButton.addEventListener('click', () => {
        const randomCard = selectRandom(cards);
        playerValues.push(randomCard);
        showImg(randomCard.name);
        const playerPoints = pointAndAceCalculation(playerValues);
        document.querySelector('.your-points').textContent = `Your Points: ${playerPoints}`;
        if (playerPoints > 21) playerLose();
    })

    //STAY
    const stayButton = document.querySelector('.stay-button');
    stayButton.addEventListener('click', async () => {
        const timer = ms => new Promise(resolve => setTimeout(resolve, ms))

        let randomBankCard2 = selectRandom(cards);
        backSideCardNode.replaceWith(changeBackCard(randomBankCard2.name));
        bankValues.push(randomBankCard2);

        let playerPoints = pointAndAceCalculation(playerValues);
        let bankPoints = pointAndAceCalculation(bankValues);
        document.querySelector('.bank-points').textContent = `Bank's Points: ${bankPoints}`;
        await timer(1000);



        while (bankPoints < 17) {
            await timer(500);
            const randomCard = selectRandom(cards);
            bankValues.push(randomCard);
            bankPoints = pointAndAceCalculation(bankValues);
            showImg(randomCard.name, '#images-bank');
            document.querySelector('.bank-points').textContent = `Bank's Points: ${bankPoints}`;
        }

        await timer(1000);
        if (bankPoints > 21) {
            playerWin();
        } else if (playerPoints > bankPoints) {
            playerWin();
        } else if (bankPoints > playerPoints) {
            playerLose();
        } else {
            playerLose();
        }



    })

}