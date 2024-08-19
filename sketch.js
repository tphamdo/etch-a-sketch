const DEFAULT_ROWS = 20
const GRID_HEIGHT = 800 //px
const container = document.querySelector(".container");
const button = document.querySelector("button");

updateGridRows(DEFAULT_ROWS)

function updateGridDimens() {
    container.style.height = `${GRID_HEIGHT}px`;
    container.style.width = `${GRID_HEIGHT}px`;
}

function updateGridRows(rows) {
    if (!Number.isInteger(rows)) return;

    clearChildren();

    for (let c = 0; c < rows; ++c) {
        for (let r = 0; r < rows; ++r) {
            const div = document.createElement('div')
            div.style.height = `${GRID_HEIGHT / rows}px`;
            div.style.width = `${GRID_HEIGHT / rows}px`;
            container.appendChild(div)

            addDivEventListeners(div);
        }
    }
}

function clearChildren() {
    let child = container.lastElementChild;
    while (child) {
        container.removeChild(child);
        child = container.lastElementChild;
    }
}

function addDivEventListeners(div) {
    div.addEventListener('mouseenter', () => {
        const curBgndColor = window.getComputedStyle(div).getPropertyValue("background-color");
        const regex = /rgba\((.*), (.*), (.*), (.*)\)/;
        const mtch = regex.exec(curBgndColor)
        const curOpacity = (mtch && mtch.length == 5)? Number(mtch[4]) : 1;
        console.log(curOpacity);
        div.style.backgroundColor = getRandRGBA(curOpacity + 0.2);
    });
}

function getRandRGBA(opacity=0) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b},${Math.min(1,opacity)})`
}

button.addEventListener("click", () => {
    let rows = prompt("Enter number of rows/cols for the grid: (max: 100)", DEFAULT_ROWS);
    rows = parseInt(rows)
    if (Number.isNaN(rows)) return;
    rows = Math.min(100,rows)
    rows = Math.max(1,rows)

    console.log(rows);
    updateGridRows(rows);
});

