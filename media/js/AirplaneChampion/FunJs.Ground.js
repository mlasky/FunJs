var FunJs = FunJs || {};
FunJs.GameObj = FunJs.GameObj || {};
FunJs.GameObj.Drawable = FunJs.GameObj.Drawable || {};

FunJs.Ground = Class.create(FunJs.GameObj.Drawable, {
  initialize: function($super, obj, name, engine) {
    $super(obj, name, engine);
  },
  
  tick: function($super, ctx, camera, dTime) {
    $super(ctx, camera, dTime);
    
  },
  
  draw: function($super, ctx, camera, dTime) {
    $super(ctx, camera, dTime);
  }
});