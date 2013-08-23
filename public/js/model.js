function Model(mesh) {
  this.mesh = mesh;
  this.position = new Vector3(mesh.position.x, 
                              mesh.position.y, 
                              mesh.position.z);
  // Model will contain all the materials here...eventually

}
