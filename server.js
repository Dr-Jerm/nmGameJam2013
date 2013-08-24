
/**
 * Module dependencies
 */

var express = require('express'),
    io = require('socket.io'),
    engine = require('ejs-locals'),
    network = require('./networking'),
    gameServer = require('./GameServer'),
    http = require('http'),
    path = require('path');

var util = require('util');
process.env.DEBUG = true;

var app = module.exports = express();

/**
 * Configuration
 */

app.engine('ejs', engine);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'app')));
app.use(app.router);

// development only
// if (app.get('env') === 'development') {
//     app.use(express.errorHandler());
// }


var serverIp = '127.0.0.1';
if (process.env.PORT) {
  serverIp = '54.221.239.154';
}

var indexRoute = function(req, res){
    var options = {
        serverIp: serverIp,
        clientIp: req.connection.remoteAddress
    }

    res.render('index', options);
};

app.get('/', indexRoute);
// redirect all others to the index (HTML5 history)
app.get('*', indexRoute);

// JSON API
app.post('/user', function (req, res) {
  var user = req.body.user; 
  console.log(user);
  res.write(user);
  res.end();
});


/**
 * Start Server
 */
 
var server = http.createServer(app);
io = io.listen(server);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


io.sockets.on('connection', function (socket) {
  // socket.emit('hello', {welcome: "Hi, I'm text from a socket!"});

  socket.on("newUser", network.newUser.bind(socket));
  socket.on("disconnect", network.disconnect.bind(socket));

  socket.on("up", function(data) {
    console.log("up: " + data);
  });
  socket.on("down", function(data) {
    console.log("down: " + data);
  });
  socket.on("left", function(data) {
    console.log("left: " + data);
  });
  socket.on("right", function(data) {
    console.log("right: " + data);
  });
});

gameServer.run(1000);

// var count = 0;
// setInterval(function () {
//   console.log("ping "+ count++);
// },5000);
