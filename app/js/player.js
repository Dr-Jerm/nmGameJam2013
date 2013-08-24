function Player(_sperm)
{

	this.sperm = _sperm;

  this.moveUp = function() {
    this.sperm.moveY(3);
  }


	this.update = function()
	{
		//console.log("playerupdate");
		
		this.sperm.update();

	}
}
