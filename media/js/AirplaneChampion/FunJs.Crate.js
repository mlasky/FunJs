var FunJs = FunJs || {};
FunJs.GameObj = FunJs.GameObj || {};
FunJs.GameObj.Drawable = FunJs.GameObj.Drawable || {};

FunJs.Crate = Class.create(FunJs.GameObj.Drawable, {
  initialize: function($super, obj, name, engine) {
    $super(obj, name, engine);
  },
  
  tick: function($super, ctx, camera, dTime) {
    $super(ctx, camera, dTime);
    
    if (!this.cBody) {
      this.cBody = this.engine.world.addBody(this.engine.world.BoxBody(this));
    }
  },
  
  draw: function($super, ctx, camera, dTime) {
    $super(ctx, camera, dTime);
  }
});