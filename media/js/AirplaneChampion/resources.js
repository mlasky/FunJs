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
    Cube2: {
      type: "Crate",
      layer: 2,
      width: 59,
      height: 59,
      kinematic: false,
      density: 1.0,
      restitution: 0,
      friction: 0.8,
      rotation: 0,
      vertexIndices: [
          0, 1, 2, 0, 2, 3    // Front face
      ],
      textureFile: 'media/images/nehe.gif',
      textureCoords: [
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
      ],
      numItems: 4,
      itemSize: 3,
      vertices: [
          // Front face
          -1.0, -1.0,  0.0,
           1.0, -1.0,  0.0,
           1.0,  1.0,  0.0,
          -1.0,  1.0,  0.0

      ],
      colors: [
          1.0, 1.0, 0.0, 1.0,
          1.0, 0.0, 0.0, 1.0,
          1.0, 0.0, 0.0, 1.0,
          1.0, 1.0, 0.0, 1.0
      ],
      cBodyData: [
        [-1.0, -1.0],
        [ 1.0, -1.0],
        [ 1.0,  1.0],
        [-1.0,  1.0]
      ],
      position: {
        x: -3,
        y: -30
      }
    },
    Cube: {
      type: "Crate",
      layer: 2,
      width: 59,
      height: 59,
      kinematic: false,
      density: 0.1,
      restitution: 0,
      friction: 0.8,
      rotation: 0,
      vertexIndices: [
          0, 1, 2, 0, 2, 3    // Front face
      ],
      textureFile: 'media/images/nehe.gif',
      textureCoords: [
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
      ],
      numItems: 4,
      itemSize: 3,
      vertices: [
          // Front face
          -1.0, -1.0,  0.0,
           1.0, -1.0,  0.0,
           1.0,  1.0,  0.0,
          -1.0,  1.0,  0.0

      ],
      colors: [
          1.0, 1.0, 0.0, 1.0,
          1.0, 0.0, 0.0, 1.0,
          1.0, 0.0, 0.0, 1.0,
          1.0, 1.0, 0.0, 1.0
      ],
      cBodyData: [
        [-1.0, -1.0],
        [ 1.0, -1.0],
        [ 1.0,  1.0],
        [-1.0,  1.0]
      ],
      position: {
        x: -3,
        y: -20
      }
    }
  }
};