var FunJs = Class.create({
  
  initialize: function(canvas, resources) {
    canvas.width      = 720;
    canvas.height     = 480;
    
    this.canvas       = canvas;
    this.time         = this.getTime();
    this.dTime        = 0;
    this.R            = {};
    this.fps          = 0;
    this.renderLayers = [];
    this.gameObjs     = false;
    this.debugMsgs    = [];
    
    this.world = resources.World || {};
    
    this.initEvents();
    this.initPhysics(this);
    this.loadObjects(resources);
    this.initGl();
    
    this.camera     = this.getGameObj("Camera");
    this.camera.lookAt(this.getGameObj("Cube2"));
    
    this.run();
  },
  
  run: function() {
    window.requestAnimFrame(this.tick.bind(this), 1000/120);
    //window.setInterval(this.updateFps, 1000, this);
  },
  
  tick: function(time) {
    var self = this;
    var nTime = self.getTime();
    var pTime = self.pTime || 60;
    self.dTime    = Math.min(nTime - pTime, 60);
    self.pTime    = nTime;
    var gl        = self.gl;
    self.clear();

    var timeStep = 1.0/90;

    self.world.step(timeStep, 1);
    self.tickObjs(self);
    //self.drawDebug();
    
    // mat4 from glMatrix-0.9.5.min.js
    mat4.perspective(65, gl.viewportWidth / gl.viewportHeight, 0.1, 1000.0, self.pMatrix);
    mat4.identity(self.mvMatrix);
    
    self.fps++;
    window.requestAnimFrame(this.tick.bind(this));
    //self.debugMsgs.push("Fps: " + self.Fps);
    //self.debugMsgs.push("Camera: " + self.camera.position.x + "," + self.camera.position.y);
    //self.debugMsgs.push("dTime: " + self.dTime);      
  },
  
  initGl: function() {
    var canvas = this.canvas;
    //var gl = WebGLDebugUtils.makeDebugContext(WebGLUtils.setupWebGL(canvas));
    var gl = WebGLUtils.setupWebGL(canvas);
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
    
    if (!gl) { alert("Could not initialise WebGL, sorry :-("); }
    
    this.gl = gl;
    this.mvMatrix = mat4.create();
    this.pMatrix = mat4.create();
    this.mvMatrixStack = [];
    
    this.initShaders();
    this.initBuffers();
    this.initTextures();
    
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.enable(gl.DEPTH_TEST);
  },
  
  initShaders: function() {
    var gl = this.gl;
    var fragmentShader = this.getShader("shader-fs");
    var vertexShader = this.getShader("shader-vs");

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
       
    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    
    this.shaderProgram = shaderProgram;
  },
  
  initBuffers: function() {
    var gl = this.gl;
    var gameObjs = this.getGameObjs() || [];
    
    var len = gameObjs.length;
    for (var i = 0; i < len; i++) {
      if (typeof gameObjs[i].initBuffers === 'function') {
        gameObjs[i].initBuffers(gl);
      }
    }
  },
  
  initTextures: function() {
    var gl = this.gl;
    var gameObjs = this.getGameObjs() || [];
    
    var len = gameObjs.length;
    for (var i = 0; i < len; i++) {
      if (typeof gameObjs[i].initTextures === 'function') {
        gameObjs[i].initTextures(gl);
      }
    }
  },
  
  setMatrixUniforms: function() {
    var gl = this.gl;
    var shaderProgram = this.shaderProgram;
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, this.pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, this.mvMatrix);
  },

  initEvents: function() {
    var $c = x$(this.canvas);
    $c.on('touchstart', FunJs.Event.TouchStart);
    $c.on('touchmove', FunJs.Event.TouchMove);
    $c.on('touchend', FunJs.Event.TouchEnd);
  },
  
  initPhysics: function(obj) {
    var world = obj.world || {};
    this.world = new FunJs.Physics.World(world);
  },
  
  getShader: function(id) {
    var shaderScript = document.getElementById(id);
    var gl = this.gl;
    var shader;
    
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;

    while (k) {
        if (k.nodeType == 3) { str += k.textContent; }
        k = k.nextSibling;
    }
    
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
  },
  
  mvPushMatrix: function() {
    var copy = mat4.create();
    mat4.set(this.mvMatrix, copy);
    this.mvMatrixStack.push(copy);
  },

  mvPopMatrix: function() {
    if (this.mvMatrixStack.length == 0) {
      throw "Invalid popMatrix!";
    }
    this.mvMatrix = this.mvMatrixStack.pop();
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
    var gl = this.gl;
    
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
  },
  
  tickObjs: function(self) {
    var objs  = self.getGameObjs();
    var len   = objs.length;
    var dTime = self.dTime;
    var gl    = this.gl;
    
    for (var i = 0; i < len; i++) {
      self.mvPushMatrix();
      objs[i].tick(dTime, gl);
      self.mvPopMatrix();
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
    //alert(e + "\nLine: " + e.line + "\nFile: " + e.sourceURL);
    console.log(e);
  },
  
  getTime: function() {
    return new Date().valueOf();
  },
  
  Density: window.devicePixelRatio || 1,
  Fps: 0,
  Debug: false
});