import Position from './Position';
export class Board {
   static get Pos() {
      return new Position();
   }
   constructor(solvedSudoku) {
      this.solvedSudoku = solvedSudoku;
   }

   eliminate(board, amount) {
      let activeStateOfBoard = { ...board };
      let emptyToRemove = 0;

      const countEmptyCells = () => {
         let counter = 0;
         for (let c in activeStateOfBoard) {
            activeStateOfBoard[c] == 0 ? ++counter : '';
         }
         return counter;
      };

      const setNumber = (field, board) => {
         if (board[field] === 0) {
            const uniqVal = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            const tablica = Board.Pos.peers(field).map(x => {
               return board[x];
            });

            tablica.map(el => {
               uniqVal.indexOf(el) >= 0
                  ? uniqVal.splice(uniqVal.indexOf(el), 1)
                  : '';
            });

            if (uniqVal.length === 1) {
               board[field] = uniqVal[0];
               emptyToRemove !== 0 ? --emptyToRemove : '';
            }
         }
      };

      const isSolvable = () => {
         let prevEmptyToRemove = '';
         let correctBoard = { ...activeStateOfBoard };
         for (; emptyToRemove !== 0 && prevEmptyToRemove !== emptyToRemove; ) {
            prevEmptyToRemove = emptyToRemove;
            for (let field in correctBoard) {
               setNumber(field, correctBoard);
            }
         }

         return !emptyToRemove ? true : false;
      };

      const deleteCell = doom => {
         if (activeStateOfBoard[doom]) {
            activeStateOfBoard[doom] = 0;
            ++emptyToRemove;
         }
      };


      for (; countEmptyCells() < amount; ) {
         let doom = Board.Pos.randomCell();
         let oldDoomValue = activeStateOfBoard[doom];
         deleteCell(doom);
         isSolvable()
            ? deleteCell(doom)
            : (activeStateOfBoard[doom] = oldDoomValue);
      }

      return activeStateOfBoard;
   }
   permutation(board1, loop) {
      let permBoard = { ...board1 };

      const change = peers => {
         let copyValue = [];
         peers.forEach((cell, index) => {
            if (index < 9) {
               copyValue.push(permBoard[cell]);
               permBoard[cell] = permBoard[peers[index + 9]];
            } else if (index > 8) {
               permBoard[cell] = copyValue[index - 9];
            }
         });
      };
      const peersToChange = (table, peers, doom, perpendicular) => {
         let transformPeer = [...peers];
         table.forEach(xy => {
            if (xy.includes(doom)) {
               xy.forEach(o => {
                  if (o !== doom) {
                     perpendicular.map(tab => {
                        isNaN(doom)
                           ? transformPeer.push(o + tab)
                           : transformPeer.push(tab + o);
                     });
                  }
               });
            }
         });

         change(transformPeer);
      };

      const pairSwap = board => {
         let permBoard2 = { ...board };
         const rows = [...Board.Pos.ROWS_IN_SQUARE];
         let pairs = [];

         const relativeInColumn = cell => {
            const letterInCell = cell.charAt(0);
            let arr = [];
            rows.forEach(row => {
               row.forEach(letterInSquare => {
                  if (
                     row.includes(letterInCell) &&
                     letterInSquare !== letterInCell
                  ) {
                     arr.push(letterInSquare);
                  }
               });
            });
            return arr;
         };

         for (let cell in board) {
            const relativeRows = () => {
               let allRelativeCells = [];
               relativeInColumn(cell).map(rel => {
                  for (let i = 1; i < 10; i++) {
                     allRelativeCells.push(rel + i);
                  }
               });
               return allRelativeCells;
            };

            relativeRows().map(a => {
               if (board[a] === board[cell]) {
                  const crossCell1 = a[0] + cell[1];
                  const crossCell2 = cell[0] + a[1];

                  if (
                     board[a] === permBoard2[a] &&
                     board[cell] === permBoard2[cell] &&
                     board[crossCell1] === permBoard2[crossCell2] &&
                     board[crossCell2] === permBoard2[crossCell1]
                  ) {
                     if (!pairs.includes(crossCell1 || crossCell2 || a || cell) ) {
                        pairs.push(crossCell1, crossCell2, a, cell);
                        permBoard2[crossCell2] = board[a];
                        permBoard2[crossCell1] = board[cell];
                        permBoard2[a] = board[crossCell2];
                        permBoard2[cell] = board[crossCell1];
                     }
                  }
               }
            });
         }

         return permBoard2;
      };
      const substitutionOfNumbers = (board, loop) => {
         for (let i = 0; i < loop; i++) {
            let x = [];
            let y = [];
            const firstRandomCell = Math.ceil(Math.random() * 9);
            let secondRandomCell = Math.ceil(Math.random() * 9);

            while (secondRandomCell === firstRandomCell) {
               secondRandomCell = Math.ceil(Math.random() * 9);
            }
            for (let cell in board) {
               if (board[cell] === firstRandomCell) {
                  x.push(cell);
               } else if (board[cell] === secondRandomCell) {
                  y.push(cell);
               }
            }

            x.forEach(val => {
               board[val] = secondRandomCell;
            });
            y.forEach(val => {
               board[val] = firstRandomCell;
            });
         }
         return board;
      };

      for (let i = 0; i < loop; i++) {
         for (let ii = 0; ii < 11; ii++) {
            let peers = [];
            let r = Board.Pos.randomRow();
            let c = Board.Pos.randomCol();
            peersToChange( Board.Pos.COLS_IN_SQUARE, peers, c, Board.Pos.ROWS );
            peersToChange( Board.Pos.ROWS_IN_SQUARE, peers, r, Board.Pos.COLS );
         }
         permBoard = pairSwap(permBoard);
      }
      substitutionOfNumbers(permBoard, 1);
      this.solvedSudoku = permBoard;
      
    // return permBoard;
   };
}
