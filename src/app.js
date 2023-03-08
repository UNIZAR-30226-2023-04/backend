/* AUTORES:  UNIZAR-30226-2023-04 - Grupo 04 Margaret Hamilton - Decibely
* ASIGNATURA: Proyecto Software del Grado de Ingeniería en Informática
*			  Escuela de Ingeniería y Arquitectura - Universidad de Zaragoza
* FECHA: Octubre de 2022
* DESCRIPCIÓN: Fichero de configuración de app de Express
*/


// ------- MODULOS -------- */
const express = require('express');
const engine = require('ejs-mate');
const ejs = require('ejs');


// ---- INSTANCIA -----
const app = express();
const path = require('path')


/* ------- CONFIGURACIÓN -------- */

app.set('port', process.env.port || 3000 ) // Ponemos el puerto que nos dará el servidor donde se encuentra alojada la app o el 3000 si no hay
app.set('views',  path.join(__dirname, 'views' )) // Para que el directorio desde donde trabajamos sea multiplataforma 
app.use('/', require('./routes/router')) // 

// NOTA: MOTOR DE PLANTILLA ESTO ES PARA TENER UN FRONTEND TEMPORAL PARA TRABAJAR PERO TENDREMOS QUE SUSTITUIRLO
app.engine('ejs', engine)
app.set('view engine', 'ejs')

// Exporta la variable app para utilizarla en otros archivos
module.exports = app;