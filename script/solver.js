class SudokuSolver {
  constructor(sudoku, config) {
    this.sudoku = sudoku;
    this.config = { ...config };

    this.blocks = Array.from({ length: 9 }, (e) => Array(9).fill(null));
    this.rows = Array.from({ length: 9 }, (e) => Array(9).fill(null));
    this.columns = Array.from({ length: 9 }, (e) => Array(9).fill(null));
  }

  getCoordsbyIndex(index) {
    const y = Math.floor(index / 3);
    const x = index - y * 3;
    return { x, y };
  }

  getIndexByCoords(x, y) {
    return x * 3 + y;
  }

  split() {
    // sudoku should be given in rows
    this.rows = this.sudoku;
    let cellIndex = 0;

    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        // get cell
        let cell = this.sudoku[x][y];
        cell = cell === 0 ? null : cell;
        console.log({ x, y });

        // add item to colum
        this.columns[y][x] = cell;

        // add block-item
        const X_Block = Math.floor(x / 3);
        const Y_Block = Math.floor(y / 3);
        const blockIndex = this.getIndexByCoords(X_Block, Y_Block);
        const block = this.blocks[blockIndex];

        const indexInBlock = this.getIndexByCoords(
          x - X_Block * 3,
          y - Y_Block * 3
        );
        block[indexInBlock] = cell;

        cellIndex++;
      }
    }
  }

  solve() {
    this.split();
  }
}

export default SudokuSolver;
