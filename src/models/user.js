/* AUTORES:  UNIZAR-30226-2023-04 - Grupo 04 Margaret Hamilton - Decibely
* ASIGNATURA: Proyecto Software del Grado de Ingeniería en Informática
*			  Escuela de Ingeniería y Arquitectura - Universidad de Zaragoza
* FECHA: Marzo de 2023
* DESCRIPCIÓN: Tabla usuarios
*/ 

/* -- MODULOS */
const mongoose = require ('mongoose')
const encrpytator = require ('bcrypt-nodejs');
const {Schema} = mongoose;
 
/* -- TABLA -- */
const userSchema = new Schema({
    email: String,
    nombre: String, 
    contrasenya: String,
});

/* -- METODOS -- */

// Cifrar
userSchema.methods.encrpytPassword = (password) =>{
    return encrpytator.hashSync(password, encrpytator.genSaltSync(10))
};

//Comparar
userSchema.methods.comparePassword =  (password) => {
    return encrpytator.compareSync(password, this.password);
};

// Exportar
module.exports = mongoose.model('usuarios', userSchema)