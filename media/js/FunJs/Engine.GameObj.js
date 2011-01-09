Engine = Engine || {};

Engine.GameObj = function(obj) {
  this.init(obj);
  return this;
};

Engine.GameObj.prototype.init = function(obj) {
  this.name           = obj.name;
  this.location       = Engine.Point(obj.x, obj.y);
  this.uid            = "" + Engine.getTime();
  this.width          = 0;
  this.height         = 0;
  this.rotation       = obj.rotation || 0;
  
  this.isTouchMoving  = false;
  this.touched        = false;
  
  var velocity        = obj.velocity || Engine.Vector();
  this.velocity       = Engine.Vector(velocity.x, velocity.y);
  
  var drawable = obj.drawable;
  if (drawable) {
    this.drawable = new Engine.Sprite(drawable.image, 
      new Engine.Sprite.Animation(drawable.animation.time, drawable.animation.frames));
  }
};

Engine.GameObj.prototype.tick = function(ctx, camera, dTime) {
  if (typeof this.onTick == 'function') {
    this.onTick(ctx, camera, dTime);
  }
  
  var loc   = this.location;
  var v     = this.velocity;
  var scale = dTime / 1000;
  
  loc.x += v.x * (scale);
  loc.y += v.y * (scale);
  
  if (this.inScene(camera)) {
    this.draw(ctx, camera, dTime);
  }
};

Engine.GameObj.prototype.catchEvent = function(event) {
  event   = event.touches[0];
  var cX  = event.pageX; // Click x
  var cY  = event.pageY; // Click y
  
  var loc = this.location;
  var lx  = loc.x;
  var ly  = loc.y;
  
  var x1  = lx;
  var y1  = ly;
  var x2  = lx + this.width;
  var y2  = ly + this.height;
  
  return cX > x1 && cX < x2 && cY > y1 && cY < y2;
};

Engine.GameObj.prototype.inScene = function(camera) {
  var loc     = this.location;
  var d       = this.drawable;
  var loaded  = d.loaded;
  
  var dWidth  = (d && loaded)? d.animations.hDelta: 0;
  var dHeight = (d && loaded)? d.image.height: 0;
  
  return  loc.x >= camera.x1() - dWidth && loc.x <= camera.x2() + dWidth &&
          loc.y >= camera.y1() - dHeight && loc.y <= camera.y2() + dHeight;
};

Engine.GameObj.prototype.bind = function(event) {
  Engine.Event.Registry[event].push(this);
};

Engine.GameObj.prototype.unBind = function(event) {
  var reg = Engine.Event.Registry[event];
  var len = reg.length;
  
  while (len--) {
    var obj = reg[len];
    if (obj.uid == this.uid) { 
      reg.splice(len, 1);
      break;
    }
  }
};

Engine.GameObj.prototype.draw = function(ctx, camera, dTime) {
  this.width = this.drawable.animations.hDelta;
  this.height = this.drawable.image.height;
  
  if (typeof this.onDraw == 'function') {
    this.onDraw(ctx, camera, dTime);
  }
  
  var d = this.drawable;
  if (d != null) {
    var dLoc = d.location;
    var loc = this.location;
    dLoc.x = loc.x - camera.x1();
    dLoc.y = loc.y - camera.y1();
    d.draw(ctx, dTime);
  }
};