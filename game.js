var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var gamePattern = [];
var audio;
var userClickedPattern = [];
var init = false;
var level = 0;
var i = 0;
var salir = true;

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
      console.log("ver secuencia")
      viewSequence();
      console.log("fin secuencia");
      userClickedPattern = [];
    }, 1000);
  }

  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    console.log("success");
  }else{
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

function viewSequence(){
  var viewPattern = "";


  setTimeout(function(){
    viewPattern = "#" + gamePattern[i];
    $(viewPattern).fadeOut(100).fadeIn(100);
    viewPattern = viewPattern.substr(1);
    console.log("mostrando" + i + viewPattern);
    playSound(viewPattern);
    i++
    if(i<gamePattern.length){
      viewSequence();
    }else{
      i=0;
      console.log("nueva secuencia");
      setTimeout(function(){
        nextsequence();
      },700);

    }
  },1000);

}
