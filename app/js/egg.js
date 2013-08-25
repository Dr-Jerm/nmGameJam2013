function Egg(_posX, _posY, _rot)
{
	this.type = "egg";

	this.posX = _posX;
	this.posY = _posY;

	var posZ = 0

	this.rot = _rot;
	this.ringRot = 0;
	this.insideRot = 0;

	this.velX = 0;
	this.velY = 0;
	this.insideVelX = 0;
	this.insideVelY = 0;
	this.rotVel = 0;
	this.ringRotVel = 0;
	this.insideRotVel = 0;

	this.radius = 110; 


	bodySprite = new Sprite(images["newEggMain.png"], this.posX, this.posY, this.rot, 1);
	bodyRingSprite = new Sprite(images["newEggOuterRing1.png"], this.posX, this.posY, this.rot, 1);
	bodyInside1Sprite = new Sprite(images["newEggInsidePartBig.png"], this.posX, this.posY, this.rot, 1);
	bodyInside2Sprite = new Sprite(images["newEggInsidePartSml2.png"], this.posX, this.posY, this.rot, 0);
	bodyInside3Sprite = new Sprite(images["newEggInsidePartSml.png"], this.posX, this.posY, this.rot, 0);

	var spirmList = new Array(); 

  this.clearSperm = function() {
    for (key in spirmList) {
      spirmList[key].remove();
    }
  }

  this.remove = function() {
    bodySprite.removeFromScene();
    this.clearSperm();
  }


	this.addSperm = function(_sperm, _angle)
	{
		_sperm.STUCKMODE = true; 
		_sperm.stuckRot = _angle; 
		spirmList.push(_sperm); 
	}

  this.setPosition = function(x, y, z) {
    this.posX = x;
    this.posY = y;
    posZ = z;
  }

	//XXXXXX TEST XXXXXX
	var sperm = new Sperm(0,0,0);
	this.addSperm(sperm, 0.1);
	var sperm = new Sperm(0,0,0);
	this.addSperm(sperm, 2.3);
	var sperm = new Sperm(0,0,0);
	this.addSperm(sperm, 0.5);
	var sperm = new Sperm(0,0,0);
	this.addSperm(sperm, 1.33);
	//XXXXXX TEST XXXXXX

	// movement
	this.moveForward = function(y) {
		this.velY += Math.sin(this.rot) * (y*.2);
		this.velX += Math.cos(this.rot) * (y*.2);
	}
	this.rotateLeft = function(y) {
		this.rotVel += (y*.1);
		this.ringRotVel += (y*.15);
		this.insideRotVel += (y*.08);
	}
	this.rotateRight = function(y) {
		this.rotVel -= (y*.1);
		this.ringRotVel -= (y*.15);
		this.insideRotVel -= (y*.08);
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
    	this.ringRot += this.ringRotVel;
    	this.insideRot += this.insideRotVel;

    	this.insideVelX += this.velX;
    	this.insideVelY += this.velY;

    	bodySprite.updatePosition(this.posX, this.posY, this.ringRot);
    	bodyRingSprite.updatePosition(this.posX, this.posY, this.rot);
    	bodyInside1Sprite.updatePosition(this.posX+(-this.insideVelX * .2), this.posY+(-this.insideVelY * .2), this.insideRot);
    	bodyInside2Sprite.updatePosition(this.posX+20+(this.insideVelX * .1), this.posY+20+(this.insideVelY * .1), this.rot*.9);
    	bodyInside3Sprite.updatePosition(this.posX+(-this.insideVelX * .2), this.posY+(-this.insideVelY * .2), this.rot-this.insideRot);

		this.velX *= .99;
		this.velY *= .99;
		this.rotVel *= .98;  

		this.ringRotVel *= .9825;
		this.insideRotVel *= .95;

		this.insideVelX *= .9;
		this.insideVelY *= .9;

		this.UpdateAttachedSperm();

	}

	this.UpdateAttachedSperm = function()
	{
		
		
		for(s in spirmList)
		{
			//console.log("Sperm");
			spirmList[s].updateStuck(this.posX, this.posY , this.rot, this.radius);
		}

	}
	

}
