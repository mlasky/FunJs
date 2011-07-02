var FunJs = FunJs || {};
FunJs.GameObj = FunJs.GameObj || {};

FunJs.GameObj.Drawable = Class.create(FunJs.GameObj, {
  initialize: function($super, obj, name, engine) {
    $super(obj, name, engine);
    
    this.vertices = obj.vertices || [];
    this.colors = obj.colors || [];
    this.numItems = obj.numItems || 0;
    this.itemSize = obj.itemSize || 0;
    
    console.log(this)
  },
  
  tick: function($super, dTime, gl) {
    $super(dTime, gl);
  },
  
  draw: function($super, gl) {
    var self    = this;
    var pos     = this.position;
    var x       = pos.x;
    var y       = pos.y;
    var width   = this.width;
    var height  = this.height;
    
    try {
      $super(gl);
      
      var engine                        = this.engine;
      var cam                           = engine.camera;
      var shaderProgram                 = engine.shaderProgram;
      var mvMatrix                      = engine.mvMatrix;
      var vertexPositionBuffer  = this.vertexPositionBuffer;
      var vertexColorBuffer     = this.vertexColorBuffer;
      
      this.rotation = (this.rotation += 3) % 360;
      mat4.translate(mvMatrix, [x, y, -7.0]);
      mat4.rotate(mvMatrix, this.rotation * Math.PI / 180, [1, 1, 1]);
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
      gl.vertexAttribPointer( shaderProgram.vertexPositionAttribute, 
                              vertexPositionBuffer.itemSize, 
                              gl.FLOAT, false, 0, 0);
      
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
      gl.vertexAttribPointer( shaderProgram.vertexColorAttribute, 
                              vertexColorBuffer.itemSize, 
                              gl.FLOAT, false, 0, 0);
      
      
      engine.setMatrixUniforms();
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPositionBuffer.numItems);
      
    } catch(e) {
      this.engine.onError(e);
    }
  },
  
  initBuffers: function(gl) {
    
    var vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    vertexPositionBuffer.itemSize = this.itemSize;
    vertexPositionBuffer.numItems = this.numItems;

    var vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
    vertexColorBuffer.itemSize = 4;
    vertexColorBuffer.numItems = this.numItems;
    
    this.vertexPositionBuffer = vertexPositionBuffer;
    this.vertexColorBuffer = vertexColorBuffer;
  }
});