import './sass/index.scss';
import { inSquare, fieldsInRow, fieldsInCols, peers } from './js/position.js';
import { foundedFieldToEliminate } from './js/eliminator.js';

/*
console.log(fieldsInRow(f));
console.log(fieldsInCols(f));
console.log(inSquare(f));
console.log(peers(f));
*/ 

console.log(foundedFieldToEliminate(peers));

