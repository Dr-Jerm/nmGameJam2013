function Player(_sperm)
{

	this.sperm = _sperm;


	this.update = function()
	{
		//console.log("playerupdate");
		
		this.sperm.update();

	}
}