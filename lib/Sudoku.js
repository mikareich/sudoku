"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Interprets and splits sudoku */
class Sudoku {
    /**
     * Interprets and splits sudoku
     * @param plain Plain digit set of the sudoku. Basically all sudoku rows side by side.
     */
    constructor(plain) {
        /** Plain cells of the sudoku. Basically all sudoku rows side by side. */
        this.plain = [];
        this.plain = Sudoku.formatUnit(plain);
    }
    /** Format plain index to index of cell in all untis
     * @param plainIndex Index of the cell in plain digit set
     * @returns Index of the cell in all units
     */
    static plainIndexToUnitIndex(plainIndex) {
        const rowIndex = Math.floor(plainIndex / 9);
        const colIndex = plainIndex % 9;
        const blockIndex = Math.floor(plainIndex / 27) * 3 + (Math.floor(plainIndex / 3) % 3);
        return {
            rowIndex,
            colIndex,
            blockIndex,
        };
    }
    /** Format digit set to unit
     * @param digitSet Digit set of the unit
     */
    static formatUnit(unit) {
        return unit.map((value) => ({
            value,
            candidates: value === 0 ? Sudoku.DIGIT_SET : [],
        }));
    }
    /**
     * Filters and returns digit set of the unit
     * @param unit Unit to filter
     * @returns Digit set of the unit
     */
    static getDigitSet(unit) {
        return unit.map((cell) => cell.value);
    }
    /**
     * Format plain digit set to rows
     * @param plain Plain digit set of the sudoku.
     * Basically all sudoku rows side by side.
     * @returns Rows of sudoku as two-dimensional array
     */
    static formatToRows(plain) {
        // Create rows
        const rows = [];
        // Slice always 9 digits from plain array
        for (let i = 0; i < 9; i += 1) {
            rows.push(plain.slice(i * 9, i * 9 + 9));
        }
        return rows;
    }
    /**
     * Format plain digit set to cols
     * @param plain Plain digit set of the sudoku.
     * Basically all sudoku rows side by side.
     * @returns Cols of sudoku as two-dimensional array
     */
    static formatToCols(plain) {
        // Create cols
        const cols = [];
        for (let colIndex = 0; colIndex < 9; colIndex += 1) {
            const col = [];
            for (let rowIndex = 0; rowIndex < 9; rowIndex += 1) {
                // Fetches every ninth digit plus colIndex
                col.push(plain[rowIndex * 9 + colIndex]);
            }
            cols.push(col);
        }
        return cols;
    }
    /**
     * Format plain digit set to blocks
     * @param plain Plain digit set of the sudoku.
     * Basically all sudoku rows side by side.
     * @returns Blocks of sudoku as two-dimensional array
     */
    static formatToBlocks(plain) {
        const blocks = [];
        for (let blockIndex = 0; blockIndex < 9; blockIndex += 1) {
            const blockStartIndex = blockIndex * 3 + Math.floor(blockIndex / 3) * 18;
            const block = [
                ...plain.slice(blockStartIndex, blockStartIndex + 3),
                ...plain.slice(blockStartIndex + 9, blockStartIndex + 9 + 3),
                ...plain.slice(blockStartIndex + 18, blockStartIndex + 18 + 3),
            ];
            blocks.push(block);
        }
        return blocks;
    }
    /** Rows of sudoku as two-dimensional array */
    get rows() {
        return Sudoku.formatToRows(this.plain);
    }
    /** Cols of sudoku as two-dimensional array */
    get cols() {
        return Sudoku.formatToCols(this.plain);
    }
    /** Blocks of sudoku as two-dimensional array */
    get blocks() {
        return Sudoku.formatToBlocks(this.plain);
    }
    /** Indicates whether the sudoku is solved */
    get solved() {
        const sortAndStringify = (unit) => JSON.stringify(Sudoku.getDigitSet(unit).sort());
        const numberSequenceStringified = JSON.stringify(Sudoku.DIGIT_SET);
        const rowsFilled = this.rows
            .map(sortAndStringify)
            .every((row) => row === numberSequenceStringified);
        const colsFilled = this.cols
            .map(sortAndStringify)
            .every((col) => col === numberSequenceStringified);
        const blocksFilled = this.blocks
            .map(sortAndStringify)
            .every((block) => block === numberSequenceStringified);
        return rowsFilled && colsFilled && blocksFilled;
    }
    /**
     * Returns units of the cell
     * @param plainIndex Index of the cell in plain digit set
     * @returns The units of the cell
     */
    getUnitsByPlainIndex(plainIndex) {
        const rowIndex = Math.floor(plainIndex / 9);
        const colIndex = plainIndex % 9;
        const blockIndex = Math.floor(plainIndex / 27) * 3 + (Math.floor(plainIndex / 3) % 3);
        return {
            row: this.rows[rowIndex],
            col: this.cols[colIndex],
            block: this.blocks[blockIndex],
        };
    }
    /**
     * Returns the units of the cell
     * @param rowIndex Row index of the cell
     * @param colIndex Column index of the cell
     * @returns The units of the cell
     */
    getUnitsByRowCol(rowIndex, colIndex) {
        const blockIndex = Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3);
        return {
            row: this.rows[rowIndex],
            col: this.cols[colIndex],
            block: this.blocks[blockIndex],
        };
    }
    toString() {
        return this.rows
            .map((row) => row.map((cell) => cell.value).join('|'))
            .join('\n');
    }
}
/** Possible digits of a unit */
Sudoku.DIGIT_SET = [1, 2, 3, 4, 5, 6, 7, 8, 9];
exports.default = Sudoku;
