'use strict';

var express = require('express');
var request = require('request');
var router = express.Router();

var User = require('../models/user');

// router.get('/usernames', User.authMiddleware, function(req, res) {
//   User.find({_id: {$ne: req.user._id}}, function(err, users) {
//     res.status(err ? 400 : 200).send(err || users);
//   }).select('username');
// });

router.get('/profile', User.authMiddleware, function(req, res) {
  res.send(req.user);
});

router.post('/authenticate', function(req, res) {
  User.authenticate(req.body, function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      var token = user.generateToken();
      res.cookie('appCookie', token).send(user);
    }
  });
});

router.post('/register', function(req, res) {
  User.register(req.body, function(err, user) {
    var token = user.generateToken();
     if(err) {
      res.status(400).send(err);
    } else {
      var token = user.generateToken();
      res.cookie('appCookie', token).send(user);
    }
  });
});

router.delete('/authenticate', function(req, res) {
  res.clearCookie('appCookie').send();
});

router.post('/locations', User.authMiddleware, function(req, res) {
  User.addLocation(req, req.body, function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(user);
    }
  })
})

router.delete('/locations/:address', User.authMiddleware, function(req, res) {
  User.removeLocation(req, req.params.address, function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(user);
    }
  })
})
   
router.get('/instagram', function(req, res) {
  request.get('https://api.instagram.com/v1/users/self/media/recent/?access_token=2033796677.5b767b5.bcd256e058db4e8ea6e1a4be730a7a91', function(err, resp, body) {
    if(err) res.send(err);
    res.send(body);
  });
}); 

module.exports = router;
