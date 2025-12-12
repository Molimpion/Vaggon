const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Activity = sequelize.define('Activity', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    data_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_termino: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pendente', 'concluida', 'cancelada'),
        defaultValue: 'pendente'
    }
}, {
    tableName: 'activities',
    timestamps: true
});

module.exports = Activity;