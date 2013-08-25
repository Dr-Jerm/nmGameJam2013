function Sperm(_posX, _posY, _rot)
{
  this.posX = _posX;
  this.posY = _posY;

  var posZ = 0

  this.rot = _rot;

  this.velX = 0;
  this.velY = 0;
  this.rotVel = 0;

  var headRadius = 15; 

  var tailoffset = -18;
  var tailRot = 0; 
  var tailcycle = 0;
  var tailcycleSpeed = 1; 
  var tailcycleAmplitude = 0.25; 
  var tailsegmentdistence = 5;


  var bodySprite = new Sprite(images["sperm.png"], this.posX, this.posY, this.rot, 0);



  var tailGeometry = new THREE.Geometry();
  tailGeometry.vertices.push(new THREE.Vector3(this.posX, this.posY, 0));
  tailGeometry.vertices.push(new THREE.Vector3());
  tailGeometry.vertices.push(new THREE.Vector3());
  tailGeometry.vertices.push(new THREE.Vector3());
  tailGeometry.vertices.push(new THREE.Vector3());
  tailGeometry.vertices.push(new THREE.Vector3());
  tailGeometry.vertices.push(new THREE.Vector3());
  tailGeometry.vertices.push(new THREE.Vector3());
  tailGeometry.vertices.push(new THREE.Vector3());
  tailGeometry.vertices.push(new THREE.Vector3());
  tailGeometry.vertices.push(new THREE.Vector3());
  tailGeometry.vertices.push(new THREE.Vector3());
  tailGeometry.vertices.push(new THREE.Vector3());

  //var tailMaterial = new THREE.LineBasicMaterial( { color: 0xCC9C66, opacity: 0.25} );
  var tailMaterial = new THREE.LineBasicMaterial( { color: 0xCC9C66} );

  var tailLine = new THREE.Line(tailGeometry, tailMaterial);
  tailLine.geometry.dynamic = true;
  
  scene.add(tailLine);

  var tailVertexVelocities = new Array(); 
  for(p in tailLine.geometry.vertices)
  {
    tailVertexVelocities.push(new THREE.Vector3(0,0,0));
  }

    // movement
  this.moveForward = function(y) {
    this.velY += Math.sin(this.rot) * y;
    this.velX += Math.cos(this.rot) * y;
  }
  this.rotateLeft = function(y) {
    this.rotVel += y;
  }
  this.rotateRight = function(y) {
    this.rotVel -= y;
  }



  // gets
  this.getPosition = function() {
      return {
          x: this.posX, 
          y: this.posY, 
          z: posZ
      };
    }

    this.getVelocity = function() {
      return {
          x: this.velX,
          y: this.velY,
          z: 0,
      };
    }

  


  this.getPosition = function() {
    return {
      x: this.posX, 
      y: this.posY, 
      z: posZ
    };
  }

  this.getVelocity = function() {
    return {
      x: this.velX,
      y: this.velY,
      z: 0,
      r: this.rotVel
    };
  }

  this.getRotation = function() {
    return this.rot;
  }
  
  this.moveForward = function(y) {
    this.velY += Math.sin(this.rot+tailRot) * y;
    this.velX += Math.cos(this.rot+tailRot) * y;
  }
  this.rotateLeft = function(y) {
    this.rotVel += y;
  }
  this.rotateRight = function(y) {
    this.rotVel -= y;
  }

  this.getRotVel = function(){
    return this.rotVel;
  }


  this.getTailPosition = function()
  {
    return {
      x: Math.cos(this.rot+tailRot) * tailoffset+this.posX,
      y: Math.sin(this.rot+tailRot) * tailoffset+this.posY,
    };
  }

  // gets
  this.getPosX = function(){
    return this.posX;
  }
  this.getPosY = function(){
    return this.posY;
  }

  this.remove = function() {
    bodySprite.removeFromScene();
    scene.remove(tailLine);
  }

  // input from player params here. 
  this.update = function()
  {

  
  	
    
    this.posX += this.velX;
    this.posY += this.velY;
    this.rot += this.rotVel;

    

    bodySprite.updatePosition(this.posX, this.posY, this.rot+tailRot);
    //console.log("spermupdate");
    this.updateTail();
    // movement resistance
    if(!this.netPlayer) {
      this.velX *= .9;
      this.velY *= .9;
      this.rotVel *= .8;

      this.checkCollision();

    }

    
  }

  this.checkCollision = function()
  {
  	  if (this.posX > gameWorldWidth)
      this.velX *= -1.5;
    if (this.posX < -gameWorldWidth)
      this.velX *= -1.5;
    if (this.posY > gameWorldHeight)
      this.velY *= -1.5;
    if (this.posY < -gameWorldHeight)
      this.velY *= -1.5;


  	for(p in game.netPlayers)
  	{
  		var xdist = game.netPlayers[p].getPosX()-this.posX;
  		var ydist = game.netPlayers[p].getPosY()-this.posY;

  		var dist =  Math.sqrt(Math.pow(ydist, 2) + Math.pow(xdist, 2))
  		if(dist < 15)
  		{
  			var collisionAngle = Math.atan2(xdist,ydist);
  		
  			this.velX += Math.cos(collisionAngle)*15;
  			this.velY += Math.sin(collisionAngle)*15;
  			this.posX += Math.cos(collisionAngle)*15;
  			this.posY += Math.sin(collisionAngle)*15;


  			
  			console.log("collision "+collisionAngle); 
  		}
  		

  	}



  }



  this.updateTail = function()
  {
    var distX;
    var distY;
    var distX2;
    var distY2;
    
    tailcycleSpeed  = 0.2 + (Math.pow(this.velX,2)+Math.pow(this.velY,2))/100;
    tailcycleAmplitude = 0.1 + (Math.pow(this.velX,2)+Math.pow(this.velY,2))/200;
    tailcycle = tailcycle + tailcycleSpeed; 
    tailRot = Math.sin(tailcycle)*tailcycleAmplitude; 
    
    var tailpos = this.getTailPosition();
    
    var tailDeltaX = tailpos.x - tailLine.geometry.vertices[0].x;
    var tailDeltaY = tailpos.y - tailLine.geometry.vertices[0].y;

    tailVertexVelocities[0].setX(tailDeltaX);
    tailVertexVelocities[0].setY(tailDeltaY);
    tailLine.geometry.vertices[0].set(tailpos.x,tailpos.y,0);

    
    // var dot;
    var distVector3 = new THREE.Vector3(0,0,0);
    var dist; 
    // var distVector3Normalized  = new THREE.Vector3(0,0,0); 
    // var pointVelocityVector = new THREE.Vector3(0,0,0); 
    
    //var distVector3Normalized;

    for (var v3 = tailLine.geometry.vertices.length-1; v3 > 0; v3--)
    {

      
      
      //distVector3Normalized = distVector3.normalize();
      // dot = distVector3.dot(tailVertexVelocities[v3])//distVector3.length; 

      // distVector3Normalized = distVector3.normalize();//.multiplyScalar(  dot/distVector3.length );
      //dotVector3 = distVector3.multiplyScaler(dot/distVector3.length);
	  // dotVector3.setX(distVector3Normalized.x*(dot/distVector3.length()));
	  // dotVector3.setY(distVector3Normalized.y*(dot/distVector3.length()));

      tailLine.geometry.vertices[v3].setX(tailLine.geometry.vertices[v3].x+tailVertexVelocities[v3].x);
      tailLine.geometry.vertices[v3].setY(tailLine.geometry.vertices[v3].y+tailVertexVelocities[v3].y);
      
      distVector3.setX(tailLine.geometry.vertices[v3-1].x-tailLine.geometry.vertices[v3].x);
      distVector3.setY(tailLine.geometry.vertices[v3-1].y-tailLine.geometry.vertices[v3].y);

      dist = distVector3.length();

     // if(dist < tailsegmentdistence)
     // {
     // 	var errorRatio = dist/(tailsegmentdistence+1); 
     // 	tailLine.geometry.vertices[v3].setX(errorRatio*distVector3.x + tailLine.geometry.vertices[v3-1].x);
     // 	tailLine.geometry.vertices[v3].setY(errorRatio*distVector3.y + tailLine.geometry.vertices[v3-1].y);
     // 	console.log("ping");
     // }


      // if(distVector3.length() < 5)
      // {
      // 	tailVertexVelocities[v3].setX(tailVertexVelocities[v3-1].x);
      // 	tailVertexVelocities[v3].setY(tailVertexVelocities[v3-1].y);
      // }
      // else
      // {
      	tailVertexVelocities[v3].setX(tailVertexVelocities[v3-1].x);
      	tailVertexVelocities[v3].setY(tailVertexVelocities[v3-1].y);
      // }
    }
    //console.log("DistX:"+distVector3.x+" DistY:"+distVector3.y+"  dotx:"+dotVector3.x+"  doty:"+dotVector3.y+"  tx:"+tailVertexVelocities[3].y+"  tx:"+tailVertexVelocities[3].y)
    tailLine.geometry.verticesNeedUpdate = true;

  }

}
