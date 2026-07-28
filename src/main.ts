import './styles/style.scss'

function makeSelectable(selector: string) {
    const items = document.querySelectorAll(selector);

    items.forEach(item => {
        item.addEventListener("click", () => {
            console.log(item.classList)
            items.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            console.log(item.classList)
        });
    });
}

console.log(document.querySelectorAll(".main-section__theme").length);
makeSelectable(".main-section__player");
makeSelectable(".main-section__size");
makeSelectable(".main-section__theme");