var timeRemain = document.querySelector('#timer');
var startBtn = document.querySelector('#start-quiz');
var questions= document.querySelector('.cardBody');
var answerBtns = document.querySelector('.container'); 
var timeSec = 30;
var questionEl = document.querySelector('#question-text');
var btnA = document.getElementById('A');
var btnB = document.getElementById('B');
var btnC = document.getElementById('C');
var btnD = document.getElementById('D');

var questionsObj = [{
    question: 'Which of these is an array?',
    answers: ['20', 'var = array', '[Cody, Blake, Jeremy, Bob]', 'true'],
    correct: '[Cody, Blake, Jeremy, Bob]',
},
{
    question: 'Which of these is a boolean?',
    answers: ['20', 'var = array', '[Cody, Blake, Jeremy, Bob]', 'true'],
    correct: 'true',
},
{
    question: 'Which of these is a variable?',
    answers: ['20', 'var = array', '[Cody, Blake, Jeremy, Bob]', 'true'],
    correct: 'var = array',
},
{
    question: 'Which of these is a number?',
    answers: ['20', 'var = array', '[Cody, Blake, Jeremy, Bob]', 'true'],
    correct: '20',
}
]
console.log(questionsObj[0]);

// Adds timer Text
timeRemain.innerHTML = `Time Remaining: ${timeSec}`;

// Creates timer functionality
function countDown () {setInterval (function () {
    timeSec--;
    timeRemain.innerHTML = `Time Remaining: ${timeSec}`;},1000)
}

var currentQuestion = 0;



function startQuiz () {
    
    currentQuestion++;
    answerBtns.classList.remove('hide');
    questions.classList.add('hide');
    setQuestions();
    countDown();

}



function setQuestions() {
    var currentQ = questionsObj[currentQuestion];
    questionEl.textContent = currentQ.question;
    btnA.textContent = questionsObj[currentQuestion].answers[0];
    btnB.textContent = questionsObj[currentQuestion].answers[1];
    btnC.textContent = questionsObj[currentQuestion].answers[2];
    btnD.textContent = questionsObj[currentQuestion].answers[3];

}

function checkAns (selectAnswer) {
    var correctAns = questionsObj[currentQuestion].correct;
    if (selectAnswer === correctAns) {
        alert('Correct!');
    }else {
        alert('Wrong!');
    }

    if (currentQuestion < questionsObj.length) {  
       
       stopQuiz();
       
    }else {
        setQuestions();
        currentQuestion++;
    }
}

function stopQuiz() {
    clearInterval(timeRemain);
}

// btnA.addEventListener('click', function () {checkAns(btnA.textContent)});
// btnB.addEventListener('click', function () {checkAns(btnB.textContent)});
// btnC.addEventListener('click', function () {checkAns(btnC.textContent)});
// btnD.addEventListener('click', function () {checkAns(btnD.textContent)});

// function question1 () {
//     cardText.innerHTML = 'Question 1';
//     questions.innerHTML = 'Which of these is an array?'
//     var answers = document.createElement("ol");
//     var ans1 = document.createElement("li");
//     var ans2 = document.createElement("li");
//     var ans3 = document.createElement("li");
//     ans1.innerHTML = "['John', 'Alex', 'Cody', 'Blake']";
//     questions.append(ans1);
// }

document.getElementById("start-button").addEventListener('click', console.log("clicked!"));

