'use strict';

var app = angular.module('googApp');

app.service('NavService', function($http, UserService, InstaService, $rootScope) {

	this.getCoords = function(address) {
    geocodeAddress();
		function geocodeAddress() {
		  var geocoder = new google.maps.Geocoder();
		  geocoder.geocode({'address': address}, function(results, status) {
		    if (status === google.maps.GeocoderStatus.OK) {
		      var location = {
		      	address: results[0].formatted_address,
		      	lat: results[0].geometry.location.lat(),
		      	lng: results[0].geometry.location.lng()
		      };
		      return $http.post('/users/locations', location)
  				.then(function(res) {
  					UserService.set(res.data);
						return res.data;
  				}, function (err){
						console.error("err: ",err);
  				})     
		    } else {
		      alert('Geocode was not successful for the following reason: ' + status);
		    }
		  });
		};
	};

	this.removeLocation = function(location) {
		$http.delete(`/users/locations/${location.address}`)
		.then(res => UserService.set(res.data),
					err => console.error(err));
	};

	this.getPhotos = function() {
		return $http.get('/users/instagram')
		.then(res => InstaService.set(res.data.data),
					err => console.error(err));
	};

	this.showWishes =function() {
		$rootScope.$broadcast('showWishes');
	};

});