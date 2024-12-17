/**
 *
 * @param {Grid} grid data structure - check ./datastructures/grid.js for more information
 */
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

/**
 *
 * @param {Object} start {row, col}
 * @param {Object} end {row, col}
 */
export function displayStartAndEnd(start, end) {
  const startCell = document.querySelector(`.cell[data-row="${start.row}"][data-col="${start.col}"]`);
  const endCell = document.querySelector(`.cell[data-row="${end.row}"][data-col="${end.col}"]`);
  startCell.classList.add("start");
  endCell.classList.add("end");
}

/**
 *
 * @param {Object} cell {row, col}
 */
export function setStart(cell) {
  // Vi henter alle celler der kan have .start, der burde dog kun kunne være en (Vi håber?)
  const start = document.querySelectorAll(".start");
  start.forEach((cell) => {
    cell.classList.remove("start");
  });
  // Tilføjer .start til den celle vi klikker på
  cell.classList.add("start");
}

/**
 *
 * @param {Object} cell {row, col}
 */
export function setEnd(cell) {
  // Vi henter alle celler der kan have .end, der burde dog kun kunne være en (Vi håber?)
  const end = document.querySelectorAll(".end");
  end.forEach((cell) => {
    cell.classList.remove("end");
  });
  // Tilføjer .end til den celle vi klikker på
  cell.classList.add("end");
}

/**
 *
 * @param {Object} cell {row, col}
 */
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

/**
 *
 * @param {Number} row - row number
 * @param {Number} col - column number
 */
export function markVisited(row, col) {
  const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
  if (cell && !cell.classList.contains("start") && !cell.classList.contains("end")) {
    cell.classList.add("visited");
  }
}

/**
 *
 * @param {Number} row - row number
 * @param {Number} col - column number
 */
export function markPath(row, col) {
  const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
  if (cell && !cell.classList.contains("start") && !cell.classList.contains("end")) {
    cell.classList.add("path");
  }
}

/**
 *
 * @param {Number} row - row number
 * @param {Number} col - column number
 */
export function markCurrent(row, col) {
  const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
  if (cell && !cell.classList.contains("start") && !cell.classList.contains("end")) {
    cell.classList.add("current");
  }
}
