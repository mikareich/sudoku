export declare type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export declare type DigitWithZero = 0 | Digit;
export declare type DigitSet = Digit[];
export declare type DigitSetWithZero = DigitWithZero[];
export interface Cell {
    value: DigitWithZero;
    candidates: DigitSet;
}
export declare type Unit = Cell[];
/** Interprets and splits sudoku */
declare class Sudoku {
    /** Possible digits of a unit */
    static DIGIT_SET: DigitSet;
    /** Format plain index to index of cell in all untis
     * @param plainIndex Index of the cell in plain digit set
     * @returns Index of the cell in all units
     */
    static plainIndexToUnitIndex(plainIndex: number): {
        rowIndex: number;
        colIndex: number;
        blockIndex: number;
    };
    /** Format digit set to unit
     * @param digitSet Digit set of the unit
     */
    private static formatUnit;
    /**
     * Filters and returns digit set of the unit
     * @param unit Unit to filter
     * @returns Digit set of the unit
     */
    static getDigitSet(unit: Unit): DigitSetWithZero;
    /**
     * Format plain digit set to rows
     * @param plain Plain digit set of the sudoku.
     * Basically all sudoku rows side by side.
     * @returns Rows of sudoku as two-dimensional array
     */
    private static formatToRows;
    /**
     * Format plain digit set to cols
     * @param plain Plain digit set of the sudoku.
     * Basically all sudoku rows side by side.
     * @returns Cols of sudoku as two-dimensional array
     */
    private static formatToCols;
    /**
     * Format plain digit set to blocks
     * @param plain Plain digit set of the sudoku.
     * Basically all sudoku rows side by side.
     * @returns Blocks of sudoku as two-dimensional array
     */
    private static formatToBlocks;
    /** Plain cells of the sudoku. Basically all sudoku rows side by side. */
    plain: Unit;
    /** Rows of sudoku as two-dimensional array */
    get rows(): Unit[];
    /** Cols of sudoku as two-dimensional array */
    get cols(): Unit[];
    /** Blocks of sudoku as two-dimensional array */
    get blocks(): Unit[];
    /**
     * Interprets and splits sudoku
     * @param plain Plain digit set of the sudoku. Basically all sudoku rows side by side.
     */
    constructor(plain: DigitSetWithZero);
    /** Indicates whether the sudoku is solved */
    get solved(): boolean;
    /**
     * Returns units of the cell
     * @param plainIndex Index of the cell in plain digit set
     * @returns The units of the cell
     */
    getUnitsByPlainIndex(plainIndex: number): {
        row: Unit;
        col: Unit;
        block: Unit;
    };
    /**
     * Returns the units of the cell
     * @param rowIndex Row index of the cell
     * @param colIndex Column index of the cell
     * @returns The units of the cell
     */
    getUnitsByRowCol(rowIndex: number, colIndex: number): {
        row: Unit;
        col: Unit;
        block: Unit;
    };
    toString(): string;
}
export default Sudoku;
