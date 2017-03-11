"use strict";

app.factory("GameFactory", () => {

let Self = {};
let Foe = {};


let setSelf = (x)=>{
	Self = x;
};

let setFoe = (x)=>{
	Foe = x;
};

let getSelf = ()=>Self;
let getFoe = ()=>Foe;


return {setSelf, setFoe, getSelf, getFoe};



});