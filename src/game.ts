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
    if (player === "Blue") {
        console.log("Blue beginnt");
    } else {
        console.log("Orange beginnt");
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
            board?.classList.add("grid-9x4");
            break;
    }
}

function createBoard(cards: string[]) {
    const board = document.querySelector(".game-board");

    if (!board) return;

    board.innerHTML = "";

    cards.forEach(image => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = `../assets/${image}`;

        card.appendChild(img);
        board.appendChild(card);
    });
}

loadTheme();
setStartPlayer();
createBoard(cards);