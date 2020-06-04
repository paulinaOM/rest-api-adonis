'use strict'

const Proyecto=use('App/Models/Proyecto');
const Tarea= use('App/Models/Tarea');
const AutorizacionService = use('App/Services/AutorizacionService');

class TareaController {
    async index({auth,request,params}){
        const user= await auth.getUser();
        const {id} = params;
        const proyecto = await Proyecto.find(id);
        AutorizacionService.verificarPermiso(proyecto, user);
        return await proyecto.tareas().fetch(); //Toma todas las tareas que pertenezcan al proyecto
    }

    async create({auth,request,params}){
        const user = await auth.getUser();
        const {descripcion}= request.all(); //Se obtiene de lo que se envia
        const {id}= params; //El id se obtiene de los parametros
        const proyecto = await Proyecto.find(id);

        AutorizacionService.verificarPermiso(proyecto, user); //Controlar si el recurso pertenece al usuario

        const tarea= new Tarea();
        tarea.fill({ //Llenar la tarea con la descripcion
            descripcion,
        });
        await proyecto.tareas().save(tarea); //Un proyecto (proyecto.js) tiene muchas tareas. Guardar una tarea
        return tarea;
    }

    async update({auth, params, request}){
        const user = await auth.getUser();
        const {id}= params;
        const tarea= await Tarea.find(id);
        AutorizacionService.verificarExistencia(tarea);
        const proyecto= await tarea.proyecto().fetch(); //Trae el proyecto al que pertenece la tarea (Tarea.js belongsTo(proyecto))
        
        AutorizacionService.verificarPermiso(proyecto, user);
        //proyecto.merge(request.only('nombre'));
        tarea.merge(request.only([
            'descripcion',
            'completada'
        ]))
        await tarea.save();
        return tarea; //Da una respuesta al terminar de eliminar el proyecto
    }

    async destroy({auth, params}){
        const user = await auth.getUser();
        const {id}= params;
        const tarea= await Tarea.find(id);
        AutorizacionService.verificarExistencia(tarea);
        const proyecto= await tarea.proyecto().fetch(); //Trae el proyecto al que pertenece la tarea (Tarea.js belongsTo(proyecto))
        
        AutorizacionService.verificarPermiso(proyecto, user);
        await tarea.delete(); //Elimina el proyecto
        return tarea; //Da una respuesta al terminar de eliminar el proyecto
    }
}

module.exports = TareaController
