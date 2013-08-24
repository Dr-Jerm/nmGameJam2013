// HighScore Leaderboard for Game:

var HighScores = function () {

  this.fake_db = {
  // "player_name" : score
    "runner" : 2,
    "swimmer" : 1148,
    "blue" : 12,
    "turtle" : 512,
    "hair" : 112,
  };
  this.score = 124  // game.player.score
  this.player_name = "Testing"  //  game.player.name
  this.PAGE_SCORES_LENGTH = 25; // Amount of scores displayed on a page.

  function insertScore(score) {
    /* Insert Score into the db. */
    // var rank = db[query 'player_name']
    var rank = 4;
    return rank
  }

  this.queryDatabaseForPages = function() {
    /* Grab the current page and return the results. */
    return this.fake_db;
  }
	
  this.drawRow = function(rank, score, name) {
    console.log(rank, score, name);
  }

  this.drawLeaderboard = function() { // Draws leaderboard in the canvas.
    // draw_labels (Rank | Score | Player)
    var rank = insertScore(score); // this probably shouldn't be in draw...
    var leaderboard_area = canvas.drawRect(0,0,0,0);
    var pages = queryDatabaseForPages();  

    // Draw the current Page Rows (Rank | Score | Player):
    for (page in pages) {
      this.drawRow(
        pages[page].score,
        pages[page].player_name
      );
    }

  }

}

module.exports = new HighScores();
