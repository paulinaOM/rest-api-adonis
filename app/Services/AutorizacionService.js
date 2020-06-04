const AccesoProhibidoException= use('App/Exceptions/AccesoProhibidoException');
const RecursoNoEncontradoException = use('App/Exceptions/RecursoNoEncontradoException.js');

class AutorizacionService{
    verificarPermiso(recurso, user){ //Metodo verificacion de permisos, recibe como parametros el recurso y el usuario
        if(!recurso){
            throw new RecursoNoEncontradoException();
        }
        if(recurso.user_id!== user.id){ //si el id del propietario del recurso es distinto del usuario actual
            throw new AccesoProhibidoException();
        }
    }

    verificarExistencia(recurso){
        if(!recurso){
            throw new RecursoNoEncontradoException();
        }
    }
}

module.exports = new AutorizacionService();