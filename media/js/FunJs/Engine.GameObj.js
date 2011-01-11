var Engine = Engine || {};

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
  this.fixed          = obj.fixed       || false;
  this.friction       = obj.friction    || 0.0;
  this.density        = obj.density     || 0.5;
  this.rotation       = obj.rotation    || 0;
  this.restitution    = obj.restitution || 0;
  this.parent         = obj.parent      || null;
  this.uData          = obj.uData       || {};
  this.sFlag          = obj.sFlag       || false;
  this.cFlags         = obj.cFlags;
  
  this.isTouchMoving  = false;
  this.touched        = false;
  
  var drawable = obj.drawable;
  if (drawable) {
    this.width = drawable.width  / Engine.density;
    this.height = drawable.height;
    
    this.drawable = new Engine[drawable.type](drawable.image, 
      new Engine.Sprite.Animation(drawable.animation.time, drawable.animation.frames));
    
    this.cBody = Engine.Physics.BoxBody(this);
  }
};

Engine.GameObj.prototype.tick = function(ctx, camera, dTime) {
  if (typeof this.onTick == 'function') {
    this.onTick(ctx, camera, dTime);
  }
  
  var pos = this.cBody.GetCenterPosition();
  this.location.x = pos.x;
  this.location.y = pos.y;
  
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
  
  var ret = cX > x1 && cX < x2 && cY > y1 && cY < y2;
  
  if (typeof this.onCatchEvent == 'function') {
    ret = ret && this.onCatchEvent(event);
  }
  return ret;
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

Engine.GameObj.prototype.onCollision = function(collider) {
};

Engine.GameObj.prototype.setPosition = function(x, y) {
  if (this.cBody) {
    this.cBody.SetCenterPosition(new b2Vec2(x, y), this.rotation);
    this.location.x = x;
    this.location.y = y;
  }
};

Engine.GameObj.prototype.draw = function(ctx, camera, dTime) {
  var d = this.drawable;
  
  this.width = d.animations.hDelta;
  this.height = d.image.height;
  
  if (typeof this.onDraw == 'function') {
    this.onDraw(ctx, camera, dTime);
  }
  
  if (d != null) {
    var dLoc = d.location;
    var loc = this.location;
    var lx = loc.x;
    var ly = loc.y;
    var w = this.width;
    var h = this.height;
    var pi = 3.14159265;
    
    dLoc.x = lx - camera.x1();
    dLoc.y = ly - camera.y1();
    
    ctx.save();
    
    ctx.translate(lx + (w / 2), ly + (h / 2));
    ctx.rotate(-((this.rotation) * pi / 180));
    ctx.translate(-(lx + (w / 2)), -(ly + (h / 2)));
    d.draw(ctx, dTime);
    
    ctx.restore();
    ctx.fillText("lx: " + lx + " ly: " + ly, this.location.x, this.location.y + this.height + 4);
    ctx.fillText("cbx: " + this.cBody.m_position.x + " cby: " + this.cBody.m_position.y, this.location.x, this.location.y + this.height + 14);
  }
};