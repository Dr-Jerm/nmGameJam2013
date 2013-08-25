//--------------ENGINE----------------------------
var container = document.getElementById( 'container' );
var context;

var DEBUG = true; // Debug mode (show FPS)
var EDITOR = false;
var READY = false;

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;



gameWorldWidth = 1500;
gameWorldHeight = 1500;

var eggSpawnX = 900;
var eggSpawnY = 900;
var spermSpawnX = -900; 
var spermSpawnY = -900; 

var spriteZDepth = -10; 

//-------THREE.js variables ---------//
var clock = new THREE.Clock();
var delta;
var elapsedTime;


music = document.getElementById("music");
music.volume = .025;
music.play();
underwater = document.getElementById("underwater");
underwater.volume = .5;
underwater.play();
swim = document.getElementById("swim"); 
swim.volume = .5;
win = document.getElementById("win"); 
squish = document.getElementById("squish"); 

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
     this.endscreen = $("<div></div>", { class: "end_screen" });
     $('body').append(this.endscreen);
     this.endscreen.css({
       padding: "20px", 
       color: "#fff",
       position: "fixed",
       width: "800px",
       height: "100px",
       left: "50%",
       top: "50%",
       marginTop: "-25px",
       marginLeft: "-300px",
       zIndex: "1000",
       fontSize: "40px",
       textAlign: "center",
       fontFamily: "'Flavors', cursive",
       border: "solid 1px #ffe",
     });
     this.endscreen.hide();
		

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

		// ambientLight = new THREE.AmbientLight( 0xffffff);
		// ambientLight.position.set(0,100,10);
		// scene.add(ambientLight);
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
          if (netPlayer.id in this.netPlayers) {
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
      $('body .label').remove();
      this.endscreen.hide();

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


    this.score = function(data)
    {
    	squish.play();
        console.log("score: "+data.score+" id"+data.id+" angle"+data.angle);
        if(data.id == this.player.id &&  this.player.gamete.type == "sperm")
        {
          this.player.gamete.setPosition(spermSpawnX, spermSpawnY, 0);
        }
        
        if(this.player.gamete.type == "egg")
        {
          this.player.gamete.addSperm(new Sperm(this.player.getPosX(), this.player.getPosY(), data.angle), data.angle);

        }
        else 
        {
          for(var p in this.netPlayers)
          {
            if (this.netPlayers[p].gamete.type == "egg"); 
            {
              this.netPlayers[p].gamete.addSperm(new Sperm(this.netPlayers[p].getPosX(), this.netPlayers[p].getPosY(), data.angle), data.angle);

            }

          }
        }
        




    }


    this.fertilizedMessages = [
      "This ain’t no chick flick",
      "Whoever wins...we lose",
      "You have been fertilized",
      "Suddenly, life was more than French fries, gravy, and girls",
      "The first casualty of war is innocence",
      "I changed my sex!",
      "This is the weekend they didn't play golf",
      "You just got fertilized",
      ];
    this.winMessages = [
      "Great swimming, Phelps!",
      "You fertilized the egg!",
      "Free Willy!",
      "An epic of miniature proportions",
      "I changed my sex!",
      "There is no gene for the human spirit",
      "It's a boy!",
      "It's a girl!",
      ];
    this.loseMessages = [
      "No mitosis for you!",
      "You failed to fertilize the egg!",
      "Don't worry, you all look the same anyways",
      "Just when you thought it was safe to go back in the water",
      "Size does matter",
      "There are 3.7 trillion fish in the ocean. They’re looking for one",
      "It can be Hell getting into Heaven",
      "There's always next time...well, maybe not",
      ];

    this.end = function(data) {
      // Display a "you suck" to everyone except winner
      var rand = Math.floor((Math.random() * 8));
      win.play();
      if (data.playerId == this.player.id) {
        // win
        this.endscreen.html(this.winMessages[rand]);
      } else if (this.player.gamete.type == "egg") {
        // fertilized
        this.endscreen.html(this.fertilizedMessages[rand]);
      } else {
        // lost
        this.endscreen.html(this.loseMessages[rand]);
      }
      this.endscreen.show();
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
