'use strict';

var app = angular.module('googApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: '/html/home.html',
		controller: 'homeCtrl'
	})
	.state('login', {
		url: '/login',
		templateUrl: '/html/login.html',
		controller: 'loginCtrl'
	})

	$urlRouterProvider.otherwise('/');
});

app.run(function(AuthService) {
	AuthService.init();
});