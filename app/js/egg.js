function Egg(_posX, _posY, _rot)
{
	this.posX = _posX;
	this.posY = _posY;

	var posZ = 0

	this.rot = _rot;

	this.velX = 0;
	this.velY = 0;
	this.rotVel = 0;

	bodySprite = new Sprite(images["Egg.png"], this.posX, this.posY, this.rot, 1);


	// movement
	this.moveForward = function(y) {
		this.velY += Math.sin(this.rot) * (y*.2);
		this.velX += Math.cos(this.rot) * (y*.2);
	}
	this.rotateLeft = function(y) {
		this.rotVel += (y*.1);
	}
	this.rotateRight = function(y) {
		this.rotVel -= (y*.1);
	}


	// gets
	this.getPosition = function() {
		return {
			x: this.posX, 
			y: this.posY, 
			z: this.posZ
		};
	}

	this.getVelocity = function() {
		return {
			x: this.velX,
			y: this.velY,
			z: 0,
		};
	}

  	this.getRotation = function() {
    	return this.rot;
  	}


	this.getPosX = function(){
		return this.posX;
	}
	this.getPosY = function(){
		return this.posY;
	}
	this.getRotVel = function(){
		return this.rotVel;
	}

	this.update = function()
	{
		//console.log("eggupdate");
		if ((this.posX+(images["Egg.png"].width/2) + this.velX) > gameWorldWidth)
      		this.velX *= -.75;

    	if ((this.posX-(images["Egg.png"].width/2) + this.velX) < -gameWorldWidth)
      		this.velX *= -.75;

    	if ((this.posY-(images["Egg.png"].height/2) + this.velY) > gameWorldHeight)
      		this.velY *= -.75;

    	if ((this.posY+(images["Egg.png"].height/2) + this.velY) < -gameWorldHeight)
      		this.velY *= -.75;

    
    	this.posX += this.velX;
    	this.posY += this.velY;
    	
    	if (this.rotVel > .1)
    		this.rotVel = .1;
    	if (this.rotVel < -.1)
    		this.rotVel = -.1;
    	
    	this.rot += this.rotVel;


    	bodySprite.updatePosition(this.posX, this.posY, this.rot);

		this.velX *= .99;
		this.velY *= .99;
		this.rotVel *= .98;  

	}

	

}