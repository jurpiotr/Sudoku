const ROWS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
const COLS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const ROWS_IN_SQUARE = [
   ['a', 'b', 'c'],
   ['d', 'e', 'f'],
   ['g', 'h', 'i']
];

const COLS_IN_SQUARE = [
   [1, 2, 3],
   [4, 5, 6],
   [7, 8, 9]
];

export const fieldsInRow = field => {
   const r = field.charAt(0);
   let arr = [];
   for (let i of COLS) {
      arr.push(r + i);
   }
   return arr;
};

export const fieldsInCols = field => {
   const c = field.charAt(1);
   let arr = [];
   for (let i of ROWS) {
      arr.push(i + c);
   }
   return arr;
};

export const inSquare = field => {
   const r = field.charAt(0);
   const c = field.charAt(1);
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
      //   console.log(search)
      return search;
   };
   const findCols = () => {
      const col = [...COLS];

      const search = col[Math.floor(Math.random() * 9)];
      return search;
   };

   const bothPeer = () => {
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
               //      console.log('aaaaa colsy' +xy)
               //      console.log('aaaaCYFERKA-     ' +doom)
               xy.forEach(o => {
                  if (o !== doom) {
                     //           console.log(isNaN(doom));
                     //           console.log(typeof doom)
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

      const substitutionOfNumbers = board => {
         let permBoard2 = { ...board };
         let x = [];
         let y = [];
         const firstRandomCell = Math.ceil(Math.random() * 9);
         let secondRandomCell = Math.ceil(Math.random() * 9);
         while (secondRandomCell === firstRandomCell) {
            secondRandomCell = Math.ceil(Math.random() * 9);
         }
         console.log(firstRandomCell);
         console.log(secondRandomCell);
         for (let cell in permBoard2) {
            if (board[cell] === firstRandomCell) {
               x.push(cell);
            } else if (board[cell] === secondRandomCell) {
               y.push(cell);
            }
         }

         x.forEach(val => {
            permBoard2[val] = secondRandomCell;
         });
         y.forEach(val => {
            permBoard2[val] = firstRandomCell;
         });
         return (permBoard = { ...permBoard2 });
      };

      for (let i = 0; i < loop; i++) {
         let peers = [];

         let r = findRow();
         let c = findCols();

         peersToChange(COLS_IN_SQUARE, peers, c, ROWS);

         peersToChange(ROWS_IN_SQUARE, peers, r, COLS);
      }

      for (let i = 0; i < 5; i++) {
         substitutionOfNumbers(permBoard, COLS);
      }
      return permBoard;
   };

   return bothPeer();
};
