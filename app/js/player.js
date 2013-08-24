function Player(id, _sperm)
{
  this.id = id;
	this.sperm = _sperm;

    this.moveForward = function() {
    	this.sperm.moveForward(2);
    }
    this.rotateLeft = function() {
    	this.sperm.rotateLeft(.01 + (this.sperm.getRotVel()/3));
    }
    this.rotateRight = function() {
    	this.sperm.rotateRight(.01 - (this.sperm.getRotVel()/3));
    }


	this.update = function()
	{
		
		this.sperm.update();

	}
}
