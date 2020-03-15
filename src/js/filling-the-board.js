import { peers } from './positions';

const clickable = boardSudoku => {
   let activeBoardSudoku = { ...boardSudoku };
   const boardHtml = document.getElementById('board');

   boardHtml.addEventListener('mousedown', event => {
      const oldFocused = boardHtml.querySelector('.focused-cell');

      if (oldFocused !== null) {
         oldFocused.classList.remove('class', 'focused-cell');
      }

      if (
         event.target.className !== 'area' &&
         event.target.className !== 'blocked-cell'
      ) {
         event.target.classList.add('focused-cell');
      }
   });
   document.addEventListener('keydown', e => {
      const focused = boardHtml.querySelector('.focused-cell');
      const pressed = Number(e.key);
      let regKey = /[1-9]/;
      if (e.keyCode === 8) {
         focused.innerText = '';
         activeBoardSudoku[focused.id] = 0;
      }

      if (regKey.test(pressed)) {
         const peersOfFocused = peers(focused.id);
         let isUnique = true;
         peersOfFocused.forEach(peer => {
            if (pressed === activeBoardSudoku[peer]) {
               isUnique = false;
               const repeated = boardHtml.querySelector(`#${peer}`);
               repeated.classList.add('repeated');
               setTimeout(function() {
                  repeated.classList.remove('repeated');
               }, 2000);
            }
         });
         if (isUnique) {
            focused.innerText = pressed;
            activeBoardSudoku[focused.id] = pressed;
         }
      }
   });
};

export default clickable;
