
/**
 * Module dependencies
 */

var express = require('express'),
    io = require('socket.io'),
    engine = require('ejs-locals'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path');

var app = module.exports = express();

/**
 * Configuration
 */

app.engine('ejs', engine);

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'app')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
    // TODO
};


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
// app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */
 
var server = http.createServer(app);
io = io.listen(server);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

// io.listen(server);

io.sockets.on('connection', function (socket) {
    socket.emit('hello', {welcome: "Hi, I'm text from a socket!"});
});
