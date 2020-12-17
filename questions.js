const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Quels sont les trois éléments auxquels il faut porter attention lorsque l’on note des comportements sexuels chez un enfant?",
    choice1: "Nature, fréquence, sévérité",
    choice2: "Contexte, nature, sévérité",
    choice3: "Fréquence, nature, contexte",
    answer: 1 //Q1
  },
  {
    question: "Comment peut-on décrire la sexualité à l’enfance?",
    choice1: "Allo-érotique",
    choice2: "Auto-érotique ",
    choice3: "Les deux",
    choice4: "Aucun des deux",
    answer: 2 //Q2
  },
  {
    question: "Comment faut-il réagir face aux comportements sexuels de ses enfants?",
    choice1: "Punir le comportement sévèrement;",
    choice2: "Recadrer le comportement",
    choice3: "Ouvrir la discussion",
    choice4: "Éviter d’en discuter avec son enfant",
    choice5: "Rester calme",
    choice6: "b, c et e",
    answer: 6 //Q3
  },
  {
    question: "À partir de quel âge les humains peuvent-ils avoir une réponse sexuelle (physique)?",
    choice1: "12 ans",
    choice2: "1 an",
    choice3: "Dès la naissance;",
    choice4: "3 ans	;",
    answer: 3 //Q4
  },
  {
    question: "Il y a un standard absolu et universel en matière des comportements sexuels normaux à l’enfance.",
    choice1: "Vrai",
    choice2: "Faux",
    answer: 2 //Q5
  },
  {
    question: "À quel(s) besoin(s) les comportements sexuels répondent-ils chez les enfants?",
    choice1: "Exploration;",
    choice2: "Compréhension du monde qui les entoure",
    choice3: "Se rassurer",
    choice4: "Plaisir",
    choice5: "Toutes ces réponses",
    choice6: "Aucune de ses réponses",
    answer: 5 //Q6
  },
  {
    question: "Parmi les exemples suivants, lequel n’est pas considéré comme un comportement sexuel?",
    choice1: "Toucher/frotter ses parties génitales",
    choice2: "Jouer au docteur",
    choice3: "Faire des casse-têtes",
    choice4: "Jouer à la famille",
    answer: 3 //Q7
  },
  {
    question: "En général, les comportements sexuels normaux à l’enfance se déroulent...",
    choice1: "Sans coercition",
    choice2: "Entre enfants dans la même période développementale",
    choice3: "Entre enfants de même sexe",
    choice4: "Entre enfants de sexe différent",
    choice5: "Toutes ces réponses",
    choice6: "a, b et d",
    answer: 5 //Q8
  },
  {
    question: "Lequel des comportements sexuels suivants n’est pas considéré comme étant de nature anormale?",
    choice1: "Demander à avoir des relations sexuelles",
    choice2: "Essayer de mettre sa bouche sur les organes génitaux d’une autre personne",
    choice3: "Essayer de regarder un(e) autre enfant nu(e)",
    choice4: "Mépriser les personnes de son sexe ou de l’autre sexe",
    answer: 3 //Q9
  }
];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 9;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/last.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
