const initFillBoard = (getFoundedBoard) => {
  const tabCells = document.querySelectorAll('.area div');
  tabCells.forEach((cell) => {
    const cellId = cell.id;
    if(getFoundedBoard[cellId] !== 0){
      cell.textContent = getFoundedBoard[cellId];
      cell.setAttribute('class', 'blocked-cell');
    } else {
      cell.setAttribute('class', 'empty-cell');
    }
    
  });
   return getFoundedBoard;
};
export default initFillBoard;