/* AUTORES:  UNIZAR-30226-2023-04 - Grupo 04 Margaret Hamilton - Decibely
* ASIGNATURA: Proyecto Software del Grado de Ingeniería en Informática
*			  Escuela de Ingeniería y Arquitectura - Universidad de Zaragoza
* FECHA: Marzo de 2023
* DESCRIPCIÓN: Fichero para la autenticacion
 
*/ 
// -- MODULOS ---
const passport = require('passport');  
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user')

//Cuando se ejecuta el done (abajo), almacena el id del usuario. INFO que guarda el navegador
//para no tener que logearse todo el rato
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//Convierte lo que guarda el navegador (del usuario) en la web para el servidor. Hace consulta a base de datos
//para buscar el usuario
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});



passport.use('auth', new LocalStrategy({
    usernameField: 'nombre',
    mailField: 'email',
    passwordField: 'password',
    passReqToCallback: true // Para poder recibir el nombre
}, async (req,email,password, done) => {
    const user = new User() 
    user.email = email;
    user.nombre = nombre;
    user.password = password;
    await user.save() // Esperar a que esta función asíncrona acabe, y luego sigue con la 
    //siguiente línea, sino problemas de concurrencia (me lo estoy inventando) //VER async
    done(null,user); //null --> error, y guarda el usuario
}));