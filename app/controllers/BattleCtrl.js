"use strict";

app.controller('BattleCtrl', function ($scope, GameFactory, $route, BotFactory) {

/////////////////////
//Initalize Stuff
/////////////////////
  $(document).ready(()=> {
    $('.modal').modal({
	      dismissible: false, // Modal can be dismissed by clicking outside of the modal
	      opacity: 0.5, // Opacity of modal background
	      inDuration: 300, // Transition in duration
	      outDuration: 200, // Transition out duration
	      startingTop: '4%', // Starting top style attribute
	      endingTop: '10%' // Ending top style attribute
	    }
	  );
  });

  let attackSound = new Audio("sound/attackLaser.wav");
  let armorSound = new Audio("sound/Armor.wav");
  let selectSound = new Audio("sound/selectSound.wav");
	
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
		let randomNames = ["Andrew", "Roxas", "Whitney", "Sarah", "Austin", "Evan", "Mak"];
		let nameIndex = Math.floor(Math.random()*7);
		$scope.foe.name = randomNames[nameIndex];
	}

	//Add Bosses every 5 levels
	if ($scope.self.gameCount === 5){
		$scope.foe = Object.create(BotFactory.getBot("MEG"));
		$scope.foe.name = "Lady Ducharme";
		Materialize.toast('Here comes the first Boss!!!!!', 4000, 'amber accent-3 right-toast');

	}
	if ($scope.self.gameCount === 10){
		$scope.foe = Object.create(BotFactory.getBot("XZ3000"));
		$scope.foe.name = "Gilbert";
		Materialize.toast('Here comes the Second Boss!!!!!', 4000, 'amber accent-3 right-toast');

	}
	if ($scope.self.gameCount === 15){
		$scope.foe = Object.create(BotFactory.getBot("Machinist"));
		$scope.foe.name = "Chief Brenda";
		Materialize.toast('You will lose to the LAST BOSS!!!!!', 4000, 'amber accent-3 right-toast');
	}

	//Add lvls to Player and Foe
	$scope.self.minHealth += $scope.self.gameCount * 30;
	$scope.self.maxHealth += $scope.self.gameCount * 30;
	$scope.self.minDamage += $scope.self.gameCount * 10;
	$scope.self.maxDamage += $scope.self.gameCount * 10;
	$scope.foe.minHealth += $scope.self.gameCount * 17;
	$scope.foe.maxHealth += $scope.self.gameCount * 17;
	$scope.foe.minDamage += $scope.self.gameCount * 7;
	$scope.foe.maxDamage += $scope.self.gameCount * 7;	
	if($scope.self.gameCount > 5){
		$scope.foe.minHealth += $scope.self.gameCount * 45;
		$scope.foe.maxHealth += $scope.self.gameCount * 45;
		$scope.foe.minDamage += $scope.self.gameCount * 18;
		$scope.foe.maxDamage += $scope.self.gameCount * 22;	
	}
	if($scope.self.gameCount > 10){
		$scope.foe.minHealth += $scope.self.gameCount * 45;
		$scope.foe.maxHealth += $scope.self.gameCount * 45;
		$scope.foe.minDamage += $scope.self.gameCount * 18;
		$scope.foe.maxDamage += $scope.self.gameCount * 22;	
	}



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
	$scope.hasArmor = false;

	let attackFoe = ()=>{
		let sound = attackSound.cloneNode()
		sound.play();
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

	let bigHit = ()=>{
		let sound = attackSound.cloneNode()
		sound.play();
		let damage = getRandomInt($scope.self.minDamage, $scope.self.maxDamage)*1.5;
		$scope.foe.health -= damage;
		$scope.foe.health = Math.max(0, $scope.foe.health);
		$scope.foeHealth = ($scope.foe.health / foeTotalHealth)*100;
		Materialize.toast('-'+damage+' dmg', 2000, 'blue-grey darken-2 rounded right-toast');
		let combatLogText = `<p>Turn ${turnSelf}:  ${$scope.self.name} made an oppertune attacked, dealing ${damage} damage!</p>`;
		$('#combat-log').prepend(combatLogText);
		turnSelf++;
		turnFoe++;
		if($scope.foe.health === 0){
			$('#youWin').modal('open');
			return;
		}
	};

	let bigMiss = ()=>{
		let sound = attackSound.cloneNode()
		sound.play();
		let damage = getRandomInt($scope.foe.minDamage, $scope.foe.maxDamage)*1.5;
		$scope.self.health -= damage;
		$scope.self.health = Math.max(0, $scope.self.health);
		$scope.selfHealth = ($scope.self.health / selfTotalHealth)*100;
		Materialize.toast('-'+damage+' dmg', 2000, 'rounded red darken-2 left-toast');
		let combatLogText = `<p>Turn ${turnFoe}:  ${$scope.foe.name} made an oppertune attacked, dealing ${damage} damage!</p>`;
		$('#combat-log').prepend(combatLogText);
		turnSelf++;
		turnFoe++;
		if($scope.foe.health === 0){
			$('#youWin').modal('open');
			return;
		}
	};


	let specialAttack = ()=>{
		if ($scope.self.trait === "Electro-Cloak"){
			let sound = armorSound.cloneNode()
			sound.play();
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
			let sound = armorSound.cloneNode()
			sound.play();
			let healing = (getRandomInt($scope.self.minDamage, $scope.self.maxDamage)+50);
			$scope.self.health += healing;
			$scope.selfHealth = ($scope.self.health / selfTotalHealth)*100;
			Materialize.toast('+'+healing, 2000, 'green darken-2 rounded right-toast');
			let combatLogText = `<p>Turn ${turnSelf}:  ${$scope.self.name} regenerates it's flesh with Nano Recovery bots for ${healing} health!</p>`;
			$('#combat-log').prepend(combatLogText);
			turnSelf++;
			window.setTimeout(foeAttacks, 500);
		} if ($scope.self.trait === "Alloy Armor"){
			let sound = armorSound.cloneNode()
			sound.play();
			$scope.hasArmor = true;
			$scope.armorTurn = turnSelf;
			let combatLogText = `<p>Turn ${turnSelf}:  ${$scope.self.name}'s Alloy Armor is strengthened for the next 2 turns!</p>`;
			$('#combat-log').prepend(combatLogText);
			turnSelf++;
			window.setTimeout(foeAttacks, 500);
		}
	};



	let foeAttacks = ()=>{
		let sound = attackSound.cloneNode()
		sound.play();
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

	let wait = ()=>{
		let combatLogText = `<p>Turn ${turnSelf}:  ${$scope.self.name} and ${$scope.foe.name} are both playing defense.</p>`;
		$('#combat-log').prepend(combatLogText);
		turnSelf++;
		turnFoe++;
	}



//////////////////////
//////Rock Paper Siccors... perhaps
//////////////////////
	$scope.laserAttack = ()=>{
		if (turnSelf % 4 === 0){
			$scope.haveSpecial = true;
		}
		let foeRandomAttack = Math.floor(Math.random()*3);
		let attackType = 0;
		if (attackType === foeRandomAttack){
			attackFoe();
		}
		if (foeRandomAttack === 1){
			bigMiss()
		}
		if (foeRandomAttack === 2){
			bigHit()
		}
	};
	$scope.reflectAttack = ()=>{
		if (turnSelf % 4 === 0){
			$scope.haveSpecial = true;
		}
		let foeRandomAttack = Math.floor(Math.random()*3);
		let attackType = 1;
		if (attackType === foeRandomAttack){
			wait();
		}
		if (foeRandomAttack === 2){
			bigMiss()
		}
		if (foeRandomAttack === 0){
			bigHit()
		}
	};
	$scope.meleeAttack = ()=>{
		if (turnSelf % 4 === 0){
			$scope.haveSpecial = true;
		}
		let foeRandomAttack = Math.floor(Math.random()*3);
		let attackType = 2;
		if (attackType === foeRandomAttack){
			attackFoe();
		}
		if (foeRandomAttack === 0){
			bigMiss()
		}
		if (foeRandomAttack === 1){
			bigHit()
		}
	};


////////////////////////////////////
/////////////////////Button Functions
////////////////////////////////////
	var turnSelf = 1;
	var turnFoe = 1; 
	$scope.haveSpecial = true;

	$scope.makeAttack = ()=>{
		if (turnSelf % 4 === 0){
			$scope.haveSpecial = true;
		}
		attackFoe();
	};
	$scope.useSpecial = ()=>{
		specialAttack();
		$scope.haveSpecial = false;
	};
	$scope.continue = ()=>{
		let sound = selectSound.cloneNode();
		sound.play();
		$scope.self.gameCount++;
		$scope.foe.gameCount++;
		GameFactory.setSelf($scope.self);
		GameFactory.setFoe($scope.foe);
		$('#youWin').modal('close');
		$route.reload();
	};
	$scope.sound= ()=>{
		let sound = selectSound.cloneNode();
		sound.play();
	};







});