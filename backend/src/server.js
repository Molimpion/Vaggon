const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const app = express();

// Configurações básicas
app.use(cors()); // Permite que o Front acesse o Back
app.use(express.json()); // Permite ler JSON no corpo das requisições

// Rota de Teste
app.get('/', (req, res) => {
    res.send('API Vaggon está rodando! 🚀');
});

// Tenta conectar ao banco e inicia o servidor
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log(' Conexão com MySQL estabelecida com sucesso!');
        
        // Sincroniza as tabelas (veremos isso no próximo passo)
        // await sequelize.sync({ force: false }); 

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error(' Não foi possível conectar ao banco de dados:', error);
    }
};

startServer();