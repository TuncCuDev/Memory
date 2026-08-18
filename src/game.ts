import './styles/style.scss'


const CodeImages = [
    "A (1).svg",
    "A (2).svg",
    "A (3).svg",
    "A (4).svg",
    "A (5).svg",
    "A (6).svg",
    "A (7).svg",
    "A (8).svg",
    "A (9).svg",
    "A (10).svg",
    "A (11).svg",
    "A (12).svg",
    "A (13).svg",
    "A (14).svg",
    "A (15).svg",
    "A (16).svg",
    "A (17).svg",
    "A (18).svg",
]

const DAImages = [
    "DA  (1).svg",
    "DA  (2).svg",
    "DA  (3).svg",
    "DA  (4).svg",
    "DA  (5).svg",
    "DA  (6).svg",
    "DA  (7).svg",
    "DA  (8).svg",
    "DA  (9).svg",
    "DA  (10).svg",
    "DA  (11).svg",
    "DA  (12).svg",
    "DA  (14).svg",
    "DA  (15).svg",
    "DA  (16).svg",
    "DA  (17).svg",
    "DA  (18).svg",
]

const theme = localStorage.getItem("theme");
const player = localStorage.getItem("player");
const size = localStorage.getItem("size");
let cardCount = 16;
let matchedPairs = 0;

getCardCount();

let images = theme === "Code vibes theme" ? CodeImages : DAImages;
const pairCount = cardCount / 2;
const selectedImages = images.slice(0, pairCount);
const cards = [...selectedImages, ...selectedImages];
cards.sort(() => Math.random() - 0.5);


function loadTheme() {
    if (theme === "Code vibes theme") {
        document.body.classList.add("theme-code");
    } else if (theme === "DA Projects theme") {
        document.body.classList.add("theme-da");
    }
}

function setStartPlayer() {
    const headerMiddle = document.querySelector(".header-middle");
    if (!headerMiddle) return ;
    if (player === "Blue") {
        headerMiddle.classList.add("blue");
    } else { 
        headerMiddle.classList.add("orange");
    } 
}

function getCardCount() {
    const board = document.querySelector(".game-board");
    switch (size) {
        case "16 cards":
            cardCount = 16;
            board?.classList.add("grid-4x4");
            break;
        case "24 cards":
            cardCount = 24;
            board?.classList.add("grid-6x4");
            break;
        case "36 cards":
            cardCount = 36;
            board?.classList.add("grid-6x6");
            break;
    }
}

function createBoard(cards: string[]) {
    const board = document.querySelector(".game-board");

    if (!board) return;

    board.innerHTML = "";

    const backImage = theme === "Code vibes theme"
        ? "/assets/A Front.svg"
        : "/assets/DA F.svg";


    cards.forEach(image => {

        const card = document.createElement("div");
        card.classList.add("card");

        // wichtig für Vergleich
        card.dataset.image = image;

        const front = document.createElement("img");
        front.classList.add("card__front");
        front.src = `/assets/${image}`;

        const back = document.createElement("img");
        back.classList.add("card__back");
        back.src = backImage;


        card.addEventListener("click", () => {

            if (lockBoard) return;
            if (card === firstCard) return;

            card.classList.add("open");

            if (!firstCard) {
                firstCard = card;
                return;
            }
            secondCard = card;
            lockBoard = true;
            checkMatch();

        });
        card.appendChild(front);
        card.appendChild(back);
        board.appendChild(card);
    });
}


const exitButton = document.querySelector(".exit-button");
const dialog = document.querySelector(".dialog");
const noButton = document.querySelector(".dialog__no");
const yesButton = document.querySelector(".dialog__yes");

exitButton?.addEventListener("click", () => {
    dialog?.classList.remove("hidden");
});

noButton?.addEventListener("click", () => {
    dialog?.classList.add("hidden");
});

yesButton?.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/index.html";
});


let firstCard: HTMLElement | null = null;
let secondCard: HTMLElement | null = null;
let lockBoard = false;

let blueScore = 0;
let orangeScore = 0;

let currentPlayer = localStorage.getItem("player") || "Blue";

function checkMatch() {

    if (!firstCard || !secondCard) return;

    const isMatch =
        firstCard.dataset.image === secondCard.dataset.image;

    if (isMatch) {
        matchedPairs++;
        console.log("Gefundene Paare:", matchedPairs);

        if (currentPlayer === "Blue") {
            blueScore++;
        } else {
            orangeScore++;
        }

        updateScores();
        resetTurn();
        checkGameOver();

    } else {

        setTimeout(() => {

            firstCard!.classList.remove("open");
            secondCard!.classList.remove("open");

            switchPlayer();

            resetTurn();

        }, 1000);
    }
} 

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function checkGameOver() {

    if (matchedPairs === cardCount / 2) {
        localStorage.setItem("blueScore", blueScore.toString());
        localStorage.setItem("orangeScore", orangeScore.toString());
        localStorage.setItem("theme", theme);
        window.location.href = "./gameover.html";
    }
}

function showGameOver() {
    console.log("showGameOver läuft!");

    const gameOver = document.querySelector(".game-over");
    const winnerText = document.querySelector(".winner-text");
    const scoreText = document.querySelector(".score-text");

    console.log("GameOver Element:", gameOver);
    

    if (!gameOver || !winnerText || !scoreText) return;
    if (blueScore > orangeScore) {
        winnerText.textContent = "Blue wins!";
    } else if (orangeScore > blueScore) {
        winnerText.textContent = "Orange wins!";
    } else {
        winnerText.textContent = "Draw!";
    }
    scoreText.textContent =
        `Blue ${blueScore} : Orange ${orangeScore}`;
    gameOver.classList.remove("hidden");
}

const restartButton = document.querySelector(".restart-game");


restartButton?.addEventListener("click", () => {

    blueScore = 0;
    orangeScore = 0;
    matchedPairs = 0;

    location.reload();

});

function updateScores() {
    const blue = document.querySelector(".header-left__first");
    const orange = document.querySelector(".header-left__second");

    if (!blue || !orange) return;

    if (theme === "DA Projects theme") {
        blue.textContent = `${blueScore}`;
        orange.textContent = `${orangeScore}`;
    } else {
        blue.textContent = `Blue ${blueScore}`;
        orange.textContent = `Orange ${orangeScore}`;
    }
}

function switchPlayer() {
    if (currentPlayer === "Blue") {
        currentPlayer = "Orange";
    } else {
        currentPlayer = "Blue";
    }
    updateCurrentPlayer();
}

function setDialogText() {
    const noButton = document.querySelector(".dialog__no");
    const yesButton = document.querySelector(".dialog__yes");
    const dialogText = document.querySelector(".dialog__text");

    if (!noButton || !yesButton || !dialogText) return;
    if (theme === "Code vibes theme") {
        noButton.textContent = "No, back to game";
        yesButton.textContent = "Yes, quit game";
        dialogText.textContent = "Are you sure you want to quit the game?"
    }
    else if (theme === "DA Projects theme") {
        noButton.textContent = "Back to game";
        yesButton.textContent = "Exit game";
        dialogText.innerHTML = "Are you sure you want to<br>quit the game?"
    }
}

function updateCurrentPlayer() {
    const headerMiddle = document.querySelector(".header-middle");
    if (!headerMiddle) return;

    headerMiddle.classList.remove("blue", "orange");

    if (currentPlayer === "Blue") {
        headerMiddle.classList.add("blue");
    } else {
        headerMiddle.classList.add("orange");

    }
}

loadTheme();
setStartPlayer();
createBoard(cards);
updateScores();
setDialogText();