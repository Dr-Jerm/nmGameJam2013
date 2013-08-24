function Sperm(_posX, _posY, _rot)
{
	var posX = _posX;
	var posY = _posY;

	var posz = 0

	var rot = _rot;

	var velX = 0;
	var velY = 0;
	var rotVel = 0;

	bodySprite = new Sprite(images["sperm.png"], posX, posY, rot);
	
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

  	this.getRotVel = function(){
  		return rotVel;
  	}



	// input from player params here. 
	this.update = function()
	{

		//if (posX > 400)
		//	velX *= -1.5;
		posX += velX;
		posY += velY;
		rot += rotVel;


		bodySprite.updatePosition(posX, posY, rot);
		//console.log("spermupdate");


		// movement resistance
		velX *= .9;
		velY *= .9;
		rotVel *= .8;

		
	}

}
