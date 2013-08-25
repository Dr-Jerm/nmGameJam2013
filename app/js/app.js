(function(){
    $('input').keypress(function(e) {
        // Enter pressed?
        if(e.which == 10 || e.which == 13) {
         var name = $('input').val()
         socket.emit("newUser", {user: name});
        }
    });

    //INIT here
    game = new Game();
    game.init();

    socket.on('gameWin', function(data) {
        game.end(data);
    });

    socket.on('youWon', function(data) {
      game.end();
    });

    socket.on('acceptedUser', function(data) {
      game.setPlayer(data.id, data.name, data.gameteType);
    });

    socket.on('reset', function(data) {
        game.reset(data);
    });

    socket.on('poll', function(data) {
      game.networkUpdate(data);
    });

})();

