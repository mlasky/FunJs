var FunJs = FunJs || {};
FunJs = Class.create({
  
  initialize: function(canvas, resources) {
    this.canvas       = canvas;
    this.ctx          = canvas.getContext("2d");
    this.time         = this.getTime();
    this.dTime        = 0;
    this.R            = {};
    this.fps          = 0;
    this.renderLayers = [];
    this.gameObjs     = false;
    this.debugMsgs    = [];
    
    this.world = resources.World || {};
    
    try {
      this.initEvents();
      this.initPhysics(this);
      this.loadObjects(resources);
      
      this.camera     = this.getGameObj("Camera");
      this.run();
    } catch (e) {   this.onError(e);   }
  },
  
  run: function() {
    try {
      window.setInterval(this.tick, 25, this);
      window.setInterval(this.updateFps, 1000, this);
    } catch (e) {
      this.onError(e);
    }
  },
  
  tick: function(self) {
    try {
      var time      = self.getTime();
      self.dTime    = time - self.time;
      self.time     = time;
      self.clear();

      var timeStep = 1.0/40;
      self.world.step(timeStep, 1);
      self.tickObjs(self);
      self.drawDebug();
      
      self.fps++;
      
      self.debugMsgs.push("Fps: " + self.Fps);
      //self.debugMsgs.push("Camera: " + self.camera.position.x + "," + self.camera.position.y);
      //self.debugMsgs.push("dTime: " + self.dTime);
      
    } catch (e) { self.onError(e); }
  },
  
  initEvents: function() {
    var $c = $(this.canvas);
    $c.observe('onmousedown', FunJs.Event.DragStart);
    $c.observe('onmousemove', FunJs.Event.Drag);
    $c.observe('onmouseend', FunJs.Event.DragEnd);
    $c.observe('touchstart', FunJs.Event.TouchStart);
    $c.observe('touchmove', FunJs.Event.TouchMove);
    $c.observe('touchend', FunJs.Event.TouchEnd);
  },
  
  initPhysics: function(obj) {
    var world = obj.world || {};
    this.world = new FunJs.Physics.World(world);
  },
  
  loadObjects: function(resources) {
    // Load Game Objects
    var gameObjs = resources.GameObjs || {};
    
    for (obj in gameObjs) {
      this.addGameObj(gameObjs[obj], obj);
    }
  },
  
  drawDebug: function() {
    var x = 300;
    var y = 20;
    var msgs = this.debugMsgs;
    var len = msgs.length;
    
    for (var i = 0; i < len; i++) {
      this.ctx.fillText(this.debugMsgs[i], x, y + (i * 10));
    }
    
    this.debugMsgs = [];
  },
  
  addGameObj: function(obj, name) {
    var layer = obj.layer || 0;
    obj = new FunJs[obj.type](obj, name, this);
    this.renderLayers[layer] = this.renderLayers[layer] || [];
    this.renderLayers[layer].push(obj);
    this.gameObjs = false; // Invalidate the index
  },
  
  getGameObjs: function() {
    if (!this.gameObjs) {
      var numLayers = this.renderLayers.length;
      var objs = [];

      for (var i = 0; i < numLayers; i++) {
        var layer = this.renderLayers[i] || [];
        var numObjs = layer.length;

        for (var j = 0; j < numObjs; j++) {
          objs.push(layer[j]);
        }
      }
      this.gameObjs = objs;
    }
    return this.gameObjs;
  },
  
  getGameObj: function(name) {
    var objs = this.getGameObjs();
    var len = objs.length;
    while (len--) {
      if (objs[len].name == name) {
        return objs[len]; 
      }
    }
    return false;
  },
  
  clear: function() {
    var ctx = this.ctx;
    var c = this.canvas;

    c.width = c.width;
    ctx.fillStyle = "#000000";
  },
  
  tickObjs: function(self) {
    try {
      var objs = this.getGameObjs();
      var len = objs.length;
    
      for (var i = 0; i < len; i++) {
        objs[i].tick(self.dTime, self.ctx);
      }
    } catch (e) {
      this.onError(e);
    }
  },
  
  getActiveCamera: function() {
    return this.camera;
  },
  
  updateFps: function(self) {
    self.Fps = self.fps;
    self.fps = 0;
  },
  
  onError: function(e) {
    alert(e + "\nLine: " + e.line + "\nFile: " + e.sourceURL);
  },
  
  getTime: function() {
    return new Date().valueOf();
  },
  
  Density: window.devicePixelRatio || 1,
  Fps: 0,
  Debug: false
});