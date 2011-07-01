var FunJs = FunJs || {};
FunJs = Class.create({
  
  initialize: function(canvas, resources) {
    this.canvas       = canvas;
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
      this.initGl();
      
      this.camera     = this.getGameObj("Camera");
      this.camera.lookAt(this.getGameObj("Plane"));
      
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
      var gl        = self.gl;
      self.dTime    = time - self.time;
      self.time     = time;
      self.clear();

      var timeStep = 1.0/40;
      //self.world.step(timeStep, 1);
      //self.tickObjs(self);
      //self.drawDebug();
      
      gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // mat4 from glMatrix-0.9.5.min.js
      mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, self.pMatrix);

      mat4.identity(self.mvMatrix);

      mat4.translate(self.mvMatrix, [-1.5, 0.0, -7.0]);
      gl.bindBuffer(gl.ARRAY_BUFFER, self.triangleVertexPositionBuffer);
      gl.vertexAttribPointer(self.shaderProgram.vertexPositionAttribute, self.triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
      self.setMatrixUniforms();
      gl.drawArrays(gl.TRIANGLES, 0, self.triangleVertexPositionBuffer.numItems);

      mat4.translate(self.mvMatrix, [3.0, 0.0, 0.0]);
      gl.bindBuffer(gl.ARRAY_BUFFER, self.squareVertexPositionBuffer);
      gl.vertexAttribPointer(self.shaderProgram.vertexPositionAttribute, self.squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
      self.setMatrixUniforms();
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, self.squareVertexPositionBuffer.numItems);
      
      self.fps++;
      
      //self.debugMsgs.push("Fps: " + self.Fps);
      //self.debugMsgs.push("Camera: " + self.camera.position.x + "," + self.camera.position.y);
      //self.debugMsgs.push("dTime: " + self.dTime);
      
    } catch (e) { self.onError(e); }
  },
  
  initGl: function() {
    var canvas = this.canvas;
    try {
      var gl = canvas.getContext("experimental-webgl");
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;
    } catch (e) { console.log(e); }
    
    if (!gl) { alert("Could not initialise WebGL, sorry :-("); }
    
    this.gl = gl;
    this.mvMatrix = mat4.create();
    this.pMatrix = mat4.create();
    
    this.initShaders();
    this.initBuffers();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
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

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    
    this.shaderProgram = shaderProgram;
  },
  
  initBuffers: function() {
    var gl = this.gl;
    var triangleVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
    var vertices = [
         0.0,  1.0,  0.0,
        -1.0, -1.0,  0.0,
         1.0, -1.0,  0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    triangleVertexPositionBuffer.itemSize = 3;
    triangleVertexPositionBuffer.numItems = 3;

    var squareVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
    vertices = [
         1.0,  1.0,  0.0,
        -1.0,  1.0,  0.0,
         1.0, -1.0,  0.0,
        -1.0, -1.0,  0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    squareVertexPositionBuffer.itemSize = 3;
    squareVertexPositionBuffer.numItems = 4;
    
    this.triangleVertexPositionBuffer = triangleVertexPositionBuffer;
    this.squareVertexPositionBuffer = squareVertexPositionBuffer;
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
        if (k.nodeType == 3) {
            str += k.textContent;
        }
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

    
    //ctx.fillStyle = "#000000";
    //ctx.fillRect(0, 0, c.width, c.height);
    //ctx.fillStyle = "#FFFFFF";
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