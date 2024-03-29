import Sudoku from '../Sudoku'
import {
  formatedBlocks,
  formatedCols,
  formatedRows,
  sudokuPlain,
  sudokuSolvedPlain,
} from './SudokuPlain'

test('Solved property', () => {
  const sudoku = new Sudoku(sudokuSolvedPlain)

  expect(sudoku.solved).toStrictEqual(true)
})

test('Sudoku returns correct units of cell with given plain index', () => {
  const sudoku = new Sudoku(sudokuPlain)
  const units = sudoku.getUnitsByPlainIndex(12)

  expect(units.row).toEqual(formatedRows[1])
  expect(units.col).toEqual(formatedCols[3])
  expect(units.block).toEqual(formatedBlocks[1])
})

test('Sudoku returns correct untis of cell with given row and col index', () => {
  const sudoku = new Sudoku(sudokuPlain)
  const units = sudoku.getUnitsByRowCol(1, 3)

  expect(units.row).toEqual(formatedRows[1])
  expect(units.col).toEqual(formatedCols[3])
  expect(units.block).toEqual(formatedBlocks[1])
})

test('Format plain to rows', () => {
  const { rows } = new Sudoku(sudokuPlain)

  expect(rows).toStrictEqual(formatedRows)
})

test('Format plain to cols', () => {
  const { cols } = new Sudoku(sudokuPlain)

  expect(cols).toStrictEqual(formatedCols)
})

test('Format plain to blocks', () => {
  const { blocks } = new Sudoku(sudokuPlain)

  expect(blocks).toStrictEqual(formatedBlocks)
})
