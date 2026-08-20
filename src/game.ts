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
];

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
    "DA  (13).svg",
    "DA  (14).svg",
    "DA  (15).svg",
    "DA  (16).svg",
    "DA  (17).svg",
    "DA  (18).svg",
];


let cardCount = 16;
let matchedPairs = 0;

let blueScore = 0;
let orangeScore = 0;

let firstCard: HTMLElement | null = null;
let secondCard: HTMLElement | null = null;
let lockBoard = false;

const theme = localStorage.getItem("theme");
const player = localStorage.getItem("player");
const size = localStorage.getItem("size");

let currentPlayer = localStorage.getItem("player") || "Blue";

const exitButton = document.querySelector(".exit-button");
const dialog = document.querySelector(".dialog");
const noButton = document.querySelector(".dialog__no");
const yesButton = document.querySelector(".dialog__yes");
const restartButton = document.querySelector(".restart-game");

getCardCount();
loadTheme();
setStartPlayer();

let images = theme === "Code vibes theme" ? CodeImages : DAImages;

const pairCount = cardCount / 2;
const selectedImages = images.slice(0, pairCount);
const cards = [...selectedImages, ...selectedImages];
cards.sort(() => Math.random() - 0.5);

createBoard(cards);
updateScores();
setDialogText();

function loadTheme():void {
    if (theme === "Code vibes theme") {
        document.body.classList.add("theme-code");
    } else if (theme === "DA Projects theme") {
        document.body.classList.add("theme-da");
    }
}

function setStartPlayer():void {
    const headerMiddle = document.querySelector(".header-middle");
    if (!headerMiddle) return;
    if (player === "Blue") {
        headerMiddle.classList.add("blue");
    } else { 
        headerMiddle.classList.add("orange");
    } 
}

function getCardCount(): void {
    cardCount = size === "16 cards" ? 16 :
                size === "24 cards" ? 24 : 36;
    setGridClass();
}

function setGridClass(): void {
    const board = document.querySelector(".game-board");
    const grid = `grid-${cardCount === 16 ? "4x4" : cardCount === 24 ? "6x4" : "6x6"}`;
    board?.classList.add(grid);
}

function createBoard(cards: string[]): void {
    const board = document.querySelector(".game-board");
    if (!board) return;

    board.innerHTML = "";

    cards.forEach(image => {
        const card = createCard(image);
        board.appendChild(card);
    });
}

function createCard(image: string): HTMLDivElement {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = image;

    const front = createCardImage("card__front", `../assets/${image}`);
    const back = createCardImage("card__back", getBackImage());

    card.append(front, back);
    card.addEventListener("click", () => handleCardClick(card));

    return card;
}

function createCardImage(className: string, src: string): HTMLImageElement {
    const image = document.createElement("img");
    image.classList.add(className);
    image.src = src;
    return image;
}

function getBackImage(): string {
    return theme === "Code vibes theme"
        ? "../assets/A Front.svg"
        : "../assets/DA F.svg";
}

function handleCardClick(card: HTMLDivElement): void {
    if (lockBoard || card === firstCard) return;

    card.classList.add("open");
    if (!firstCard) {
        firstCard = card;
        return;
    }
    secondCard = card;
    lockBoard = true;
    checkMatch();
}

exitButton?.addEventListener("click", () => {
    dialog?.classList.remove("hidden");
});

noButton?.addEventListener("click", () => {
    dialog?.classList.add("hidden");
});

yesButton?.addEventListener("click", () => {
    localStorage.removeItem("score");
    localStorage.removeItem("gameState");
    window.location.href = "./settings.html";
});

function checkMatch() {

    if (!firstCard || !secondCard) return;
    const isMatch =
        firstCard.dataset.image === secondCard.dataset.image;
    if (isMatch) {
        matchedPairs++;
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
        localStorage.setItem("theme", theme!);
        window.location.href = "./gameover.html";
    }
}


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
