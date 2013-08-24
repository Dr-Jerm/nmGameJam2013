function Player(_sperm)
{

	this.sperm = _sperm;

    this.moveForward = function() {
    	this.sperm.moveForward(1);
    }
    //this.moveDown = function() {
    //	this.sperm.moveDown(-1);
    //}
    this.rotateLeft = function() {
    	this.sperm.rotateLeft(.01);
    }
    this.rotateRight = function() {
    	this.sperm.rotateRight(.01);
    }


	this.update = function()
	{
		//console.log("playerupdate");
		
		this.sperm.update();

	}
}
