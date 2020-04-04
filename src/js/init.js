import config from './config';
import solvedSudoku from './board.json';
import { Board } from './Board';
import { generateNewBoard, editContextField, setKey, setTile } from './draw-and-fill';

export const init = () => {
    const board = new Board(solvedSudoku);
    const menuButtons = document.querySelector('.menu__buttons');

    menuButtons.addEventListener('click', event => {
        if (event.target.id === 'generate') {
            board.permutation(board.solvedSudoku, 10);
            config.state = board.solvedSudoku;
            const newBoard = board.eliminate(board.solvedSudoku, 40);
            config.stateWithEmpty = newBoard;
            generateNewBoard(newBoard);
            config.stateCurrent = { ...config.stateWithEmpty };
        }
        if (event.target.id === 'repeat') {
            generateNewBoard(config.stateWithEmpty);
            config.stateCurrent = { ...config.stateWithEmpty };
        }
    });

    const boardHtml = document.querySelector('.board');
    const menuTiles = document.querySelector('.menu__tiles');
    
    boardHtml.addEventListener('mousedown', event => {
        editContextField(event);
    });
    document.addEventListener('keydown', event => {
        setKey(boardHtml, event);
    });
   
    menuTiles.addEventListener('click', event => {
        const focused = boardHtml.querySelector('.board__cell--focused');
        focused !== null ? setTile(focused, event) : null;
        
    })
};
export default init();
