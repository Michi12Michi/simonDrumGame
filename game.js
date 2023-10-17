var buttonElements = ["w", "a", "s", "d", "j", "k", "l"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".drum").click(function() {
  var userChosenElement = $(this).attr("id");
  userClickedPattern.push(userChosenElement);
  playSound(userChosenElement);
  animatePress(userChosenElement);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      $("body").addClass("game-over");
      $("#second").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#second").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 7);
  var randomChosenElement = buttonElements[randomNumber];
  gamePattern.push(randomChosenElement);

  $("#" + randomChosenElement).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenElement);
}

function animatePress(currentElement) {
  $("#" + currentElement).addClass("pressed");
  setTimeout(function () {
    $("#" + currentElement).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}