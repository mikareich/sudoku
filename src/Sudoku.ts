export type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type DigitWithZero = 0 | Digit

export type DigitSet = Digit[]

export type DigitSetWithZero = DigitWithZero[]

export interface Cell {
  value: DigitWithZero
  candidates: DigitSetWithZero
}

export type Unit = Cell[]

/** Interprets and splits sudoku */
class Sudoku {
  /** Possible digits of a unit */
  static DIGIT_SET: DigitSet = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  /** Format plain index to index of cell in all untis
   * @param plainIndex Index of the cell in plain digit set
   * @returns Index of the cell in all units
   */
  static plainIndexToUnitIndex(plainIndex: number) {
    const rowIndex = Math.floor(plainIndex / 9)
    const colIndex = plainIndex % 9
    const blockIndex =
      Math.floor(plainIndex / 27) * 3 + (Math.floor(plainIndex / 3) % 3)

    return {
      rowIndex,
      colIndex,
      blockIndex,
    }
  }

  /** Format digit set to unit
   * @param digitSet Digit set of the unit
   */
  private static formatUnit(unit: DigitSetWithZero): Unit {
    return unit.map((value) => ({
      value,
      candidates: Sudoku.DIGIT_SET.filter((digit) => digit !== value),
    }))
  }

  /**
   * Filters and returns digit set of the unti
   * @param unit Unit to filter
   * @returns Digit set of the unit
   */
  public static getDigitSet(unit: Unit): DigitSetWithZero {
    return unit.map((cell) => cell.value)
  }

  /**
   * Format plain digit set to rows
   * @param plain Plain digit set of the sudoku.
   * Basically all sudoku rows side by side.
   * @returns Rows of sudoku as two-dimensional array
   */
  public static formatToRows(plain: DigitSetWithZero): Unit[] {
    // Create rows
    const rows: DigitSetWithZero[] = []
    // Slice always 9 digits from plain array
    for (let i = 0; i < 9; i += 1) {
      rows.push(plain.slice(i * 9, i * 9 + 9))
    }
    return rows.map(Sudoku.formatUnit)
  }

  /**
   * Format plain digit set to cols
   * @param plain Plain digit set of the sudoku.
   * Basically all sudoku rows side by side.
   * @returns Cols of sudoku as two-dimensional array
   */
  public static formatToCols(plain: DigitSetWithZero): Unit[] {
    // Create cols
    const cols: DigitSetWithZero[] = []
    for (let colIndex = 0; colIndex < 9; colIndex += 1) {
      const col: DigitSetWithZero = []
      for (let rowIndex = 0; rowIndex < 9; rowIndex += 1) {
        // Fetches every ninth digit plus colIndex
        col.push(plain[rowIndex * 9 + colIndex])
      }

      cols.push(col)
    }

    return cols.map(Sudoku.formatUnit)
  }

  /**
   * Format plain digit set to blocks
   * @param plain Plain digit set of the sudoku.
   * Basically all sudoku rows side by side.
   * @returns Blocks of sudoku as two-dimensional array
   */
  public static formatToBlocks(plain: DigitSetWithZero): Unit[] {
    const blocks: DigitSetWithZero[] = []
    for (let blockIndex = 0; blockIndex < 9; blockIndex += 1) {
      const blockStartIndex = blockIndex * 3 + Math.floor(blockIndex / 3) * 18

      const block: DigitSetWithZero = [
        ...plain.slice(blockStartIndex, blockStartIndex + 3),
        ...plain.slice(blockStartIndex + 9, blockStartIndex + 9 + 3),
        ...plain.slice(blockStartIndex + 18, blockStartIndex + 18 + 3),
      ]

      blocks.push(block)
    }

    return blocks.map(Sudoku.formatUnit)
  }

  /** Plain digit set of the sudoku. Basically all sudoku rows side by side. */
  public plain: DigitSetWithZero = []

  /** Rows of sudoku as two-dimensional array */
  public rows: Unit[] = []

  /** Cols of sudoku as two-dimensional array */
  public cols: Unit[] = []

  /** Blocks of sudoku as two-dimensional array */
  public blocks: Unit[] = []

  /**
   * Interprets and splits sudoku
   * @param plain Plain digit set of the sudoku. Basically all sudoku rows side by side.
   */
  constructor(plain: DigitSetWithZero) {
    this.plain = plain

    this.rows = Sudoku.formatToRows(plain)
    this.cols = Sudoku.formatToCols(plain)
    this.blocks = Sudoku.formatToBlocks(plain)
  }

  /**
   * Returns units of the cell
   * @param plainIndex Index of the cell in plain digit set
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
