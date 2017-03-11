"use strict";

app.factory("BotFactory", () => {

let Robot = {
	name: null,
	trait: null,
	gameCount: 1,
	damage: 1
};


/////////////
//Types
/////////////
let CyberPunk = Object.create(Robot);
CyberPunk.trait = "Electro-Cloak";
CyberPunk.type = "CyberPunk";

let Cyborg = Object.create(Robot);
Cyborg.trait = "Nano Recovery";
Cyborg.type = "Cyborg";

let Android = Object.create(Robot);
Android.trait = "Alloy Armor";
Android.type = "Android";


///////////////
//Models 
///////////////
let Bot = {};

Bot.Hacker = Object.create(CyberPunk);
Bot.Hacker.minHealth = 350;
Bot.Hacker.maxHealth = 400;
Bot.Hacker.minDamage = 30;
Bot.Hacker.maxDamage = 60;
Bot.Hacker.model = "Hacker";
Bot.Hacker.image = "images/Female_Hacker.jpg";

Bot.Technomancer = Object.create(CyberPunk);
Bot.Technomancer.minHealth = 320;
Bot.Technomancer.maxHealth = 480;
Bot.Technomancer.minDamage = 50;
Bot.Technomancer.maxDamage = 75;
Bot.Technomancer.model = "Technomancer";
Bot.Technomancer.image = "images/Technomancer.png";


Bot.ProtoSoldier = Object.create(Cyborg);
Bot.ProtoSoldier.minHealth = 380;
Bot.ProtoSoldier.maxHealth = 430;
Bot.ProtoSoldier.minDamage = 40;
Bot.ProtoSoldier.maxDamage = 50;
Bot.ProtoSoldier.model = "Proto-Soldier";
Bot.ProtoSoldier.image = "images/Proto_Soldier.png";

Bot.CyberAssassin = Object.create(Cyborg);
Bot.CyberAssassin.minHealth = 330;
Bot.CyberAssassin.maxHealth = 400;
Bot.CyberAssassin.minDamage = 5;
Bot.CyberAssassin.maxDamage = 100;
Bot.CyberAssassin.model = "Cyber Assassin";
Bot.CyberAssassin.image = "images/Cyber_Assassin.jpg";

Bot.BattleDroid = Object.create(Android);
Bot.BattleDroid.minHealth = 340;
Bot.BattleDroid.maxHealth = 400;
Bot.BattleDroid.minDamage = 30;
Bot.BattleDroid.maxDamage = 85;
Bot.BattleDroid.model = "Battle Droid";
Bot.BattleDroid.image = "images/Battle_Droid.png";

Bot.D18Tank = Object.create(Android);
Bot.D18Tank.minHealth = 420;
Bot.D18Tank.maxHealth = 450;
Bot.D18Tank.minDamage = 0;
Bot.D18Tank.maxDamage = 70;
Bot.D18Tank.model = "D18-Tank";
Bot.D18Tank.image = "images/D18_Tank.jpg";


/////////////
//Functions
/////////////
let getBot = (x)=>{
	return Bot[x];
};

return {getBot};

});