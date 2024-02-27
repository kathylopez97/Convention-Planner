const { User } = require('../models');

const userData = [
    {
        username: 'Stephen',
        email: 'rossetti.stephen@gmail.com',
        password: 'password123',
        isCreator: true,
    },
];

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true, returning: true
});

module.exports = seedUsers;