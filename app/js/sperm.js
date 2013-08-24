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
	

	this.update = function()
	{
		posX += velX;
		posY += velY;
		rot += rotVel;

		bodySprite.updatePosition(_posX, _posY, _rot);
		//console.log("spermupdate");

	}

}