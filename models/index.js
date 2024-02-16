const User = require('./User');
const Event = require('./Event');

User.hasMany(Event, {
    foreignKey: 'creator_id',
    onDelete: 'CASCADE'
});

Event.belongsTo(User, {
    foreignKey: 'creator_id'
});

module.exports = { User, Event };