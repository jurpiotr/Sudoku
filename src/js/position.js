
const rows = ['a','b','c','d','e','f','g','h','i'];
const cols = ['1','2','3','4','5','6','7','8','9'];
const rowsInSquare = [['a','b','c'],['d','e','f'],['g','h','i']];
const colsInSquare = [['1','2','3'],['4','5','6'],['7','8','9']];

export const fieldsInRow = (field) => {
     const r = field.charAt(0);
     let arr = [];
     for(let i of cols){
     arr.push(r+i);
     }
     return arr;
}

export const fieldsInCols = (field) => {
     const c = field.charAt(1);
     let arr = [];
     for(let i of rows){
     arr.push(i+c);
     }
     return arr;
}

export const inSquare = (field) => {
         
     const r = field.charAt(0);
     const c = field.charAt(1);
     let arrR = [];
     let arrC = [];
     let square = [];

     for(let tab of rowsInSquare){
          tab.forEach((row)=>{
               if(row == r){
                      arrR = [...tab];
               }
          });
     }
     for(let tab of colsInSquare){
          tab.forEach((col)=>{
               if(col == c){
                    arrC = [...tab];
               }
          });
     }

     arrR.map((r)=>{
          arrC.map((c)=>{
               square.push(r+c);
          })
     })

     return square.sort();
}

export const peers = (field) => {
     let u = [];
     const uniquePeer = (a, b, c) => {
          return u = [...a, ...b, ...c]
          .sort()
          .filter((val, i, arr) =>{
               return field !== val && (!i || val != arr[i-1]);
          });
     }
     return uniquePeer(fieldsInRow(field), fieldsInCols(field), inSquare(field))
}