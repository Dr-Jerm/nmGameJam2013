function Player(id, _gamete)
{
    this.id = id;
    this.gamete = _gamete;


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

    }
}
