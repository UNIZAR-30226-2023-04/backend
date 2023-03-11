/* AUTORES:  UNIZAR-30226-2023-04 - Grupo 04 Margaret Hamilton - Decibely
* ASIGNATURA: Proyecto Software del Grado de Ingeniería en Informática
*			  Escuela de Ingeniería y Arquitectura - Universidad de Zaragoza
* FECHA: Marzo de 2023
* DESCRIPCIÓN: Fichero encargado de enrutar
*/

// Modulo
const express = require('express');
const router = express.Router();

/*  Pagina inicial */
router.get('/', (req, res, next) => {   //LA PRIMERA PÁGINA QUE EL USER VISITA
    res.render('../views/index') //COMO RESPUESTA, RENDERIZA LA VISTA DE VIEWS
});

/*  Inciar sesion */
router.get('/signin', (req, res, next) => {
    //res.render('signin')
});
router.post('/signin', (req, res, next) => {

});

/* Registrarse */
router.get('/signup', (req, res, next) => {         //ENVIA UNA VENTANA
    res.render('signup')
});
router.post('/signup', (req, res, next) => {        //SE DICE SI RUTA ES CORREECTA (SI USER EXISTE); CUANDO LE DAMOS AL BOTÓN
    // console.log(req.body)
    // res.send('recevied')
});


// Exportar 
module.exports = router;




