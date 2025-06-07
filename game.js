const notes = [
  {name: 'C4', freq: 261.63, pos: 100}, // ド
  {name: 'D4', freq: 293.66, pos: 90},  // レ
  {name: 'E4', freq: 329.63, pos: 80},  // ミ
  {name: 'F4', freq: 349.23, pos: 70},  // ファ
  {name: 'G4', freq: 392.00, pos: 60},  // ソ
  {name: 'A4', freq: 440.00, pos: 50},  // ラ
  {name: 'B4', freq: 493.88, pos: 40},  // シ
  {name: 'C5', freq: 523.25, pos: 30},  // ド
];

const staff = document.getElementById('staff');
const scoreEl = document.getElementById('score');
const startBtn = document.getElementById('start');
let current = null;
let score = 0;

// オーディオコンテキスト
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// ノート要素を作成
function createNotes() {
  notes.forEach((note, i) => {
    const el = document.createElement('div');
    el.className = 'note';
    el.style.left = `${20 + i * 55}px`;
    el.style.top = `${note.pos}px`;
    el.dataset.name = note.name;
    el.addEventListener('click', onNoteClick);
    staff.appendChild(el);
  });
}

function playTone(freq) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  gain.gain.value = 0.2;
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 1);
}

function nextQuestion() {
  current = notes[Math.floor(Math.random() * notes.length)];
  playTone(current.freq);
}

function onNoteClick(e) {
  if (!current) return;
  const guess = e.target.dataset.name;
  if (guess === current.name) {
    score++;
    scoreEl.textContent = `得点: ${score}`;
  }
  nextQuestion();
}

startBtn.addEventListener('click', () => {
  score = 0;
  scoreEl.textContent = '得点: 0';
  if (!staff.querySelector('.note')) {
    createNotes();
  }
  nextQuestion();
});

