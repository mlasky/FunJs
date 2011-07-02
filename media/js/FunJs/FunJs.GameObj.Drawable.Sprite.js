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
  
  tick: function($super, dTime, gl) {
    this.animations.tick(dTime);
    $super(dTime, gl);
  },
  
  updateDrawRects: function($super) {
    $super();
    this.sPoint = this.animations.sPoint;
    this.sRect  = this.animations.sRect;
  }
});