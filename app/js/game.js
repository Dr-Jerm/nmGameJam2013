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
var camera = new THREE.PerspectiveCamera( 70, WIDTH / HEIGHT, 1, 5000 );

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

function Game()
{
    this.init = function()
    {

    	
     this.controller = new Controller();
     this.input = new Input();
     this.input.setController(this.controller);
     this.input.start();

     this.netPlayers = {};

       console.log("Game Initialized");
       this.newBackground = new Background(images["BGfull001.png"],0,0,0,12800,7200,-1000);
       this.newBackground = new Background(images["BGsecondary001.png"],0,0,0,2903,2007,100);
    }

  var netUpdateLocalPlayer = function (localPlayer, netPlayer) {
      localPlayer.gamete.posX = netPlayer.position.x;
      localPlayer.gamete.posY = netPlayer.position.y;

      localPlayer.gamete.rot = netPlayer.rotation.r;

      localPlayer.gamete.velX = netPlayer.velocity.x;
      localPlayer.gamete.velY = netPlayer.velocity.y;
  }

  this.networkUpdate = function(data) {
    socket.emit("response", { id: this.player.id,
                  velocity: this.player.gamete.getVelocity(),
                  position: this.player.gamete.getPosition(), 
                  rotation: this.player.gamete.getRotation(),
                });

    data.playerSnapshot.forEach(function (netPlayer) {
        if (netPlayer.id == this.player.id) { return }
        if (netPlayer.id in this.netPlayers) {
            netUpdateLocalPlayer(this.netPlayers[netPlayer.id], netPlayer);
            this.netPlayers[netPlayer.id].gamete.posX = netPlayer.position.x;
            this.netPlayers[netPlayer.id].gamete.posY = netPlayer.position.y;
        } else {
            var gamete = null;
            console.log(netPlayer.gameteType);
            if (netPlayer.gameteType === "egg") {
              gamete = new Egg(0, 0, 80);
            } else {
              gamete = new Sperm(0, 0, 80);
            }

            var newPlayer = new Player(netPlayer.id, gamete);
            newPlayer.gamete.netPlayer = true;
            this.netPlayers[netPlayer.id] = newPlayer;
        }
    }.bind(this));
  }

    this.setPlayer = function(id, gameteType) {
        var gamete;

        // TEMPORARY:
        // gameteType = "sperm";
        if (gameteType === "egg") {
            gamete = new Egg(0, 0, 80);    
        } else {
            gamete = new Sperm(0, 0, 80);
        }
        
        this.player = new Player(id, gamete);
        animate();
    }

    this.reset = function() {

    }

    this.update = function() {
        // loop through gameobjects update
        this.input.update();
        this.player.update();
        console.log(this.player.gamete);

        for (var key in this.netPlayers) {
            var netPlayer = this.netPlayers[key];
            netPlayer.update();
        }


        // camera animation
        camera.position.set(
            ((this.player.getPosX()-camera.position.x) / 10) + camera.position.x, 
            ((this.player.getPosY()-camera.position.y) / 10) + camera.position.y, 
            500);
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
