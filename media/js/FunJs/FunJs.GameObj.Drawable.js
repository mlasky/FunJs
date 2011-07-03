var FunJs = FunJs || {};
FunJs.GameObj = FunJs.GameObj || {};

FunJs.GameObj.Drawable = Class.create(FunJs.GameObj, {
  initialize: function($super, obj, name, engine) {
    $super(obj, name, engine);
    
    this.vertices = obj.vertices || [];
    this.colors   = obj.colors   || [];
    this.numItems = obj.numItems || 0;
    this.itemSize = obj.itemSize || 0;
    this.textureFile = obj.textureFile || '';
    this.textureCoords = obj.textureCoords || [];
    this.vertexIndices = obj.vertexIndices || [];
    this._texture = null;
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
    
    $super(gl);
    
    var engine                   = this.engine;
    var cam                      = engine.camera;
    var shaderProgram            = engine.shaderProgram;
    var mvMatrix                 = engine.mvMatrix;
    var vertexPositionBuffer     = this.vertexPositionBuffer;
    var vertexIndexBuffer        = this.vertexIndexBuffer;
    var vertexTextureCoordBuffer = this.vertexTextureCoordBuffer;
    
    mat4.translate(mvMatrix, [x, -y, -50.0]);
    
    
    mat4.rotate(mvMatrix, this.rotation, [0, 0, 1]);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.vertexAttribPointer( shaderProgram.vertexPositionAttribute, 
                            vertexPositionBuffer.itemSize, 
                            gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, vertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
    engine.setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES, vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
  },
  
  initTextures: function(gl) {
    var self = this;
    
    var texture = gl.createTexture();
    texture.image = new Image();
    texture.coords = this.textureCoords;
    texture.image.src = this.textureFile;
      
    texture.image.onload = function() {
      self.handleLoadedTexture(texture, gl);
    };
    this._texture = texture;
  },
  
  handleLoadedTexture: function(texture, gl) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);
  },
  
  initBuffers: function(gl) {
    var vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    vertexPositionBuffer.itemSize = this.itemSize;
    vertexPositionBuffer.numItems = this.numItems;
    
    var vertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer);  
          
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoords), gl.STATIC_DRAW);
    vertexTextureCoordBuffer.itemSize = 2;
    vertexTextureCoordBuffer.numItems = 4;
         
    var vertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
    
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.vertexIndices), gl.STATIC_DRAW);
    vertexIndexBuffer.itemSize = 1;
    vertexIndexBuffer.numItems = 6;
    
    this.vertexPositionBuffer      = vertexPositionBuffer;
    this.vertexTextureCoordBuffer  = vertexTextureCoordBuffer;
    this.vertexIndexBuffer         = vertexIndexBuffer;
  }
});