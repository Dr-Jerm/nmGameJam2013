// HighScore Leaderboard for Game:
var HighScores = function () {

  // Some Mock Data:
  this.PAGE_LENGTH = 15; // Amount of scores displayed on a page.
  this.ranks = [1, 2, 3, 4, 5]
  this.all_scores = {} // Stores Score information for Users
  // if username > 14_chars : username = username[0:11] + '...'

  // For simplicity, only show highest scores...
  // Highest Scores:

  // @TODO:
  //  - Need current player from player obj.
  //  - Insert Latest Scores & Compare
  //  - Find Top Scores & Sort to rank.
  //  - ...

  this.insertScores = function(players) {
    /* This takes a list of players and
       adds them to all_scores to display. */
    for (i in players) {
      this.all_scores[players[i].name] = players[i].score;
    }
  }
  this.insertScores([
    {name:'testy', score:45345},
    {name:'sdf', score:1},
    {name:'billy', score:82448},
    {name:'spermicide', score:7287},
    {name:'swimmer', score:92313218},
    {name:'runner', score:4},
    {name:'leonard', score:831},
    {name:'steve', score:23092},
  ]);

  this.findHighestScores = function() {
    var scores = [];
    for (score in this.all_scores) { 
      scores.push(this.all_scores[score]);
    }

    // Sorting and taking Top Scores:
    scores.sort(function(a,b){return a<b})
    scores = scores.slice(0, this.PAGE_LENGTH);
    console.log(scores);

    // Need to re-reference the player objects...
    new_highscores = [];
    console.log("New Highscores", new_highscores);
  };
  this.findHighestScores();


//  this.getScorePage = function() {
//    /* Grab the current page and return the results. */
//    // This could be done nicely with a redis db.
//    // Quick ex.: http://dickeyxxx.com/the-great-redis-misapprehension
//    // page = range(s-e) # With PAGE_LENGTH steps.
//    // return page
//  }

//  this.drawLeaderboard = function() {
//    // On Win: Can just should trigger $('#leaderboard').show();
//    // Add Play Again ?
//  }

}
module.exports = new HighScores();
