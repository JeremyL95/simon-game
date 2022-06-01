const btnColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let hasStarted = false;
let score = 0;

$(".btn-reset").hide();

$(".btn-start").click(function () {
  if (!hasStarted) {
    nextSequence();
    hasStarted = true;
    $(".btn-start").hide();
    $(".btn-reset").show();
  }
});

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  pressedAnim(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function playSound(color) {
  let audioSource = new Audio("sounds/" + color + ".mp3");
  audioSource.play();
}

function pressedAnim(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = btnColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      score++;
      $(".score").html(`score: ${score}`);
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
  }
}

$(".btn-reset").click(function () {
  setTimeout(() => {
    gamePattern = [];
    hasStarted = false;
    score = 0;
    $(".score").html(`score: ${score}`);
    $(".btn-start").show();
    $(".btn-reset").hide();
  }, 1000);
});
