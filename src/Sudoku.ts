type Unit = (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9)[]

/** Interprets and splits sudoku */
class Sudoku {
  /**
   * Format plain number sequence to rows
   *
   * Since the plain Sudoku sequence of numbers consists
   * of the rows of the Sudoku written side by side, nine
   * numbers next to each other are cut out and interpreted
   * as a row.
   * @param plain Plain number sequence of the sudoku.
   * Basically all sudoku rows side by side.
   * @returns Rows of sudoku as two-dimensional array
   */
  static formatToRows(plain: Unit): Unit[] {
    // Create rows
    const rows: Unit[] = []
    // Slice always 9 numbers from plain array
    for (let i = 0; i < 9; i += 1) {
      rows.push(plain.slice(i * 9, i * 9 + 9))
    }
    return rows
  }

  /**
   * Format plain number sequence to cols
   *
   * Creates nine columns with index c. It then fetches
   * every ninth number plus the column index c and forms
   * each column.
   * @param plain Plain number sequence of the sudoku.
   * Basically all sudoku rows side by side.
   * @returns Cols of sudoku as two-dimensional array
   */
  static formatToCols(plain: Unit): Unit[] {
    // Create cols
    const cols: Unit[] = []
    for (let colIndex = 0; colIndex < 9; colIndex += 1) {
      const col: Unit = []
      for (let rowIndex = 0; rowIndex < 9; rowIndex += 1) {
        // Fetches every ninth number plus colIndex
        col.push(plain[rowIndex * 9 + colIndex])
      }

      cols.push(col)
    }
    return cols
  }

  /**
   * Format plain number sequence to blocks
   *
   * Takes every third element as the start index and adds
   * 27 indices every three blocks. Now it cuts the first
   * three numbers from the start index. He repeats this
   * three times and adds nine to the starting index with
   * each pass.
   * @param plain Plain number sequence of the sudoku.
   * Basically all sudoku rows side by side.
   * @returns Blocks of sudoku as two-dimensional array
   */
  static formatToBlocks(plain: Unit): Unit[] {
    const blocks: Unit[] = []
    for (let blockIndex = 0; blockIndex < 9; blockIndex += 1) {
      const blockStartIndex = blockIndex * 3 + Math.floor(blockIndex / 3) * 18

      const block: Unit = [
        ...plain.slice(blockStartIndex, blockStartIndex + 3),
        ...plain.slice(blockStartIndex + 9, blockStartIndex + 9 + 3),
        ...plain.slice(blockStartIndex + 18, blockStartIndex + 18 + 3),
      ]

      blocks.push(block)
    }
    return blocks
  }

  /** Plain number sequence of the sudoku. Basically all sudoku rows side by side. */
  public plain: Unit = []

  /** Rows of sudoku as two-dimensional array */
  public rows: Unit[] = []

  /** Cols of sudoku as two-dimensional array */
  public cols: Unit[] = []

  /** Blocks of sudoku as two-dimensional array */
  public blocks: Unit[] = []

  /**
   * Interprets and splits sudoku
   * @param plain Plain number sequence of the sudoku. Basically all sudoku rows side by side.
   */
  constructor(plain: Unit) {
    this.plain = plain

    this.rows = Sudoku.formatToRows(plain)
    this.cols = Sudoku.formatToCols(plain)
    this.blocks = Sudoku.formatToBlocks(plain)
  }

  /**
   * Returns units of the cell
   * @param plainIndex Index of the cell in plain number sequence
   * @returns The units of the cell
   */
  public getUnitsByPlainIndex(plainIndex: number) {
    const rowIndex = Math.floor(plainIndex / 9)
    const colIndex = plainIndex % 9
    const blockIndex =
      Math.floor(plainIndex / 27) * 3 + (Math.floor(plainIndex / 3) % 3)

    return {
      row: this.rows[rowIndex],
      col: this.cols[colIndex],
      block: this.blocks[blockIndex],
    }
  }

  /**
   * Returns the units of the cell
   * @param rowIndex Row index of the cell
   * @param colIndex Column index of the cell
   * @returns The units of the cell
   */
  public getUnitsByRowCol(rowIndex: number, colIndex: number) {
    const blockIndex = Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3)

    return {
      row: this.rows[rowIndex],
      col: this.cols[colIndex],
      block: this.blocks[blockIndex],
    }
  }
}

export default Sudoku
