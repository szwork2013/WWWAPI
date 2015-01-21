var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');


// EXPRESS

// Init 
var app = express();
var port = process.env.PORT || '4000';
app.set('port', port);

// Route Init
var admin = require('./routes/admin');
var auth = require('./routes/auth');

// Prep Req Object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Remove Express Header and Etag 
app.disable('etag');
app.disable('x-powered-by');

// CORS Hack
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Attach App Name and Version
app.use(function (req, res, next) {
    res.set('X-HD-Server', 'API');
    res.set('X-HD-Version', '0.0.1');
    next();
});

// Monitoring Endpoint
app.use('/status', function (req, res, next) {
    res.send('OK');
});

// Route Use
app.use('/1/admin', admin);
app.use('/1/auth', auth);

//Redirect To WWW Server
app.use('/',function(req, res, next){
    res.redirect(301, 'http://www.quickmeme.com/random');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


//ERROR HANDLERS

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log('dev error');
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}
// production error handler
// no stacktraces leaked to user
else if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.log('prod error');
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: {}
    });
  });
}


// SERVER 

// Server Init
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind + ' in ' + app.get('env') );
}

