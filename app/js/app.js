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

    socket.on('acceptedUser', function(data) {
      game.reset();
      console.log(data);
      game.setPlayer(data.id);
    });

    socket.on('poll', function(data) {
      game.networkUpdate(data);
    });

})();
