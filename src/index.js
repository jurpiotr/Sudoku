import './sass/index.scss';
import foundedFieldsToEliminate from './js/eliminator';
import initFillBoard from './js/init-fill-board';

import fillingTheBoard from './js/filling-the-board';


initFillBoard(foundedFieldsToEliminate);
fillingTheBoard(foundedFieldsToEliminate);

