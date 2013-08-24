function Player(id, _sperm)
{
  this.id = id;
	this.sperm = _sperm;

    this.moveForward = function() {
    	this.sperm.moveForward(2);
    }
    this.rotateLeft = function() {
    	this.sperm.rotateLeft(.01 + (this.sperm.getRotVel()/2));
    }
    this.rotateRight = function() {
    	this.sperm.rotateRight(.01 - (this.sperm.getRotVel()/2));
    }

    var width = 640, height = 480;
	var widthHalf = width / 2, heightHalf = height / 2;

	//var vector = new THREE.Vector3();
	//var projector = new THREE.Projector();
	//projector.projectVector( vector.getPositionFromMatrix( object.matrixWorld ), camera );

	//vector.x = ( vector.x * widthHalf ) + widthHalf;
	//vector.y = - ( vector.y * heightHalf ) + heightHalf;


	this.update = function()
	{

		this.sperm.update();
		//var vector = new THREE.Vector3();
		//var projector = new THREE.Projector();
		//projector.projectVector( vector.getPositionFromMatrix( this.sperm.matrixWorld ), game.camera );
	}
}
