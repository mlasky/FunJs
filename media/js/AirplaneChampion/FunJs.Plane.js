var FunJs = FunJs || {};
FunJs.GameObj = FunJs.GameObj || {};
FunJs.GameObj.Drawable = FunJs.GameObj.Drawable || {};
FunJs.GameObj.Drawable.Sprite = FunJs.GameObj.Drawable.Sprite || {};

FunJs.Plane = Class.create(FunJs.GameObj.Drawable.Sprite, {
  initialize: function($super, obj, name, engine) {
    $super(obj, name, engine);
    
    this.isFlying = false;
    this.touch = {};
    this.touch.distance = 0;
    
    this.bind('TouchStart');
    this.bind('TouchMove');
    this.bind('TouchEnd');
    this.bind('DragStart');
    this.bind('Drag');
    this.bind('DragEnd');
  },
  
  tick: function($super, ctx, camera, dTime) {
    $super(ctx, camera, dTime);
    
    if (!this.cBody) {
      this.cBody = this.engine.world.addBody(this.engine.world.BoxBody(this));
    }
    
    var p = this.position; 
    var width = this.width;
    var height = this.height;
    
    if (this.resetKinematic) {
      this.kinematic = !this.kinematic;
      this.resetKinematic = false;
    }
    
    if (p.x > 480 + (width * 2)) {
      this.kinematic = true;
      this.resetKinematic = true;
      this.position.x = 0 - width;
    }

    if (p.x < (0) - (width * 2)) {
      this.kinematic = true;
      this.resetKinematic = true;
      this.position.x = 480 + width;
    }
  },
  
  draw: function($super, ctx, camera, dTime) {
    $super(ctx, camera, dTime);
  },
  
  onTouchEnd: function(event) {
    var t = this.touch;
    var p = this.position;

    this.kinematic = false;
    
    this.isTouchMoving = false;
    this.touched = false;

    var dTime = this.engine.getTime() - t.ptime;
    if (dTime < 30) { dTime = 30; }

    var dx = (p.x - t.px) * (2000 / dTime);
    var dy = (p.y - t.py) * (2000 / dTime);

    this.cBody.SetLinearVelocity(new b2Vec2(dx,dy));
  }
}, 
FunJs.Behavoir.Draggable);