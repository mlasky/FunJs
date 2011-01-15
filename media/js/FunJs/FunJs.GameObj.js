var FunJs = FunJs || {};

FunJs.GameObj = Class.create({
  initialize: function(obj, name, engine) {
    this.engine         = engine;
    this.name           = name;
    this.position       = new FunJs.Physics.Vector2D(obj.position.x, obj.position.y);
    this.uid            = "" + this.engine.getTime(); // TODO: Make actually unique
    this.width          = obj.width       || 0;
    this.height         = obj.height      || 0;
    this.fixed          = obj.fixed       || false;
    this.friction       = obj.friction    || 0;
    this.density        = obj.density     || 0;
    this.rotation       = obj.rotation    || 0;
    this.restitution    = obj.restitution || 0;
    this.uData          = obj.uData       || {};
    this.sFlag          = obj.sFlag       || false;
    this.cFlags         = obj.cFlags;
    this.kinematic      = obj.kinematic   || false;
    
    this.isTouchMoving  = false;
    this.touched        = false;
    
    if (obj.cBodyData) {
      this.addCollisionBody(obj);
    }
  },
  
  tick: function(dTime, ctx) {
    this.updatePosition(dTime);
    if (this.inScene()) {
      this.draw(ctx);
    }
  },
  
  addCollisionBody: function(obj) {
    cBody           = this.engine.world.PolyBody(obj);
    this.cBody      = this.engine.world.addBody(cBody);
  },
  
  updatePosition: function(dTime) {
    if (this.cBody) {
      if (this.kinematic) {
        this.cBody.SetOriginPosition(this.position, this.rotation);
      } else {
        this.position = this.cBody.GetOriginPosition();
        this.rotation = this.cBody.GetRotation();
      }
    }
  },
  
  catchEvent: function(event) {
    event   = event.touches[0];
    var cam = this.engine.camera;
    var cX  = event.pageX + cam.x1(); // Click x
    var cY  = event.pageY + cam.y1(); // Click y
    
    return  cX > this.x1() && cX < this.x2() && 
            cY > this.y1() && cY < this.y2();
  },
  
  inScene: function() {
    var camera  = this.engine.getActiveCamera();
    var pos     = this.position;
    
    var dWidth  = this.width;
    var dHeight = this.height;

    return  pos.x >= camera.x1() - dWidth && pos.x <= camera.x2() + dWidth &&
            pos.y >= camera.y1() - dHeight && pos.y <= camera.y2() + dHeight;
  },
  
  bind: function(event) {
    FunJs.Event.Registry[event].push(this);
  },
  
  unBind: function(event) {
    var reg = FunJs.Event.Registry[event];
    var len = reg.length;

    while (len--) {
      var obj = reg[len];
      if (obj.uid == this.uid) { 
        reg.splice(len, 1);
        break;
      }
    }
  },
  
  x1: function() {
    return ~~(this.position.x - (this.width / 2));
  },
  
  y1: function() {
    return ~~(this.position.y - (this.height / 2));
  },
  
  x2: function() {
    return ~~(this.position.x + (this.width / 2));
  },
  
  y2: function() {
    return ~~(this.position.y + (this.height / 2));
  },
  
  onCollision: function(collider) {},
  
  draw: function(ctx) {
    if (this.engine.Debug && this.cBody) {
      for (var s = this.cBody.GetShapeList(); s != null; s = s.GetNext()) {
        this.engine.world.drawShape(s, ctx);
      }
    }
  }
});