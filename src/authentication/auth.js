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

passport.use('auth', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // Para poder recibir el nombre
}, async (req,email,password, done) => {
    const user = new User() 
    user.email = email;
    user.nombre = nombre;
    user.passwrod = passwrod;
    await user.save() // Para guardar en la base de datos de forma sincrona
    done(null,user);
}));