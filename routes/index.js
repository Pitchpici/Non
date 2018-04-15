var express = require('express');
var router  = express.Router(); 

//get homepage
router.get("/", function(req, res) {

	res.render("buttons");
});

module.exports = router;