const ROWS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
const COLS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const ROWS_IN_SQUARE = [
   ['a', 'b', 'c'],
   ['d', 'e', 'f'],
   ['g', 'h', 'i'],
];
const COLS_IN_SQUARE = [
   [1, 2, 3],
   [4, 5, 6],
   [7, 8, 9],
];

const fieldsInRow = field => {
   const r = field[0];
   let arr = [];
   for (let i of COLS) {
      arr.push(r + i);
   }
   return arr;
};

const fieldsInCols = field => {
   const c = field[1];
   let arr = [];
   for (let i of ROWS) {
      arr.push(i + c);
   }
   return arr;
};

const inSquare = field => {
   const r = field[0];
   const c = field[1];
   let arrR = [];
   let arrC = [];
   let square = [];

   for (let tab of ROWS_IN_SQUARE) {
      tab.forEach(row => {
         if (row == r) {
            arrR = [...tab];
         }
      });
   }
   for (let tab of COLS_IN_SQUARE) {
      tab.forEach(col => {
         if (col == c) {
            arrC = [...tab];
         }
      });
   }

   arrR.map(r => {
      arrC.map(c => {
         square.push(r + c);
      });
   });

   return square.sort();
};

export const peers = field => {
   let u = [];
   const uniquePeer = (a, b, c) => {
      return (u = [...a, ...b, ...c].sort().filter((val, i, arr) => {
         return field !== val && (!i || val != arr[i - 1]);
      }));
   };
   return uniquePeer(fieldsInRow(field), fieldsInCols(field), inSquare(field));
};

export const permutation = (obj, loop) => {
   let permBoard = { ...obj };
   const findRow = () => {
      const row = [...ROWS];
      const search = row[Math.floor(Math.random() * 9)];
      return search;
   };
   const findCols = () => {
      const col = [...COLS];
      const search = col[Math.floor(Math.random() * 9)];
      return search;
   };

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
      const rows = [...ROWS_IN_SQUARE];
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
                  if (!pairs.includes(crossCell1 || crossCell2 || a || cell)) {
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
         let r = findRow();
         let c = findCols();
         peersToChange(COLS_IN_SQUARE, peers, c, ROWS);
         peersToChange(ROWS_IN_SQUARE, peers, r, COLS);
      }
      permBoard = pairSwap(permBoard);
   }
   substitutionOfNumbers(permBoard, 1);
   return permBoard;
};
