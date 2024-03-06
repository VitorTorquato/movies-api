const { Router } = require('express');


const UsersController = require('../Controller/UserController');


const userRoutes = Router();

const userController = new UsersController();

userRoutes.post("/" , userController.create);
userRoutes.put("/:id" , userController.update);







module.exports = userRoutes;