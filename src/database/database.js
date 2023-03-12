/* AUTORES:  UNIZAR-30226-2023-04 - Grupo 04 Margaret Hamilton - Decibely
* ASIGNATURA: Proyecto Software del Grado de Ingeniería en Informática
*			  Escuela de Ingeniería y Arquitectura - Universidad de Zaragoza
* FECHA: Marzo de 2023
* DESCRIPCIÓN: Fichero para la conexión con la base de datos
*/

const mongoose = require('mongoose'); // Driver de MongoDb para NodeJS
const {mongodb} = require('./keys');

// Conectamos la base de datos
mongoose.connect(mongodb.URI, {useNewUrlParser: true})
    .then(db => console.log('Database is connected'))
    .catch(err => console.error(err))
