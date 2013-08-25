function Sprite(_img, _posX, _posY, _rot)
{
	
	this.posX = _posX; 
	this.posY = _posY; 
	this.rot = _rot;

	this.img = _img;
	
	this.height = this.img.height;
	this.width  = this.img.width;
	
	this.center_h = this.height/2;
	this.center_w = this.width/2;
	

	this.map = this.img.map;
	this.geo = new THREE.PlaneGeometry(this.width, this.height);
	
	this.material = new THREE.MeshLambertMaterial({map: this.map});
	// this.material = new THREE.MeshBasicMaterial({color: 0xCC0000});

	this.material.transparent = true;
	this.mesh = new THREE.Mesh(this.geo, this.material);
	this.mesh.sprite = this;
	this.mesh.position.x = this.posX;	
	this.mesh.position.y = this.posY;
	this.mesh.position.z = 0;
	this.mesh.rotation.z = this.rot;


	scene.add(this.mesh);


	this.updatePosition = function(_posX, _posY, _rot)
	{
		this.posX = _posX; 
		this.posY = _posY; 
		this.rot = _rot;

		

		this.mesh.position.x = this.posX;	
		this.mesh.position.y = this.posY;
		this.mesh.rotation.z = this.rot;
	}

	this.removeFromScene = function () {
		scene.remove(this.mesh);
	}

}