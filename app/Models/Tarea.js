'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tarea extends Model {
    proyecto(){ //cada tarea pertenece a un proyecto
        return this.belongsTo('App/Models/Proyecto');
    }
    categoria(){ //cada tarea pertenece a una categoria
        return this.belongsTo('App/Models/Categoria');
    }
}

module.exports = Tarea
