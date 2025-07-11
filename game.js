var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function (event) {
  if (started === false) {
    if (userClickedPattern.length == 0 && gamePattern.length == 0) {
      $("#level-title").text("Try pressing any key please");
    }
    return;
  }
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
   $("#level-title").html(
      '<h1 id="level-title">Game Over<br/><br/>Your level was ' +
        level +
        "<br/><br/>Press any key to restart</h1>"
    );
    $(document).on("keypress click", function () {
      startOver();
    });
  }
}

function startOver() {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  started = false;
  start();
}

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  level++;
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
  $("#level-title").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function start() {
  $(document).off("keypress click");
  $(document).on("keypress click", function () {
    if (!started) {
      userClickedPattern = [];
      nextSequence();
      started = true;
    }
  });
}

start();
