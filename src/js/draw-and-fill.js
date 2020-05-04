import { Board } from './Board';
import config from './config';

const removeFocus = () => {
    const oldFocused = document.querySelector('.board__cell--focused');
    if (oldFocused !== null) {
        oldFocused.classList.remove('class', 'board__cell--focused');
    }
}

export const generateNewBoard = newBoard => {
    removeFocus();
    const tabCells = document.querySelectorAll('.board__cell');
    tabCells.forEach(cell => {
        const cellId = cell.id;
        if (newBoard[cellId] !== 0) {
            cell.textContent = newBoard[cellId];
            cell.classList.contains('board__cell--empty')
                ? cell.classList.remove('board__cell--empty')
                : '';
            cell.classList.add('board__cell--blocked');
        } else {
            cell.textContent = '';
            cell.classList.contains('board__cell--blocked')
                ? cell.classList.remove('board__cell--blocked')
                : '';
            cell.classList.add('board__cell--empty');
        }
        cell.classList.contains('board__cell--area')
            ? cell.classList.remove('board__cell--area')
                : '';
    });
    return newBoard;
};

export const editContextField = (event) => {
    removeFocus();
    if (
        event.target.className !== 'board__area' &&
        event.target.classList.contains('board__cell--empty')
    ) {
        event.target.classList.add('board__cell--focused');
    } else if (event.target.parentNode.classList.contains('board__cell')) {
        event.target.parentNode.classList.add('board__cell--focused');
    }
};

export const setKey = (boardHtml, event) => {
    const focused = boardHtml.querySelector('.board__cell--focused');
    const pressed = Number(event.key);
    let regKey = /[1-9]/;
    if (event.keyCode === 8 || event.keyCode === 46) {
        focused.innerText = '';
        config.stateCurrent[focused.id] = 0;
        if (focused.classList.contains('board__cell--area')) {
            focused.classList.remove('board__cell--area');
        }
    }

    if (regKey.test(pressed)) {
        const peersOfFocused = Board.Pos.peers(focused.id);

        let isUnique = true;
        peersOfFocused.forEach(peer => {
            if (pressed === config.stateCurrent[peer]) {
                isUnique = false;
                const repeated = boardHtml.querySelector(`#${peer}`);
                repeated.classList.add('board__cell--repeated');
                setTimeout(function() {
                    repeated.classList.remove('board__cell--repeated');
                }, 2000);
            }
        });
        if (isUnique) {
            if (focused.classList.contains('board__cell--area')) {
                focused.classList.remove('board__cell--area');
            }
            focused.innerText = pressed;
            config.stateCurrent[focused.id] = pressed;
            if(isEndingGame(config.state, config.stateCurrent)){
                showScores();
            }
        }
    }
};

export const setTile = (focused, event) =>{
    const digit = event.target.innerText;
    const templateGrid = () => {
    return `
    <div class="board__tile"></div>
    <div class="board__tile"></div>
    <div class="board__tile"></div>
    <div class="board__tile"></div>
    <div class="board__tile"></div>
    <div class="board__tile"></div>
    <div class="board__tile"></div>
    <div class="board__tile"></div>
    <div class="board__tile"></div>
    `
    };
    if(focused.classList.contains('board__cell--area')){
        if(focused.children[digit - 1].innerText === digit){
            focused.children[digit - 1].innerText = '';
            config.stateCurrent[focused.id] = 0;
        } else {
            focused.children[digit - 1].innerText = digit;
            }
    } else {
        config.stateCurrent[focused.id] = 0;
        focused.classList.add('board__cell--area');
        focused.innerHTML = templateGrid();
        focused.children[digit - 1].innerText = digit;
    }
}

const isEndingGame = (state, current) => {
    let isEqual = true;
    
    for(const field in state){
        if(state[field] !== current[field]){
            isEqual = false;
        }
    }
    console.log(isEqual);
    return isEqual;
}
const scoresHtml = (score) =>{ 
return `
<div class="bg-scores">
    <div class="scores">
        <h3>Your Scores</h3>
        <p class="single-score">${score}<p>
    </div>
</div>
`
}
const showScores = () => {
    const windowHtml = document.querySelector('.window');
    const score = 'SCORE';
    const bgScores = scoresHtml(score);
    console.log(bgScores)
    windowHtml.innerHTML += bgScores;
}