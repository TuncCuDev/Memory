import './styles/style.scss'

const theme = localStorage.getItem("theme");
const player = localStorage.getItem("player");
const size = localStorage.getItem("size");

console.log(theme);
console.log(player);
console.log(size);

if (theme === "Code vibes theme") {
    // Code-Vibes-Bilder verwenden
} else if (theme === "DA Projects theme") {
    // DA-Projects-Bilder verwenden
}

if (player === "Blue") {
    // Blauer Spieler beginnt
} else if (player === "Orange") {
    // Orangener Spieler beginnt
}

switch (size) {
    case "16 cards":
        // 16 Karten erstellen
        break;

    case "24 cards":
        // 24 Karten erstellen
        break;

    case "36 cards":
        // 36 Karten erstellen
        break;
}