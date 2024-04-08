const { response } = require('express');

const AppError = require('../utils/AppError');

const knex = require('../database/knex');



class NotesController{
    async create (request, response){
        
        const { title, description , rating , tags} = request.body;
        const { user_id} = request.params;

        const [note_id] = await knex('movie_notes').insert({
            title,
            description,
            rating,
            user_id
        });

        if(rating < 0 && rating > 5){
            throw new AppError('A nota só pode ser de 0 a 5')
        }

       

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        });

        await knex('tags').insert(tagsInsert);

        response.json();

    }
        

    async show(request,response){

        const { id } = request.params;

        const note = await knex('movie_notes').where({id}).first();
        const tags = await knex('tags').where({note_id: id}).orderBy("name");


        return response.json({
            ...note,
            tags
        });

    };

    async delete(request,response){
        const {id} = request.params;

        await knex('movie_notes').where({id}).delete();

        return response.json();
    }

    async index(request , response){
        const{ title , tags } = request.query;

        const  user_id = request.user.id

        let notes

        if(tags){
            const filterTags = tags.split(",").map(tag => tag.trim());

            notes = await knex('tags').whereIn("name" , filterTags);
        }else{
            notes = await knex(movie_notes).where({user_id}).whereILike("title" , `%${title}%`).orderBy("title");
        }

        const userTags = await knex('tags').where({user_id});
        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id);

            return { 
                ...note,
                tags: noteTags
            };
        })

        return response.json(notesWithTags);
    }

}


module.exports = NotesController;