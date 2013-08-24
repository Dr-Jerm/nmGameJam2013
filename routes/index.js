
/*
 * GET home page.
 */

var Util = require('util');
var serverIp;



exports.index = function(req, res){
    console.log(serverIp);
    var options = {
        serverIp: '127.0.0.1',
        clientIp: req.connection.remoteAddress
    }

    res.render('index', options);
};
