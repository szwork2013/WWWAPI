var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');



//Cant GET to this path...ErrorCode 1
router.get('/', function (req, res, next) {
    var err = new Error('GET request to /1/auth/');
    err.status = 400;
    err.ErrorCode = 1;
    next(err);
});

//Generate Token
router.get('/:role', function (req, res, next) {
    var profile, secret, options, token;

    profile = {
      role: req.params.role
    };
    secret = "SUPERSECRET";
    options = {
      audience: "https://api.haberdasher.com/1/admin/",
      issuer: "https://api.haberdasher.com"
    }
    token = jwt.sign(profile, secret, options);

    res.json(token);
});

module.exports = router;
