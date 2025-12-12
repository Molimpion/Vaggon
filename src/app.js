const express = require('express');
const cors = require('cors');

const UserController = require('./api/controllers/UserController');
const AuthController = require('./api/controllers/AuthController');
const ActivityController = require('./api/controllers/ActivityController');
const authMiddleware = require('./api/middleware/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/auth/register', UserController.create);
app.post('/auth/login', AuthController.login);


app.post('/activities', authMiddleware, ActivityController.create);
app.get('/activities', authMiddleware, ActivityController.index);
app.put('/activities/:id', authMiddleware, ActivityController.update);
app.delete('/activities/:id', authMiddleware, ActivityController.delete);

app.get('/', (req, res) => res.json({ message: 'API Vaggon funcionando!' }));

module.exports = app;