export function initGrid(grid) {
  document.documentElement.style.setProperty("--row-num", grid.rowsNum);
  document.documentElement.style.setProperty("--col-num", grid.colsNum);
  const gridContainer = document.querySelector("#grid");
  for (let row = 0; row < grid.rowsNum; row++) {
    for (let col = 0; col < grid.colsNum; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      gridContainer.appendChild(cell);
    }
  }
}

export function displayStartAndEnd(start, end) {
  const startCell = document.querySelector(`.cell[data-row="${start.row}"][data-col="${start.col}"]`);
  const endCell = document.querySelector(`.cell[data-row="${end.row}"][data-col="${end.col}"]`);
  startCell.classList.add("start");
  endCell.classList.add("end");
}

export function setStart(cell) {
  // Vi henter alle celler der kan have .start, der burde dog kun kunne være en (Vi håber?)
  const start = document.querySelectorAll(".start");
  start.forEach((cell) => {
    cell.classList.remove("start");
  });
  // Tilføjer .start til den celle vi klikker på
  cell.classList.add("start");
}

export function setEnd(cell) {
  // Vi henter alle celler der kan have .end, der burde dog kun kunne være en (Vi håber?)
  const end = document.querySelectorAll(".end");
  end.forEach((cell) => {
    cell.classList.remove("end");
  });
  // Tilføjer .end til den celle vi klikker på
  cell.classList.add("end");
}

export function toggleWall(cell) {
  cell.classList.toggle("wall");
}

export function removeAllWalls() {
  const walls = document.querySelectorAll(".wall");
  walls.forEach((cell) => {
    cell.classList.remove("wall");
  });
}

export function resetGrid() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.className = "cell";
  });
}
