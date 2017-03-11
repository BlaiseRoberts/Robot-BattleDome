"use strict";

app.controller('BattleCtrl', function ($scope, GameFactory, $route) {

/////////////////////
//Initalize Stuff
/////////////////////
  $(document).ready(()=> {
    $('.modal').modal();
  });


	
////////////////////////////////////////////////
//Set up Player and Foe along with their Health
////////////////////////////////////////////////
	$scope.self = GameFactory.getSelf();
	$scope.foe = GameFactory.getFoe();







//////////////////////
//////Define Health
//////////////////////

	function getRandomInt(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min;
	}

	$scope.self.health = getRandomInt($scope.self.minHealth, $scope.self.maxHealth);
	$scope.foe.health = getRandomInt($scope.foe.minHealth, $scope.foe.maxHealth);
	let selfTotalHealth = $scope.self.health;
	let foeTotalHealth = $scope.foe.health;
	$scope.selfHealth = ($scope.self.health / selfTotalHealth)*100;
	$scope.foeHealth = ($scope.foe.health / foeTotalHealth)*100;


////////////////////////////////////////
/////////Attack Functions
////////////////////////////////////////
	let attackFoe = ()=>{
		let damage = getRandomInt($scope.self.minDamage, $scope.self.maxDamage);
		$scope.foe.health -= damage;
		$scope.foe.health = Math.max(0, $scope.foe.health);
		$scope.foeHealth = ($scope.foe.health / foeTotalHealth)*100;
		Materialize.toast('-'+damage+' dmg', 1000, 'red darken-2 rounded right-toast');
		let combatLogText = `<p>Turn ${turnSelf}:  ${$scope.self.name} attacked, dealing ${damage}!</p>`;
		$('#combat-log').prepend(combatLogText);
		turnSelf++;
		if($scope.foe.health === 0){
			$('#youWin').modal('open');
			return;
		}
		window.setTimeout(foeAttacks, 500);
	};

	let foeAttacks = ()=>{
		let damage = getRandomInt($scope.foe.minDamage, $scope.foe.maxDamage);
		$scope.self.health -= damage;
		$scope.self.health = Math.max(0, $scope.self.health);
		$scope.selfHealth = ($scope.self.health / selfTotalHealth)*100;
		Materialize.toast('-'+damage+' dmg', 1000,'rounded red darken-2 left-toast');
		let combatLogText = `<p>Turn ${turnFoe}:  ${$scope.foe.name} attacked, dealing ${damage}!</p>`;
		$('#combat-log').prepend(combatLogText);
		turnFoe++;
		$scope.$apply();
		if($scope.self.health === 0){
			$('#youLose').modal('open');
		}
	};


////////////////////////////////////
/////////////////////Button Functions
////////////////////////////////////
	var turnSelf = 1;
	var turnFoe = 1; 

	$scope.makeAttack = ()=>{
		attackFoe();
	};

	$scope.continue = ()=>{
		$scope.self.gameCount++;
		$scope.foe.gameCount++;
		GameFactory.setSelf($scope.self);
		GameFactory.setFoe($scope.foe);
		$('#youWin').modal('close');
		$route.reload();
	};







});