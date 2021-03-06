'use strict'

const AutorizacionService = use('App/Services/AutorizacionService')
const Tarea= use('App/Models/Tarea');
const Proyecto=use('App/Models/Proyecto');
const Categoria=use('App/Models/Categoria');

class CategoriaController {
    async index({auth,request,params}){
        const categoria = await Categoria.all();
        return categoria.toJSON(); //Toma todas las categorias
    }

    async create({auth, request}){
        const user =  await auth.getUser();
        const {descripcion} = request.all(); //Toma el nombre de lo que se envia desde el servidor
        
        const categoria= new Categoria();
        categoria.fill({ //Habrá una espera en la consulta a la bd
            descripcion,
        });
        await categoria.save();
        return categoria;
    }

    async destroy({auth, params}){
        const {id}= params;
        const categoria= await Categoria.find(id); //Buscar la categoria por el id
        AutorizacionService.verificarExistencia(categoria);
        await categoria.delete(); //Elimina la categoria
        return categoria; //Da una respuesta al terminar de eliminar la categoria
    }

    async update({params, request}){
        const {id}= params;
        const categoria= await Categoria.find(id);
        AutorizacionService.verificarExistencia(categoria);
        categoria.merge(request.only('descripcion')); //De todo lo enviado solo tomar el nombre
        await categoria.save();
        return categoria;
    }
}

module.exports = CategoriaController
