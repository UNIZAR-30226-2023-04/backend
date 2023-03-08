/* AUTORES:  UNIZAR-30226-2023-04 - Grupo 04 Margaret Hamilton - Decibely
* ASIGNATURA: Proyecto Software del Grado de Ingeniería en Informática
*			  Escuela de Ingeniería y Arquitectura - Universidad de Zaragoza
* FECHA: Octubre de 2022
* DESCRIPCIÓN: Fichero encargado de enrutar
*/

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

});
router.post('/signup', (req, res, next) => {

});


// Exportar 
module.exports = router;




