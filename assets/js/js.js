//function to check for highscores or create empty array if none is found

var getHighScores = function(){
    highScores = localStorage.getItem("scores");
    if (!highScores) {
        localStorage.setItem("scores", "[]");
        highScores = [];
    }
    else {
        highScores = JSON.parse(highScores);
    }
    return highScores;
}

var highScores = getHighScores();
var score = 0;
var timerCount = 100;
var timerCountEl = document.getElementById("timer-count");
var intervalId= "";
var questionNumber = 1;
var answerFeedback = "";
var currentCardHolder = document.getElementById("current-card");
var highScoreButtonEl = document.getElementById("high-score-btn");

var cardObjects = {
    quizStartCard: {
        id: "quiz-start",
        el1: "<h1>Coding Quiz</h1>",
        el2: "<p>You have 100 seconds to complete the quiz</p>",
        el3: '<button class="button" id="quiz-start-btn">Start Quiz</button>'
    },
    quizEndCard: {
        id:"quiz-end-card",
        el1: "<h3>All Done!</h3>",
        el2: "",
        el3: "<form><label for='initials'>Enter Your Initials: </label><input type='text' id='initials' name='initials'><br><div class='submit-wrapper'><button class='button' id='form-submit'>Submit</button><button class='button' id='restart-btn'>Go Back</button></div></form>"
    },
    highScoreCard: {
        id:"high-score-card",
        el1: "<h1>High Scores</h1>",
        el2: "",
        el3: "<button class='button' id='restart-btn'>Go Back</button>"
    },
    quizCards: {
        //answer property is the index of the correct answer in the array
        question1: {
            type: "question",
            id:"question1",
            el1: "<h3>JavaScript is a _____ language?</h3>",
            el2: ["Object-Oriented","Object-Based","Procedural","None of These"],
            el3: "",
            answer: 0
        },
        question2: {
            type: "question",
            id:"question2",
            el1: "<h3>Which of the following keywords is used to define a variable in Javascript?</h3>",
            el2: ["var","let","Both A and B","None of The Above"],
            el3: "",
            answer: 2
        },
        question3: {
            type: "question",
            id:"question3",
            el1: "<h3>Which of the following methods is used to access HTML elements using Javascript?</h3>",
            el2: ["getElementById()","getElementByTag()","getElementsByClassName()","Both A and C"],
            el3: "",
            answer: 3
        },
        question4: {
            type: "question",
            id:"question4",
            el1: "<h3>Upon encountering empty statements, what does the Javascript Interpreter do?</h3>",
            el2: ["Throws an Error","Ignores the Statements","Gives a Warning","None of the Above"],
            el3: "",
            answer: 1
        },
        question5: {
            type: "question",
            id:"question5",
            el1: "<h3>Which of the following methods can be used to display data in some form using Javascript?</h3>",
            el2: ["document.write()","console.log()","window.alert()","All of the Above"],
            el3: "",
            answer: 3
        },
        question6: {
            type: "question",
            id:"question6",
            el1: "<h3>How can a datatype be declared to be a constant type?</h3>",
            el2: ["const","var","let","constant"],
            el3: "",
            answer: 0
        },
        question7: {
            type: "question",
            id:"question7",
            el1: "<h3>What will be the output of the following code snippet?</h3><div class='code'>let a = 5 + '9';<br>document.write(a);</div>",
            el2: ["Compliation Error","14","Runtime Error","59"],
            el3: "",
            answer: 3
        },
        question8: {
            type: "question",
            id:"question8",
            el1: "<h3>What will be the output of the following code snippet?</h3><div class='code'>var a = 'Scaler';<br>var result = a.substring(2,4);<br>document.write(result);</div>",
            el2: ["al","ale","cal","caler"],
            el3: "",
            answer: 1
        }
    }
};

var totalQuestions = Object.keys(cardObjects.quizCards).length;

var createCardEl = function() {
    cardEl = document.createElement("div");
    cardEl.setAttribute("class","card");

    el1 = document.createElement("div");
    el1.setAttribute("class","el1");
    el2 = document.createElement("div");
    el2.setAttribute("class","el2");
    el3 = document.createElement("div");
    el3.setAttribute("class","el3");

    cardEl.appendChild(el1);
    cardEl.appendChild(el2);
    cardEl.appendChild(el3);
    return cardEl;
};

var createCard = function(cardObject) {
    cardEl = createCardEl();

    el1.innerHTML = cardObject.el1;
    el2.innerHTML = cardObject.el2;
    el3.innerHTML = cardObject.el3;
    
    if (cardObject.id === "quiz-start"){
        cardEl.setAttribute("id",cardObject.id);
    }
    else if (cardObject.id === "quiz-end-card"){
        cardEl.setAttribute("id",cardObject.id);
        el2.innerHTML = "<p>Your final score is "+score+"<p>";
    }  
    else if (cardObject.id === "high-score-card"){
        cardEl.setAttribute("id",cardObject.id);
    }

    currentCardHolder.appendChild(cardEl);
};

var createQuestionCard = function(cardObject) {
    var cardEl = createCardEl();

    el1.innerHTML = cardObject.el1;

    var unorderedListEl = document.createElement("ul");
    el2.appendChild(unorderedListEl);
    
    for (var i = 0; i < cardObject.el2.length; i++) {
        var answerButton = document.createElement("button");
        var listEl = document.createElement("li");
        answerButton.textContent = cardObject.el2[i];
        answerButton.setAttribute("class","button");
        //sets the ID of each button equal to answer-index
        answerButton.setAttribute("id","answer-"+i);
        listEl.appendChild(answerButton);
        unorderedListEl.appendChild(listEl);
    }

    el3.textContent = answerFeedback;

    currentCardHolder.appendChild(cardEl);

    var correctAnswer = document.getElementById("answer-"+cardObject.answer);

    correctAnswer.setAttribute("data-answer","correct");
};

var removeCard = function() {
    currentCardHolder.removeChild(cardEl);
};

var stopQuiz = function () {
    stopTimer();
    score=score+timerCount;
    removeCard();
    createCard(cardObjects.quizEndCard);
};

var resetQuiz = function () {
    score = 0;
    timerCount = 100;
    timerCountEl.textContent = 100;
    questionNumber = 1;
    answerFeedback = "";
};

var stopTimer = function () {
    clearInterval(intervalId);
};

var countDown = function () {
    //decrease only if timer is greater than zero
    if (timerCount > 0) {
        timerCount -= 1;
        timerCountEl.textContent = timerCount;
    }
    //otherwise set timer to 0 and end the quiz
    else {
        timerCount = 0;
        timerCountEl.textContent = 0;
        stopQuiz();
    }
};

var startTimer = function() {
    intervalId = setInterval(countDown, 1000);
};

var displayHighscores = function() {
    var highScoreTableEl = document.createElement("ul");
    highScoreTableEl.setAttribute("id", "high-score-table");
    el2.appendChild(highScoreTableEl)

    highScores.sort(function (a,b){
        return b.score - a.score;
    });

    for (var i = 0; i < highScores.length; i++){
        var scoreListEl = document.createElement("li");
        scoreListEl.innerHTML = "<div class='score-initials'>"+highScores[i].initials+"</div><div class='score'>"+highScores[i].score+"</div>"
        highScoreTableEl.appendChild(scoreListEl);
    }
};

var cardClickHandler = function(event){
    
    targetId = event.target.getAttribute("id");

   
    if (targetId === "quiz-start-btn") {
        removeCard();
        createQuestionCard(cardObjects.quizCards.question1);
        startTimer();
        return;
    }
    
    else if (targetId === "answer-0" || targetId === "answer-1" || targetId === "answer-2" || targetId === "answer-3") {
        
        if (questionNumber<totalQuestions) {
            questionNumber++;
        }
        
        else if (questionNumber === totalQuestions){
            stopQuiz();
            return;
        }
        //if the answer is correct, add 10pts to the score and set answerFeedback to correct, so it will display on the next card
        if (event.target.getAttribute("data-answer")==="correct"){
            score+=100;
            answerFeedback = "Correct!";
        }
        //if answer is incorrect, set answerFeedback to Incorrect and subtract 10 seconds from timer
        else {
            answerFeedback = "Incorrect.";
            if(timerCount>10){
            timerCount -= 10;
            }
            else{
            timerCount = 0;
            }
        }
        
        removeCard();
        
        createQuestionCard(cardObjects.quizCards["question"+questionNumber]);
        return;
    }
    
    else if (targetId === "restart-btn") {
        resetQuiz();
        removeCard();
        createCard(cardObjects.quizStartCard);
        return;
    }
 
    else if (targetId === "high-score-btn") {
        stopTimer();
        resetQuiz();
        removeCard();
        createCard(cardObjects.highScoreCard);
        displayHighScores();
    }
};

var submitHandler = function(event) {
    event.preventDefault();

    var initialsInput = document.getElementById("initials").value;

    var highScoreObj = {
        initials: initialsInput,
        score: score
    };

    highScores.push(highScoreObj);
    localStorage.setItem("scores", JSON.stringify(highScores));

    resetQuiz();
    removeCard();
    createCard(cardObjects.highScoreCard);
    displayHighScores();
};

createCard(cardObjects.quizStartCard);

currentCardHolder.addEventListener("click", cardClickHandler);

highScoreButtonEl.addEventListener("click", cardClickHandler);

currentCardHolder.addEventListener("submit", submitHandler);
