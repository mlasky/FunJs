var Engine = Engine || {};
Engine.Event = {};

Engine.Event.Registry = {};
Engine.Event.Registry.TouchStart = [];
Engine.Event.Registry.TouchMove = [];
Engine.Event.Registry.TouchEnd = [];

Engine.Event.TouchStart = function(event) {
  var tsReg = Engine.Event.Registry.TouchStart;
  var len = tsReg.length;
  while (len--) {
    var obj = tsReg[len];
    if (obj.catchEvent(event)) {
      obj.onTouchStart(event);
    }
  }
};

Engine.Event.TouchMove = function(event) {
  var tmReg = Engine.Event.Registry.TouchMove;
  var len = tmReg.length;
  while (len--) {
    var obj = tmReg[len];
    if (obj.catchEvent(event)) {
      obj.onTouchMove(event);
    }
  }
};


Engine.Event.TouchEnd = function(event) {
  var teReg = Engine.Event.Registry.TouchEnd;
  var len = teReg.length;
  while (len--) {
    var obj = teReg[len];
    if (obj.isTouchMoving) {
      obj.isTouchMoving = false;
      obj.onTouchEnd(event);
    }
  }
};