const { Router } = require('express');


const TagsController = require('../Controller/TagsController');

const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.get("/" ,ensureAuthenticated, tagsController.index);

module.exports = tagsRoutes;