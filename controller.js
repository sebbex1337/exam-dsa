import { Grid } from "./datastructures/grid.js";
import * as view from "./view.js";

// Start visning af gridet
window.addEventListener("load", init);

let grid;
let selectMode = null; // Mulige værdier: "start", "end", "wall"

function init() {
  grid = new Grid({ row: 10, col: 10 });
  view.initGrid(grid);
  setupControls();
}

function setupControls() {
  const startBtn = document.querySelector("#startPos");
  const endBtn = document.querySelector("#endPos");
  const wallBtn = document.querySelector("#wallPos");
  const resetBtn = document.querySelector("#reset");

  // Sætter selecting start til at være true og selecting end til at være false
  startBtn.addEventListener("click", () => {
    selectMode = "start";
  });

  // Og omvendt :)
  endBtn.addEventListener("click", () => {
    selectMode = "end";
  });

  wallBtn.addEventListener("click", () => {
    selectMode = "wall";
  });

  resetBtn.addEventListener("click", () => {
    view.resetGrid();
  });

  // Får fat i vores grid
  const gridContainer = document.querySelector("#grid");

  // Gør den lytter på et klik så man kan vælge start og slut position
  gridContainer.addEventListener("click", (event) => {
    if (!selectMode) return; // Gør ingenting hvis selectmode er null, dvs vi har ikke valgt nogen mode til at klikke på griddet

    const cell = event.target;
    console.log(cell);

    // Vi henter row og col fra vores dataset fra hvert celle så vi nemt kan tilgå dem
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    console.log(row, col);

    switch (selectMode) {
      case "start":
        view.setStart(cell);
        selectMode = null;
        break;
      case "end":
        view.setEnd(cell);
        selectMode = null;
        break;
      case "wall":
        view.toggleWall(cell);
        break;
      default:
        break;
    }
  });
}
