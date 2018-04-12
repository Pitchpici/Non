var authController = require('../controllers/controller.js');



console.log("this is the model: " + models);

module.exports = function(app,passport){

app.get('/', authController.buttons);


app.get('/register', authController.register);


app.get('/login', authController.login);


app.post('/register', passport.authenticate('local-register',  { successRedirect: '/mainpage',
                                                    failureRedirect: '/register'}
                                                    ));


app.get('/mainpage',isLoggedIn, authController.mainpage);


app.get('/logout',authController.logout);


app.post('/login', passport.authenticate('local-login',  { successRedirect: '/mainpage',
                                                    failureRedirect: '/'}
                                                    ));

// app.post('/login', 
//   passport.authenticate('local-login', { failureRedirect: '/register' }),
//   function(req, res) {
//     res.redirect('/mainpage');
//   });

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}


}

//https://github.com/rupali8086/using-passport-with-sequelize-and-mysql/blob/master/app/routes/auth.js



