const express = require('express');
const app = express();



/* ------- CONFIGURACIÓN -------- */

// Ponemos el puerto que nos dará el servidor donde se encuentra alojada la app o el 3000 si no hay
app.set(port,process.env.port || 3000 ) 



/* ------- LANZAR SERVIDOR -------- */
app.listen(app.get('port'), () => {
    console.log('server on port 3000')
})