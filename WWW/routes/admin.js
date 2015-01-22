var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/', function (req, res, next) {

  res.render( 'admin/login', {
    title:  'Login'
  });

})

/* GET admin listing. */
router.get('/home', function(req, res, next) {

  request.get({
    url: 'http://192.168.1.131:4000/1/admin',
    headers : {
      'Authorization': req.headers.authorization
    }
  }, handler);

  function handler (err,response, body) {
    if (response.statusCode === 200) {
      res.render( 'admin/home', {
        pageId: 'dash',
        title:  'Dashboard'
      });
    } else {
      var err = new Error('Baddd Auth');
      err.status = 401;
      err.ErrorCode = 1;
      next(err);
    }
  }


});





router.post('/login', function(req, res, next) {

  function authHandler (err,response, body) {
    console.log('response');
    res.json({'token':response.body.slice(1,-1)});
  }

  request.get({
  url: 'http://192.168.1.131:4000/1/auth/admin'
  }, authHandler);

})

module.exports = router;
