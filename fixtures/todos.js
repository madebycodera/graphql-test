const uuidv1 = require('uuid/v1');

module.exports = [
  {
    id: uuidv1(),
    description: 'Complete a test.',
    createdAt: new Date(1564606800000),
    completed: true,
    priority: 8
  },
  {
    id: uuidv1(),
    description: 'Have a lunch.',
    createdAt: new Date(1564693200000),
    completed: false,
    priority: 10
  },
  {
    id: uuidv1(),
    description: 'Meet a friend.',
    createdAt: new Date(1564779600000),
    completed: false,
    priority: 7
  },
  {
    id: uuidv1(),
    description: 'Watch a movie.',
    createdAt: new Date(1564866000000),
    completed: true,
    priority: 3
  },
  {
    id: uuidv1(),
    description: 'Read a book',
    createdAt: new Date(1564952400000),
    completed: true,
    priority: 5
  }
];
