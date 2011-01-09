var Engine = Engine || {};
Engine.Camera = function(x, y, w, h) {
  return {
    'x': x, 'y': y,
    'w': w, 'h': h,
    'x1': function() {
      return this.x - (this.w * 0.5);
    },
    
    'y1': function() {
      return this.y - (this.h * 0.5);
    },
    
    'x2': function() {
      return this.x + (this.w * 0.5);
    },
    
    'y2': function() {
      return this.y + (this.h * 0.5);
    }
  };
};