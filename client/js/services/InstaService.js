'use strict';

var app = angular.module('googApp');

app.service('InstaService', function() {
	this.set = function(data) {
		this.instagram = data.map(function(item) {
			if(!item.location) return;
			var post = {
				image: item.images.low_resolution.url,
				address: item.location.name,
				lat: item.location.latitude,
				lng: item.location.longitude,
				link: item.link
			}
			return post;
		}).filter(item => {
			if(item) return item;
		});
	};
	this.destroy = function() {
		this.instagram = null;
	};
});