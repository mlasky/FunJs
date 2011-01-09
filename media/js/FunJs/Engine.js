var Engine = function(canvas, resources) {
  this.canvas       = canvas;
  this.ctx          = canvas.getContext("2d");
  this.time         = Engine.getTime();
  this.dTime        = 0;
  this.R            = {};
  this.fps          = 0;
  this.renderLayers = [];
  this.camera       = Engine.Camera(canvas.width / 2, 
                                    canvas.height / 2, 
                                    canvas.width, 
                                    canvas.height);
  this.initEvents();
  this.loadObjects(resources);
  this.run();
    
  return this;
};

Engine.prototype.run = function() {
  var inter = window.setInterval;
  try {
    inter(this.tick, 0, this);
    inter(this.updateFps, 1000, this);
  } catch (e) {
    Engine.onError(e);
  }
};

Engine.prototype.initEvents = function() {
  var $c = x$(this.canvas);
  $c.on('touchstart', Engine.Event.TouchStart);
  $c.on('touchmove', Engine.Event.TouchMove);
  $c.on('touchend', Engine.Event.TouchEnd);
};

Engine.prototype.loadObjects = function(resources) {
  // Load Game Objects
  var gameObjs = resources.gameObjs || [];
  var lenObjs = gameObjs.length;
  while(lenObjs--) {
    var obj = gameObjs[lenObjs];
    this.addGameObj(obj);
  }
};

Engine.prototype.addGameObj = function(obj) {
  var layer = obj.layer || 0;
  obj = new Engine.Obj[obj.name](obj);
  this.renderLayers[layer] = this.renderLayers[layer] || [];
  this.renderLayers[layer].push(obj);
};

Engine.prototype.clear = function() {
  var ctx = this.ctx;
  var c = this.canvas;
  
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("Fps: " + Engine.fps, 300, 60);
};

Engine.prototype.tick = function(self) {
  try {
    var time      = Engine.getTime();
    self.dTime    = time - self.time;
    self.time     = time;
    self.clear();

    var numLayers = self.renderLayers.length;
    
    for (var i = 0; i < numLayers; i++) {
      var layer = self.renderLayers[i] || [];
      var numObjs = layer.length;
      Engine.calcCollisions(layer, numObjs);
      for (var j = 0; j < numObjs; j++) {
        var obj = layer[j];
        obj.tick(self.ctx, self.camera, self.dTime);
      }
    }
    self.fps++;
  } catch (e) {
    Engine.onError(e);
  }
  
};

Engine.prototype.updateFps = function(self) {
  Engine.fps = self.fps;
  self.fps = 0;
};

Engine.density = window.devicePixelRatio || 1;

Engine.fps = 0;

Engine.calcCollisions = function(objects, len) {
  var obj;
  var rest;
  var simpleCollision = Engine.Collision.Simple;
  
  while (len--) {
    obj = objects[len];
    rest = len;
    while (rest--) {
      var collider = objects[rest];
      if (collider && simpleCollision(obj, collider)) {
        //obj.onCollision(collider);
        //collider.onCollision(obj);
        alert("Collision!");
      }
    }
  }
};

Engine.Point = function(x, y) {
  return { 'x': x, 'y': y };
};

Engine.Rectangle = function(w, h) {
  return { 
    'w': w, 'h': h,
    'area': function() {
      return this.w * this.h;
    }
  };
};

Engine.Vector = function(x, y) {
  return { 
    'x': x || 0, 
    'y': y || 0,
    'magnitude': function() { 
      var x = this.x;
      var y = this.y;
      return Math.sqrt((x * x) + (y * y));
    }
  };
};

Engine.onError = function(e) {
  alert(e + "\nLine: " + e.line + "\nFile: " + e.sourceURL);
};

Engine.getTime = function() {
  return new Date().valueOf();
};