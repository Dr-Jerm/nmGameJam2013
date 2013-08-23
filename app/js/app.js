(function(){
	console.log("Up and running!");
	$.get('/api/name', function(data) {
		$('#ajax-injected').html(data.name);
	})

    socket.on('hello', function (data) {
        $('#socket-injected').html(data.welcome);
        // socket.emit('my other event', { my: 'data' });
    });
})();


(function () { 
var camera, scene, renderer;
var mesh;

init();
animate();

function init() {

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 400;

  scene = new THREE.Scene();

  var geometry = new THREE.CubeGeometry( 200, 200, 200 );

//  var texture = THREE.ImageUtils.loadTexture( 'textures/crate.gif' );
//  texture.anisotropy = renderer.getMaxAnisotropy();

  var material = new THREE.MeshBasicMaterial( { color: 0xffaa00, wireframe: true } );

  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );


  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  requestAnimationFrame( animate );

  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.01;

  renderer.render( scene, camera );
}

})();
