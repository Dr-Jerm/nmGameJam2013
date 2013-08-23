var pi = Math.PI;

function Vector(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

Vector.prototype.Add = function (v1, v2) {
  var sum = new Vector(0, 0, 0);
  sum.x = v1.x + v2.x;
  sum.y = v1.y + v2.y;
  sum.z = v1.z + v2.z;

  return sum;
}

// Subtracts v2 from v1
Vector.prototype.Subtract = function (v1, v2) {
  var diff = new Vector(0,0,0);
  diff.x = v1.x - v2.x;
  diff.y = v1.y - v2.y;
  diff.z = v1.z - v2.z;

  return diff;
}

