//--------------ENGINE----------------------------
var container = document.getElementById( 'container' );
var context;

var DEBUG = true; // Debug mode (show FPS)
var EDITOR = false;
var READY = false;

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

gameWorldWidth = 1000;
gameWorldHeight = 1000;

//-------THREE.js variables ---------//
var clock = new THREE.Clock();
var delta;
var elapsedTime;



var renderer = new THREE.WebGLRenderer( { clearColor: 0x000000, clearAlpha: 1 } );
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement ); 

// new camera
var camera = new THREE.PerspectiveCamera( 70, WIDTH / HEIGHT, 1, 1000 );

// new scene
var scene = new THREE.Scene();
    

camera.position.set(0,0,100);

camera.position.z = 400;
scene.add(camera);

var ambientLight = new THREE.AmbientLight( 0xffffff);
ambientLight.position.set(0,100,0);
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

var testImage = new Image();
testImage.width = 256;
testImage.height = 200;
testImage.src = "images/Grumpy-Cat.jpg";
testImage.map = THREE.ImageUtils.loadTexture( this.testImage.src);

function Game()
{
    this.init = function()
    {
     this.controller = new Controller();
     this.input = new Input();
     this.input.setController(this.controller);
     this.input.start();

     this.players = {};

       console.log("Game Initialized");
       
    }

  this.networkUpdate = function(data) {
    console.log(data);
    socket.emit("response", { id: this.player.id,
                  velocity: this.player.sperm.getVelocity(),
                  position: this.player.sperm.getPosition(), 
                  rotation: this.player.sperm.getRotation(),
                });
    data.forEach(function (player) {
        if (player.id in this.players) {
            //this.players[player.id] set position of sperm here
        } else {
            var netSperm = new Sperm(0, 0, 80);
            var netPlayer = new Player(player.id, this.sperm);
            this.players[player.id] = netPlayer;
        }
    });
  }

    this.setPlayer = function(id) {
        this.sperm = new Sperm(0, 0, 80);
        this.player = new Player(id, this.sperm);
        animate();
    }

    this.reset = function() {

    }

    this.update = function() {
        // loop through gameobjects update
        this.input.update();
        this.player.update();

        // camera animation
        camera.position.set(
            ((this.player.getPosX()-camera.position.x) / 10) + camera.position.x, 
            ((this.player.getPosY()-camera.position.y) / 10) + camera.position.y, 
            500);
        console.log(gameWorldWidth);

    }
}



function animate()
{
    
    delta = clock.getDelta();
    elapsedTime = clock.getElapsedTime();
    if(READY)
    {
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




       
