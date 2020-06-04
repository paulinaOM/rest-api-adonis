'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class AccesoProhibidoException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, {response}) {//Recibe un error y hace uso de response para devolver una respuesta
    return response.status(403).json({
      error: 'Acceso no permitido al recurso'
    });
  }
}

module.exports = AccesoProhibidoException
