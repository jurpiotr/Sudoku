const initFillBoard = (getFoundedBoard) => {
  const tabCells = document.querySelectorAll('.board__cell');
  tabCells.forEach((cell) => {
    const cellId = cell.id;
    if(getFoundedBoard[cellId] !== 0){
      cell.textContent = getFoundedBoard[cellId];
      cell.classList.add('board__cell--blocked');
    } else {
      cell.classList.add('board__cell--empty');
    }
    
  });
   return getFoundedBoard;
};
export default initFillBoard;