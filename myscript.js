// Global DOM references and state variables
let questionOptions = document.querySelectorAll(".Opt-panel");
let questionPanel = document.getElementById("question-panel");
let scoreField = document.querySelector("#score");
let currentQuestion = 0;
let score = 0;
let btn;

// Array of question objects (each contains a question, options, and correct answer
const questions = [
  {
    question: "What Javascript Language Is ?",
    options: [
      "1:Dynamic Language",
      "2:Asynchronous Language",
      "3:Multi-threaded Language",
      "4:Data-base Language",
    ],
    answer: 0,
  },
  {
    question: "Which company created JavaScript?",
    options: ["Google", "Netscape", "Microsoft", "Apple"],
    answer: 1,
  },
  {
    question: "What is JavaScript primarily used for?",
    options: [
      "Styling web pages",
      "Structuring web pages",
      "Adding interactivity",
      "Database management",
    ],
    answer: 2,
  },
  {
    question: "Which keyword declares a block-scoped variable?",
    options: ["var", "let", "define", "constant"],
    answer: 1,
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Oriented Module",
      "Digital Object Manager",
      "Document Order Machine",
    ],
    answer: 0,
  },
  {
    question: "Which method converts JSON text into a JS object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.toObject()",
    ],
    answer: 0,
  },
  {
    question: "What is the default value of an uninitialized variable in JS?",
    options: ["null", "undefined", "0", "NaN"],
    answer: 1,
  },
  {
    question: "Which operator checks both value AND type?",
    options: ["==", "!=", "===", "="],
    answer: 2,
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["Number", "Boolean", "Float", "Symbol"],
    answer: 2,
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: 0,
  },
];

// Displays the current question and updates option buttons + score + progress
const showQuestion = function () {
  let progress = document.getElementById("progress");
  progress.innerHTML = ` Question : ${currentQuestion + 1} Of ${
    questions.length
  }`;

  scoreField.innerHTML = `Score : ${score}`;

  questionOptions.forEach((opt) => {
    opt.classList.remove("disabled", "correct", "wrong");
    opt.classList.add("default-options");
  });
  questionPanel.innerText = questions[currentQuestion].question;

  for (let i = 0; i < questionOptions.length; i++) {
    questionOptions[i].innerText = questions[currentQuestion].options[i];
  }

};

showQuestion();

// Attach click handlers to options and pass the selected index to checkAns()
questionOptions.forEach((opt, index) => {
  opt.addEventListener("click", () => {
    setTimeout(() => checkAns(index), 400);
  });
});

// Checks if the selected option matches the correct answer and applies styles
function checkAns(checkedIndex) {
  if (currentQuestion >= questions.length) return;
  let CorrectAns = questions[currentQuestion].answer;
  if (checkedIndex === CorrectAns) {
    score++;
    questionOptions[checkedIndex].classList.add("correct");
  } else {
    questionOptions[checkedIndex].classList.add("wrong");
    questionOptions[CorrectAns].classList.add("correct");
  }

  // Delay before showing the next question so the user can see correct/wrong colors
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      gameOver();
      Restart();
    }
  }, 800);
}

// Resets score and questions so the quiz can start again
function Restart() {
  btn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    scoreField.innerHTML = `Score : ${score}`;
    showQuestion();
    btn.style.display = "none";
    questionOptions.forEach((opt) => {
      opt.classList.add("default-options");
    });
  });
}

// It Runs when quiz ends: disables options and creates the Restart button
function gameOver() {
  alert(`Game Over , You Did ${score} Right Out Of 10 `);
  let RestartBtn = document.querySelector(".Restart-btn");
  btn = document.createElement("button");
  btn.innerText = "Restart";
  btn.id = "btn";
  RestartBtn.appendChild(btn);
  questionOptions.forEach((opt) => {
    opt.classList.add("disabled");
  });
}


