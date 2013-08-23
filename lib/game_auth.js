// These are the URLs that require authentication
var auth_urls = [

];

module.exports = function() {
  
  return function(req, res, next) {
    var authenticate = function(req) {
      // TODO: Check to see if the request URL is in auth_urls.
      //       If it is, use the correct mode of authentication and return
      //       a "true" or false value.
    }
    if (authenticate(req)) {
      return next();
    } else {
      res.redirect();
    }
  }

};
