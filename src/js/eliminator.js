import { inSquare, fieldsInRow, fieldsInCols, peers } from './position.js';
import solvedSudoku from './board.json';

     const findRandomPlace = () => {
          const letters = ['a','b','c','d','e','f','g','h','i'];
          const place = letters[Math.floor(Math.random() * 9)]+Math.floor((Math.random() * 9)+1);
          return place;
     }

export const foundedFieldToEliminate = () => {
     for(let i = 0; i < 2; i++){
     solvedSudoku[findRandomPlace()] = 0;
     }
     for( let field in solvedSudoku){
          if(solvedSudoku[field] == 0){
          //     console.log('THIS IS PEERS:   ' + peers(field));
               const uniqVal = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          
               const tablica = peers(field).map((x) => { 
                    return solvedSudoku[x];
               })
    
               tablica.map((el) =>{
               //     console.log('el ' + el+ ' index: ' +uniqVal.indexOf(el))
               //     console.log(uniqVal)
                    uniqVal.indexOf(el) >= 0 ? uniqVal.splice(uniqVal.indexOf(el),1) : '';
               })
     
          console.log(uniqVal)
          }
     }
     
     return solvedSudoku;
}
