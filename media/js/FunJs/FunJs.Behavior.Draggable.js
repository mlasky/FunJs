var FunJs = FunJs || {};
FunJs.Behavoir = FunJs.Behavoir || {};

FunJs.Behavoir.Draggable = {
  touched: false,
  touch: {},
  isTouchMoving: false,
  
  onTouchStart: function(event) {
    var t = this.touch;
    var l = this.position;
    var cam = this.engine.camera;
    
    cam.lookAt(false);
    
    this.touched = true;

    this.kinematic = true;
    
    t.sx = l.x;
    t.sy = l.y;
  },

  onTouchMove: function(event) {
    if (this.touched) {
      event = event.touches[0];
      this.isTouchMoving = true;
      
      var cam = this.engine.camera;
      var t   = this.touch;
      var p   = this.position;

      t.px = p.x;
      t.py = p.y;
      t.ptime = this.engine.getTime();

      this.position.x = cam.x1() + event.pageX;
      this.position.y = cam.y1() + event.pageY;
    }
  }  
};