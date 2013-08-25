function Background (_img, _posX, _posY, _rot, _width, _height, _zDepth) {

	this.posX = _posX;
	this.posY = _posY;
	this.zDepth = _zDepth;
	var posZ = 0
	this.img = _img;

	var rot = _rot;

	var img = images["BGfull001.png"];
	img.width = _width;
	img.height = _height;
	backgroundSprite = new Sprite(this.img, 0, 0, 0, this.zDepth);


	


}