const quizData = [
  {
    question: 'What does HTML stand for?',
    options: ['Hyperlinks and Text Marking Language', 'HomeTool Markup Language', 'HyperTool Multi Language', 'HyperText Markup Language'],
    answer: 'HyperText Markup Language',
  },
  {
    question: 'What tag is used to insert an image in HTML?',
    options: ['<image>', '<picture>', '<img>', '<src>'],
    answer: '<img>',
  },
  {
    question: 'How do you create a link in HTML?',
    options: ['<link href="URL">click</link>', '<a> https://example.com </a>', '<url link="URL">Link</url>', '<a href="URL">Link</a>'],
    answer: '<a href="URL">Link</a>',
  },
  {
    question: 'What does CSS stand for?',
    options: ['Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style Sheets', 'Colorful Styling Source'],
    answer: 'Cascading Style Sheets',
  },
  {
    question: 'How do you change the background color in CSS?',
    options: ['bgcolor', 'background-color', 'color-bg', 'bg-color'],
    answer: 'background-color',
  },
  {
    question: 'How do you declare a variable in Javascript?',
    options: ['variable x = 5;', 'int x = 5;', 'let x = 5;', 'var x = 5;'],
    answer: 'let x = 5;',
  },
  {
    question: 'What symbol is used for single-line comments in Javascript?',
    options: ['<!--comment-->', '// comment', '## comment', '/*comment*/'],
    answer: '// comment',
  },
  {
    question: 'How do you select an element by ID in Javascript?',
    options: ['getElement("id")', 'querySelectorAll("#id")', 'document.getElementById("id")', 'selectElementById("id")'],
    answer: 'document.getElementById("id")',
  },
  {
    question: 'How do you make text bold in HTML?',
    options: ['<strongtext> Bold </strongtext>', '<b> or <strong>', '<bold> bold <bold>', 'font-weight="bold"'],
    answer: '<b> or <strong>',
  },
  {
    question: 'Which is an external CSS file extension?',
    options: ['.css', '.html', '.xml', '.js'],
    answer: '.css',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}


submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);

displayQuestion();