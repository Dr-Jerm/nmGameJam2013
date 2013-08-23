function Viewport() {
  this.renderer = 0;
  this.camera = 0;
  this.scene = 0;
}

Viewport.prototype.initialize = function() {
  var viewport = this;
  this.camera = new THREE.PerspectiveCamera(40, 
    window.innerWidth / window.innerHeight, 1, 2000);
  this.camera.position.y = 800;
  this.camera.rotation.x = -1 * pi / 2;

  var mat = new THREE.MeshBasicMaterial({ color: 0xCC000 });
  var mesh = new THREE.Mesh( new THREE.CubeGeometry(100, 100, 10), mat);

  this.scene = new THREE.Scene();
  this.scene.add(mesh);

  this.renderer = new THREE.WebGLRenderer({antialias: true});
  this.renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(this.renderer.domElement);
  
  window.addEventListener('resize', function() {
    viewport.onWindowResize();
  }, false);
}

Viewport.prototype.resizeHandlerFactory = function() {
}

Viewport.prototype.onWindowResize = function() {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize(window.innerWidth, window.innerHeight);
}

Viewport.prototype.render = function() {
  this.renderer.render(this.scene, this.camera);
}
