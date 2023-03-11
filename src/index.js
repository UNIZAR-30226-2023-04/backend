/* AUTORES:  UNIZAR-30226-2023-04 - Grupo 04 Margaret Hamilton - Decibely
* ASIGNATURA: Proyecto Software del Grado de Ingeniería en Informática
*			  Escuela de Ingeniería y Arquitectura - Universidad de Zaragoza
* FECHA: Marzo de 2023
* DESCRIPCIÓN: Fichero principal
const express = require('express');
const app = express();
// settings 
app.set('port', process.env.PORT || 3000); #declaramos variable puerto, que si está declarada la cogemos, sino 3000 viviendas
// starting the server 
app.listen(app.get('port'))  #hace el listen en el port que se ha declarado antes (busca su valor) COMA PARA SUMAR MENSAJES



app.listen(app.get('port'), () => { #Listenea y muestra el msg con el porto
    console.log('server on port 3000')
})

*/

const express = require('express');
const engine = require('ejs-mate'); //MODULO DE PLANTILLAS (ES UN MOTOR)
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');

//Inicializaciones
const app = express();
require('./database/database');
require('./authentication/auth');    //Para requerir la autenticación

// settings
app.set('views', path.join(__dirname, 'views')); //PATH devuelve la dirección de la carpeta donde estamos (src) en __dirname, y le concatenamos la carpeta views
app.engine('ejs', engine);
app.set('view engine', 'ejs'); //establece el motor de plantillas
app.set('port', process.env.PORT || 3000); //declaramos variable puerto, que si está declarada la cogemos, sino 3000 viviendas
// starting the server 

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({   //Guarda los datos de sesión
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false //No requiere inicialización previa
}))
app.use(passport.initialize()); //Inicializa el passport
app.use(passport.session());

//Routes
app.use('/', require('./routes/router')); //CADA VEZ QUE USER USA RUTA /, lo mandará por ./routes


app.listen(app.get('port'), () => { //Listenea y muestra el msg con el porto
    console.log('server on port 3000')
})

/* ES DE RAUL
const app = require('./app');


// ------- LANZAR SERVIDOR -------- 
app.listen(app.get('port'), () => {
    console.log('server on port 3000')
})

*/


