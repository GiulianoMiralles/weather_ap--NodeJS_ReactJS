const express = require('express');
const app = express();
const morgan = require('morgan');

// Settings
app.set('port', process.env.PORT || 3000);      //- Esto es por si tengo esto puerto activo en la nube me tome ese mismo, ademas de setear el puerto

// Middlewares
app.use(morgan('dev'));                         //- Me permite ver la peticion y el tiempo de respuesta del usuario
app.use(express.urlencoded({ extended: false })); //- Esto permite a mi servidor leer datos de un formualario
app.use(express.json());                        //- Esto le permite a mi servidor entender los formatos JSON

// Routes
app.use('/api/v1', require('./routes/v1'));
app.use('/api/location', require('./routes/location'));
app.use('/api/current', require('./routes/current'));
app.use('/api/forecast', require('./routes/forecast'));


// Starting server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});