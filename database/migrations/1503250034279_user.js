'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () { //se ejecuta cuando se cree (ejecute) la migración
    this.create('users', (table) => { //Adonis crea una tabla con los sig campos
      table.increments() 
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamps() //crea 2 columnas de cuando se crea y actualiza el registro 
    })
  }

  down () { //Cuando se ejecutan rollbacks
    this.drop('users')
  }
}

module.exports = UserSchema
