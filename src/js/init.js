import config from './config';
import solvedSudoku from './board.json';
import { Board } from './Board';
import { generateNewBoard, editContextField, setKey, setTile } from './draw-and-fill';
import Timeline from './timer';
import ScoreHandling from './ScoreHandling';

export const init = () => {
    const boardHtml = document.querySelector('.board');
    const menuButtons = document.querySelector('.menu__buttons');
    const menuTiles = document.querySelector('.menu__tiles');
    const timerHtml = document.querySelector('.timer');
    const bgScores = document.querySelector('.bg-scores');
    const contain = document.querySelector('.scores__contain');
    const board = new Board(solvedSudoku);
    const timeline = new Timeline(timerHtml);
    const scoreHandling = new ScoreHandling;

    menuButtons.addEventListener('click', event => {
        if (event.target.id === 'generate') {
            board.permutation(board.solvedSudoku, 10);
            config.state = board.solvedSudoku;
            const newBoard = board.eliminate(board.solvedSudoku, 40);
            config.stateWithEmpty = newBoard;
            generateNewBoard(newBoard);
            timeline.start();
            config.stateCurrent = { ...config.stateWithEmpty };
        }
        if (event.target.id === 'repeat') {
            generateNewBoard(config.stateWithEmpty);
            config.stateCurrent = { ...config.stateWithEmpty };
        }
        if (event.target.id === 'scores') {
            scoreHandling.showScores();
        }
    });
    
    bgScores ? bgScores.addEventListener('click', () => {
        bgScores.style.display = 'none';
        contain.innerHTML = '';
    }) : null;

    boardHtml.addEventListener('mousedown', event => {
        editContextField(event);
    });
    document.addEventListener('keydown', event => {
        const key = setKey(boardHtml, event);
        key ? scoreHandling.save(timeline.units[0], timeline.units[1]) : null;
        contain.children[0].classList.add('scores--current-row');
    });
   
    menuTiles.addEventListener('click', event => {
        const focused = boardHtml.querySelector('.board__cell--focused');
        focused !== null ? setTile(focused, event) : null; 
    })
};
export default init();
