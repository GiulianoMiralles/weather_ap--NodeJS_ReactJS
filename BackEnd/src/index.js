const express = require('express');
const app = express();
const morgan = require('morgan');

// Settings
app.set('port', process.env.PORT || 3000);              // - This is in case I have this active port in the cloud I take that same one, in addition to setting the port

// Middlewares
app.use(morgan('dev'));                                 // - It allows me to see the request and the response time of the user
app.use(express.urlencoded({ extended: false }));       // - This allows my server to read data from a form
app.use(express.json());                                // - This allows my server to understand JSON formats

// Routes
app.use('/api/v1', require('./routes/v1'));             // Main path of user data (Api Telecom)
app.use('/api/location', require('./routes/location')); // Route of current location of the user (Weather API)
app.use('/api/current', require('./routes/current'));   // Route of current location of the user, temperature and weather status (Weather API)
app.use('/api/forecast', require('./routes/forecast')); // Route of current location of the user, temperature and weather status at 5 days (Weather Api)


// Starting server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});