var resources = {
  Backgrounds: [
    {
      image: 'media/images/background-mountains.jpg'
    }
  ],
  World:{
    width: 5000,
    height: 5000,
    gravity: {
      x: 0,
      y: 300
    }
  },
  GameObjs: {
    Camera: 
    {
      type: 'Camera',
      layer: 1,
      kinematic: true,
      position: {
        x: 240,
        y: 160
      },
      width: 480,
      height: 320 
    },
    Plane: {
      type: "Plane",
      layer: 2,
      width: 100,
      height: 33,
      kinematic: false,
      density: 0.5,
      restitution: 0.5,
      friction: 0.5,
      rotation: 0,
      cBodyData: [
        [-45, -13],
        [-5,  -10],
        [ 45,  10],
        [-40,  10],
        [-40,  -5]
      ],
      position: {
        x: 150,
        y: 50
      },
      drawable: {
        src: "media/images/plane_sm.png",
        width: 100,
        height: 33,
        animations: {
          Idle: {
            time: 1000,
            numFrames: 40,
            def: true
          }
        }
      }
    }
  }
};