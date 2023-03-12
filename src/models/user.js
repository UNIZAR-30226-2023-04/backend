/* AUTORES:  UNIZAR-30226-2023-04 - Grupo 04 Margaret Hamilton - Decibely
* ASIGNATURA: Proyecto Software del Grado de Ingeniería en Informática
*			  Escuela de Ingeniería y Arquitectura - Universidad de Zaragoza
* FECHA: Marzo de 2023
* DESCRIPCIÓN: Tabla usuarios
*/ 

/* -- MODULOS */
const mongoose = require ('mongoose')
const encryptor = require ('bcrypt-nodejs');
const {Schema} = mongoose;
 
/* -- TABLA -- */
const userSchema = new Schema({
    email: String,
    nombre: String, 
    password: String,
});


/* -- METODOS -- */

// Cifrar
userSchema.methods.encrpytPassword = (password) =>{ //Devuelve la contraseña cifrada
    return encryptor.hashSync(password, encryptor.genSaltSync(10)) //Ejecuta 10 veces el algoritmo de cifrado
};

//Comparar
userSchema.methods.comparePassword =  (password) => { //Para comparar las contraseñas con lo que hay guardado en la BBDD
    return encryptor.compareSync(password, this.password); //T o F
};

// Exportar
module.exports = mongoose.model('users', userSchema)