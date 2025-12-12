const app = require('./app');
const sequelize = require('./infrastructure/dbconn/sequelize');
const User = require('./infrastructure/orm/User');
const Activity = require('./infrastructure/orm/Activity');

const PORT = process.env.PORT || 3333;

async function startServer() {
    try {
        User.hasMany(Activity, { foreignKey: 'user_id' });
        Activity.belongsTo(User, { foreignKey: 'user_id' });

        await sequelize.authenticate();
        console.log('Banco conectado!');

        await sequelize.sync({ force: false }); 
        
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar servidor:', error);
    }
}

startServer();