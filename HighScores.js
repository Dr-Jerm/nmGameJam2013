// HighScore Leaderboard for Game:

var HighScores = function () {

  // Some Mock Data:
  this.PAGE_LENGTH = 15; // Amount of scores displayed on a page.
  ranks = []; for (x=0;x<15;x++) ranks.push(x+1) 
  this.all_scores = {} // Stores Score information for Users
  // if username > 14_chars : username = username[0:11] + '...'

  this.insertScores = function(players) {
    /* This takes a list of players and
       adds them to all_scores to display. */
    // Triggers on leaderboard win condition.
    for (i in players) {
      var name = players[i].name;
      var score = players[i].score;
      if (score == undefined) score = 0; 
      this.all_scores[name] = score;
    }
    this.findHighestScores();
    console.log(this.all_scores);

    // Somehow need to update the ejs templates:
    // res.update() maybe on server.js for all_scores variable.
  }

  this.findHighestScores = function() {

    // Store all scores:
    var scores = [];
    for (score in this.all_scores) { 
      scores.push(this.all_scores[score]);
    }
    // Sort and cut down to top scores:
    scores.sort(function(a,b){return a<b})
    scores = scores.slice(0, this.PAGE_LENGTH);





    // Need to reference the player objects from the scores list...
    //for (score in this.all_scores) { 
    //  for (s in scores) {
    //    cur_score = this.all_scores[score]
    //    if (cur_score == s) {
    //      // ljk
    //    }
    //  }
    //}
    new_highscores = [];
    //console.log(scores);
    //console.log("New Highscores", new_highscores);
  };

  //  this.winning = function() {
  //    // How to access DOM from this scope ?
  //    // On Win: Can just should trigger $('#leaderboard').show();
  //    // Add Play Again ?
  //  }



  // this.findHighestScores();

}
module.exports = new HighScores();
