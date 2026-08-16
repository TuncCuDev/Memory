import './styles/style.scss'

const blueScore = Number(localStorage.getItem("blueScore")) || 0;
const orangeScore = Number(localStorage.getItem("orangeScore")) || 0;
const winnerText = document.querySelector(".winner-text");
const scoreText = document.querySelector(".score-text");


if (winnerText) {
    if (blueScore > orangeScore) {
        winnerText.textContent = "Blue wins!";
    } 
    else if (orangeScore > blueScore) {
        winnerText.textContent = "Orange wins!";
    } 
    else {
        winnerText.textContent = "Draw!";
    }
}


if (scoreText) {
    scoreText.textContent =
        `Blue ${blueScore} : Orange ${orangeScore}`;
}

const restartButton 
= document.querySelector(".restart-game");

restartButton?.addEventListener("click", () => {

    localStorage.removeItem("blueScore");
    localStorage.removeItem("orangeScore");

    window.location.href = "/pages/settings.html";

});