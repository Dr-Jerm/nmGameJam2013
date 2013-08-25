(function(){
    $('input').keypress(function(e) {
        // Enter pressed?
        if(e.which == 10 || e.which == 13) {
         var name = $('input').val()
         socket.emit("newUser", {user: name});
        }
    });

    var splashImg = $('<div></div>');
    splashImg.css({
      background: "url('/images/TitleCardLIC.png')",
      backgroundSize: "100% auto",
      width: "100%",
      position: "fixed",
      top: "30px",
      left: "0",
      zIndex: "1000",
      height: ($(document).height() - 20) + "px",
    });
    $('body').append(splashImg);

    //INIT here
    game = new Game();
    game.init();

    socket.on('gameWin', function(data) {
        game.end(data);
    });

    socket.on('youWon', function(data) {
      game.end();
    });

    socket.on('score', function(data) {
      game.score(data);
    });

    socket.on('acceptedUser', function(data) {
      game.setPlayer(data.id, data.name, data.gameteType);
      splashImg.remove();
    });

    socket.on('reset', function(data) {
        game.reset(data);
    });

    socket.on('poll', function(data) {
      game.networkUpdate(data);
    });

})();

