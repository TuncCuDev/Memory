import './styles/style.scss'

const blueScore = Number(localStorage.getItem("blueScore")) || 0;
const orangeScore = Number(localStorage.getItem("orangeScore")) || 0;
const blueScoreElement = document.querySelector(".game-over-score__blue");
const orangeScoreElement = document.querySelector(".game-over-score__orange");

const gameOverPage = document.querySelector(".game-over-page");
const finalInfo = document.querySelector(".final-info");
const gameOverScore = document.querySelector(".game-over-score");
const nextPage = document.querySelector(".next-page");
const gameOverPg = document.querySelector(".game-over-pg")

const winnerName = document.querySelector(".winner-name") as HTMLElement;
const winnerImage = document.querySelector(".winner-image") as HTMLImageElement;
const winnerTitle = document.querySelector(".winner-title") as HTMLElement;
const confetti = document.querySelector(".confetti") as HTMLImageElement;

const backToStartButton = document.querySelector(".back-to-start");
const theme = localStorage.getItem("theme");


if (theme === "Code vibes theme") {
    document.body.classList.add("theme-code");
    backToStartButton!.textContent = "Back to start";
    if (blueScoreElement) {
    blueScoreElement.textContent = `Blue ${blueScore}`;
    }
    if (orangeScoreElement) {
        orangeScoreElement.textContent = `Orange ${orangeScore}`;
    }
} else {
    document.body.classList.add("theme-da");
    backToStartButton!.textContent = "Home";
    if (blueScoreElement) {
    blueScoreElement.textContent = `${blueScore}`;
    }
    if (orangeScoreElement) {
        orangeScoreElement.textContent = `${orangeScore}`;
    }
}

if (blueScore > orangeScore) {
    winnerName.classList.add("blue-winner");
    if (theme === "Code vibes theme") {
        winnerName.textContent = "BLUE PLAYER";
        winnerImage.src = "/assets/chess_pawn_blue_go.svg";
    } else {
        winnerName.textContent = "Blue Player";
        winnerImage.src = "/assets/chess_pawn_bl.svg";
    }
    winnerImage.src = "/assets/chess_pawn_blue_go.svg";
    winnerImage.alt = "Blue Winner";
} else if (orangeScore > blueScore) {
    winnerName.classList.add("orange-winner");
    if (theme === "Code vibes theme") {
        winnerName.textContent = "ORANGE PLAYER";
        winnerImage.src = "/assets/chess_pawn_orange_go.svg";
    } else {
        winnerName.textContent = "Orange Player";
        winnerImage.src = "/assets/chess_pawn_or.svg";
    }
    winnerImage.alt = "Orange Winner";
} else {
    winnerTitle.textContent = "It's a";
    nextPage?.classList.add("draw-screen");
    if (theme === "Code vibes theme") {
        winnerName.innerHTML = `<img class="draw-image" src="/assets/DRAW_green.svg" alt="Draw">`;
        winnerImage.src = "/assets/Scale_Icon.svg";
    } else {
        winnerName.innerHTML = `<img class="draw-image" src="/assets/DRAW_da.svg" alt="Draw">`;
         winnerImage.src = "/assets/icon_red.svg";
    }
    winnerImage.alt = "Draw";
}

setTimeout(() => {
    gameOverPage?.classList.add("hidden");
    gameOverPg?.classList.add("hidden");
    finalInfo?.classList.add("hidden");
    gameOverScore?.classList.add("hidden");
     if (blueScore === orangeScore) {
        confetti.style.display = "none";
    }

    nextPage?.classList.add("visible");
}, 3000);

backToStartButton?.addEventListener("click", () => {
    window.location.href = "/settings.html";
});