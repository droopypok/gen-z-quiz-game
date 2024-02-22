// QUESTIONS & ANSWERS //
const questions = [
  {
    question: "What's the deal with 'stan'?",
    choice1: "Is it like a stalker fan club?",
    choice2: "Is it short for 'standstill, like when your life hits pause?",
    choice3: "Male karens?",
    choice4: "Short for Stan Lee, a comic book writer",
    answer: "Is it like a stalker fan club?",
  },
  {
    question: "When someone says 'I'm shooketh', are they:?",
    choice1:
      "Attempting to create seismic waves by shaking their hips too vigorously",
    choice2:
      "Or did they accidentally mix up their protein shake with their pre-workout?",
    choice3:
      "Or did they spot a cockroach doing the backstroke in their filet-o-fish?",
    choice4:
      "Or did they realise they missed the last episode of their favourite show?",
    answer:
      "Or did they spot a cockroach doing the backstroke in their filet-o-fish?",
  },
  {
    question: "If someone is 'Flexing' on social media, are they:",
    choice1:
      "Posting a photo of their post-workout pump in a gym changing room",
    choice2: "Practicing for a virtual Olympics in showing off?",
    choice3:
      "Or they are just really into including their new Rolex Watch in every photo grid",
    choice4: "Spending 3 hours learning what Flexbox does and still failing",
    answer:
      "Or they are just really into including their new Rolex Watch in every photo grid",
  },

  {
    question: "What's the deal with 'Yeet?",
    choice1:
      "Is it the sound you make when you shoot a boba at your friend, landing directly on his face.",
    choice2:
      "Or is it the noise your cat makes when it catapults itself off the sofa at lightning speed?",
    choice3: "Or is it a code word for the YETI just like NESSIE?",
    choice4: "Or is it the mating call ,of a rare species of internet trolls?",
    answer:
      "Is it the sound you make when you shoot a boba at your friend, landing directly on his face.",
  },
  {
    question: "When someone says 'I'm dedded', are they:",
    choice1:
      "Actually a zombie in disguise, trying to blend in with the living?",
    choice2:
      "Or did they just binge-watch Singles Inferno and the realisation that they have to wait till 35 to get a BTO sets in.",
    choice3:
      "Or did they laugh so hard at their own joke that they accidentally flatlined?",
    choice4:
      "Or did they trip over their own shoelaces for the fifth time today",
    answer:
      "Or did they laugh so hard at their own joke that they accidentally flatlined?",
  },
  {
    question: "If something is 'lit', is it:",
    choice1: "On fire, as in literally I need my abang bomba right now?",
    choice2: "Brighter than your future on a sunny day?",
    choice3: "Or is it just the high-key cooler way of saying 'dope'?",
    choice4: "Or is it short for Literally",
    answer: "Or is it just the high-key cooler way of saying 'dope'?",
  },
  {
    question: "When someone says 'Omg i'm low-key vibing', are they:",
    choice1:
      "Discussing the subtle nuances of their malfunctioning parasocial relationships?",
    choice2:
      "Riding the next generation nuclear-powered PMD without a drivers license in Singapore",
    choice3:
      "Or are they slowly enjoying their coffee in bed at 8:59AM on a Monday because Work from Home",
    choice4:
      "Or are they secretly plotting to sign up for a workout class during work hours",
    answer:
      "Or are they slowly enjoying their coffee in bed at 8:59AM on a Monday because Work from Home",
  },
];

// Global Variables needed
const MAX_QUESTIONS = questions.length;
const questionsCounter = document.querySelector(".questionCounterContainer");
const scoreCounter = document.querySelector(".scoreCounter"); // score.innerText works yay
const timer = document.querySelector(".timerContainer"); // works
const choices = Array.from(document.querySelectorAll(".answerContainer"));
const question = document.querySelector(".questionContainer");

//Music for Game
const correctMusic = new Audio();
correctMusic.src = "./audio/unimpressedyay.wav";

const wrongMusic = new Audio();
wrongMusic.src = "./audio/thatsrubbish.wav";

const offTimerMusic = new Audio();
offTimerMusic.src = "./audio/whatrudoing.wav";

const btnClick = new Audio();
btnClick.src = "./audio/btnClick.wav";

let score = 0;
let questionCounter = 0;
let timerCounter = 15;
let currentQuestion = {};
let availableQuestions = [];
let acceptingInputs = false;

// to start the game display question & choices automatically still need to update choice text
const startGame = () => {
  questionCounter = 0;
  timerCounter = 15;
  score = 0;
  availableQuestions = [...questions];
  newQuestion();
};

// to generate new questions
const newQuestion = () => {
  // conditional statement to end after no more questions
  if (availableQuestions.length === 0) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/replay.html");
    // stop the game > go to end game screen but how lol (HELP ME!!)
  }
  timer.innerText = "15s";
  startTimerFunction(16);
  timer.classList.remove("timerLow");

  // Essentially, select from available questions -> store it in current questions -> output it in innerText
  // -> remove question asked from availableQuestion (WORKING)
  const getQuestionNumber = Math.floor(
    Math.random() * availableQuestions.length
  );
  currentQuestion = availableQuestions[getQuestionNumber];
  question.innerText = currentQuestion.question;
  availableQuestions.splice(getQuestionNumber, 1);

  // Input answers into answer buttons (WORKING)
  choices.forEach((option) => {
    const number = option.dataset["number"];
    option.innerText = currentQuestion["choice" + number];
  });

  //questionCounter increment per click (WORKING)
  questionCounter++;
  questionsCounter.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  //timerCounter 15 second to 0s, when 0s reaches, display green for correct answer same as clicking

  acceptingInputs = true;
};

choices.forEach((options) => {
  options.addEventListener("click", (e) => {
    btnClick.play();
    if (!acceptingInputs) return;
    acceptingInputs = false;

    const chosenAnswerClass = e.target.classList;
    const chosenAnswer = e.target.innerText;

    //if correct -> + score
    if (chosenAnswer === currentQuestion.answer) {
      clearInterval(timerIntervalVar);
      score += 100;
      scoreCounter.innerText = score;
      correctMusic.play();

      //if true turn green and next question spawned
      choices.forEach((checkAnswer) => {
        if (checkAnswer.innerText === currentQuestion.answer) {
          checkAnswer.classList.add("correctAnswer");
        }
      });
    } else {
      clearInterval(timerIntervalVar);
      wrongMusic.play();
      // if false turn red, show correct answer, go next
      chosenAnswerClass.add("wrongAnswer");
      choices.forEach((checkAnswer) => {
        if (checkAnswer.innerText === currentQuestion.answer) {
          checkAnswer.classList.add("correctAnswer");
        }
      });
    }
    //timeout to clear colour + go next question in 5 seconds
    setTimeout(clearColouredOptions, 2500);
  });
});

function startTimerFunction(time) {
  timerIntervalVar = setInterval(timeTime, 1000);
  function timeTime() {
    time--;
    timer.innerText = `${time}s`;
    if (time < 6) {
      timer.classList.add("timerLow");
    }
    if (time <= 0) {
      acceptingInputs = false;
      clearInterval(timerIntervalVar);
      offTimerMusic.play();
      timer.innerText = "TIMES UP";

      //if run out of time, dont show answer but go next
      setTimeout(newQuestion, 5000);
    }
  }
}

function clearColouredOptions() {
  choices.forEach((checkClass) => {
    if (
      checkClass.classList.contains("wrongAnswer") ||
      checkClass.classList.contains("correctAnswer")
    ) {
      checkClass.classList.remove("wrongAnswer");
      checkClass.classList.remove("correctAnswer");
      timer.classList.remove("timerLow");
      clearInterval(timerIntervalVar);
    }
  });
  newQuestion();
}

startGame();
