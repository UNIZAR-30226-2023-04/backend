/* AUTORES:  UNIZAR-30226-2023-04 - Grupo 04 Margaret Hamilton - Decibely
* ASIGNATURA: Proyecto Software del Grado de Ingeniería en Informática
*			  Escuela de Ingeniería y Arquitectura - Universidad de Zaragoza
* FECHA: Marzo de 2023
* DESCRIPCIÓN: Fichero encargado de enrutar
*/

// Modulo
const express = require('express');
const router = express.Router();
const passport = require('passport');

/*  Pagina inicial */
router.get('/', (req, res, next) => {   //LA PRIMERA PÁGINA QUE EL USER VISITA
    res.render('../views/index') //COMO RESPUESTA, RENDERIZA LA VISTA DE VIEWS
});

/*  Inciar sesion */
router.get('/signin', (req, res, next) => {
    res.render('../views/signin');
});
router.post('/signin', passport.authenticate('auth', {
    successRedirect: '/profile',    //Si ok --> a donde te lleva
    failureRedirect: '/signin',
    passReqToCallback: true
}));

/* Registrarse */
router.get('/signup', (req, res, next) => {         //ENVIA UNA VENTANA
    res.render('../views/signup')
});

router.post('/signup', passport.authenticate('auth', {
    successRedirect: '/profile',    //Si ok --> a donde te lleva
    failureRedirect: '/signup',
    passReqToCallback: true
}));
// router.post('/signup', (req, res, next) => {        //SE DICE SI RUTA ES CORREECTA (SI USER EXISTE); CUANDO LE DAMOS AL BOTÓN
//     console.log(req.body)        //Aquí se muestran los datos de formulario
//     res.send('received')
// });

/* Cerrar sesion */
router.get('/logout', (req, res, nex) => {
    req.logout();
    res.redirect('/');
});




//Comprobar si el usuario esta autenticado (ejecutar en el get de cada pagina
//que requiera haber hecho signin)
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

/* PAGINAS QUE REQUIEREN AUTENTICACION */
//Comprobar que el usuario esta autenticado antes de acceder
router.use((req, res, next) => {
    isAuthenticated(req, res, next);
    next();
});


/* Mostrar perfil */
router.get('/profile', (req, res, next) => {
    res.render('profile');
});




// Exportar 
module.exports = router;




