'use strict'
const Proyecto = use('App/Models/Proyecto');
const AutorizacionService = use('App/Services/AutorizacionService')

class ProyectoController {
    async index({auth}){ //Devuelve lista de todos los registros de la bd. Requiere autentificacion
        const user =  await auth.getUser();//getuser (hace chequeo y devuelve el usuario al que pertenece el token) devuelve el usuario logueado haciendo uso del metodo de checkeo (checa que el token sea correcto y exista en la bd)
        return await user.proyectos().fetch(); //fetch devuelve todos
    }

    async create({auth, request}){
        const user =  await auth.getUser();
        const {nombre} = request.all(); //Toma el nombre de lo que se envia desde el servidor
        const proyecto =  new Proyecto();

        proyecto.fill({
            nombre 
        });
        await user.proyectos().save(proyecto); //Guardar en la bd el proyecto. proyectos() es un método de User
        return proyecto;
    }

    async destroy({auth, params}){
        const user = await auth.getUser();
        const {id}= params;
        const proyecto= await Proyecto.find(id); //Buscar el proyecto por el id

        AutorizacionService.verificarPermiso(proyecto, user);
        await proyecto.delete(); //Elimina el proyecto
        return proyecto; //Da una respuesta al terminar de eliminar el proyecto
    }

    async update({auth, params, request}){
        const user = await auth.getUser();
        const {id}= params;
        const proyecto= await Proyecto.find(id);

        AutorizacionService.verificarPermiso(proyecto,user);
        proyecto.merge(request.only('nombre')); //De todo lo enviado solo tomar el nombre
        await proyecto.save();
        return proyecto;
    }
}

module.exports = ProyectoController
