var FunJs = FunJs || {};
FunJs.Physics = {};

FunJs.Physics.World = Class.create({
  initialize: function(obj) {
    var w           = obj.width || 1000;
    var h           = obj.height || 1000;
    var gravity     = obj.gravity || {};
    var gX          = gravity.x || 0;
    var gY          = gravity.y || 0;
    
    this.width      = w;
    this.height     = h;
    this.minVertexX = 0 - (w / 2);
    this.minVertexY = 0 - (h / 2);
    this.maxVertexX = 0 + (w / 2);
    this.maxVertexY = 0 + (h / 2);
    
    this.doSleep    = obj.doSleep || true;
    this.setGravity(new b2Vec2(gX, gY));
    
    this.worldAABB = new b2AABB();
    this.worldAABB.minVertex.Set(this.minVertexX, this.minVertexY);
    this.worldAABB.maxVertex.Set(this.maxVertexX, this.maxVertexY);
    
    this.world = this.createWorld();
  },
  
  createWorld: function() {
    return new b2World(this.worldAABB, this.gravity, this.doSleep);
  },
  
  step: function(timestep, iter) {
    this.world.Step(timestep, iter);
  },
  
  setGravity: function(v) {
    this.gravity = v;
  },
  
  
  PolyBody: function(obj, staticBody) {
    var x           = obj.position.x    || 0;
    var y           = obj.position.y    || 0;
    var width       = obj.width         || 0;
    var height      = obj.height        || 0;
    var fixed       = obj.fixed         || false;
    var friction    = obj.friction      || 0.0;
    var density     = obj.density       || 1.0;
    var rotation    = obj.rotation      || 0;
    var restitution = obj.restitution   || 0;
    var parent      = obj.parent        || null;
    var uData       = obj.uData         || {};
    var sFlag       = obj.sFlag         || false;
    var cFlags      = obj.cFlags;
    var cBodyData   = obj.cBodyData     || [];
    
    if (staticBody) {
      var groundSd = new b2BoxDef();
      groundSd.extents.Set(width, height);
      groundSd.restitution = restitution;

      var groundBd = new b2BodyDef();
      groundBd.AddShape(groundSd);      
      groundBd.position.Set(x, y);

      return groundBd;
      
    } else {
      var polySd = new b2PolyDef();
      var len = cBodyData.length;
      polySd.vertexCount = len;

      for (var i = 0; i < len; i++) {
        polySd.vertices[i].Set(cBodyData[i][0], cBodyData[i][1]);
      }

      polySd.localRotation = rotation;
      var r = new b2Mat22(rotation);
      polySd.localPosition = b2Math.b2MulMV(r, new b2Vec2(0, 0));
      polySd.density = density;

      var polyBd = new b2BodyDef();
      polyBd.position.Set(x, y);
      polyBd.AddShape(polySd);

      return polyBd;
    }
  },
  
  BoxBody: function(obj) {
    var x           = obj.position.x    || 0;
    var y           = obj.position.y    || 0;
    var width       = obj.width         || 0;
    var height      = obj.height        || 0;
    var fixed       = obj.fixed         || false;
    var friction    = obj.friction      || 0.0;
    var density     = obj.density       || 1.0;
    var restitution = obj.restitution   || 0;
    var parent      = obj.parent        || null;
    var uData       = obj.uData         || {};
    var sFlag       = obj.sFlag         || false;
    var cFlags      = obj.cFlags;

    var boxSd         = new b2BoxDef();
    boxSd.friction    = friction;
    boxSd.restitution = restitution;
    boxSd.density     = density;

    if (fixed) { 
      boxSd.density = 0.0; 
    }

    boxSd.extents.Set(width, height);

    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxSd);
    boxBd.position.Set(x,y);

    return boxBd;
  },
  
  addBody: function(body) {
    console.log(body)
    return this.world.CreateBody(body);
  },
  
  drawShape: function(shape, context) {
    context.strokeStyle = '#ffffff';
    context.beginPath();
    switch (shape.m_type) {
    case b2Shape.e_circleShape:
      {
        var circle = shape;
        var pos = circle.m_position;
        var r = circle.m_radius;
        var segments = 16.0;
        var theta = 0.0;
        var dtheta = 2.0 * Math.PI / segments;
        var v;
        var i;
        // draw circle
        context.moveTo(pos.x + r, pos.y);
        for (i = 0; i < segments; i++) {
          var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
          v = b2Math.AddVV(pos, d);
          context.lineTo(v.x, v.y);
          theta += dtheta;
        }
        context.lineTo(pos.x + r, pos.y);

        // draw radius
        context.moveTo(pos.x, pos.y);
        var ax = circle.m_R.col1;
        var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
        context.lineTo(pos2.x, pos2.y);
      }
      break;
    case b2Shape.e_polyShape:
      {
        var poly = shape;
        var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
        context.moveTo(tV.x, tV.y);
        for (i = 0; i < poly.m_vertexCount; i++) {
          v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
          context.lineTo(v.x, v.y);
        }
        context.lineTo(tV.x, tV.y);
      }
      break;
    }
    context.stroke();
  }
});

FunJs.Physics.Point = Class.create({
  initialize: function(obj) {
    this.x = obj.x || 0;
    this.y = obj.y || 0;
  }
});

FunJs.Physics.Rectangle = Class.create({
  initialize: function(w, h) {
    this.width = w;
    this.height = h;
  },
  
  area: function() {
      return this.width * this.height;
  }
});

FunJs.Physics.Vector2D = function(x, y) {
  x = x || 0; y = y || 0;
  return new b2Vec2(x, y);  
};