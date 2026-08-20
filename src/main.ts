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

const previewImage = document.querySelector<HTMLImageElement>("#theme-preview-image");

/** Loads saved settings when returning from the game. */
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

/** Loads and selects the saved theme. */
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

/** Loads and selects the saved player. */
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

/** Loads and selects the saved card size. */
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

/** Makes elements selectable. */
function makeSelectable(selector: string) {
    const items = document.querySelectorAll(selector);
    items.forEach(item => {
        item.addEventListener("click", () => {
            items.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
        });
    });
}

/** Checks whether all settings are selected. */
function checkSettings():void {
    if (startButton) {
        startButton.disabled = !(selectedTheme && selectedPlayer && selectedSize);
    }
}

/** Clears all selected settings. */
function clearSettings(): void {
    selectedTheme = "";
    selectedPlayer = "";
    selectedSize = "";
    themes.forEach(item => item.classList.remove("active"));
    players.forEach(item => item.classList.remove("active"));
    sizes.forEach(item => item.classList.remove("active"));
    checkSettings();
}

/** Updates a menu item with the selected value. */
function updateMenuItem(element: Element | null, text: string): void {
    if (!element) return;

    element.textContent = text;
    element.classList.remove("updated");
    void (element as HTMLElement).offsetWidth;
    element.classList.add("updated");
}

/** Sets up theme event listeners. */
function setupThemeEvents(): void {
    themes.forEach(theme => {
        theme.addEventListener("mouseenter", () => showThemeImage(theme));
        theme.addEventListener("mouseleave", showActiveThemeImage);
        theme.addEventListener("click", () => selectTheme(theme));
    });
}

/** Sets up player event listeners. */
function setupPlayerEvents(): void {
    players.forEach(player => {
        player.addEventListener("click", () => selectPlayer(player));
    });
}

/** Sets up size event listeners. */
function setupSizeEvents(): void {
    sizes.forEach(size => {
        size.addEventListener("click", () => selectSize(size));
    });
}
/** Shows the theme preview image. */
function showThemeImage(theme: HTMLElement): void {
    const image = theme.dataset.image;
    if (image && previewImage) {
        previewImage.src = image;
    }
}

/** Restores the active theme preview. */
function showActiveThemeImage(): void {
    const activeTheme = document.querySelector<HTMLElement>(
        ".main-section__theme.active"
    );
    if (activeTheme) showThemeImage(activeTheme);
}

/** Selects and saves a theme. */
function selectTheme(theme: HTMLElement): void {
    setActive(themes, theme);
    selectedTheme = theme.textContent?.trim() ?? "";
    showThemeImage(theme);
    saveSelection("theme", selectedTheme, menuTheme);
}

/** Selects and saves a player. */
function selectPlayer(player: Element): void {
    setActive(players, player);
    selectedPlayer = player.textContent?.trim() ?? "";
    saveSelection("player", selectedPlayer, menuPlayer);
}

/** Selects and saves a card size. */
function selectSize(size: Element): void {
    setActive(sizes, size);
    selectedSize = size.textContent?.trim() ?? "";
    saveSelection("size", selectedSize, menuSize);
}

/** Sets the selected element as active. */
function setActive(items: NodeListOf<Element>, selected: Element): void {
    items.forEach(item => item.classList.remove("active"));
    selected.classList.add("active");
}

/** Saves a selected setting. */
function saveSelection(key: string, value: string, menuItem: Element | null): void {
    localStorage.setItem(key, value);
    updateMenuItem(menuItem, value);
    checkSettings();
}
startButton?.addEventListener("click", () => {
    window.location.href = "./game.html";
});

checkSettings();
loadSavedSettings();
setupThemeEvents();
setupPlayerEvents();
setupSizeEvents();
