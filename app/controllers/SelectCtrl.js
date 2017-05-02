"use strict";

app.controller("SelectCtrl", function ($scope, BotFactory, GameFactory) {

/////////////////////
//Initalize Stuff
/////////////////////
  $(document).ready(()=> {
    $('select').material_select();
  });

  let selectSound = new Audio("sound/selectSound.wav");
  
  $scope.setSelfBot = ()=>{
    let sound = selectSound.cloneNode();
    sound.play();
  	$scope.self = Object.create(BotFactory.getBot($scope.selfBot));
  	console.log("self = ", $scope.self);
  };
  $scope.setFoeBot = ()=>{
    let sound = selectSound.cloneNode();
    sound.play();
  	$scope.foe = Object.create(BotFactory.getBot($scope.foeBot));
  	console.log("foe = ", $scope.foe);
  };

  $scope.setBattleBots = ()=>{
    let sound = selectSound.cloneNode();    
    sound.play();
  	GameFactory.setSelf($scope.self);
  	GameFactory.setFoe($scope.foe);
  };





















});