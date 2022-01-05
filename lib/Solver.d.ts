import Sudoku from './Sudoku';
interface SolverInfo {
    runtime: number;
    solved: boolean;
    sudoku: Sudoku;
}
declare class Solver {
    /** Sudoku to solve */
    sudoku: Sudoku;
    constructor(sudoku: Sudoku);
    solve(): Promise<SolverInfo>;
    /**
     * Updates candidates of cells based on the exact cover method
     *
     * Updates candidates based on the intersection of the digit candidates of the corresponding units
     * @param sudoku Sudoku to solve
     * @returns Updated sudoku
     */
    static EXACT_COVER(sudoku: Sudoku): Sudoku;
}
export default Solver;
