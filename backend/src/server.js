require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); 
const routes = require('./routes');       

const app = express();

app.use(cors());          
app.use(express.json());   


app.use(routes);         


const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com Banco de Dados estabelecida!');

        await sequelize.sync({ alter: true });
        console.log('Tabelas sincronizadas com sucesso!');

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Erro fatal ao iniciar o servidor:', error);
    }
};

startServer();