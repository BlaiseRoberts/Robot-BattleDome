"use strict";

var app = angular.module("BattleBotApp", ["ngRoute"]);



//////////////////
//Configure Route
//////////////////
app.config( function($routeProvider) {
   $routeProvider.
   when('/', {
      templateUrl: 'partials/select-bot.html',
      controller: "SelectCtrl"
   }).
   when('/battle', {
      templateUrl: 'partials/battle.html',
      controller: "BattleCtrl"
   }).
   otherwise('/');
});