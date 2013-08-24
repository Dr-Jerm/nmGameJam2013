(function(){
	console.log("Up and running!");
	$.get('/api/name', function(data) {
		$('#ajax-injected').html(data.name);
	})

    socket.on('hello', function (data) {
        $('#socket-injected').html(data.welcome);
        // socket.emit('my other event', { my: 'data' });
    });
})();