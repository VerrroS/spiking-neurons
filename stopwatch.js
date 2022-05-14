var timer = document.getElementById('timer');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const delay = 100;

var offset;
var clock;
var interval;

const plot_active = document.getElementById('plot-active');
const plot_nonactive = document.getElementById('plot-nonactive');
 
function start() {
  if (interval) {
    clearInterval(interval);
    interval = null;
    startButton.children[0].setAttribute("data-icon", "carbon:play-filled-alt");
  }
  else {
    offset = Date.now();
    interval = setInterval(update, delay);
    startButton.children[0].setAttribute("data-icon", "carbon:pause-filled");
  }
}

function stop () {
  clearInterval(interval);
  interval = null;
  startButton.children[0].setAttribute("data-icon", "carbon:play-filled-alt");
}

  
function reset() {
  stop();
  clock = 0;
  render(0);
  neurons.forEach(element => element.clear());
  clearPlot();
  displayElement("block", plot_nonactive);
  displayElement("none", plot_active);
}

function update() {
  clock += delta();
  render();
}

function render() {
  timer.innerHTML = Math.round(clock / 1000);
  neurons.forEach(element => element.update(clock/ 1000));
}

function delta() {
  var now = Date.now(),
    d = now - offset;

  offset = now;
  return d;
}

startButton.addEventListener('click', start);
resetButton.addEventListener('click', reset);

