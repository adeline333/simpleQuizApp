var questions = [
    {
        question: 'What is the capital of France?',
        choices: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        correctAnswer: 2
    },
    {
        question: 'What is the capital of Japan?',
        choices: ['Beijing', 'Seoul', 'Tokyo', 'Bangkok'],
        correctAnswer: 2
    },
    {
        question: 'What is the capital of Canada?',
        choices: ['Ottawa', 'Toronto', 'Vancouver', 'Montreal'],
        correctAnswer: 0
    },
    {
        question: 'What is the capital of Brazil?',
        choices: ['Buenos Aires', 'Lima', 'Rio de Janeiro', 'Brasília'],
        correctAnswer: 3
    },
    {
        question: 'What is the capital of Australia?',
        choices: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
        correctAnswer: 2
    },
    {
        question: 'What is the capital of Germany?',
        choices: ['Munich', 'Berlin', 'Hamburg', 'Cologne'],
        correctAnswer: 1
    },
    {
        question: 'What is the capital of India?',
        choices: ['New Delhi', 'Mumbai', 'Bangalore', 'Chennai'],
        correctAnswer: 0
    },
    {
        question: 'What is the capital of Egypt?',
        choices: ['Cairo', 'Alexandria', 'Luxor', 'Giza'],
        correctAnswer: 0
    }
];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

window.addEventListener('DOMContentLoaded', function(e) {
    displayCurrentQuestion();

    var quizMessage = document.querySelector('.quizMessage');
    quizMessage.style.display = 'none';

    document.querySelector('.nextButton').addEventListener('click', function() {
        if (!quizOver) {
            var radioBtnsChecked = document.querySelector('input[type=radio]:checked');

            if (radioBtnsChecked === null) {
                quizMessage.innerText = 'Please select an answer';
                quizMessage.style.display = 'block';
            } else {
                quizMessage.style.display = 'none';
                if (parseInt(radioBtnsChecked.value) === questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++;

                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    document.querySelector('.nextButton').innerText = 'Play Again?';
                    quizOver = true;
                }
            }
        } else {
            quizOver = false;
            document.querySelector('.nextButton').innerText = 'Next Question';
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });
});

function displayCurrentQuestion() {
    var question = questions[currentQuestion].question;
    var questionClass = document.querySelector('.quizContainer > .question');
    var choiceList = document.querySelector('.quizContainer > .choiceList');
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    questionClass.innerText = question;

    // Remove all current <li> elements (if any)
    choiceList.innerHTML = '';

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        var li = document.createElement('li');
        li.innerHTML = '<input type="radio" value="' + i + '" name="dynradio" />' + choice;
        choiceList.appendChild(li);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    document.querySelector('.quizContainer > .result').innerText = 'You scored: ' + correctAnswers + ' out of ' + questions.length;
    document.querySelector('.quizContainer > .result').style.display = 'block';
}

function hideScore() {
    document.querySelector('.result').style.display = 'none';
}
