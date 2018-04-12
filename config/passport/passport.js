

  //load bcrypt
  var bCrypt = require('bcrypt-nodejs');
  var express = require('express');

  module.exports = function(passport){

  // var User = user;
  var models = require ('../../models');
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;


  passport.serializeUser(function(user, done) {
          done(null, user.id);
      });


  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      models.User.findById(id).then(function(user) {
        if(user){
          done(null, user.get());
        }
        else{
          done(user.errors, null);
        }
      });

  });

//user restriction middleware function
function authenticationMiddleware () {  
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

      if (req.isAuthenticated()) return next();
      res.redirect('/login')
  }
}


  passport.use('local-register', new LocalStrategy(

    // {           
    // //   usernameField : 'username',
    // //   passwordField : 'password',
    //   passReqToCallback : true // allows us to pass back the entire request to the callback
    // },

    function(username, password, done){

          process.nextTick(function () {       

                var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
                };

                 models.User.findOne({where : {username: username}}).then(function(err, user) {

                  // console.log("this is the user: " + user[0]);
                        if (user)
                        {
                          return done(null, false, {message : 'That username is already taken'} );
                        }

                        else
                        {
                          var userPassword = generateHash(password);

                          var data =
                          { 
                            username: username,  
                            password: userPassword,
                      
                          };


                          models.User.create(data).then(function(newUser,created){
                            if(!newUser){
                              return done(null, false);
                            }

                            if(newUser){
                              return done(null, newUser);
                              
                            }


                          });
                        }
                  }); //user findOne
          });// tick tick tick 
    }//function params

  ));//passport use register
    
  //LOCAL SIGNIN
  passport.use('local-login', new LocalStrategy(
    
      // {

      // // // by default, local strategy uses username and password, we will override with email
      // // usernameField : 'username',
      // // passwordField : 'password',
      // passReqToCallback : true // allows us to pass back the entire request to the callback
      // },

      function (username, password, done) {

        // var User = user;

                  var isValidPassword = function(userpass,password) {
                    return bCrypt.compareSync(password, userpass);
                  }

            models.User.findOne({where: {username: username}}).then(function (err, user) {

                  console.log("this is the user: " + user[0]);
                      if (err) {return done(err); 
                        console.log("login error: " + err);}

                      if (!user) {
                        return done(null, false, { message: 'Username does not exist' });
                      }

                      if (!isValidPassword(user.password, password)) {

                        return done(null, false, { message: console.log('Incorrect password.') });

                      }
                      console.log("We should be logged in!");

                      var userinfo = user.get();

                      return done(null, userinfo, { message: console.log('what in the world') });

            });

      }
  ));
}// module exports