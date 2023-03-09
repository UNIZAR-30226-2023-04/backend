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
router.get('/', (req, res, next) => {
 res.render('../views/index')
});

/*  Inciar sesion */
router.get('/login', (req, res, next) => {

});
router.post('/login', (req, res, next) => {

});

/* Registrarse */
router.get('/signup', (req, res, next) => {
    res.render('signup')
});
router.post('/signup', (req, res, next) => {
    console.log(req.body)
    res.send('recevied')
});


// Exportar 
module.exports = router;




