'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/*Route.get('/', () => {
  return { greeting: 'Hello world in JSON Paulina' }
})*/

Route.group(()=>{
  Route.post('usuarios/registro','UserController.store'); //Post para crear usuario
  Route.post('usuarios/login','UserController.login');
  //Rutas de los proyectos
  Route.get('proyectos','ProyectoController.index').middleware('auth');
  Route.post('proyectos','ProyectoController.create').middleware('auth');
  Route.delete('proyectos/:id','ProyectoController.destroy').middleware('auth');
  Route.patch('proyectos/:id','ProyectoController.update').middleware('auth');
  //Rutas de las tareas
  Route.get('proyectos/:id/tareas','TareaController.index').middleware('auth'); //listar tareas de un proyecto especifico
  Route.post('proyectos/:id/tareas','TareaController.create').middleware('auth');
  Route.delete('tareas/:id','TareaController.destroy').middleware('auth');
  Route.patch('tareas/:id','TareaController.update').middleware('auth');
  Route.post('usuarios/logout','UserController.logout');
  //Ruta de las categorias
  Route.get('categorias','CategoriaController.index');
  Route.post('categorias','CategoriaController.create');
  Route.delete('categorias/:id','CategoriaController.destroy');
  Route.patch('categorias/:id','CategoriaController.update');
}).prefix('api/v1/'); //Todas las rutas que se coloquen en el grupo tendrán el prefijo. Pueden tenerse múltiples versiones corriendo en el mismo proyecto

