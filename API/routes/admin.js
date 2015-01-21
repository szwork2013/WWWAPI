var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');


// Token Validation
router.use('/', expressJwt({
    secret: 'SUPERSECRET',
    audience: 'https://api.haberdasher.com/1/admin/',
    issuer: 'https://api.haberdasher.com'
}));

// Make sure has admin role
router.use('/', function(req, res, next) {
    if (req.user.role === 'admin') {
    console.log("This is an admin");
    next();
    } else {
      var err = new Error('Invalid Role');
      err.status = 400;
      err.ErrorCode = 3;
      next(err);
    }
    
})

/* GET admin info */
router.get('/', function(req, res, next) {
  res.json({
    name: 'The Admin'
  })
});

module.exports = router;
