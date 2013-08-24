(function(){
    $('input').keypress(function(e) {
        // Enter pressed?
        if(e.which == 10 || e.which == 13) {
        	var name = $('input').val()
        	socket.emit("newUser", {user: name});
            // $.post("/user", {user: name}, function(data) {
            // 	console.log(data);
            // 	// hide input and start game
            // });
        }
    });

    window.config = {};
    socket.on('acceptedUser', function(data) {
    	config.data.id;
    })

    socket.on('poll', function(data) {
    	console.log(data);
    })
    //INIT here
    game = new Game();
    game.init();

})();