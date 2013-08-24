function Sperm(_posX, _posY, _rot)
{
	var posX = _posX;
	var posY = _posY;

	var posz = 0

	var rot = _rot;

	var velX = 0;
	var velY = 0;
	var rotVel = 0;

	bodySprite = new Sprite(testImage, posX, posY, rot);
	
  	this.moveForward = function(y) {
    	//posY += y;
    	velY += y;
  	}
  	//this.moveDown = function(y) {
  	//	velY += y;
  	//}
  	this.rotateLeft = function(y) {
  		rotVel += y;
  	}
  	this.rotateRight = function(y) {
  		rotVel -= y;
  	}



	// input from player params here. 
	this.update = function()
	{
		posX += velX;
		posY += velY;
		rot += rotVel;

		//if (keyboard.pressed("r"))
		//{
		//	rot++;
		//}


		bodySprite.updatePosition(posX, posY, rot);
		//console.log("spermupdate");


		posY *= .9;
		posX *= .9;
		rotVel *= .9;

	}

}
