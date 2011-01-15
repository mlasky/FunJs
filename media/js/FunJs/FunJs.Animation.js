var FunJs = FunJs || {};

FunJs.Animation = Class.create({
  initialize: function(obj) {
    this.tslf       = 0;
    this.width      = obj.width || 0;
    this.height     = obj.height || 0;
    this.animations = obj.animations || {};
    this.cnt        = 0;
    
    this.sRect      = new FunJs.Physics.Rectangle(this.width, this.height);
    this.sPoint     = new FunJs.Physics.Point(0, 0);
    
    var anims = this.animations;
    for (anim in anims) {
      this.addAnimation(anims[anim], anim, ++this.cnt);
      if (this.cnt == 1) {
        this.cAnimation = anims[anim];
      }
    }
  },
  
  addAnimation: function(obj, name, cnt) {
    var anim = {};
    anim.name       = name || "";
    anim.cnt        = cnt;
    anim.time       = obj.time || 0;
    anim.tslf       = 0;
    anim.numFrames  = obj.numFrames;
    anim.cFrame     = 1;
    anim.fTime      = obj.time / anim.numFrames;
    anim.yOffset    = this.height * (cnt - 1);
    anim.def        = obj.def || false;
    
    this.animations[anim.name] = anim;
    
    if (anim.def) { this.cAnimation = anim; }
  },
  
  tick: function(dTime) {
    var anim      = this.cAnimation;

    if (!anim) { return; }
    this.cAnimation.tslf += dTime;

    var numFrames = anim.numFrames;
    var time      = anim.time;
    var tslf      = anim.tslf;
    var fTime     = anim.fTime;
    
    if (tslf > fTime) {
      this.cAnimation.cFrame += ~~(1 * (tslf / fTime));
      this.cAnimation.tslf = 0;

      if (anim.cFrame > numFrames) {
        this.cAnimation.cFrame = this.cAnimation.cFrame % numFrames;
      }
      
      this.sRect  = new FunJs.Physics.Rectangle(this.width, this.height);
      this.sPoint = new FunJs.Physics.Vector2D((this.cAnimation.cFrame - 1) * this.width, anim.yOffset);
    }
  }
});