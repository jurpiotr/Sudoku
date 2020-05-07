import helper from './helper';
class Timeline {
  constructor(timerHtml) {
    this.timerHtml = timerHtml;
    this.init();
  }

  init() {
    this.units = [0, 0, 0];
  }

  start() {
    if (!this.time) this.time = performance.now();
    requestAnimationFrame(this.step.bind(this));
  }

  step(timestamp) {
    this.grow(timestamp);
    this.time = timestamp;
    this.print();
    requestAnimationFrame(this.step.bind(this));
  }

  grow(timestamp) {
    let diff = timestamp - this.time;
    this.units[2] += diff / 1000;
    if (this.units[2] >= 1) {
      this.units[1] += 1;
      this.units[2] -= 1;
    }
    if (this.units[1] >= 60) {
      this.units[0] += 1;
      this.units[1] -= 60;
    }
  }

  print() {
    this.timerHtml.innerText = 
    `${helper.set0(this.units[0])} : ${helper.set0(this.units[1])}`;
  }


};
export default Timeline;