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
