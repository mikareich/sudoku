"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sudoku_1 = require("./Sudoku");
class Solver {
    constructor(sudoku) {
        this.sudoku = sudoku;
    }
    solve() {
        return __awaiter(this, void 0, void 0, function* () {
            const startTimestamp = Date.now();
            while (!this.sudoku.solved) {
                // use exact cover method to update candidates
                Solver.EXACT_COVER(this.sudoku);
                let cellFilled = false;
                // fill cells with only one candidate
                this.sudoku.plain.forEach((cell) => {
                    if (cell.candidates.length === 1) {
                        cellFilled = true;
                        // eslint-disable-next-line prefer-destructuring
                        cell.value = cell.candidates[0];
                        cell.candidates = [];
                    }
                });
                if (!cellFilled)
                    throw new Error('No solution found');
            }
            const endTimestamp = Date.now();
            const runtime = endTimestamp - startTimestamp;
            return { sudoku: this.sudoku, runtime, solved: this.sudoku.solved };
        });
    }
    /**
     * Updates candidates of cells based on the exact cover method
     *
     * Updates candidates based on the intersection of the digit candidates of the corresponding units
     * @param sudoku Sudoku to solve
     * @returns Updated sudoku
     */
    static EXACT_COVER(sudoku) {
        sudoku.plain.forEach((cell, cellIndex) => {
            // skip if cell is already filled
            if (cell.value === 0) {
                const { row, col, block } = sudoku.getUnitsByPlainIndex(cellIndex);
                const rowCandidates = Sudoku_1.default.getDigitSet(row);
                const colCandidates = Sudoku_1.default.getDigitSet(col);
                const blockCandidates = Sudoku_1.default.getDigitSet(block);
                const candidates = cell.candidates.filter((candidate) => !rowCandidates.includes(candidate) &&
                    !colCandidates.includes(candidate) &&
                    !blockCandidates.includes(candidate));
                cell.candidates = candidates;
            }
        });
        return sudoku;
    }
}
exports.default = Solver;
