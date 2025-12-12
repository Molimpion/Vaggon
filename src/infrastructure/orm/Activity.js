const { DataTypes, Model } = require('sequelize');
const sequelize = require('../dbconn/sequelize');

class Activity extends Model {}

Activity.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pendente', 'concluída', 'cancelada'),
        defaultValue: 'pendente',
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Activity',
    tableName: 'activities',
});

module.exports = Activity;