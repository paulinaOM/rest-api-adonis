'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => { // Utilizado para realizar acciones en determinados momentos (antes de guardar, después, al eliminar)
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password) //Antes de guardar hace un hash de la contraseña
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token') //cada usuario tiene muchos tokens de Modelos/token
  }
  proyectos(){
    return this.hasMany('App/Models/Proyecto');
  }
}

module.exports = User
