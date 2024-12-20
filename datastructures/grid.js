// Grid.js
export class Grid {
  constructor(rowOrObj, cols) {
    const { row: rows, col: columns } = this.parseRowCol(rowOrObj, cols);
    this.rowsNum = rows;
    this.colsNum = columns;
    this.grid = Array.from({ length: rows }, (_, row) =>
      Array.from({ length: columns }, (_, col) => ({
        row,
        col,
        wall: false, // Vi sætter wall til false som standard
        parent: null,
      }))
    );
  }

  parseRowCol(rowOrObj, col) {
    if (typeof rowOrObj === "object") {
      return { row: rowOrObj.row, col: rowOrObj.col };
    }
    return { row: rowOrObj, col };
  }

  set(rowOrObj, colOrValue, value) {
    const { row, col } = this.parseRowCol(rowOrObj, colOrValue);
    const val = value !== undefined ? value : colOrValue;
    this.grid[row][col] = { ...this.grid[row][col], ...val };
  }

  get(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    return this.grid[row]?.[column];
  }

  // Ny funktion at tilføje vægge til gridet
  toggleWall(row, col) {
    const cell = this.get(row, col);
    cell.wall = !cell.wall;
  }

  neighbours(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    const neighbours = [];
    if (row > 0) {
      neighbours.push({ row: row - 1, col: column }); // North
    }
    if (row < this.rowsNum - 1) {
      neighbours.push({ row: row + 1, col: column }); // South
    }
    if (column > 0) {
      neighbours.push({ row, col: column - 1 }); // West
    }
    if (column < this.colsNum - 1) {
      neighbours.push({ row, col: column + 1 }); // East
    }
    return neighbours;
  }

  neighbourValues(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    return this.neighbours(row, column).map(({ row, col: neighborCol }) => this.get(row, neighborCol));
  }

  rows() {
    return this.rowsNum;
  }

  cols() {
    return this.colsNum;
  }

  size() {
    return this.rowsNum * this.colsNum;
  }
}
