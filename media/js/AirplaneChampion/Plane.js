var Engine = Engine || {};
Engine.Obj = Engine.Obj || {};

Engine.Obj.Plane = function(obj) {
  this.init(obj);
  this.isFlying = false;
  this.touch = {};
  this.touch.distance = 0;
  
  this.bind('TouchStart');
  this.bind('TouchMove');
  this.bind('TouchEnd');

  return this;
};

Engine.Obj.Plane.prototype = Engine.GameObj.prototype;

Engine.Obj.Plane.prototype.onDraw = function(ctx, camera, dTime) {};

Engine.Obj.Plane.prototype.onTick = function(ctx, camera, dTime) {
  var l = this.location;
  var d = this.drawable;
  var height = d.image.height; 
  var width = d.animations.hDelta;
  if (l.x > 480 + width) {
    l.x = 0 - width;
    this.setPosition(l.x, l.y);
  }
  
  if (l.x < (-5) - width) {
    l.x = 480 + width;
    this.setPosition(l.x, l.y);
  }
  
  if (l.y > 320 + height) {
    l.y = 0 - height;
    this.setPosition(l.x, l.y);
  }
  
  if (l.y < (-5) - height) {
    l.y = 320 + height;
    this.setPosition(l.x, l.y);
  }
  
};

Engine.Obj.Plane.prototype.onTouchStart = function(event) {
  var t = this.touch;
  var l = this.location;
  this.touched = true;
  
  this.cBody.SetLinearVelocity(new b2Vec2(0,0));
  
  t.sx = l.x;
  t.sy = l.y;
  t.distance = 0;
};

Engine.Obj.Plane.prototype.onTouchMove = function(event) {
  if (this.touched) {
    event = event.touches[0];
    this.isTouchMoving = true;

    var t = this.touch;
    var l = this.location;

    t.px = l.x;
    t.py = l.y;
    t.ptime = Engine.getTime();
    
    l.x = parseInt(event.pageX - (this.width / 2), 10);
    l.y = parseInt(event.pageY - (this.height / 2), 10);
    
    this.setPosition(l.x, l.y);
    t.distance += Engine.Vector2D(l.x - t.px, l.y - t.py).magnitude();
  }
};

Engine.Obj.Plane.prototype.onTouchEnd = function(event) {
  var t = this.touch;
  var l = this.location;
  
  this.isTouchMoving = false;
  this.touched = false;
  
  var dTime = Engine.getTime() - t.ptime;
  if (dTime < 30) { dTime = 30; }
  
  var dx = (l.x - t.px) * (2000 / dTime);
  var dy = (l.y - t.py) * (2000 / dTime);
  
  this.cBody.SetLinearVelocity(new b2Vec2(dx,dy));
  //v.x = dx;
  //v.y = dy;
  t.distance = 0;
};