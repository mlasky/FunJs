var Engine = Engine || {};
Engine.Physics = {};

Engine.Physics.createWorld = function() {
  try {
    var worldAABB = new b2AABB();
    worldAABB.minVertex.Set(-1000, -1000);
    worldAABB.maxVertex.Set(1000, 1000);
    var gravity = new b2Vec2(0, 300);
    var world = new b2World(worldAABB, gravity, true);
    return world;
  } catch (e) {
    Engine.onError(e)
  }
};

Engine.Physics.BoxBody = function(obj) {
  var x           = obj.location.x  || 0;
  var y           = obj.location.y  || 0;
  var width       = obj.width       || 0;
  var height      = obj.height      || 0;
  var fixed       = obj.fixed       || false;
  var friction    = obj.friction    || 0.0;
  var density     = obj.density     || 0.0;
  var restitution = obj.restitution || 0;
  var parent      = obj.parent      || null;
  var uData       = obj.uData       || {};
  var sFlag       = obj.sFlag       || false;
  var cFlags      = obj.cFlags;
  
  var world       = Engine.Physics.World;
  
  var boxSd         = new b2BoxDef();
  boxSd.friction    = friction;
  boxSd.density     = density;
  boxSd.restitution = restitution;
  
  if (fixed) { 
    boxSd.density = 0.0; 
  }
  
  boxSd.extents.Set(width, height);
  
  var boxBd = new b2BodyDef();
  boxBd.AddShape(boxSd);
  boxBd.position.Set(x,y);
  
  return world.CreateBody(boxBd);
};

Engine.Physics.World = Engine.Physics.createWorld();