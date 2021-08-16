var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var gamePattern = [];
var audio;
var userClickedPattern = [];
var init = false;
var level = 0;
var backgroundPattern = ["#0d1b2a", "#1b263b", "#415a77", "#778da9"];
var b = 0;


$("body").keypress(function(event){ //tambien en lugar de body puede ser document sin comillas
  if (!init){
    $("h1").text("Level " + level);
    setTimeout(function(){
      nextsequence();
    }, 500);

    init = true;
  }
})

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

// $("body").click(function(){
//   if(!init){
//     $("background").css("background-color", backgroundPattern[b]);
//     b++;
//     if(b == 3){
//       b = 0;
//     }
//   }
// })

////////// Funciones //////////

function nextsequence(){
  var randomNumber = Math.floor(Math.random()*4);

  level++;
  $("h1").text("Level " + level);
  randomChosenColour = "#" + buttonColours[randomNumber];
  $(randomChosenColour).fadeOut(100).fadeIn(100);
  randomChosenColour = randomChosenColour.substr(1);
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
};

function playSound(name){
  audio = "sounds/" + name + ".mp3"
  audio = new Audio(audio);
  audio.play();
}

function  animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern.length == gamePattern.length){
    setTimeout(function(){
      nextsequence();
      userClickedPattern = [];
    }, 1000);
  }

  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    console.log("success");
  }else{
    console.log(userClickedPattern);
    console.log(gamePattern);
    startOver();
  }


}

function startOver(){
  audio = "sounds/wrong.mp3";
  audio = new Audio(audio);
  audio.play();
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over")
  setTimeout(function(){
    $("body").removeClass("game-over")
  }, 200);
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  init = false;
}

////////// Constructor //////////
