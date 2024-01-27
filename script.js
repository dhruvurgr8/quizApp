const container = document.querySelector(".mycontainer");
let finalScore = 0;
document.addEventListener("DOMContentLoaded", function () {
  let quizData = [
    {
      category: "General Knowledge",
      questions: [
        {
          question: "Who is the greatest superstar of India",
          options: [
            "Puneet SuperStarrrr",
            "Punit SuperStar",
            "Punneet SuperStar",
            "Puneet SuperStarrrrr",
          ],
          answer: "Puneet SuperStarrrr",
        },
        {
          question: "What is the capital of India?",
          options: ["Mumbai", "New Delhi", "Bangalore", "Chennai"],
          answer: "New Delhi",
        },
        {
          question: "What is the capital of France?",
          options: ["Berlin", "Madrid", "Paris", "Rome"],
          answer: "Paris",
        },
        {
          question: "Which planet is known as the Red Planet?",
          options: ["Mars", "Jupiter", "Venus", "Saturn"],
          answer: "Mars",
        },
        {
          question: "Who is the prime minister of India",
          options: [
            "Pranab MukharJi",
            "Narendra Modi",
            "Amit Shah",
            "Yogi AdityaNath",
          ],
          answer: "Narendra Modi",
        },
      ],
    },
  ];

  let currentCategoryIndex = 0;
  let currentQuestionIndex = 0;
  let userScore = 0;

  function showQuestion() {
    const questionData =
      quizData[currentCategoryIndex].questions[currentQuestionIndex];
    const quizContainer = document.getElementById("quizContainer");

    const questionHTML = `
    <div class="question my-question">
        <h2>${questionData.question}</h2>
        <ul>
            ${questionData.options
              .map(
                (option, index) => `
                    
                        <span class="items">
                            <button class="btn mt-3 option-btn">${option}</button>
                        </span>
                        
                    `
              )
              .join("")}
        </ul>
        <div class="btngroup">
        
        <button class="btn btn-primary" id="prevBtn" class="btn btn-secondary mt-3 mr-3">Previous</button>
        <button class="btn btn-success" id="submitBtn" class="btn btn-primary mt-3">Submit</button>
        <button class="btn btn-warning px-4" id="nextBtn" class="btn btn-primary mt-3">Next</button>
        
        </div>
    </div>
    `;

    quizContainer.innerHTML = questionHTML;

    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons.forEach((button, index) => {
      button.addEventListener("click", () => checkAnswer(index));
    });

    const nextButton = document.getElementById("nextBtn");
    nextButton.addEventListener("click", nextQuestion);

    const prevButton = document.getElementById("prevBtn");
    prevButton.addEventListener("click", previousQuestion);

    const submitButton = document.getElementById("submitBtn");
    submitButton.addEventListener("click", displayResults);
  }
  function checkAnswer(selectedIndex) {
    const selectedOption =
      quizData[currentCategoryIndex].questions[currentQuestionIndex].options[
        selectedIndex
      ];
    const correctAnswer =
      quizData[currentCategoryIndex].questions[currentQuestionIndex].answer;

    if (selectedOption === correctAnswer) {
      userScore++;
    }

    nextQuestion();
  }

  function nextQuestion() {
    currentQuestionIndex++;

    if (
      currentQuestionIndex >= quizData[currentCategoryIndex].questions.length
    ) {
      currentCategoryIndex++;
      currentQuestionIndex = 0;
    }

    if (currentCategoryIndex < quizData.length) {
      showQuestion();
    } else {
      displayResults();
    }
  }

  function previousQuestion() {
    currentQuestionIndex--;

    if (currentQuestionIndex < 0) {
      currentCategoryIndex--;

      if (currentCategoryIndex < 0) {
        currentCategoryIndex = 0;
        currentQuestionIndex = 0;
      } else {
        currentQuestionIndex =
          quizData[currentCategoryIndex].questions.length - 1;
      }
    }

    showQuestion();
  }

  function displayResults() {
    finalScore = userScore;
    const quizContainer = document.getElementById("quizContainer");
    const resultsHTML = `
      <div class="results">
        <span class="score">Your score: ${userScore}</span>
      </div>
    `;

    quizContainer.innerHTML = resultsHTML;
  }

  const startQuizButton = document.querySelector(".start-quiz");
  startQuizButton.addEventListener("click", function () {
    container.classList.toggle("hide-modal");
    console.log("quiz started");
    currentCategoryIndex = 0;
    currentQuestionIndex = 0;
    userScore = 0;

    showQuestion();
  });

  document
    .getElementById("prevBtn")
    .addEventListener("click", previousQuestion);

  // Submit button added here
  const submitButton = document.getElementById("submitBtn");
  submitButton.addEventListener("click", function () {
    displayResults();
  });
});

// This is the final code
