var FunJs = FunJs || {};
FunJs.GameObj = FunJs.GameObj || {};

FunJs.GameObj.Drawable = Class.create(FunJs.GameObj, {
  initialize: function($super, obj, name, engine) {
    $super(obj, name, engine);
    
    var self        = this;
    
    obj             = obj.drawable || {};
    this.src        = obj.src || false;
    this.image      = (obj.src)? new Image(): false;
    this.image.src  = this.src;
    
    this.sRect      = new FunJs.Physics.Rectangle(this.width, this.height);
    this.sPoint     = new FunJs.Physics.Vector2D(0, 0);
    
    this.dPoint    = new FunJs.Physics.Vector2D(this.x1(), this.y1());
    this.dRect     = new FunJs.Physics.Rectangle(this.width, this.height);
    
    this.loaded     = false;
    
    if (this.image) {
      this.image.onload = function() {
        self.loaded = true
      };
    } else {
      this.loaded = true;
    }
  },
  
  tick: function($super, dTime, ctx) {
    $super(dTime, ctx);
    this.updateDrawRects();
  },
  
  draw: function($super, ctx) {
    var self    = this;
    var pos     = this.position;
    var x       = pos.x;
    var y       = pos.y;
    var width   = this.width;
    var height  = this.height;
    var pi      = 3.14159265;
    var retry;
    
    if (!this.image) { return; }
    if (!this.loaded) {
      retry = window.setTimeout(function() { self.draw(ctx, dTime); }, 50);
      return;
    }
    
    try {
      $super(ctx);
      
      var cam     = this.engine.camera;
      
      ctx.save();
      ctx.translate(x - cam.x1(), y - cam.y1());
      ctx.rotate(this.rotation);
      ctx.translate(-(x - cam.x1()), -(y - cam.y1()));

      var sPoint  = this.sPoint;
      var sRect   = this.sRect;
      var dPoint  = this.dPoint;
      var dRect   = this.dRect;
      
      ctx.drawImage(this.image, 
                    sPoint.x,     sPoint.y, 
                    sRect.width,  sRect.height, 
                    dPoint.x - cam.x1(), dPoint.y - cam.y1(),  
                    dRect.width,  dRect.height);
      ctx.restore();
    } catch(e) {
      ctx.restore();
      this.engine.onError(e);
    }
  },
  
  updateDrawRects: function() {
    this.dPoint    = new FunJs.Physics.Vector2D(this.x1(), this.y1());
    this.dRect     = new FunJs.Physics.Rectangle(this.width, this.height);
  }
});