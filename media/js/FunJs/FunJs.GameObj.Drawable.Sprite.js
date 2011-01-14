var FunJs = FunJs || {};
FunJs.GameObj = FunJs.GameObj || {};
FunJs.GameObj.Drawable = FunJs.GameObj.Drawable || {};

FunJs.GameObj.Drawable.Sprite = Class.create(FunJs.GameObj.Drawable, {
  initialize: function($super, obj, name, engine) {
    $super(obj, name, engine);
    
    obj = obj.drawable || {};
    this.initAnimations(obj);
  },
  
  initAnimations: function(animations) {
    if (!animations) { return; }
    this.animations = new FunJs.Animation(animations);
  },
  
  tick: function($super, dTime, ctx) {
    this.animations.tick(dTime);
    this.updateDrawRects();
    
    $super(dTime, ctx);
  },
  
  updateDrawRects: function() {
    this.sPoint = this.animations.sPoint;
    this.sRect  = this.animations.sRect;
    
    this.dPoint    = new FunJs.Physics.Vector2D(this.x1(), this.y1());
    this.dRect     = new FunJs.Physics.Rectangle(this.width, this.height);
    
  }
});