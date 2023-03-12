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


//---------------------------------------------SIGN UP
passport.use('auth', new LocalStrategy({
    usernameField: 'nombre',
    mailField: 'email',
    passwordField: 'password',
    passReqToCallback: true // Para poder recibir el nombre
}, async (req,email,password, done) => {
    //Comprobar que el correo no estaba ya registrado en la bd
    const existingUser = await User.findOne({email: email});
    if (existingUser) { //Devolver mensaje de error si el correo ya exsiste
        return done(null, false, req.flash('signupMessage', 'Este email ya ha sido registrado'));
    }
    else {              //Si el correo no existe, registrarlo en la bd
        const user = new User();
        user.email = email;
        user.nombre = nombre;
        user.password = user.encryptPassword(password);//Guardar la contrasenya encriptada
        await user.save() // Esperar a que esta función asíncrona acabe, y luego sigue con la 
        //siguiente línea, sino problemas de concurrencia (me lo estoy inventando) //VER async
        done(null,user); //null --> error, y guarda el usuario
    }
    
}));


//---------------------------------------------SIGN IN
passport.use('auth', new LocalStrategy({ 
    usernameField: 'nombre',
    mailField: 'email',
    passwordField: 'password',
    passReqToCallback: true // Para poder recibir el nombre
}, async (req, email, password, done) => {
    //Comprobar si el usuario es correcto
    const user = await User.findOne({email: email});
    //Si el usuario existe (buscando por email):
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'El usuario introducido no existe'))
    }
    //Si la contrasenya no es correcta:
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Contraseña incorrecta'));
    }
    //Si el usuario es correcto, devuelve el usuario:
    done(null, user);
}))