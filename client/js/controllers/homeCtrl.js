'use strict';

var app = angular.module('googApp');

app.controller('homeCtrl', function($scope, AuthService, NavService, UserService, InstaService) {
	$scope.$watch(function () {
		return UserService.locations;
	}, function(locations) {
		$scope.locations = locations;
		markMap();
	});

	$scope.$watch(function () {
		return InstaService.instagram;
	}, function(instagram) {
		$scope.instagram = instagram;
		placePhotos();
	});

	$scope.$on('showWishes', args => {
		markMap();
	})

	function markMap() {
		var mapOptions = {
	    zoom: 4,
	    center: new google.maps.LatLng(40.0000, -98.0000),
	    mapTypeId: google.maps.MapTypeId.TERRAIN
		}

		$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
		$scope.markers = [];

		var infoWindow = new google.maps.InfoWindow();
		var createMarker = function (location){
		  var marker = new google.maps.Marker({
	      map: $scope.map,
	      position: new google.maps.LatLng(location.lat, location.lng),
	      title: location.address
		  });
		  marker.content = `<div class="infoWindowContent"></div>`;  
		  google.maps.event.addListener(marker, 'click', function(){
	      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
	      infoWindow.open($scope.map, marker);
		  });
		  $scope.markers.push(marker);
		}  
		for (var i = 0; i < $scope.locations.length; i++){
	    createMarker($scope.locations[i]);
		}
	}

	$scope.openInfoWindow = function(e, selectedMarker){
    e.preventDefault();
    google.maps.event.trigger(selectedMarker, 'click');
	}

	function placePhotos() {
		var mapOptions = {
	    zoom: 4,
	    center: new google.maps.LatLng(40.0000, -98.0000),
	    mapTypeId: google.maps.MapTypeId.TERRAIN
		}

		$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
		// $scope.markers = [];

		var infoWindow = new google.maps.InfoWindow();
		var createMarker = function (instagram){
		  var marker = new google.maps.Marker({
	      map: $scope.map,
	      position: new google.maps.LatLng(instagram.lat, instagram.lng),
	      title: instagram.address
		  });
		  marker.content = `<img class="infoWindowContent" src='${instagram.image}'></img>`;  
		  google.maps.event.addListener(marker, 'click', function(){
	      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
	      infoWindow.open($scope.map, marker);
		  });
		  $scope.markers.push(marker);
		}  
		for (var i = 0; i < $scope.instagram.length; i++){
	    createMarker($scope.instagram[i]);
		}
	}

	$scope.openInfoWindow = function(e, selectedMarker){
    e.preventDefault();
    google.maps.event.trigger(selectedMarker, 'click');
	}

});