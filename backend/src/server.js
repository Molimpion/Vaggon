require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const routes = require('./routes');
const globalError = require('./middleware/globalError');
const { apiReference } = require('@scalar/express-api-reference');
const swaggerSpec = require('./config/swagger');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/docs/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use(
  '/docs',
  apiReference({
    theme: 'purple',
    spec: {
      url: '/docs/json',
    },
  })
);

app.use(routes);
app.use(globalError);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log(' Conexão com Banco de Dados estabelecida!');
        await sequelize.sync({ alter: true });
        
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(` Servidor rodando em http://localhost:${PORT}`);
            console.log(` Documentação visual: http://localhost:${PORT}/docs`);
            console.log(` Arquivo Swagger JSON: http://localhost:${PORT}/docs/json`);
        });

    } catch (error) {
        console.error('❌ Erro fatal ao iniciar o servidor:', error);
    }
};

startServer();