(function(){
    $('input').keypress(function(e) {
        // Enter pressed?
        if(e.which == 10 || e.which == 13) {
        	var name = $('input').val()
        	socket.emit("newUser", {user: name});
        }
    });

    window.config = {};
    socket.on('acceptedUser', function(data) {
    	config.uid = data.id;
    })

    //INIT here
    game = new Game();
    game.init();

    socket.on('poll', function(data) {
      game.networkUpdate(data);
    })

})();
