import './styles/style.scss'

const blueScore = Number(localStorage.getItem("blueScore")) || 0;
const orangeScore = Number(localStorage.getItem("orangeScore")) || 0;
const scoreText = document.querySelector(".score-text");
const blueScoreElement = document.querySelector(".game-over-score__blue");
const orangeScoreElement = document.querySelector(".game-over-score__orange");


if (scoreText) {
    scoreText.textContent =
        `Blue ${blueScore} : Orange ${orangeScore}`;
}

if (blueScoreElement) {
    blueScoreElement.textContent = `Blue ${blueScore}`;
}

if (orangeScoreElement) {
    orangeScoreElement.textContent = `Orange ${orangeScore}`;
}
