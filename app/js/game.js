function Game()
{

	


	this.init = function()
	{

	   //content loading here

	   this.player = new Player();

	   console.log("Init");
	   animate();
	}


	this.update = function()
	{

		// loop through gameobjects update
		console.log("Update");
		this.player.update(); 



	}


	this.draw = function()
	{

		// three.js draw 
		console.log("Draw");



	}
}

function animate()
{
	requestAnimationFrame( animate );
	game.update();
	game.draw();
	console.log("Animate");
}