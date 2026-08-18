import './styles/style.scss'

const blueScore = Number(localStorage.getItem("blueScore")) || 0;
const orangeScore = Number(localStorage.getItem("orangeScore")) || 0;
const blueScoreElement = document.querySelector(".game-over-score__blue");
const orangeScoreElement = document.querySelector(".game-over-score__orange");

if (blueScoreElement) {
    blueScoreElement.textContent = `Blue ${blueScore}`;
}

if (orangeScoreElement) {
    orangeScoreElement.textContent = `Orange ${orangeScore}`;
}

const gameOverPage = document.querySelector(".game-over-page");
const finalInfo = document.querySelector(".final-info");
const gameOverScore = document.querySelector(".game-over-score");
const nextPage = document.querySelector(".next-page");

const winnerName = document.querySelector(".winner-name") as HTMLElement;
const winnerImage = document.querySelector(".winner-image") as HTMLImageElement;
const winnerTitle = document.querySelector(".winner-title") as HTMLElement;
const confetti = document.querySelector(".confetti") as HTMLImageElement;


if (blueScore > orangeScore) {
    winnerName.textContent = "BLUE PLAYER";
    winnerName.classList.add("blue-winner");
    winnerImage.src = "/assets/chess_pawn_blue_go.svg";
    winnerImage.alt = "Blue Winner";
} else if (orangeScore > blueScore) {
    winnerName.textContent = "ORANGE PLAYER";
    winnerName.classList.add("orange-winner");
    winnerImage.src = "/assets/chess_pawn_orange_go.svg";
    winnerImage.alt = "Orange Winner";
} else {
    nextPage?.classList.add("draw-screen");
    winnerTitle.textContent = "It's a";
    winnerName.innerHTML = `<img class="draw-image" src="/assets/DRAW_green.svg" alt="Draw">`;
    winnerImage.src = "/assets/Scale_Icon.svg";
    winnerImage.alt = "Draw";
}

setTimeout(() => {
    gameOverPage?.classList.add("hidden");
    finalInfo?.classList.add("hidden");
    gameOverScore?.classList.add("hidden");
     if (blueScore === orangeScore) {
        confetti.style.display = "none";
    }

    nextPage?.classList.add("visible");
}, 5000);

const backToStartButton = document.querySelector(".back-to-start");

backToStartButton?.addEventListener("click", () => {
    window.location.href = "/settings.html";
});