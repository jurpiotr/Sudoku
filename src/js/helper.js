const helper = {
  set0: function(val) {
    if (val < 10) {
      return (val = '0' + val);
    } else {
      return val;
    }
  }
}
export default helper;