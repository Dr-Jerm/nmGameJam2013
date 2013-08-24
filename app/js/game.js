//--------------ENGINE----------------------------
var container = document.getElementById( 'container' );
var context;

var DEBUG = true; // Debug mode (show FPS)
var EDITOR = false;
var READY = true;

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

//-------THREE.js variables ---------//
var clock = new THREE.Clock();
var delta;
var elapsedTime;

var renderer = new THREE.WebGLRenderer( { clearColor: 0x000000, clearAlpha: 1 } );
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement ); 
var camera = new THREE.PerspectiveCamera( 70, WIDTH / HEIGHT, 1, 1000 );
var scene = new THREE.Scene();
	
camera.position.z = 400;
scene.add(camera);

var ambientLight = new THREE.AmbientLight( 0xffffff);
scene.add(ambientLight);

//-------- animation frame
window.requestAnimFrame = (function(callback){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();

//window.addEventListener( 'resize', onWindowResize, false );

//--------- Debug
if(DEBUG){
	container = document.getElementById( 'container' );
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );
}



function Game()
{
	this.init = function()
	{

		this.controller = new Controller();
		this.input = new Input();
		this.input.setController(this.controller);
		this.input.start();

	   //content loading here
	   this.sperm = new Sperm();
	   this.player = new Player(this.sperm);
	   
	   this.egg = new Egg();

	   console.log("Init");
	 
	   
	   this.testImage = new Image();
	   this.testImage.src = "images/Grumpy-Cat.jpg";
	   this.testImage.width = 256;
	   this.testImage.height = 256;
	   this.testImage.map = THREE.ImageUtils.loadTexture( this.testImage.src);
	   
	   this.spriteTest = new Sprite(this.testImage, 0, 0, 10, scene);
	   

	   animate();
	}


	this.update = function()
	{

		// loop through gameobjects update

		//this.spriteTest.DrawSelf();

		console.log("Update");
		this.input.update();
		this.player.update();
	}
}



function animate()
{
	if(READY)
	{
		delta = clock.getDelta();
		elapsedTime = clock.getElapsedTime();
		game.update();
		renderer.render(scene, camera);
		if(DEBUG){
			stats.update();
		}
		//console.log("Animate");
	}
	//playerInput.Update();


	requestAnimationFrame( animate );
}


function onWindowResize() {

	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;
	
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();

	renderer.setSize( WIDTH, HEIGHT );

}