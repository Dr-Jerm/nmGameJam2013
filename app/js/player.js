function Player(id, name, _gamete)
{
    this.toXYCoords = function(pos) {
        var vector = projector.projectVector(pos, camera);
        vector.x = (vector.x + 1)/2 * window.innerWidth;
        vector.y = -(vector.y - 1)/2 * window.innerHeight;
        return vector;
    }

    this.id = id;
    this.gamete = _gamete;
    this.name = name;

    this.label = $("<div></div>", {class: "user_" + this.id, });
    this.label.css(
      { width: "auto", 
        position: "fixed", 
        zIndex: "1000",
        fontSize: "20px",
        fontFamily: "'Flavors', cursive", 
        color: "#eee",
        left: "0px",
        top: "0px" }
    );
    
    this.label.append("" + this.name);
    $('body').append(this.label);

    this.killLabel = function() {
      this.label.remove();
    }

    // movement
    this.moveForward = function() {
        this.gamete.moveForward(1);
    }
    this.rotateLeft = function() {
        this.gamete.rotateLeft(.01 + (this.gamete.getRotVel()*.3));
    }
    this.rotateRight = function() {
        this.gamete.rotateRight(.01 - (this.gamete.getRotVel()*.3));
    }

    this.setPosition = function(x, y, z) {
        this.gamete.setPosition(x, y, z);
    }


    // gets
    this.getPosX = function() {
        return this.gamete.getPosX();
    }
    this.getPosY = function() {
        return this.gamete.getPosY();
    }
      this.getRotation = function() {
        return this.gamete.getRotation();
    }


    this.update = function()
    {
        this.gamete.update();
        var pos = this.toXYCoords(this.gamete.getPosition());
        var left = pos.x - this.label.width()/2;
        var top = pos.y - 15;
        if (this.gamete.type == "egg") {
          console.log("is an egg");
          top = pos.y - 170;
        }
        this.label.css({ 
          top: top + "px", 
          left: left + "px",
          }
        );
    }
}
