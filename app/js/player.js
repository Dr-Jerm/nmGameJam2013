function Player(_sperm)
{

	this.sperm = _sperm;

	var posX = 0;
	var posY = 0;
	var rot = 0;

	var velX = 0;
	var velY = 0;
	var rotVel = 0;

	this.update = function()
	{

		//console.log("playerupdate");
		this.sperm.update();

		posX += velX;
		posY += velY;
		rot += rotVel;

	}
}