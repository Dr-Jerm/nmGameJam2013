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
	
	// input from player params here. 
	this.update = function()
	{
		posX += velX;
		posY += velY;
		rot += rotVel;

		rot++;

		
		bodySprite.updatePosition(posX, posY, rot);
		//console.log("spermupdate");

	}

}