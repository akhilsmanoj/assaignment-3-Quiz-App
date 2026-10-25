const questions = [
  {
    question: "Which keyword declares a variable that can be reassigned?",
    options: ["const", "let", "static", "define"],
    answer: "let",
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["pop()", "shift()", "push()", "slice()"],
    answer: "push()",
  },
  {
    question: "Which symbol is used for strict equality?",
    options: ["=", "==", "===", "!="],
    answer: "===",
  },
  {
    question: "Which method selects an element using a CSS selector?",
    options: [
      "querySelector()",
      "createElement()",
      "appendChild()",
      "forEach()",
    ],
    answer: "querySelector()",
  },
  {
    question: "Which method can iterate over array elements?",
    options: ["if", "forEach()", "switch", "while"],
    answer: "forEach()",
  },
  {
    question: "Which method creates a new HTML element?",
    options: [
      "querySelector()",
      "createElement()",
      "addEventListener()",
      "push()",
    ],
    answer: "createElement()",
  },
  {
    question: "Which event occurs when a button is clicked?",
    options: ["change", "submit", "click", "load"],
    answer: "click",
  },
  {
    question: "Which keyword is used to define an asynchronous function?",
    options: ["await", "async", "promise", "fetch"],
    answer: "async",
  },
];

let index = 0;
let score = 0;

const quiz = document.querySelector("#quiz");

function showQuestion() {
  quiz.innerHTML = "";

  const q = questions[index];

  const progress = document.createElement("p");
  progress.id = "progress";
  progress.textContent = `Question ${index + 1} of ${questions.length}`;
  quiz.appendChild(progress);

  const title = document.createElement("h2");
  title.id = "question";
  title.textContent = q.question;
  quiz.appendChild(title);

  q.options.forEach(function (option) {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");

    button.addEventListener("click", function () {
      checkAnswer(button, option);
    });

    quiz.appendChild(button);
  });

  const feedback = document.createElement("p");
  feedback.id = "feedback";
  quiz.appendChild(feedback);

  const next = document.createElement("button");
  next.id = "next-btn";
  next.textContent = "Next Question";
  next.disabled = true;
  quiz.appendChild(next);

  next.addEventListener("click", function () {
    index++;

    if (index < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });
}

function checkAnswer(button, option) {
  const q = questions[index];
  const buttons = document.querySelectorAll(".option-btn");
  const feedback = document.querySelector("#feedback");

  buttons.forEach(function (btn) {
    btn.disabled = true;
  });

  if (option === q.answer) {
    button.classList.add("correct");
    feedback.textContent = "Correct answer!";
    score++;
  } else {
    button.classList.add("wrong");
    feedback.textContent = "Wrong! Correct answer: " + q.answer;

    buttons.forEach(function (btn) {
      if (btn.textContent === q.answer) {
        btn.classList.add("correct");
      }
    });
  }

  document.querySelector("#next-btn").disabled = false;
}

function showResult() {
  quiz.innerHTML = "";

  const result = document.createElement("h2");
  result.id = "score";
  result.textContent = `You scored ${score} out of ${questions.length}`;
  quiz.appendChild(result);

  const feedback = document.createElement("p");
  feedback.id = "feedback";

  if (score === 8) {
    feedback.textContent = "Excellent! Perfect score!";
  } else if (score >= 6) {
    feedback.textContent = "Great job! Keep it up!";
  } else if (score >= 4) {
    feedback.textContent = "Good effort! Keep practising.";
  } else {
    feedback.textContent = "Keep learning. You can improve!";
  }

  quiz.appendChild(feedback);

  const restart = document.createElement("button");
  restart.id = "restart-btn";
  restart.textContent = "Restart Quiz";
  quiz.appendChild(restart);

  restart.addEventListener("click", function () {
    index = 0;
    score = 0;
    showQuestion();
  });
}

showQuestion();
