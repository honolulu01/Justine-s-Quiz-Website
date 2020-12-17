const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const UserScores = JSON.parse(localStorage.getItem('UserScores')) || [];

const MAX_USER_SCORES = 9;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveUserScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    UserScores.push(score);
    UserScores.sort((a, b) => b.score - a.score);
    UserScores.splice(5);

    localStorage.setItem('UserScores', JSON.stringify(UserScores));
    window.location.assign('/');
};
