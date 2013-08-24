(function(){
    $('input').keypress(function(e) {
        // Enter pressed?
        if(e.which == 10 || e.which == 13) {
        	var name = $('input').val()
            $.post("/user", {user: name}, function(data) {
            	console.log(data);
            	// hide input and start game
            });
        }
    });
})();