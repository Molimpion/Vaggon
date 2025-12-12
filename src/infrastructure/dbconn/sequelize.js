const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'vaggon_agenda',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || 'root',
    {
        host: process.env.DB_HOST || 'db',
        dialect: 'mysql',
        logging: false,
        timezone: '-03:00'
    }
);

module.exports = sequelize;