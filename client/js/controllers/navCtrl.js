'use strict';

var app = angular.module('googApp');

app.controller('navCtrl', function($scope, UserService, AuthService, NavService, InstaService) {
	$scope.$watch(function() {
		return UserService.user;
	},function(user){
		$scope.username = user.username;
		$scope.locations = user.locations;
	});

	$scope.$watch(function () {
		return InstaService.instagram;
	}, function(instagram) {
		$scope.instagram = instagram;
	});
	
	$scope.logout = function() {
		AuthService.logout();
		$scope.username = null;
		$scope.locations = null;
	};

	$scope.getCoords = function() {
		NavService.getCoords($scope.location.address);
	};

	$scope.removeLocation = function(location) {
		NavService.removeLocation(location);
	};

	$scope.getPhotos = function() {
		NavService.getPhotos();
	}

	$scope.showWishes = function() {
		NavService.showWishes();
	}

});