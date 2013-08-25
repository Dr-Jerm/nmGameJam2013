//--------------ENGINE----------------------------
var container = document.getElementById( 'container' );
var context;

var DEBUG = true; // Debug mode (show FPS)
var EDITOR = false;
var READY = false;

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;



gameWorldWidth = 2500;
gameWorldHeight = 2500;

var eggSpawnX = 2000;
var eggSpawnY = 0;
var spermSpawnX = 0; 
var spermSpawnY = 0; 

var spriteZDepth = -10; 

//-------THREE.js variables ---------//
var clock = new THREE.Clock();
var delta;
var elapsedTime;


underwater = document.getElementById("underwater");
underwater.volume = .5;
swim = document.getElementById("swim");
//bump1 

var renderer = new THREE.WebGLRenderer( { clearColor: 0x000000, clearAlpha: 1 } );

var renderer = null;
renderer = new THREE.WebGLRenderer( { clearColor: 0x000000, clearAlpha: 1 } );

renderer.setSize( window.innerWidth, window.innerHeight );
//renderer.sortObjects = true;
container.appendChild( renderer.domElement ); 

// new camera
var camera = null;

// new scene
var scene = null; 
    
// new projector
var projector = null;

var ambientLight = null; 


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
    stats.domElement.style.top = '25px';
    container.appendChild( stats.domElement );
}


function Game()
{
    this.init = function()
    {
     this.setUpRenderer();
     this.buildWorldGeo(); 


    	//var snd = new Audio("sound/soundTest.wav");
		//snd.play();
		//document.getElementById("underwater").cloneNode(true).play()
		underwater.play();

     renderer.sortObjects = true;
     this.controller = new Controller();
     this.input = new Input();
     this.input.setController(this.controller);
     this.input.start();
     this.wasReset = false;

     this.netPlayers = {};

       console.log("Game Initialized");

       socket.on('playerDisconnect', function (data) {
           var playerId = data.playerId;
           this.netPlayers[playerId].gamete.remove();
           this.netPlayers[playerId].killLabel();
           delete this.netPlayers[playerId];
       }.bind(this));
      


       //-----------
      
    }

    this.setUpRenderer = function()
    {
    	clock = new THREE.Clock();
		
		
		// new camera
		camera = new THREE.PerspectiveCamera( 70, WIDTH / HEIGHT, 1, 5000 );

		// new scene
		scene = new THREE.Scene();
		    
		// new projector
		projector = new THREE.Projector();

		camera.position.set(0,0,100);

		camera.position.z = 400;
		scene.add(camera);

		ambientLight = new THREE.AmbientLight( 0xffffff);
		ambientLight.position.set(0,100,0);
		scene.add(ambientLight);
    }


    this.buildWorldGeo = function()
    {
       this.newBackground = new Background(images["BGfull001.png"],0,0,0,12800,7200,-1200);
       this.newBackground = new Background(images["BGsecondary001.png"],0,0,0,11612,8028,-500);
       this.particulateList = new Array();
       // for (var i = 0; i < 75; i++)
       // {
       // 		this.particulateList.push( new Particulate( Math.random()*gameWorldWidth*2-gameWorldWidth, Math.random()*gameWorldHeight*2-gameWorldHeight,  (Math.random()-0.5)/30, images["particulate001.png"], 1,   Math.random()*800 - 400)); 
       // }
       // for (var i = 0; i < 75; i++)
       // {
       // 		this.particulateList.push( new Particulate( Math.random()*gameWorldWidth*2-gameWorldWidth, Math.random()*gameWorldHeight*2-gameWorldHeight,  (Math.random()-0.5)/30, images["particulate002.png"], 1,   Math.random()*800 - 400)); 
       // }
       // for (var i = 0; i < 75; i++)
       // {
       // 		this.particulateList.push( new Particulate( Math.random()*gameWorldWidth*2-gameWorldWidth, Math.random()*gameWorldHeight*2-gameWorldHeight,  (Math.random()-0.5)/30, images["particulate003.png"], 1,   Math.random()*800 - 400)); 
       // }

    }

    this.updateWorld = function()
    {
    	for(var p in this.particulateList)
    	{
    		this.particulateList[p].update();
    	}


    }


    //------- Network functions -------
    var netUpdateLocalPlayer = function (localPlayer, netPlayer) {
        localPlayer.gamete.posX = netPlayer.position.x;
        localPlayer.gamete.posY = netPlayer.position.y;

        localPlayer.gamete.rot = netPlayer.rotation.r;

        localPlayer.gamete.velX = netPlayer.velocity.x;
        localPlayer.gamete.velY = netPlayer.velocity.y;
    }

    this.updatePlayers = function(data) {
      data.playerSnapshot.forEach(function (netPlayer) {
          if (netPlayer.id == this.player.id) { return }
          else if (netPlayer.id in this.netPlayers) {
              netUpdateLocalPlayer(this.netPlayers[netPlayer.id], netPlayer);
              this.netPlayers[netPlayer.id].gamete.posX = netPlayer.position.x;
              this.netPlayers[netPlayer.id].gamete.posY = netPlayer.position.y;
          } else {
              var gamete = null;
              var newPlayer = null;
              if (netPlayer.gameteType === "egg") {
                gamete = new Egg(eggSpawnX, eggSpawnY, 80);
                var newPlayer = new Player(netPlayer.id, netPlayer.name, gamete);
              } else {
                gamete = new Sperm(spermSpawnX, spermSpawnY, 80);
                var newPlayer = new Player(netPlayer.id, netPlayer.name, gamete);
              }

              newPlayer.gamete.netPlayer = true;
              this.netPlayers[netPlayer.id] = newPlayer;
          }
      }.bind(this));
    }



    this.networkUpdate = function(data) {
      socket.emit("response", { id: this.player.id,
                    velocity: this.player.gamete.getVelocity(),
                    position: this.player.gamete.getPosition(), 
                    rotation: this.player.gamete.getRotation(),
                  });
      
      this.updatePlayers(data);
    }

    this.setPlayer = function(id, name, gameteType) {
        var gamete;

        if (gameteType === "egg") {
            gamete = new Egg(eggSpawnX, eggSpawnY, 80);    
            this.player = new Player(id, name, gamete);
        } else {
            gamete = new Sperm(spermSpawnX, spermSpawnY, 80);
            this.player = new Player(id, name, gamete);
        }
        //egg = new Egg(0,0,0);
        animate();
    }

    this.reset = function(data) 
    {
    	this.setUpRenderer();
    	this.buildWorldGeo(); 
 		var myPlayerID = this.player.id;

 		this.player = null; 
 		this.netPlayers = {};

 		data.playerSnapshot.forEach(function (netPlayer) 
 		{
	 		if (netPlayer.id == myPlayerID)
	 		{
	 			if (netPlayer.gameteType === "egg") 
	 			{
	             	this.player = new Player( netPlayer.id, netPlayer.name, new Egg(eggSpawnX, eggSpawnY, 80));
	            } 
	            else 
	            {
	                this.player = new Player( netPlayer.id, netPlayer.name, new Sperm(spermSpawnX, spermSpawnY, 80));    
	            }
	 		}
	 		else
	 		{
              if (netPlayer.gameteType === "egg") 
              {
                var gamete = new Egg(eggSpawnX, eggSpawnY, 80);
                gamete.netPlayer = true;
                this.netPlayers[netPlayer.id] = new Player(netPlayer.id, netPlayer.name, gamete);
              } 
              else 
              {
                var gamete = new Sperm(spermSpawnX, spermSpawnY, 80);
                gamete.netPlayer = true;
                this.netPlayers[netPlayer.id] = new Player(netPlayer.id, netPlayer.name, gamete);
              }
            }



 		}.bind(this));
       	// for (key in this.netPlayers) {
        //     this.netPlayers[key].killLabel();
        //     this.netPlayers[key].gamete.remove();
        //     delete this.netPlayers[key];
            


        //     console.log(key);
        //     console.log(this.netPlayers[key]);
        // }
        // this.wasReset = true;
    }

    this.end = function(data) {
      // Display a "you suck" to everyone except winner
    }

    this.update = function() {
        // loop through gameobjects update
        this.input.update();
        this.player.update();
        //console.log(this.player.gamete);

        for (var key in this.netPlayers) {
            var netPlayer = this.netPlayers[key];
            netPlayer.update();
        }


        // camera animation
        camera.position.set(
            ((this.player.getPosX()-camera.position.x) / 25) + camera.position.x, 
            ((this.player.getPosY()-camera.position.y) / 25) + camera.position.y, 
            500);

        this.updateWorld(); 
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
