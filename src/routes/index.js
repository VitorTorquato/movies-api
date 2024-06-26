const {Router } = require('express');


const routes = Router()

const userRoutes = require('./user.routes');
const sessionRoutes = require('./session.routes');
const notesRoutes = require('./notes.routes');
const tagsRoutes = require('./tags.routes');


routes.use('/users' , userRoutes);
routes.use('/sessions' , sessionRoutes);
routes.use('/notes' , notesRoutes);
routes.use('/tags' , tagsRoutes);

module.exports = routes;