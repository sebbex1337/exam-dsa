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

export function updateOpenlist(list) {
  const openList = document.querySelector("#openList ul");
  openList.innerHTML = "";
  console.log(list);

  // Tjek hver cell i openList og tilføj en <li> til <ul>
  for (const cell of list) {
    const li = document.createElement("li");
    li.textContent = `Checking: (${cell.data.row}, ${cell.data.col}) Prioritet: ${cell.priority}`;
    openList.appendChild(li);
  }
}

export function updateClosedList(list) {
  const closedList = document.querySelector("#closedList ul");
  closedList.innerHTML = "";

  // Tjek hver cell i closedList og tilføj en <li> til <ul>
  for (const cell of list) {
    const li = document.createElement("li");
    li.textContent = `Checked: (${cell.row}, ${cell.col})`;
    closedList.appendChild(li);
  }
}

export function updateWallList(list) {
  const wallList = document.querySelector("#wallList ul");
  wallList.innerHTML = "";

  // Tjek hver cell i wallList og tilføj en <li> til <ul>
  for (const cell of list) {
    const li = document.createElement("li");
    li.textContent = `Wall: (${cell.row}, ${cell.col})`;
    wallList.appendChild(li);
  }
}
