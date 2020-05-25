import helper from './helper';
class ScoreHandling {

  save(min,sec) {
    const fullSec = min * 60 + sec;
    const date = new Date;
    const localDate = date.toLocaleString();
    const scoresArray = localStorage.getItem('scores') 
    ? JSON.parse(localStorage.getItem('scores')) 
    : [];
    const round = scoresArray.length + 1;
    const data = [round, min, sec, localDate, fullSec];
    scoresArray.push(data);
    localStorage.setItem('scores', JSON.stringify(scoresArray));
    this.showScores();
  }

  showScores() {
    const bgScores = document.querySelector('.bg-scores');
    const contain = document.querySelector('.scores__contain');
    const scores = JSON.parse(localStorage.getItem('scores'));
    if(scores !== null){
      scores.reverse();
      const tableRows = scoresHtml(scores);
      contain.innerHTML += tableRows;
      bgScores.style.display = 'flex';
    } else {
      bgScores.style.display = 'flex';
      const isInfo = document.querySelector('.no-results')
      console.log(isInfo)
      if(isInfo == null){
        const info = document.createElement('p');
        info.className ='no-results';
        info.innerText = 'NO RESULTS'
        bgScores.children[0].appendChild(info);
      }
    }
  }
}
const scoresHtml = (scores) => {
  const items = scores.reduce((result, score) =>{
    result += `
      <tr class="scores__row"><td>${score[0]}</td>
        <td>${helper.set0(score[1])}:${helper.set0(score[2])}</td>
        <td>${score[3]}</td>
      </tr>`;
    return result;
  },'');
  return items;
}
export default ScoreHandling;