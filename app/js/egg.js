function Egg(_posX, _posY, _rot)
{
	var posX = _posX;
	var posY = _posY;

	var posZ = 0

	var rot = _rot;

	var velX = 0;
	var velY = 0;
	var rotVel = 0;

	bodySprite = new Sprite(images["Egg.png"], posX, posY, rot);


	// movement
	this.moveForward = function(y) {
		velY += Math.sin(rot) * y;
		velX += Math.cos(rot) * y;
	}
	this.rotateLeft = function(y) {
		rotVel += y;
	}
	this.rotateRight = function(y) {
		rotVel -= y;
	}


	// gets
	this.getPosition = function() {
		return {
			x: posX, 
			y: posY, 
			z: posZ
		};
	}

	this.getVelocity = function() {
		return {
			x: velX,
			y: velY,
			z: 0,
		};
	}

  	this.getRotation = function() {
    	return rot;
  	}


	this.getPosX = function(){
		return posX;
	}
	this.getPosY = function(){
		return posY;
	}
	this.getRotVel = function(){
		return rotVel;
	}

	this.update = function()
	{
		//console.log("eggupdate");


	}

	

}