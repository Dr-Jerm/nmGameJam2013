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
		this.velY += Math.sin(this.rot) * (y*2);
		this.velX += Math.cos(this.rot) * (y*2);
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
		if (this.posX > gameWorldWidth)
      		this.velX *= -1;
    	if (this.posX < -gameWorldWidth)
      		this.velX *= -1;
    	if (this.posY > gameWorldHeight)
      		this.velY *= -1;
    	if (this.posY < -gameWorldHeight)
      		this.velY *= -1;

    
    	this.posX += this.velX;
    	this.posY += this.velY;
    	this.rot += this.rotVel;

    	bodySprite.updatePosition(this.posX, this.posY, this.rot);

		this.velX *= .9;
		this.velY *= .9;
		this.rotVel *= .8;  

	}

	

}