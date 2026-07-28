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

