
var util = require('util');

module.exports = function Player (name, socket, startingAttrs) {
    this.name = name;
    this.id = socket.id;
    this.socket = socket;
    this.gameteType = "sperm";

    this.clientPlayer = function () {
        var clean = {
            name: this.name,
            id: this.id,
            position: this.position,
            velocity: this.velocity,
            rotation: this.rotation,
            scale: this.scale
        }
        return clean;
    }

    this.position = {
        x: 0,
        y: 0,
        z: 0,

        set: function(x, y, z) {
            if (y) {
                this.position.x = x;
                this.position.y = y;
                this.position.z = z;
            } else {
                this.position.x = x.x;
                this.position.y = x.y;
                this.position.z = x.z;
            }
        }.bind(this)
    }

    this.velocity = {
        x: 0,
        y: 0,
        z: 0,

        set: function(x, y, z) {
            if (y) {
                this.velocity.x = x;
                this.velocity.y = y;
                this.velocity.z = z;
            } else {
                this.velocity.x = x.x;
                this.velocity.y = x.y;
                this.velocity.z = x.z;
            }
        }.bind(this)
    }

    this.rotation = {
        r: 0,

        set: function(r) {
            this.rotation.r = r
        }.bind(this)
    }


    this.scale = {
        x: 1,
        y: 1,
        z: 1,

        set: function(x, y, z) {
            if (y) {
                this.scale.x = x;
                this.scale.y = y;
                this.scale.z = z;
            } else {
                this.scale.x = x.x;
                this.scale.y = x.y;
                this.scale.z = x.z;
            }
        }.bind(this)
    }

    var setAttrs = function (attrs) {
        if (attrs.position) {
            this.position.set(attrs.position);
        }
        if (attrs.velocity) {
            this.velocity.set(attrs.velocity);
        }
        if (attrs.rotation) {
            this.rotation.set(attrs.rotation);
        }
        if (attrs.scale) {
            this.scale.set(attrs.scale);
        }
        if (attrs.gameteType) {
            this.gameteType = attrs.gameteType;
        }
    }.bind(this);

    if (startingAttrs) {
        setAttrs(startingAttrs);
    }

    this.socket.on('response', function (data) {
        if (process.env.DEBUG) {console.log('Player.'+this.id+'.response')}
        setAttrs(data);
    });

}
