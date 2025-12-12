const sequelize = require('../config/database');
const User = require('./User');
const Activity = require('./Activity');

User.hasMany(Activity, { foreignKey: 'user_id' });
Activity.belongsTo(User, { foreignKey: 'user_id' });

const db = {
    sequelize,
    User,
    Activity
};

module.exports = db;