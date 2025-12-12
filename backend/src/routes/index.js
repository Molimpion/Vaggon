const { Router } = require('express');
const authRoutes = require('./auth.routes');
const activitiesRoutes = require('./activities.routes');

const routes = Router();

routes.get('/', (req, res) => {
    res.send('API Vaggon está on-line! ');
});

routes.use('/auth', authRoutes);       
routes.use('/activities', activitiesRoutes); 

module.exports = routes;