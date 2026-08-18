import './styles/style.scss'

let selectedTheme = "";
let selectedPlayer = "";
let selectedSize = "";

const startButton = document.querySelector(".start-game") as HTMLButtonElement;

const themes = document.querySelectorAll(".main-section__theme");
const players = document.querySelectorAll(".main-section__player");
const sizes = document.querySelectorAll(".main-section__size");

const menuTheme = document.querySelector(".menu-theme");
const menuPlayer = document.querySelector(".menu-player");
const menuSize = document.querySelector(".menu-size");


function makeSelectable(selector: string) {
    const items = document.querySelectorAll(selector);
    
    items.forEach(item => {
        item.addEventListener("click", () => {
            items.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
        });
    });
}

makeSelectable(".main-section__player");
makeSelectable(".main-section__size");
makeSelectable(".main-section__theme");

function checkSettings() {
    if (startButton) {
        startButton.disabled = !(
            selectedTheme &&
            selectedPlayer &&
            selectedSize
        );
    }
}

function updateMenuItem(element: Element | null, text: string) {
    if (!element) return;

    element.textContent = text;
    element.classList.remove("updated");
    void (element as HTMLElement).offsetWidth;
    element.classList.add("updated");
}

themes.forEach(theme => {
    theme.addEventListener("click", () => {
        themes.forEach(item => item.classList.remove("active"));
        theme.classList.add("active");

        selectedTheme = theme.textContent?.trim() ?? "";

        localStorage.setItem("theme", selectedTheme);

        updateMenuItem(menuTheme, selectedTheme);

        checkSettings();
    });
});

players.forEach(player => {
    player.addEventListener("click", () => {
        players.forEach(item => item.classList.remove("active"));
        player.classList.add("active");

        selectedPlayer = player.textContent?.trim() ?? "";

        localStorage.setItem("player", selectedPlayer);

        updateMenuItem(menuPlayer, selectedPlayer);

        checkSettings();
    });
});

sizes.forEach(size => {
    size.addEventListener("click", () => {
        sizes.forEach(item => item.classList.remove("active"));
        size.classList.add("active");

        selectedSize = size.textContent?.trim() ?? "";

        localStorage.setItem("size", selectedSize);

        updateMenuItem(menuSize, selectedSize);

        checkSettings();
    });
});

startButton?.addEventListener("click", () => {
    window.location.href = "game.html";
});

checkSettings();
