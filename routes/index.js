
/*
 * GET home page.
 */

var Util = require('util');
var serverIp;



exports.index = function(req, res){
    console.log(serverIp);
    var options = {
        serverIp: '54.221.239.154',
        clientIp: req.connection.remoteAddress
    }

    res.render('index', options);
};
