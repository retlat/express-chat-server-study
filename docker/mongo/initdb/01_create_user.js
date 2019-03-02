db.createUser({
  user: 'chat',
  pwd: 'password',
  roles: ['readWrite']
});

db.users.insert([
  {
    username: 'Alice',
    password: '$2b$10$vbHLw5zBazE/.DT6vf0yYO/vrk8aRqVKjmwViw1JHEXX3jbI58eKW'  // 'password'
  },
  {
    username: 'Bob',
    password: '$2b$10$vbHLw5zBazE/.DT6vf0yYO/vrk8aRqVKjmwViw1JHEXX3jbI58eKW'  // 'password'
  }
]);
