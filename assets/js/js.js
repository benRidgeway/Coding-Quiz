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