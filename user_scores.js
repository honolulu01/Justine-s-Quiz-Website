const UserScoresList = document.getElementById("UserScoresList");
const UserScores = JSON.parse(localStorage.getItem("UserScores")) || [];

UserScoresList.innerHTML = UserScores
  .map(score => {
    return `<li class="user-score">${score.name} - ${score.score}</li>`;
  })
  .join("");
