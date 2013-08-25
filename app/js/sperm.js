function Sperm(_posX, _posY, _rot)
{
  this.posX = _posX;
  this.posY = _posY;

  var posZ = 0

  var rot = _rot;

  var velX = 0;
  var velY = 0;
  var rotVel = 0;

  var tailoffset = -18;
  var tailRot = 0; 
  var tailcycle = 0;
  var tailcycleSpeed = 1; 
  var tailcycleAmplitude = 0.25; 
  var tailsegmentdistence = 5;

  var bodySprite = new Sprite(images["sperm.png"], this.posX, this.posY, rot, 0);



  var tailGeometry = new THREE.Geometry();
  tailGeometry.vertices.push(new THREE.Vector3(this.posX, this.posY, 0));
  tailGeometry.vertices.push(new THREE.Vector3());
    tailGeometry.vertices.push(new THREE.Vector3());
    tailGeometry.vertices.push(new THREE.Vector3());
    tailGeometry.vertices.push(new THREE.Vector3());
    tailGeometry.vertices.push(new THREE.Vector3());
    tailGeometry.vertices.push(new THREE.Vector3());
    tailGeometry.vertices.push(new THREE.Vector3());
    tailGeometry.vertices.push(new THREE.Vector3());
    tailGeometry.vertices.push(new THREE.Vector3());
    tailGeometry.vertices.push(new THREE.Vector3());
    tailGeometry.vertices.push(new THREE.Vector3());
    tailGeometry.vertices.push(new THREE.Vector3());

  //var tailMaterial = new THREE.LineBasicMaterial( { color: 0xCC9C66, opacity: 0.25} );
  var tailMaterial = new THREE.LineBasicMaterial( { color: 0xCC9C66} );

  var tailLine = new THREE.Line(tailGeometry, tailMaterial);
  tailLine.geometry.dynamic = true;
  
  scene.add(tailLine);

  var tailVertexVelocities = new Array(); 
  for(p in tailLine.geometry.vertices)
  {
    tailVertexVelocities.push(new THREE.Vector3(0,0,0));
  }

    // movement
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



  // gets
  this.getPosition = function() {
      return {
          x: this.posX, 
          y: this.posY, 
          z: posZ
      };
    }

    this.getVelocity = function() {
      return {
          x: velX,
          y: velY,
          z: 0,
      };
    }

  


  this.getPosition = function() {
    return {
      x: this.posX, 
      y: this.posY, 
      z: posZ
    };
  }

  this.getVelocity = function() {
    return {
      x: velX,
      y: velY,
      z: 0,
    };
  }

  this.getRotation = function() {
    return rot;
  }
  
  this.moveForward = function(y) {
    velY += Math.sin(rot+tailRot) * y;
    velX += Math.cos(rot+tailRot) * y;
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


  this.getTailPosition = function()
  {
    return {
      x: Math.cos(rot+tailRot) * tailoffset+this.posX,
      y: Math.sin(rot+tailRot) * tailoffset+this.posY,
    };
  }

  // gets
  this.getPosX = function(){
    return this.posX;
  }
  this.getPosY = function(){
    return this.posY;
  }
  this.getRotVel = function(){
  return rotVel;
  }

  // input from player params here. 
  this.update = function()
  {

    if (this.posX > gameWorldWidth)
      velX *= -1.5;
    if (this.posX < -gameWorldWidth)
      velX *= -1.5;
    if (this.posY > gameWorldHeight)
      velY *= -1.5;
    if (this.posY < -gameWorldHeight)
      velY *= -1.5;

    
    this.posX += velX;
    this.posY += velY;
    rot += rotVel;

    

    bodySprite.updatePosition(this.posX, this.posY, rot+tailRot);
    //console.log("spermupdate");
    this.updateTail();
    // movement resistance
    velX *= .9;
    velY *= .9;
    rotVel *= .8;
    
  }

  this.updateTail = function()
  {
    var distX;
    var distY;
    var distX2;
    var distY2;
    
    tailcycleSpeed  = 0.2 + (Math.pow(velX,2)+Math.pow(velY,2))/100;
    tailcycleAmplitude = 0.1 + (Math.pow(velX,2)+Math.pow(velY,2))/200;
    tailcycle = tailcycle + tailcycleSpeed; 
    tailRot = Math.sin(tailcycle)*tailcycleAmplitude; 
    
    var tailpos = this.getTailPosition();
    
    var tailDeltaX = tailpos.x - tailLine.geometry.vertices[0].x;
    var tailDeltaY = tailpos.y - tailLine.geometry.vertices[0].y;

    tailVertexVelocities[0].setX(tailDeltaX);
    tailVertexVelocities[0].setY(tailDeltaY);
    tailLine.geometry.vertices[0].set(tailpos.x,tailpos.y,0);

    var scalerVector3 = new THREE.Vector3(1,1,1);

    for (var v3 = tailLine.geometry.vertices.length-1; v3 > 0; v3--)
    {

      tailLine.geometry.vertices[v3].setX(tailLine.geometry.vertices[v3].x+tailVertexVelocities[v3].x);
      tailLine.geometry.vertices[v3].setY(tailLine.geometry.vertices[v3].y+tailVertexVelocities[v3].y);
      tailVertexVelocities[v3].setX(tailVertexVelocities[v3-1].x);
      tailVertexVelocities[v3].setY(tailVertexVelocities[v3-1].y);

    }
    //console.log("PVX:"+velX+" PVY"+velY+"  dx:"+tailDeltaX+"  dy:"+tailDeltaY+"  tx:"+tailVertexVelocities[3].y+"  tx:"+tailVertexVelocities[3].y)
    tailLine.geometry.verticesNeedUpdate = true;

  }


}
