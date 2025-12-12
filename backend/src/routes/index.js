const express = require('express');
const routes = express.Router();

// Note o ".." (dois pontos) para subir uma pasta e achar o controllers
const AuthController = require('../controllers/AuthController');

// Rotas de Autenticação
routes.post('/auth/register', AuthController.register);
routes.post('/auth/login', AuthController.login);

// Rota de Teste
routes.get('/', (req, res) => {
    res.send('API Vaggon está on-line!');
});

module.exports = routes;