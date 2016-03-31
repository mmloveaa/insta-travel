'use strict';

var app = angular.module('googApp');

app.service('UserService', function() {
	this.set = function(user) {
		this.locations = user.locations;
		this.username = user.username;
		this._id = user._id;
		this.user = user;
	};
	this.destroy = function() {
		this.locations = null;
		this.username = null;
		this._id = null;
	};
});