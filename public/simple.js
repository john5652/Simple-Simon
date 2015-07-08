   "use strict";

var userSequence = [];
var simonSequence = [];
var circles = document.getElementsByClassName('circle');

function fade (element) {
    	element.addClass("fade");
    setTimeout(function() {
  		element.removeClass('fade');
    }, 600);
}

function addRandom() {
     var random = Math.floor(Math.random() * 4);
     var rand = circles[random];
     var id = rand.id;
     simonSequence.push(id);
     console.log(id);
}

function start() {
    simonSequence = [];
    next();
}

function next() {
    userSequence = [];
    addRandom();
    again();
}

function again() {
    disableInput();
    $('#level').text("Level: " + simonSequence.length);
    var i = 0;
    var intervalId = setInterval(function() {
        fade($('#' + simonSequence[i]));
        i++;
        if (i >= simonSequence.length) {
            clearInterval(intervalId);
            enableInput();
        }
    }, 1000);
}

function compareClicks() {
    var sequenceError = false;
    for (var i = 0; i < userSequence.length; i++) {
      if (simonSequence[i] != userSequence[i]) {
        sequenceError = true;
        break;
      }
    }
    if (sequenceError) {
      youLose();
    } else if (userSequence.length == simonSequence.length) {
      next();
    }
}

function youLose() {
    var conf = confirm("Game over. Click to retry.");
    if(conf) {
        start();
    } else { 
    	location.reload(true);
    }
}

function userClick() {
    var userChoice = this.id;
    fade($(this));
    userSequence.push(userChoice);
    compareClicks();
}

function enableInput(){
$("#0").on("click", userClick);
$("#1").on("click", userClick);
$("#2").on("click", userClick);
$("#3").on("click", userClick);
}

function disableInput(){
$("#0").off("click", userClick);
$("#1").off("click", userClick);
$("#2").off("click", userClick);
$("#3").off("click", userClick);
}

$('#start').on('click', start);
