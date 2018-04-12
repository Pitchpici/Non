var bodyParser       = require('body-parser');

var exports = module.exports = {}

exports.buttons = function(req,res){

	res.render('buttons'); 

}

exports.register = function(req,res){

	res.render('register'); 
	console.log(" this is from controller.js file, register post: " + req.body.username);

}

exports.login = function(req,res){

	console.log("this is from controller.js file: " + req.body.username);
	res.render('login'); 

}

exports.mainpage = function(req,res){

	res.render('mainpage'); 

}

exports.logout = function(req,res){

  req.session.destroy(function(err) {
  res.redirect('/');
  });

}