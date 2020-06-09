'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Categoria extends Model {
    tareas(){ //una categoria puede tener muchas tareas
        return this.hasMany('App/Models/Tarea');
    }
}

module.exports = Categoria
