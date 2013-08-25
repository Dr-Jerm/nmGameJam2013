// HighScore Leaderboard for Game:
var HighScores = function () {

  // Some Mock Data:
  //  scores = {
  //    "player_uid" : 123,
  //    "player_uid" : 123,
  //    "player_uid" : 123,
  //    "player_uid" : 123,
  //    "player_uid" : 123,
  //  }
  this.ranks = [1, 2, 3, 4, 5]
  this.scores = [1148, 512, 112, 12, 2];
  this.players = ["swimmer" , "turtle", "hair" , "blue", "runner"]
  this.PAGE_LENGTH = 15; // Amount of scores displayed on a page.
  this.pages = {} // contains data above, wrapped in here.
  this.current_player = {
    rank = 4,
    score = 2334,
    name = "",
  }

  this.insertScore = function(scores) { /* Insert Score into the db & update this.ranks. */ }
  this.getScorePage = function() {
    /* Grab the current page and return the results. */
    // This could be done nicely with a redis db.
    // Quick ex.: http://dickeyxxx.com/the-great-redis-misapprehension
    // page = range(s-e) # With PAGE_LENGTH steps.
    // return page
  }

  this.drawLeaderboard = function() {
    // On Win: Can just should trigger $('#leaderboard').show();
    this.ranks = this.insertScore(this.scores); // this probably shouldn't be in draw..
    var page = 1;
    var pages = this.getScorePage(page);  
    //  var rank_counter = 1; // Set to Page #
    //  return items_to_draw
  }

}
module.exports = new HighScores();
