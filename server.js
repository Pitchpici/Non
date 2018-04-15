var express          = require('express');
var path             = require('path');
var cookieParser     = require('cookie-parser');
var bodyParser       = require('body-parser');
var mysql            = require("mysql2");
var exphbs           = require('express-handlebars');
var expressValidator = require('express-validator');
var session          = require('express-session');
var MySQLStore       = require('express-mysql-session')(session);
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var flash            = require('flash');

var db = require("./models");

var PORT = process.env.PORT || 8080;
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views/'));
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, '/public')));

//express-sessions-MySQL
var options = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'nontoxx_db'
};

var sessionStore = new MySQLStore(options);


// Express Session
app.use(session({
    secret: 'secret',
    store: sessionStore,
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator - copied from Github :)
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//flash middleware - run flash install!!!!!!!!!!!!!!!!!!!!!!! (you haven't yet)
app.use(flash());
//flash global variables
app.use(function(req, res, next) {
	res.locals.success_msg = req.flash("Success!");
	res.locals.error_msg = req.flash("Error - wah wah!");
	res.locals.error = req.flash("Error!");
	next();
});


//require routes!!!
var routes = require("./routes/index.js");
var users  = require("./routes/users.js");

//new routes 
app.use("/", routes);
app.use("/users", users);




db.sequelize.sync().then(function () {
	console.log("Database is connected;")
	app.listen(PORT, function (){
		console.log("listening on port %s " + PORT);
	});
});