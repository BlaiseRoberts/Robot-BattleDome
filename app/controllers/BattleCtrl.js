"use strict";

app.controller('BattleCtrl', function ($scope, GameFactory, $route, BotFactory) {

/////////////////////
//Initalize Stuff
/////////////////////
  $(document).ready(()=> {
    $('.modal').modal();
  });


	
////////////////////////////////////////////////
//Set up Player and Foe
////////////////////////////////////////////////
	$scope.self = GameFactory.getSelf();
	$scope.foe = GameFactory.getFoe();

	//Make Enemy Class and Name
	if($scope.foe.gameCount > 1){
		let randomBots = ["Hacker", "Technomancer", "ProtoSoldier", "CyberAssassin", "BattleDroid", "D18Tank"];
		let botIndex = Math.floor(Math.random()*6);
		$scope.foe = Object.create(BotFactory.getBot(randomBots[botIndex]));
		let randomNames = ["Andrew", "Roxas", "Whitney", "Brenda", "Meg", "Gilbert"];
		let nameIndex = Math.floor(Math.random()*6);
		$scope.foe.name = randomNames[nameIndex];
	}

	//Add lvls to Player and Foe
	$scope.self.minHealth += $scope.self.gameCount * 10;
	$scope.self.maxHealth += $scope.self.gameCount * 10;
	$scope.self.minDamage += $scope.self.gameCount * 10;
	$scope.self.maxDamage += $scope.self.gameCount * 10;
	$scope.foe.minHealth += $scope.self.gameCount * 7;
	$scope.foe.maxHealth += $scope.self.gameCount * 7;
	$scope.foe.minDamage += $scope.self.gameCount * 7;
	$scope.foe.maxDamage += $scope.self.gameCount * 7;



//////////////////////
//////Define Health for Game
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
		Materialize.toast('-'+damage+' dmg', 2000, 'blue-grey darken-2 rounded right-toast');
		let combatLogText = `<p>Turn ${turnSelf}:  ${$scope.self.name} attacked, dealing ${damage} damage!</p>`;
		$('#combat-log').prepend(combatLogText);
		turnSelf++;
		if($scope.foe.health === 0){
			$('#youWin').modal('open');
			return;
		}
		window.setTimeout(foeAttacks, 500);
	};

	let specialAttack = ()=>{
		if ($scope.self.trait === "Electro-Cloak"){
			let combatLogText = `<p>Turn ${turnSelf}:  ${$scope.self.name} activates their Electro-Cloak and scrables systems, vanishing.</p>`;
			$('#combat-log').prepend(combatLogText);
			turnSelf++;
			let damage = getRandomInt($scope.self.minDamage, $scope.self.maxDamage);
			$scope.foe.health -= damage;
			$scope.foe.health = Math.max(0, $scope.foe.health);
			$scope.foeHealth = ($scope.foe.health / foeTotalHealth)*100;
			Materialize.toast('-'+damage+' dmg', 2000, 'blue-grey darken-2 rounded right-toast');
			combatLogText = `<p>Turn ${turnFoe}:  ${$scope.foe.name} is disoriented and ambushed by ${$scope.self.name} for ${damage} damage!</p>`;
			$('#combat-log').prepend(combatLogText);
			$scope.hasArmor = true;
			$scope.armorTurn = turnSelf;
			turnFoe++;
			if($scope.foe.health === 0){
				$('#youWin').modal('open');
			}
		} if ($scope.self.trait === "Nano Recovery"){
			let healing = (getRandomInt($scope.self.minDamage, $scope.self.maxDamage)+50);
			$scope.self.health += healing;
			$scope.selfHealth = ($scope.self.health / selfTotalHealth)*100;
			Materialize.toast('+'+healing, 2000, 'green darken-2 rounded left-toast');
			let combatLogText = `<p>Turn ${turnSelf}:  ${$scope.self.name} regenerates it's flesh with Nano Recovery bots for ${healing} health!</p>`;
			$('#combat-log').prepend(combatLogText);
			turnSelf++;
			window.setTimeout(foeAttacks, 500);
		} if ($scope.self.trait === "Alloy Armor"){
			$scope.hasArmor = true;
			$scope.armorTurn = turnSelf;
			let combatLogText = `<p>Turn ${turnSelf}:  ${$scope.self.name}'s Alloy Armor is strengthened for the next 2 turns!</p>`;
			$('#combat-log').prepend(combatLogText);
			turnSelf++;
			window.setTimeout(foeAttacks, 500);
		}
	};


	$scope.hasArmor = false;

	let foeAttacks = ()=>{
		let damage = getRandomInt($scope.foe.minDamage, $scope.foe.maxDamage);
		if ($scope.armorTurn === turnSelf-4){
			$scope.hasArmor = false;
			let armorText = `<p>Turn ${turnFoe}:  ${$scope.self.name}'s armor fades.</p>`;
			$('#combat-log').prepend(armorText);
		}
		if ($scope.hasArmor){
			if ($scope.self.trait === "Alloy Armor"){
				damage = Math.floor(damage/2); 	
			} else {
				damage = Math.floor(damage/1.2); 	
			}
		}
		$scope.self.health -= damage;
		$scope.self.health = Math.max(0, $scope.self.health);
		$scope.selfHealth = ($scope.self.health / selfTotalHealth)*100;
		Materialize.toast('-'+damage+' dmg', 2000,'rounded red darken-2 left-toast');
		let combatLogText = `<p>Turn ${turnFoe}:  ${$scope.foe.name} attacked, dealing ${damage} damage!</p>`;
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
	$scope.haveSpecial = false;


	$scope.makeAttack = ()=>{
		attackFoe();
		if (turnSelf % 5 === 0){
			$scope.haveSpecial = true;
		}
	};
	$scope.useSpecial = ()=>{
		specialAttack();
		$scope.haveSpecial = false;
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