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
      density: 0.3,
      restitution: 0.2,
      friction: 0.8,
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
    },
    Cube: {
      type: "Crate",
      layer: 2,
      width: 20,
      height: 20,
      kinematic: false,
      density: 1.0,
      restitution: 0,
      friction: 0.8,
      rotation: 0,
      cBodyData: [
        [-10, -10],
        [ 10, -10],
        [ 10,  10],
        [-10,  10]
      ],
      position: {
        x: 300,
        y: 170
      },
      drawable: {
        src: "media/images/crate.jpg",
        width: 20,
        height: 20
      }
    },
    Cube2: {
      type: "Crate",
      layer: 2,
      width: 20,
      height: 20,
      kinematic: false,
      density: 1.0,
      restitution: 0,
      friction: 0.8,
      rotation: 0,
      cBodyData: [
        [-10, -10],
        [ 10, -10],
        [ 10,  10],
        [-10,  10]
      ],
      position: {
        x: 300,
        y: 240
      },
      drawable: {
        src: "media/images/crate.jpg",
        width: 20,
        height: 20
      }
    },
    Cube3: {
      type: "Crate",
      layer: 2,
      width: 20,
      height: 20,
      kinematic: false,
      density: 1.0,
      restitution: 0,
      friction: 0.8,
      rotation: 0,
      cBodyData: [
        [-10, -10],
        [ 10, -10],
        [ 10,  10],
        [-10,  10]
      ],
      position: {
        x: 300,
        y: 220
      },
      drawable: {
        src: "media/images/crate.jpg",
        width: 20,
        height: 20
      }
    },
    Cube4: {
      type: "Crate",
      layer: 2,
      width: 20,
      height: 20,
      kinematic: false,
      density: 1.0,
      restitution: 0,
      friction: 0.8,
      rotation: 0,
      cBodyData: [
        [-10, -10],
        [ 10, -10],
        [ 10,  10],
        [-10,  10]
      ],
      position: {
        x: 300,
        y: 200
      },
      drawable: {
        src: "media/images/crate.jpg",
        width: 20,
        height: 20
      }
    },
    Cube5: {
      type: "Crate",
      src: "media/images/crate.jpg",
      layer: 2,
      width: 20,
      height: 20,
      kinematic: false,
      density: 1.0,
      restitution: 0,
      friction: 0.8,
      rotation: 0,
      cBodyData: [
        [-10, -10],
        [ 10, -10],
        [ 10,  10],
        [-10,  10]
      ],
      position: {
        x: 280,
        y: 240
      },
      drawable: {
        src: "media/images/crate.jpg",
        width: 20,
        height: 20
      }
    },
    Cube6: {
      type: "Crate",
      src: "media/images/crate.jpg",
      layer: 2,
      width: 20,
      height: 20,
      kinematic: false,
      density: 1.0,
      restitution: 0,
      friction: 0.8,
      rotation: 0,
      cBodyData: [
        [-10, -10],
        [ 10, -10],
        [ 10,  10],
        [-10,  10]
      ],
      position: {
        x: 280,
        y: 220
      },
      drawable: {
        src: "media/images/crate.jpg",
        width: 20,
        height: 20
      }
    },
    Cube7: {
      type: "Crate",
      src: "media/images/crate.jpg",
      layer: 2,
      width: 20,
      height: 20,
      kinematic: false,
      density: 1.0,
      restitution: 0,
      friction: 0.8,
      rotation: 0,
      cBodyData: [
        [-10, -10],
        [ 10, -10],
        [ 10,  10],
        [-10,  10]
      ],
      position: {
        x: 280,
        y: 200
      },
      drawable: {
        src: "media/images/crate.jpg",
        width: 20,
        height: 20
      }
    },
    Cube8: {
      type: "Crate",
      src: "media/images/crate.jpg",
      layer: 2,
      width: 20,
      height: 20,
      kinematic: false,
      density: 1.0,
      restitution: 0,
      friction: 0.8,
      rotation: 0,
      cBodyData: [
        [-10, -10],
        [ 10, -10],
        [ 10,  10],
        [-10,  10]
      ],
      position: {
        x: 320,
        y: 240
      },
      drawable: {
        src: "media/images/crate.jpg",
        width: 20,
        height: 20
      }
    },
    Cube9: {
      type: "Crate",
      src: "media/images/crate.jpg",
      layer: 2,
      width: 20,
      height: 20,
      kinematic: false,
      density: 1.0,
      restitution: 0,
      friction: 0.8,
      rotation: 0,
      cBodyData: [
        [-10, -10],
        [ 10, -10],
        [ 10,  10],
        [-10,  10]
      ],
      position: {
        x: 320,
        y: 220
      },
      drawable: {
        src: "media/images/crate.jpg",
        width: 20,
        height: 20
      }
    },
    Cube10: {
      type: "Crate",
      src: "media/images/crate.jpg",
      layer: 2,
      width: 20,
      height: 20,
      kinematic: false,
      density: 1.0,
      restitution: 0,
      friction: 0.8,
      rotation: 0,
      cBodyData: [
        [-10, -10],
        [ 10, -10],
        [ 10,  10],
        [-10,  10]
      ],
      position: {
        x: 320,
        y: 200
      },
      drawable: {
        src: "media/images/crate.jpg",
        width: 20,
        height: 20
      }
    }
  }
};