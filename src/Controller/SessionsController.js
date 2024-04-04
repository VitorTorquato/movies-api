const knex = require("../database/knex");
const { compare } = require("bcryptjs");



const AppError = require("../utils/AppError");

const authConfig = require("../config/auth");

const { sign } = require('jsonwebtoken');


class SessionControllers{

    async create(request, response){
        const {email , password} = request.body;

        const user = await knex("users").where({email}).first();

        if(!user){
            throw new AppError('E-mail e/ou senha invalida', 401);
        }

        const passwordIsTheSame = await compare(password , user.password);
        if(!passwordIsTheSame){
            throw new AppError('E-mail e/ou senha invalida' , 401);
        }


        const { secret , expiresIn } = authConfig.jwt; 
        const token =  sign({} , secret , {
            subject: String(user.id),
            expiresIn
        })

        return response.json({user,token});

    }

}

module.exports = SessionControllers;