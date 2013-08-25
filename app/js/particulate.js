function Particulate(_posX, _posY, _rotVel, _img, _scale, _zdepth)
{

	this.posX = _posX;
  	this.posY = _posY;
  	this.rot = 0; 
 	this._zdepth = _zdepth

 	this.rotVel = _rotVel;

 	_img.height *= _scale;
 	_img.width *= _scale;
	var sprite = new Sprite(_img, this.posX, this.posY, this.rot, this._zdepth);


	this.update = function()
	{
		this.rot += _rotVel; 
		sprite.updatePosition(this.posX, this.posY, this.rot);
	}

}