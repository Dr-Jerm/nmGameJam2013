function init()
{

   //content loading here

	

   console.log("Init");
	animate();
}

function animate() 
{
	requestAnimationFrame( animate );
	update();
	draw();
	console.log("Animate");
}


function update()
{

	// loop through gameobjects update
	console.log("Update");



}


function draw()
{

	// three.js draw 
	console.log("Draw");



}