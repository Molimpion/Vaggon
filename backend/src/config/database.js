const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT, // Adicionamos a porta aqui
        dialect: 'mysql',
        timezone: '-03:00',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Necessário para aceitar o SSL da nuvem sem certificado local
            }
        }
    }
);

module.exports = sequelize;