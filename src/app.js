/* AUTORES:  UNIZAR-30226-2023-04 - Grupo 04 Margaret Hamilton - Decibely
* ASIGNATURA: Proyecto Software del Grado de Ingeniería en Informática
*			  Escuela de Ingeniería y Arquitectura - Universidad de Zaragoza
* FECHA: Marzo de 2023
* DESCRIPCIÓN: Fichero de configuración de app de Express
*/

// ------- MODULOS -------- */
const express = require('express');
const engine = require('ejs-mate');
const ejs = require('ejs');
const morgan = require('morgan')
const path = require('path')

// ------- INICIALIZACIONES -------- */
const app = express() // Servidor
require('./databse') // Base de datos

/* ------- CONFIGURACIÓN -------- */

app.set('port', process.env.port || 3000 ) // Ponemos el puerto que nos dará el servidor donde se encuentra alojada la app o el 3000 si no hay
app.set('views',  path.join(__dirname, 'views' )) // Para que el directorio desde donde trabajamos sea multiplataforma 

// TEMPLATE ENGINE
//NOTA: MOTOR DE PLANTILLA ESTO ES PARA TENER UN FRONTEND TEMPORAL PARA TRABAJAR PERO TENDREMOS QUE SUSTITUIRLO
app.engine('ejs', engine)
app.set('view engine', 'ejs')

// MIDDLEWARES
app.use(morgan('dev')) // Para recibir lo que nos envia el
app.use(express.urlencoded({extended: false}))

// ROUTES
app.use('/', require('./routes/router'))

// Exporta la variable app para utilizarla en otros archivos
module.exports = app;