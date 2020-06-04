'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProyectoSchema extends Schema {
  up () {
    this.create('proyectos', (table) => { //Al generar la migración crea una tabla proyectos con el id autoincrement y los timestamp
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users') //El campo hace referencia a un usuario, relación
      table.string('nombre',80).notNullable() //hasta 80 caracteres
      table.timestamps()
    })
  }

  down () {
    this.drop('proyectos')
  }
}

module.exports = ProyectoSchema
