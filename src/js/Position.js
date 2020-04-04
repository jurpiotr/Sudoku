class Position {
   constructor() {
      this.ROWS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
      this.COLS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      this.ROWS_IN_SQUARE = [
         ['a', 'b', 'c'],
         ['d', 'e', 'f'],
         ['g', 'h', 'i'],
      ];
      this.COLS_IN_SQUARE = [
         [1, 2, 3],
         [4, 5, 6],
         [7, 8, 9],
      ];
   }
   randomRow() {
      return this.ROWS[Math.floor(Math.random() * 9)];
   }
   randomCol() {
      return this.COLS[Math.floor(Math.random() * 9)];
   }
   randomCell() {
      return (
         this.ROWS[Math.floor(Math.random() * 9)] +
         Math.floor(Math.random() * 9 + 1)
      );
   }
   fieldsInRow(field) {
      const r = field[0];
      let arr = [];
      for (let i of this.COLS) {
         arr.push(r + i);
      }
      return arr;
   }
   fieldsInCol(field) {
      const c = field[1];
      let arr = [];
      for (let i of this.ROWS) {
         arr.push(i + c);
      }
      return arr;
   }
   inSquare(field) {
      const r = field[0];
      const c = field[1];
      let arrR = [];
      let arrC = [];
      let square = [];

      for (let tab of this.ROWS_IN_SQUARE) {
         tab.forEach(row => {
            if (row == r) {
               arrR = [...tab];
            }
         });
      }
      for (let tab of this.COLS_IN_SQUARE) {
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
   }
   peers(field) {
      let u = [];
      const uniquePeer = (a, b, c) => {
         return (u = [...a, ...b, ...c].sort().filter((val, i, arr) => {
            return field !== val && (!i || val != arr[i - 1]);
         }));
      };
      return uniquePeer(
         this.fieldsInRow(field),
         this.fieldsInCol(field),
         this.inSquare(field)
      );
   }
}
export default Position;
