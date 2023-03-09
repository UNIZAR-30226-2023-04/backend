/* AUTORES:  UNIZAR-30226-2023-04 - Grupo 04 Margaret Hamilton - Decibely
* ASIGNATURA: Proyecto Software del Grado de Ingeniería en Informática
*			  Escuela de Ingeniería y Arquitectura - Universidad de Zaragoza
* FECHA: Marzo de 2023
* DESCRIPCIÓN: Fichero principal
*/

const app = require('./app');


/* ------- LANZAR SERVIDOR -------- */
app.listen(app.get('port'), () => {
    console.log('server on port 3000')
})




