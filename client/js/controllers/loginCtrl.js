'use strict';

var app = angular.module('googApp');

app.controller('loginCtrl', function($scope,$state, AuthService) {

	$scope.login = function (user){
		AuthService.login(user)
		.then(function(res) {
			$state.go('home');
		}, function(err) {
			console.error("err: ", err);
		})
	}

	$scope.register = function (user){
		AuthService.register(user)
			.then(function(res) {
				$state.go('home');
			}, function(err) {
				console.error("err: ",err);
			})
	}

});