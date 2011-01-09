var Engine = Engine || {};

Engine.Collision = {};

Engine.Collision.Simple = function(A, B) {
  var aLoc = A.location;
  var aLeft = aLoc.x;
  var aTop = aLoc.y;
  var aRight = aLoc.x + A.width;
  var aBottom = aLoc.y + A.height;
  
  var bLoc = B.location;
  var bLeft = bLoc.x;
  var bTop = bLoc.y;
  var bRight = bLoc.x + B.width;
  var bBottom = bLoc.y + B.height;
  
  return aBottom > bTop && aTop < bBottom && aRight > bLeft && aLeft < bRight;
};