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
Bot.Hacker.minHealth = 150;
Bot.Hacker.maxHealth = 200;
Bot.Hacker.minDamage = 30;
Bot.Hacker.maxDamage = 60;
Bot.Hacker.model = "Hacker";

Bot.Technomancer = Object.create(CyberPunk);
Bot.Technomancer.minHealth = 120;
Bot.Technomancer.maxHealth = 180;
Bot.Technomancer.minDamage = 50;
Bot.Technomancer.maxDamage = 75;
Bot.Technomancer.model = "Technomancer";


Bot.ProtoSoldier = Object.create(Cyborg);
Bot.ProtoSoldier.minHealth = 180;
Bot.ProtoSoldier.maxHealth = 230;
Bot.ProtoSoldier.minDamage = 40;
Bot.ProtoSoldier.maxDamage = 50;
Bot.ProtoSoldier.model = "Proto Soldier";

Bot.CyberAssassin = Object.create(Cyborg);
Bot.CyberAssassin.minHealth = 130;
Bot.CyberAssassin.maxHealth = 200;
Bot.CyberAssassin.minDamage = 5;
Bot.CyberAssassin.maxDamage = 100;
Bot.CyberAssassin.model = "Cyber Assassin";

Bot.PyroDroid = Object.create(Android);
Bot.PyroDroid.minHealth = 140;
Bot.PyroDroid.maxHealth = 200;
Bot.PyroDroid.minDamage = 30;
Bot.PyroDroid.maxDamage = 85;
Bot.PyroDroid.model = "Pyro Droid";

Bot.D18Tank = Object.create(Android);
Bot.D18Tank.minHealth = 220;
Bot.D18Tank.maxHealth = 250;
Bot.D18Tank.minDamage = 0;
Bot.D18Tank.maxDamage = 70;
Bot.D18Tank.model = "D18-Tank";


/////////////
//Functions
/////////////
let getBot = (x)=>{
	return Bot[x];
};

return {getBot};

});