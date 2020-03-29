import { peers } from './positions';

const clickable = boardSudoku => {
   let activeBoardSudoku = { ...boardSudoku };
   const boardHtml = document.querySelector('.board');

   boardHtml.addEventListener('mousedown', event => {
      const oldFocused = boardHtml.querySelector('.board__cell--focused');

      if (oldFocused !== null) {
         oldFocused.classList.remove('class', 'board__cell--focused');
      }

      if (
         event.target.className !== 'board__area' &&
         event.target.classList.contains('board__cell--empty')
      ) {
         event.target.classList.add('board__cell--focused');
      }
   });
   document.addEventListener('keydown', e => {
      const focused = boardHtml.querySelector('.board__cell--focused');
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
               repeated.classList.add('board__cell--repeated');
               setTimeout(function() {
                  repeated.classList.remove('board__cell--repeated');
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
