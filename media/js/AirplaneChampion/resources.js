var resources = {
  'backgrounds': [
    {
      'image': 'media/images/background-mountains.jpg'
    }
  ],
  'gameObjs': [
    {
      'name': 'Plane', 
      'uid': 'playerPlane',
      'layer': 10,
      'x': 100,
      'y': 0,
      'rotation': 0,
      'mass': 1, 
      'velocity': {
        'x': 200,
        'y': 0
      },
      'drawable': {
        'image': 'media/images/plane_sm.png',
        'type': 'Sprite',
        'width': 100,
        'height': 33,
        'animation': {
          'time': 1000,
          'frames': 40
        } 
      }
    }
  ]
};