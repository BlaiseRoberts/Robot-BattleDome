"use strict";

app.controller("SelectCtrl", function ($scope, BotFactory, GameFactory) {

/////////////////////
//Initalize Stuff
/////////////////////
  $(document).ready(()=> {
    $('select').material_select();
  });
  
  $scope.setSelfBot = ()=>{
  	$scope.self = Object.create(BotFactory.getBot($scope.selfBot));
  	console.log("self = ", $scope.self);
  };
  $scope.setFoeBot = ()=>{
  	$scope.foe = Object.create(BotFactory.getBot($scope.foeBot));
  	console.log("foe = ", $scope.foe);
  };

  $scope.setBattleBots = ()=>{
  	GameFactory.setSelf($scope.self);
  	GameFactory.setFoe($scope.foe);
  };





















});