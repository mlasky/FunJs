var FunJs = FunJs || {};
FunJs.Camera = Class.create(FunJs.GameObj, {
  initialize: function($super, obj, name, engine) {
    $super(obj, name, engine);
    this.lookAtObj = false;
  },
  
  lookAt: function(obj) {
    this.lookAtObj = obj;
  },
  
  tick: function($super, dTime, ctx) {
    var obj, pos;
    
    (this.lookAtObj) && 
    (obj = this.lookAtObj) && 
    (pos = obj.position) &&
    (this.position.x = pos.x) &&
    (this.position.y = pos.y);
  }
});