import './styles/style.scss'

let selectedTheme = "";
let selectedPlayer = "";
let selectedSize = "";

makeSelectable(".main-section__player");
makeSelectable(".main-section__size");
makeSelectable(".main-section__theme");

const startButton = document.querySelector(".start-game") as HTMLButtonElement;

const themes = document.querySelectorAll<HTMLElement>(".main-section__theme");
const players = document.querySelectorAll(".main-section__player");
const sizes = document.querySelectorAll(".main-section__size");

const menuTheme = document.querySelector(".menu-theme");
const menuPlayer = document.querySelector(".menu-player");
const menuSize = document.querySelector(".menu-size");

const previewImage = document.querySelector<HTMLImageElement>(
    "#theme-preview-image"
);

function loadSavedSettings(): void {
    const returnFromGame = sessionStorage.getItem("returnFromGame");
    if (returnFromGame !== "true") {
        clearSettings();
        return;
    }
    loadTheme();
    loadPlayer();
    loadSize();
    sessionStorage.removeItem("returnFromGame");
    checkSettings();
}

function loadTheme(): void {
    const savedTheme = localStorage.getItem("theme");
    const theme = Array.from(themes).find(
        item => item.textContent?.trim() === savedTheme
    );

    if (!theme || !savedTheme) return;

    theme.classList.add("active");
    selectedTheme = savedTheme;

    if (theme.dataset.image && previewImage) {
        previewImage.src = theme.dataset.image;
    }

    updateMenuItem(menuTheme, savedTheme);
}

function loadPlayer(): void {
    const savedPlayer = localStorage.getItem("player");
    const player = Array.from(players).find(
        item => item.textContent?.trim() === savedPlayer
    );
    if (!player || !savedPlayer) return;

    player.classList.add("active");
    selectedPlayer = savedPlayer;
    updateMenuItem(menuPlayer, savedPlayer);
}

function loadSize(): void {
    const savedSize = localStorage.getItem("size");
    const size = Array.from(sizes).find(
        item => item.textContent?.trim() === savedSize
    );
    if (!size || !savedSize) return;

    size.classList.add("active");
    selectedSize = savedSize;
    updateMenuItem(menuSize, savedSize);
}

function makeSelectable(selector: string) {
    const items = document.querySelectorAll(selector);
    items.forEach(item => {
        item.addEventListener("click", () => {
            items.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
        });
    });
}

function checkSettings():void {
    if (startButton) {
        startButton.disabled = !(selectedTheme && selectedPlayer && selectedSize);
    }
}

function clearSettings(): void {
    selectedTheme = "";
    selectedPlayer = "";
    selectedSize = "";
    themes.forEach(item => item.classList.remove("active"));
    players.forEach(item => item.classList.remove("active"));
    sizes.forEach(item => item.classList.remove("active"));
    checkSettings();
}

function updateMenuItem(element: Element | null, text: string) {
    if (!element) return;
    element.textContent = text;
    element.classList.remove("updated");
    void (element as HTMLElement).offsetWidth;
    element.classList.add("updated");
}

themes.forEach(theme => {
    theme.addEventListener("mouseenter", () => showThemeImage(theme));
    theme.addEventListener("mouseleave", showActiveThemeImage);
    theme.addEventListener("click", () => selectTheme(theme));
});

players.forEach(player => {
    player.addEventListener("click", () => selectPlayer(player));
});

sizes.forEach(size => {
    size.addEventListener("click", () => selectSize(size));
});

function showThemeImage(theme: HTMLElement): void {
    const image = theme.dataset.image;
    if (image && previewImage) {
        previewImage.src = image;
    }
}

function showActiveThemeImage(): void {
    const activeTheme = document.querySelector<HTMLElement>(
        ".main-section__theme.active"
    );
    if (activeTheme) showThemeImage(activeTheme);
}

function selectTheme(theme: HTMLElement): void {
    setActive(themes, theme);
    selectedTheme = theme.textContent?.trim() ?? "";
    showThemeImage(theme);
    saveSelection("theme", selectedTheme, menuTheme);
}

function selectPlayer(player: Element): void {
    setActive(players, player);
    selectedPlayer = player.textContent?.trim() ?? "";
    saveSelection("player", selectedPlayer, menuPlayer);
}

function selectSize(size: Element): void {
    setActive(sizes, size);
    selectedSize = size.textContent?.trim() ?? "";
    saveSelection("size", selectedSize, menuSize);
}

function setActive(items: NodeListOf<Element>, selected: Element): void {
    items.forEach(item => item.classList.remove("active"));
    selected.classList.add("active");
}

function saveSelection(
    key: string,
    value: string,
    menuItem: Element | null
): void {
    localStorage.setItem(key, value);
    updateMenuItem(menuItem, value);
    checkSettings();
}

startButton?.addEventListener("click", () => {
    window.location.href = "./game.html";
});

checkSettings();
loadSavedSettings();
