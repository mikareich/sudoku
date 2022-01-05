# Sudoku Solver

Häufig ist es in Zeitschriften und Zeitungen zu finden und es gilt für viele als knifflige Herausforderung - ein Sudoku. Mit Ursprung in den Vereinigten Staaten wurde es zunächst 1984 in Japan populär, wo es auch seinen heutigen Namen bekam. Mittlerweile ist das Logikrätsel weltbekannt und bietet für viele einen unterhaltsamen Zeitvertreib.

Üblicherweise besteht ein Sudoku aus 81 Feldern, die in einem 9x9 Raster angeordnet sind. Je nach Schwierigkeit des Sudokus enthalten manche Felder Zahlen von eins bis neun, und manche Felder sind leer. Neben Zeilen und Spalten ist das Raster außerdem auch noch in neun Blöcke unterteilt, die jeweils 3 Zeilen und 3 Spalten zusammenfassen (siehe Abbildung 1).

Ziel des Spiels ist es, die leeren Felder im Sudoku mit Zahlen von eins bis neun zu füllen. Dabei dürfen die Zahlen pro Zeile, Spalte und Block nur einmal vorkommen.

![Abbildung 1](https://en.wikipedia.org/wiki/Sudoku#/media/File:Sudoku_Puzzle_by_L2G-20050714_standardized_layout.svg)

# Exact Cover Methode

Mithilfe der Schnittmenge aus den Ziffernkandidaten der entsprechenden Zeile, Spalte und dem Block soll die Ziffer für die Zelle ermittelt werden:

$D={1;2;3;4;5;6;7;8;9}$ Menge der Ziffernkandidaten

$Row_1...Row_9$ Ziffernmenge der Zeilen 1 bis 9

$Col_1...Col_9$ Ziffernmenge der Spalten 1 bis 9

$Block_{1,1}...Block_{3,3}$ Ziffernmenge der Blöcke 1,1 bis 3,3

$Cell_r,c=(D \backslash Row_r)\cap(D\backslash Col_c)\cap(D\backslash Block_{ \frac{r}{3} , \frac{c}{3}})$ Kandidaten für die entsprechende Zelle an der Stelle $(r,c)$.

Enthält die Schnittmenge $Cell_r,c$ nur einen Kandidaten, kann dieser für die Zelle eingetragen werden, enthält er keinen, ist die Ziffernmengen in der Zeile $Row_r$, in der Spalte $Col_c$ oder in dem Block $Block_{ \frac{r}{3} , \frac{c}{3}}$ falsch.
