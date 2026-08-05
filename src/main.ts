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
const startButton = document.querySelector(".start-game") as HTMLButtonElement;
const themes = document.querySelectorAll(".main-section__theme");
const players = document.querySelectorAll(".main-section__player");
const sizes = document.querySelectorAll(".main-section__size");

function checkSettings() {
    const theme = localStorage.getItem("theme");
    const player = localStorage.getItem("player");
    const size = localStorage.getItem("size");
    if (startButton) {
        startButton.disabled = !(theme && player && size);
    }
}


themes.forEach(theme => {
    theme.addEventListener("click", () => {
        themes.forEach(item => item.classList.remove("active"));
        theme.classList.add("active");
        localStorage.setItem(
            "theme",
            theme.textContent?.trim() ?? ""
        );
        checkSettings();
    });

});


players.forEach(player => {

    player.addEventListener("click", () => {
        players.forEach(item => item.classList.remove("active"));
        player.classList.add("active");
        localStorage.setItem(
            "player",
            player.textContent?.trim() ?? ""
        );
        checkSettings();
    });

});


sizes.forEach(size => {
    size.addEventListener("click", () => {
        sizes.forEach(item => item.classList.remove("active"));
        size.classList.add("active");
        localStorage.setItem(
            "size",
            size.textContent?.trim() ?? ""
        );
        checkSettings();
    });
});


startButton?.addEventListener("click", () => {
    window.location.href = "game.html";
});


checkSettings();

