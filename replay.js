//selectors
const playername = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

//getting stored Highscores to input into leaderboard
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

finalScore.innerText = mostRecentScore;

playername.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

//function to save highscore
const saveHighScore = (e) => {
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value,
  };
  highScores.push(score);

  highScores.sort((a, b) => {
    return b.score - a.score;
  });
  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("./");
};
