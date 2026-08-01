import './styles/style.scss'


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


const themes = document.querySelectorAll(".main-section__theme");
const preview = document.querySelector(".theme-preview img") as HTMLImageElement;

themes.forEach(theme => {
    theme.addEventListener("mouseenter", () => {
        const image = theme.getAttribute("data-image");

        if (image && preview) {
            preview.src = image;
        }
    });

    theme.addEventListener("click", () => {
        const image = theme.getAttribute("data-image");

        if (image && preview) {
            preview.src = image;
        }
    });
});


const startButton = document.querySelector(".start-game");

startButton?.addEventListener("click", () => {
    const theme = document.querySelector(".main-section__theme.active")?.textContent?.trim();
    const player = document.querySelector(".main-section__player.active")?.textContent?.trim();
    const size = document.querySelector(".main-section__size.active")?.textContent?.trim();

    localStorage.setItem("theme", theme ?? "");
    localStorage.setItem("player", player ?? "");
    localStorage.setItem("size", size ?? "");

    window.location.href = "game.html";
});