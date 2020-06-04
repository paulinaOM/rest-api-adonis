'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Proyecto extends Model {
    user(){ //cada proyecto pertenece a un usuario
        return this.belongsTo('App/Models/User');
    }

    tareas(){ //un proyecto puede tener muchas tareas
        return this.hasMany('App/Models/Tarea');
    }
}


module.exports = Proyecto
