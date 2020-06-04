'use strict'

const User= use('App/Models/User'); //importando el modelo usuario

class UserController {
    async login({request, auth}){
        const {email,password}=request.all();//solicitar email y passwd
        const token= await auth.attempt(email,password); //generar un token: intenta encontrar un usuario en la bd con el email y passwd
        return token; //si lo encuentra regresa el token
    }

    async store({request}){ //para crear o guardar un usuario nuevo . Todos los métodos dentro de los controladores son asincronos
        const {email,password}=request.all();
        console.log(email,password);
        const user = await User.create({ //Habrá una espera en la consulta a la bd
            username: email,
            email,
            password
        });
        return this.login(...arguments); //al crear un usuario lo loguea en el sistema (llamar a un método dentro de otro)
    };

    async logout({request, auth,response}){
      try {
        const check = await auth.check();
        if (check) {
          const token = await auth.getAuthHeader();
          await auth.authenticator("jwt").revokeTokens([token]);
          return response.status(200).send({ message: "La sesión se ha cerrado correctamente!" });
        }
      } catch (error) {
        return response.send({ message: "El token es inválido" });
      }
    }
}

module.exports = UserController
