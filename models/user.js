// var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
  	username: DataTypes.STRING,
  	email: DataTypes.STRING,
    password: DataTypes.STRING
  });
  return User;
};

// module.exports.createUser = function (newUser, callback) {


// //hash a password
// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(newUser.password, salt, function(err, hash) {
//         // Store hash in your password DB. 
//         newUser.password = hash;
//         newUser.save(callback);
//     });
// });

// }

