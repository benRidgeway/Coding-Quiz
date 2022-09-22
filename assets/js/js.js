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