const { Router, json } = require('express');
const uploadConfig = require('../config/upload');
const multer = require('multer');



const UsersController = require('../Controller/UserController');
const UserAvatarController = require('../Controller/UserAvatarController');


const upload = multer(uploadConfig.MULTER);

const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const userRoutes = Router();

const userController = new UsersController();
const userAvatarController = new UserAvatarController();

userRoutes.post("/" , userController.create);
userRoutes.put("/" ,ensureAuthenticated,   userController.update);
userRoutes.patch("/avatar" ,ensureAuthenticated, upload.single("avatar") , userAvatarController.update);







module.exports = userRoutes;