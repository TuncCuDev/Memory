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
const isCodeTheme = theme === "Code vibes theme";

document.body.classList.add(isCodeTheme ? "theme-code" : "theme-da");

/** Updates the back button text. */
if (backToStartButton) {
    backToStartButton.textContent = isCodeTheme ? "Back to start" : "Home";
}

/** Updates the displayed scores. */
if (blueScoreElement) {
    blueScoreElement.textContent = isCodeTheme ? `Blue ${blueScore}` : `${blueScore}`;
}

/** Updates the displayed scores. */
if (orangeScoreElement) {
    orangeScoreElement.textContent = isCodeTheme ? `Orange ${orangeScore}` : `${orangeScore}`;
}

/** Shows the final game-over screen. */
if (blueScore > orangeScore) {
    winnerName.classList.add("blue-winner");
    winnerName.textContent = isCodeTheme ? "BLUE PLAYER" : "Blue Player";
    winnerImage.src = isCodeTheme ? "../assets/chess_pawn_blue_go.svg" : "../assets/chess_pawn_bl.svg";
    winnerImage.alt = "Blue Winner";

/** Shows the final game-over screen. */
} else if (orangeScore > blueScore) {
    winnerName.classList.add("orange-winner");
    winnerName.textContent = isCodeTheme ? "ORANGE PLAYER" : "Orange Player";
    winnerImage.src = isCodeTheme ? "../assets/chess_pawn_orange_go.svg" : "../assets/chess_pawn_or.svg";
    winnerImage.alt = "Orange Winner";

/** Shows the final game-over screen. */
} else {
    winnerTitle.textContent = "It's a";
    nextPage?.classList.add("draw-screen");
    winnerName.innerHTML = isCodeTheme
        ? `<img class="draw-image" src="../assets/DRAW_green.svg" alt="Draw">`
        : `<img class="draw-image" src="../assets/DRAW_da.svg" alt="Draw">`;

    winnerImage.src = isCodeTheme ? "../assets/Scale_Icon.svg" : "../assets/icon_red.svg";
    winnerImage.alt = "Draw";
}

/** Returns to the settings page. */
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
    window.location.href = "./settings.html";
});