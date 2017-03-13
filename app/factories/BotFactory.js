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
CyberPunk.name = "Kim K";

let Cyborg = Object.create(Robot);
Cyborg.trait = "Nano Recovery";
Cyborg.type = "Cyborg";
Cyborg.name = "Kourtney K";

let Android = Object.create(Robot);
Android.trait = "Alloy Armor";
Android.type = "Android";
Android.name = "Khloé K";


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


//Bosses
Bot.MEG = Object.create(Android);
Bot.MEG.minHealth = 720;
Bot.MEG.maxHealth = 750;
Bot.MEG.minDamage = 100;
Bot.MEG.maxDamage = 180;
Bot.MEG.model = "M.E.G.";
Bot.MEG.image = "images/MEG.jpg";

Bot.XZ3000 = Object.create(Cyborg);
Bot.XZ3000.minHealth = 1680;
Bot.XZ3000.maxHealth = 2030;
Bot.XZ3000.minDamage = 50;
Bot.XZ3000.maxDamage = 150;
Bot.XZ3000.model = "XZ-3000";
Bot.XZ3000.image = "images/Gilbert.jpg";

Bot.Machinist = Object.create(CyberPunk);
Bot.Machinist.minHealth = 5080;
Bot.Machinist.maxHealth = 5130;
Bot.Machinist.minDamage = 540;
Bot.Machinist.maxDamage = 670;
Bot.Machinist.model = "Machinist";
Bot.Machinist.image = "images/brenda.jpg";


/////////////
//Functions
/////////////
let getBot = (x)=>{
	return Bot[x];
};

return {getBot};

});