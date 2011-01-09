var resources = {
  'backgrounds': [
    {
      'image': 'media/images/background-mountains.jpg'
    }
  ],
  'gameObjs': [
    {
      'name': 'Plane', 
      'drawable': 'sPlane',
      'layer': 10,
      'x': 0,
      'y': 0,
      'rotation': 30,
      'velocity': {
        'x': 200,
        'y': 0
      },
      'drawable': {
        'image': 'media/images/plane_sm.png',
        'type': 'sprite',
        'animation': {
          'time': 1000,
          'frames': 40
        } 
      }
    },
    {
      'name': 'Plane', 
      'drawable': 'sPlane',
      'layer': 10,
      'x': 0,
      'y': 100,
      'rotation': 30,
      'velocity': {
        'x': 100,
        'y': 0
      },
      'drawable': {
        'image': 'media/images/plane_sm.png',
        'type': 'sprite',
        'animation': {
          'time': 1000,
          'frames': 40
        } 
      }
    }
  ]
};