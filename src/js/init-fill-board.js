import foundedFieldsToEliminate from './eliminator';

const f = foundedFieldsToEliminate();
const initFillBoard = () => {
  const tabCells = document.querySelectorAll('.area div');
  tabCells.forEach((t) => {
    const idContent = t.id;
    t.textContent = f[idContent] ? f[idContent] : '';
  });
   return f;
};
export default initFillBoard;