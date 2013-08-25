function Sperm(_posX, _posY, _rot)
{
  var posX = _posX;
  var posY = _posY;

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

  var bodySprite = new Sprite(images["sperm.png"], posX, posY, rot);



  var tailGeometry = new THREE.Geometry();
  tailGeometry.vertices.push(new THREE.Vector3(posX, posY, 0));
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

  var tailMaterial = new THREE.LineBasicMaterial( { color: 0xCC9C66, opacity: 0.25} );

  var tailLine = new THREE.Line(tailGeometry, tailMaterial);
  tailLine.geometry.dynamic = true;
  
  scene.add(tailLine);


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
          x: posX, 
          y: posY, 
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
      x: posX, 
      y: posY, 
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
      x: Math.cos(rot+tailRot) * tailoffset+posX,
      y: Math.sin(rot+tailRot) * tailoffset+posY,
    };
  }

  // gets
  this.getPosX = function(){
    return posX;
  }
  this.getPosY = function(){
    return posY;
  }
  this.getRotVel = function(){
  return rotVel;
  }

  // input from player params here. 
  this.update = function()
  {

    if (posX > gameWorldWidth)
      velX *= -1.5;
    if (posX < -gameWorldWidth)
      velX *= -1.5;
    if (posY > gameWorldHeight)
      velY *= -1.5;
    if (posY < -gameWorldHeight)
      velY *= -1.5;

    
    posX += velX;
    posY += velY;
    rot += rotVel;

    

    bodySprite.updatePosition(posX, posY, rot+tailRot);
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
    


    for (var v3 = tailLine.geometry.vertices.length-1; v3 > 0; v3--)
    {
      distX = tailLine.geometry.vertices[v3].x - tailLine.geometry.vertices[v3-1].x;
      distY = tailLine.geometry.vertices[v3].y - tailLine.geometry.vertices[v3-1].y;
      distX2 = Math.pow(distX, 2);
      distY2 = Math.pow(distY, 2); 
      
      if(distX2 > 50)
      {
        tailLine.geometry.vertices[v3].setX( tailLine.geometry.vertices[v3-1].x + distX / 3);
      }
      if(distY2 > 50)
      {
        tailLine.geometry.vertices[v3].setY( tailLine.geometry.vertices[v3-1].y + distY / 3);
      }

      // if(distX2 > 100)
      // {
      //   tailLine.geometry.vertices[v3].setX(tailLine.geometry.vertices[v3-1].x);
      // }
      // if(distX2 < 25)
      // {
      //   tailLine.geometry.vertices[v3].setX(tailLine.geometry.vertices[v3-1].x);
      // }
      // if(distY2 < 100)
      // {
      //   tailLine.geometry.vertices[v3].setY(tailLine.geometry.vertices[v3-1].y);
      // }
      //tailLine.geometry.vertices[v3].setX(tailLine.geometry.vertices[v3-1].x);
      //tailLine.geometry.vertices[v3].setY(tailLine.geometry.vertices[v3-1].y);


    }
    
    tailcycleSpeed  = 0.2 + (Math.pow(velX,2)+Math.pow(velY,2))/100;
    tailcycle = tailcycle + tailcycleSpeed ; 
    tailRot = Math.sin(tailcycle)*tailcycleAmplitude; 
    var tailpos = this.getTailPosition();
    tailLine.geometry.vertices[0].set(tailpos.x,tailpos.y,0);
    tailLine.geometry.verticesNeedUpdate = true;

  }

}
