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
function updateBackButton(): void {
    if (backToStartButton) {
        backToStartButton.textContent = isCodeTheme ? "Back to start" : "Home";
    }
}

/** Updates the displayed scores. */
function updateScoreDisplay(): void {
    if (blueScoreElement) {
        blueScoreElement.textContent = isCodeTheme ? `Blue ${blueScore}` : `${blueScore}`;
    }
    if (orangeScoreElement) {
        orangeScoreElement.textContent = isCodeTheme? `Orange ${orangeScore}` : `${orangeScore}`;
    }
}

/** Displays the winning player. */
function showWinner(color: "blue" | "orange"): void {
    const isBlue = color === "blue";

    winnerName.classList.add(`${color}-winner`);
    winnerName.textContent = isCodeTheme? `${color.toUpperCase()} PLAYER` : `${isBlue ? "Blue" : "Orange"} Player`;
    winnerImage.src = isCodeTheme? `../assets/chess_pawn_${color}_go.svg` : `../assets/chess_pawn_${isBlue ? "bl" : "or"}.svg`;
    winnerImage.alt = `${isBlue ? "Blue" : "Orange"} Winner`;
}

/** Displays the draw result. */
function showDraw(): void {
    winnerTitle.textContent = "It's a";
    nextPage?.classList.add("draw-screen");

    winnerName.innerHTML = isCodeTheme ? `<img class="draw-image" src="../assets/DRAW_green.svg" alt="Draw">` : `<img class="draw-image" src="../assets/DRAW_da.svg" alt="Draw">`;
    winnerImage.src = isCodeTheme ? "../assets/Scale_Icon.svg" : "../assets/icon_red.svg";
    winnerImage.alt = "Draw";
}

/** Shows the final game result. */
function showGameResult(): void {
    updateBackButton();
    updateScoreDisplay();

    if (blueScore > orangeScore) {
        showWinner("blue");
    } else if (orangeScore > blueScore) {
        showWinner("orange");
    } else {
        showDraw();
    }
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