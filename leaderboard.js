const highScoresList = document.querySelector("#highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li class=high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");

// bubbling method - for the choices //
// create more questions - randomise the questions out of a array of multiple
// allow the user to change the timer //
