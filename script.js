const word = document.querySelector('#word');
const text = document.querySelector('#text');
const scoreEl = document.querySelector('#score');
const timeEl = document.querySelector('#time');
const endgameEl = document.querySelector('#end-game-container');
const settingsBtn = document.querySelector('#settings-btn');
const settings = document.querySelector('#settings');
const settingsForm = document.querySelector('#settings-form');
const difficultySelect = document.querySelector('#difficulty');

// набор слов 

const words = [
    'тахометр',
    'привет',
    'любовь',
    'жизнь',
    'тахометр',
    'ванилин',
    'плохой',
    'фрукт',
    'цвет',
    'изящный',
    'фальсификация',
    'антреприза',
    'страусиный',
    'консперация',
    'айва',
    'стройка',
    'конфронтация',
    'тетрахлородибензодиоксин',
    'спорт',
    'сноуборд',
    'облагодетельствованные',
    'покровительствовавшие',
    'Самоотверженность',
    'филантроп',
    'Мелкокалиберными',
    'Субсидированию'
];

let randomWord;
let score = 0;
let time = 20;

let difficulty = localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';
difficultySelect.value = localStorage.getItem('difficulty') !== null
? localStorage.getItem('difficulty')
: 'medium'; 

text.focus();

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

function updateTime() {
    time--;
    timeEl.innerHTML = time;

    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver() {
    endgameEl.innerHTML = `
    <h1>Время вышло</h1>
    <p>Ваш счёт: ${score}</p>
    <button onclick="location.reload()">Начать заново</button>`;
    endgameEl.style.display = 'flex';
}
addWordToDOM();

text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        e.target.value = '';

        if (difficulty === 'hard') {
           time += 1;
        } else if (difficulty === 'medium') {
           time += 3;
        } else {
            time += 50;
        }
        updateTime();
    }
})

settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));