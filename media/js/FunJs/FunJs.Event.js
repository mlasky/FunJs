var FunJs = FunJs || {};
FunJs.Event = FunJs.Event || {};

FunJs.Event.Registry = {};
FunJs.Event.Registry.TouchStart = [];
FunJs.Event.Registry.TouchMove = [];
FunJs.Event.Registry.TouchEnd = [];

FunJs.Event.TouchStart = function(event) {
  var tsReg = FunJs.Event.Registry.TouchStart;
  var len = tsReg.length;
  while (len--) {
    var obj = tsReg[len];
    if (obj.catchEvent(event)) {
      obj.onTouchStart(event);
    }
  }
};

FunJs.Event.TouchMove = function(event) {
  var tmReg = FunJs.Event.Registry.TouchMove;
  var len = tmReg.length;
  while (len--) {
    var obj = tmReg[len];
    if (obj.catchEvent(event)) {
      obj.onTouchMove(event);
    }
  }
};

FunJs.Event.TouchEnd = function(event) {
  var teReg = FunJs.Event.Registry.TouchEnd;
  var len = teReg.length;
  while (len--) {
    var obj = teReg[len];
    if (obj.isTouchMoving) {
      obj.isTouchMoving = false;
      obj.onTouchEnd(event);
    }
  }
};