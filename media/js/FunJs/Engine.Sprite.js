Engine.Sprite = function(src, animations, x, y) {
  var self = this;
  
  x = x || 0;
  y = y || 0;
  
  this.loaded = false;
  
  this.image = new Image();
  this.image.src = src;
  
  this.location = Engine.Point(x, y);
  this.animations = animations;
  
  this.image.onload = function() {
    var animations = self.animations;
    if (!animations) {
      self.animations = new Engine.Sprite.Animation(0, this.width);
    }
    self.loaded = true;
  };
  
  return this;
};

Engine.Sprite.prototype.updateAnimations = function(dTime) {
  var anim      = this.animations;
  var numFrames = anim.numFrames;
  var time      = anim.time;
  
  if (!anim.cFrame) {
    anim.tslf   = 0;
    anim.cFrame = 1;
    anim.hDelta = (this.image.width / numFrames)  / Engine.density;
    anim.fTime  = time / numFrames;
  }
  anim.tslf += dTime;
  
  var tslf    = anim.tslf;
  var fTime   = anim.fTime;
  var hDelta  = anim.hDelta;
  
  if (tslf > fTime) {
    
    anim.cFrame += parseInt(tslf / fTime, 10);
    anim.tslf = 0;
    
    
    if (anim.cFrame > numFrames) {
      anim.cFrame = anim.cFrame % numFrames;
    }

    this.sRect = Engine.Rectangle(parseInt(hDelta, 10), this.image.height);
    this.sPoint = Engine.Point(parseInt((anim.cFrame - 1) * hDelta, 10), 0);
  }
};

Engine.Sprite.prototype.draw = function(ctx, dTime) {
  var self = this;
  var retry;
  
  if (!this.loaded) {
    retry = window.setTimeout(function() { self.draw(ctx, dTime); }, 500);
    return;
  } 
  
  this.updateAnimations(dTime);
  
  this.dRect  = Engine.Rectangle(this.animations.hDelta * Engine.density, this.image.height);
  this.dPoint = Engine.Point(this.location.x, this.location.y);
  
  var sPoint  = this.sPoint;
  var sRect   = this.sRect;
  var dPoint  = this.dPoint;
  var dRect   = this.dRect;
  
  try {
    ctx.drawImage(this.image, 
                  sPoint.x, sPoint.y, 
                  sRect.w, sRect.h, 
                  dPoint.x, dPoint.y,  
                  dRect.w, dRect.h);
  } catch(e) {}
  
};
