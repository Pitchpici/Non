var express          = require('express');
var router           = express.Router(); 

var bcrypt           = require("bcryptjs");
var bCrypt           = require('bcrypt-nodejs');
var models           = require ('../models');

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

var Sequelize        = require('sequelize');



//hashing user password 
var generateHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

//serialize + deserialize user
passport.serializeUser(function(user, done) {
  done(null, user.id);
  console.log("serialize user blah");
});


passport.deserializeUser(function(id, done) {
  models.User.findOne({ where: { id: id} }).then(user => {
    done(null, user);
    console.log("logged in user id: " + id);
  }).catch(err => done(err));
});



//get Register page
router.get("/register", function(req, res) {

	res.render("register");
});

//get Login page
router.get("/login", function(req, res) {

	res.render("login");
});

//get mainpage
router.get("/mainpage", function(req, res) {

	res.render("mainpage");
});




//get all the information from the register form
router.post("/register", function(req, res) {

	var username = req.body.username;
	var email    = req.body.email;
	var password = req.body.password;

	console.log(" usernaaaaaame:      "   + username);
	console.log(" passwooooord:        "  + password);

	var userPassword = generateHash(password);
	console.log(" hashed passwooooord   " + userPassword);

	//validation
	req.checkBody("username", "Username is required").notEmpty();
	req.checkBody("email", "Email is required").notEmpty();
	req.checkBody("email", "Invalid email address").isEmail();
	req.checkBody("password", "Password is required").notEmpty();

	//check for errors
	var errors = req.validationErrors();

	if (errors) {
	res.render("register", {
		errors: errors
	});	
	}
	else {

		var data = {
			username: username,
			email: email,
			password: userPassword

		};

		
        models.User.create(data).then(function(newUser){

        					// if (err) throw err;
        					console.log("new user ==================>" + newUser.username);

                            // if(!newUser){
                            //   return done(null, false);
                            // }

                            // if(newUser){
                            //   return done(null, newUser);
                              
                            // }
        }).catch(Sequelize.ValidationError, function (err) {

        });                   

		console.log ("Registration successful!");
		req.flash('success_msg', "you are registered and can now log in");

		res.redirect("login");
	}	

});



passport.use('local', new LocalStrategy(


    function( username, password, done) {


    	console.log("username: " + username);
    	console.log("password: " + password);

    	var isValidPassword = function(userpass,password) {
            return bCrypt.compareSync(password, userpass);
        }


	    models.User.findOne({ where : {username: username}}).then(function(user) {

	    	console.log("userrrrrrr id: " + user.id); //this actually worksssssssssss fuuu
		      // if (err) { return done(err); }

		      if (!user) {

		        return done(null, false, { message: 'Incorrect username.' });

		      }

		      console.log("This is the found user's email: " + user.email);

		      // if ()

		      if (!bCrypt.compareSync(password, user.password)) 


		      {

		      	console.log("incorrect password");
		        return done(null, false, { message: 'Incorrect password.' });

		      }

		      return done(null, user);
		  
	    });
    }

));



router.post("/login", passport.authenticate ("local",   { successRedirect: "/users/mainpage", failureRedirect: "/users/login", failureFlash: true}), 
 function(req, res) {

 	console.log("post login ======> " + req.body);
	res.redirect("/mainpage");

});

router.get('/logout', function(req, res){
    req.logout();    
    res.redirect('/users/login');
});   


module.exports = router;