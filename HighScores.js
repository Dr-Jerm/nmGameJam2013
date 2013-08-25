// HighScore Leaderboard for Game:
var HighScores = function () {

  // Some Mock Data:
  this.ranks = [1, 2, 3, 4, 5]
  this.scores = [1148, 512, 112, 12, 2];
  this.players = ["swimmer" , "turtle", "hair" , "blue", "runner"]
  this.PAGE_LENGTH = 15; // Amount of scores displayed on a page.


  this.insertScore = function(scores) {
    /* Insert Score into the db. */
    // var rank = db[query 'name']
    var rank = 4;
    return rank
  }

  this.getScorePage = function() {
    /* Grab the current page and return the results. */
    // This could be done nicely with a redis db.
    // Quick ex.: http://dickeyxxx.com/the-great-redis-misapprehension
    // page = range(s-e) # With PAGE_LENGTH steps.
    // return page
  }

  this.drawLeaderboard = function() {
    // Just should trigger $('#leaderboard').show();
    var rank = this.insertScore(this.scores); // this probably shouldn't be in draw..
    var pages = this.getScorePage();  
    //  var rank_counter = 1; // Set to Page #
    //  return items_to_draw
  }

}
module.exports = new HighScores();
