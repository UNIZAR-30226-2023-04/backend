npm init --yes 
npm i express #PERMITE ESCRIBIR CODIGO DEL SERVIDOR DE FORMA RESUMIDA, facilita el trabajo
npm i express mongoose ejs-mate connect-flash morgan passport passport-local bcrypt-nodejs

#mongoose es el driver el mongoose
#ejs-mate: motor de plantillas
#connect-flash: para que continúe la sesión, envío de mensajes entre múltiples páginas
#morgan: ver que piden las apps cliente
#passport: permite la autenticación. Con google y facebook y tal (NO SE ENSEÑA EN EL Vídeo)
#passport-local: sin google, sólo local
#bcrypt-nodejs: cifrar contraseñas

npm i nodemon -D #ayuda a reiniciar el servidor, lo ayuda como dependencia de desarrollo con -D, no lo instalará con el resto de paquetes 13:23
#//Nodemon, si hay cambios, se reinicia el servidor

npm run dev #startea el index, pero si hay cambios lo reiniciaa de nuevo MUY CHULO (todo es culpa del NODEMON)


#routes -> los urls de todas las paginides
#database.js -> Conexión a BBDD
#index.js -> arrancar el servidor
#keys.js -> Los parámetros de la BBDD
#models -> Modela los datos que tiene la BBDD
#passport -> Autenticación

#views --> tiene los html, en verdad son los ejs-mate (MOTOR DE PLANTILLAS)

#usamos path en index.js para indicar el path sin usar la ruta absoluta

#Hemos puesto app.use en index.js para que al poner / (pantalla principal) se redirija a ./routes/router

#requerimos morgan en el index.js
#Se usa morgan antes de app.use('/', './routes/router') porque actúa de middleware, antes de que se muestre la pantalla a los usuarios
app.use(morgan('dev')) #sirve para mostrar en la consola peticiones GET POST de clientides

#CREAMOS SIGNUP SIGNIN
#GET Y POST SON LO MISMO: get manda datos por la URL y POST lo hace escondido, para no distrocionar nuestra URL amigable

#En index.js usamos este comando (el de aquí abajo) para tratar los datos que recibimos del formulario. El extend es para no se qué de que no son imágenes (solo tecsto)
app.use(express.urlencoded({extended: false})) #urlencoded permite recibir datos del cliente, no archivos pesados ni imágenes

#en req se guardan los datos del formulario
console.log(req.body)    #muestra por consola el formulario    
res.send('received')    #manda mensaje HTML de que está recibido (bastante roñoso el formato)

#No realiza el POST

#Para emplear los datos del formulario está la ventana auth.js 42:39

passport.use('auth', new LocalStrategy({
    usernameField: 'email',#email --> se llama así en el HTML
    passwordField: 'password',
    passReqToCallback: true #Por si hay más datos
}, async (req,email,password, done) => { #done devuelve respuesta al cliente
    const user = new User() 
    user.email = email;
    user.nombre = nombre;
    user.passwrod = passwrod;
    await user.save() // Para guardar en la base de datos de forma sincrona
    done(null,user);
}));

#creamos database y keys para albergar los datos de los usuarios
#ejecuto mongod.exe en C:\Program Files\MongoDB\Server\6.0\bin

#Ponemos en index.js que se requiere la base de datos

npm remove mongoose 
npm install mongoose@5.2.8  #instalamos versión vieja, es más estable

#creamos models, define datos sin saber lo que ocupan ni nada
#Se usa un esquema que maneja los tipos de datos que se guardan para los usuarios
#El mongoose guardará en users los datos que corresponden con el esquema guardado
#Luego debe exportarse el modelo con module.exports

#requerimos el bcrypt para encriptar contraseñas, ver las dos funciones de password de user.js

#En auth guardamos el esquema de los usuarios con User = require(../models/user)

#En auth cogemos los parámetros que devuelve el html y se lo incorporamos al esquema User

#para guardar datos del usuario mientras navega se usa passport, ver 2 funciones de auth

#vamos a index.js para que pida la autenticación en todo momento con el passport 1:11:39
#passport sesión -> se debe declarar la sesión con express sesion

npm i express-session #y luego se require

app.use(session({   //Guarda los datos de sesión
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}))

#En lugar de hacer esto que es bastante roñoso

router.post('/signup', (req, res, next) => {        //SE DICE SI RUTA ES CORREECTA (SI USER EXISTE); CUANDO LE DAMOS AL BOTÓN
    console.log(req.body)        //Aquí se muestran los datos de formulario
    res.send('received')
});

#Lo hacemos con password

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup' 
}));

#creamos vistas de profile en el router, y se crea en views la página del profile




en auth.js -> user.password = user.encryptPassword(password);
para que guarde la contraseña ya encriptada en la bd

Al registrarse un nuevo usuario, comprobar que ese correo no ha sido registrado
en auth.js
const existingUser = User.findOne({email: email});
    if (existingUser) {
        return done(null, false, req.flash('signupMessage', 'Este email ya ha sido registrado')))
    }           (null de que no devuelve error y false de que no devuelve usuario)

Para esto hay que requerir OTRO MODULO: connect-flash, para mostrar mensajes de error en las páginas
en index.js -> const flash = require('connect-flash');
y para usarlo como middleware -> app.use(flash());

Pero ese mensaje de error no lo muestra, simplemente te lleva otra vez a /signup
siguiendo el successRedirect: '/profile',    //Si ok --> a donde te lleva
             failureRedirect: '/signup',

Para que lo muestre hay que hacer que el signupMessage sea accesible desde todo el programa
En index.js ->  app.use((req, res, next) => {
                app.locals.signupMessage = req.flash('signupMessage');
                next();
                });

Y luego en el signup.ejs pones que se muestre el mensaje si signupMessage tiene algún valor:
<% if (signupMessage) { %>    <!-- <% validaciones de ejs %> -->
    <div><%= signupMessage %></div>
<% } %>

Lo que esta en <% %> son validaciones de ejs


Y HALA YA TE PUEDES REGISTRÁRIDES



Ahora pa logearse:

en auth.js, la misma estructura que para hacer signup:
const user = await User.findOne({email: email});
    //Si el usuario existe (buscando por email):
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'El usuario introducido no existe'))
    }
    //Si la contraseña no es correcta:
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Contraseña incorrecta'));
    }
    //Si el usuario es correcto, devuelve el usuario:
    done(null, user);

Pero comprobamos que el correo exista y que las contraseñas coincidan.
Se supone que el comparePassword ya se encargará de encriptar lo que sea
y el serializeUser y deserializeUser de guardar el usuario devuelto en los archivos del navegador

En signin.ejs hay que poner otra vez los mensajes de error:
<% if (signinMessage) { %>    <!-- <% validaciones de ejs %> -->
    <div><%= signinMessage %></div>
<% } %>


Y para que salga el mensaje de error, otra vez en index.js:
app.locals.signinMessage = req.flash('signinMessage');
¿Se podría utilizar el mismo para signinMessage y signupMessage?

Y se supone que ya está


Y ahora hace logout:
Al en /logout haces logout() y cierras sesion (te redirecciona a /):
router.get('/logout', (req, res, nex) => {
    req.logout();
    res.redirect('/');
});


Pero aun asi, puedes acceder a /profile sin haber iniciado sesion
Para comprobar si has iniciado sesion al acceder a profile hay que hacer una funcion en router.js:
function isAuthenticated(re, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

------y la pones en el get de profile:
router.get('/profile', isAuthenticated, (req, res, next) => {
    res.render('profile');
});

-----o si van a ser muchas paginas que necesiten autenticacion, pones esta funcion antes de los get y post:

route.use((req, res, next) => {
    isAuthenticated(req, res, next);
    next();
});

y siempre hara esta funcion antes de acceder a lo que venga despues