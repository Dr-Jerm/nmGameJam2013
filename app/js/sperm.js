function Sperm(_posX, _posY, _rot)
{
	var posX = _posX;
	var posY = _posY;

	var posZ = 0

	var rot = _rot;

	var velX = 0;
	var velY = 0;
	var rotVel = 0;

	bodySprite = new Sprite(images["sperm.png"], posX, posY, rot);



	var tailGeometry = new THREE.Geometry();
	tailGeometry.vertices.push(new THREE.Vector3(posX, posY, 0));
	tailGeometry.vertices.push(new THREE.Vector3(-10, 0, 0));
    tailGeometry.vertices.push(new THREE.Vector3(60, 10, 0));
    tailGeometry.vertices.push(new THREE.Vector3(10, 23, 0));
    tailGeometry.vertices.push(new THREE.Vector3(16, 79, 0));
    tailGeometry.vertices.push(new THREE.Vector3(12, -68, 0));
    tailGeometry.vertices.push(new THREE.Vector3(18, -45, 0));

	var tailMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 0.5} );

	var tailLine = new THREE.Line(tailGeometry, tailMaterial);
	tailLine.geometry.dynamic = true;
	
	scene.add(tailLine);

  this.getPosition = function() {
    return [posX, posY, posZ];
  }

  this.getRotation = function() {
    return rot;
  }
	
  this.moveForward = function(y) {
    velY += Math.sin(rot) * y;
    velX += Math.cos(rot) * y;
  }
  this.rotateLeft = function(y) {
    rotVel += y;
  }
  this.rotateRight = function(y) {
    rotVel -= y;
  }

  this.getRotVel = function(){
    return rotVel;
  }

	// input from player params here. 
	this.update = function()
	{

		//if (posX > 400)
		//	velX *= -1.5;
		posX += velX;
		posY += velY;
		rot += rotVel;

		tailLine.geometry.vertices[0].set(posX,posY,0);
		tailLine.geometry.verticesNeedUpdate = true;

		bodySprite.updatePosition(posX, posY, rot);
		//console.log("spermupdate");

		// movement resistance
		velX *= .9;
		velY *= .9;
		rotVel *= .8;
		
	}

}
