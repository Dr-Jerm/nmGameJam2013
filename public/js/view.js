function View() {

  this.renderer = 0;
  this.camera   = 0;
  this.scene    = 0;

  var initialize = function() {
    this.camera = new THREE.PerspectiveCamera(40, 
                       window.innerWidth / window.innerHeight, 
                       1, 2000);

    camera.position.y = 800;
    camera.rotation.x = -1 * pi / 2;

    // ======= This part will be removed by the player classes
    var mat = new THREE.MeshBasicMaterial({ color: 0xCC000 });
    var mesh = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 10),
                               mat);

    this.scene = new THREE.Scene();
    this.scene.add(mesh);

    // ======== end replace by player classes;
    
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  this.appendToDocument = function(doc) {
    doc.body.appendChild(renderer.domElement);
  }

  // window resize should be added to the document after the view
  // has already been instantiated (makes more sense, i think?)

  this.onWindowResize = function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  this.update = function() {
    // This function deals with updating so that the tick can occur in the game
    renderer.render(scene, camera);
  }

  this.start = function() {
    initialize();
  }
  
}
