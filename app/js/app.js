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

    var fakeData = {
        position: {
            x: 0,
            y: 0,
            z: 0    
        }
    }

    socket.on('poll', function(data) {
    	socket.emit('response', fakeData)
    })
    //INIT here
    game = new Game();
    game.init();

})();