'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TareaSchema extends Schema {
  up () {
    this.create('tareas', (table) => {
      table.increments()
      table.integer('proyecto_id').unsigned().references('id').inTable('proyectos') //El campo hace referencia a un proyecto, relación
      table.string('descripcion',255).notNullable() //hasta 80 caracteres
      table.boolean('completada').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('tareas')
  }
}

module.exports = TareaSchema
