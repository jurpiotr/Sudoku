import { peers } from './position';
import solvedSudoku from './board.json';

const findRandomPlace = () => {
   const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
   const place =
      letters[Math.floor(Math.random() * 9)] +
      Math.floor(Math.random() * 9 + 1);
   return place;
};

 const foundedFieldToEliminate = () => {
   let activeStateOfBoard = { ...solvedSudoku };
   let correctBoard = { ...activeStateOfBoard };
   let emptyToRemove = 0;

   let countEmptyCells = () => {
      let counter = 0;
      for (let c in activeStateOfBoard) {
         activeStateOfBoard[c] === 0 ? ++counter : '';
      }
      return counter;
   };
   const setNumber = (field, board) => {
      if (board[field] === 0) {
         const uniqVal = [1, 2, 3, 4, 5, 6, 7, 8, 9];

         const tablica = peers(field).map(x => {
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
      let correctingBoard = { ...activeStateOfBoard };
      for (; emptyToRemove !== 0 && prevEmptyToRemove !== emptyToRemove; ) {
         prevEmptyToRemove = emptyToRemove;

         for (let field in correctingBoard) {
            setNumber(field, correctingBoard);
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

   activeStateOfBoard = { ...correctBoard };
   for (let i = 0; countEmptyCells() < 40; i++) {
      let doom = findRandomPlace();
      let oldDoomValue = activeStateOfBoard[doom];

      deleteCell(doom);

      isSolvable()
         ? deleteCell(doom)
         : (activeStateOfBoard[doom] = oldDoomValue);
   }

   return activeStateOfBoard;
};

export default foundedFieldToEliminate;