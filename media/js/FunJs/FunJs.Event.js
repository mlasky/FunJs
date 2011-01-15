var FunJs = FunJs || {};
FunJs.Event = {};

FunJs.Event.Registry = {};
FunJs.Event.Registry.TouchStart = [];
FunJs.Event.Registry.TouchMove = [];
FunJs.Event.Registry.TouchEnd = [];
FunJs.Event.Registry.DragStart = [];
FunJs.Event.Registry.Drag = [];
FunJs.Event.Registry.DragEnd = [];

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

FunJs.Event.DragStart = function(event) {
  var dsReg = FunJs.Event.Registry.DragStart;
  var len = dsReg.length;
  while (len--) {
    var obj = dsReg[len];
    if (obj.catchEvent(event)) {
      obj.onTouchStart(event);
    }
  }
};

FunJs.Event.Drag = function(event) {
  var dReg = FunJs.Event.Registry.Drag;
  var len = dReg.length;
  while (len--) {
    var obj = dReg[len];
    if (obj.catchEvent(event)) {
      obj.onTouchMove(event);
    }
  }
};

FunJs.Event.DragEnd = function(event) {
  var deReg = FunJs.Event.Registry.DragEnd;
  var len = deReg.length;
  while (len--) {
    var obj = deReg[len];
    if (obj.isTouchMoving) {
      obj.isTouchMoving = false;
      obj.onTouchEnd(event);
    }
  }
};