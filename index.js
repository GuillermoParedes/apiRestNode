'use strict'; 

const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');

mongoose.connect(config.db, (err, res) => {
    if (err) {
        return console.log('Conexion a la base de datos establecida....')
    }
    app.listen(config.port, () => {
        console.log(`Escuchando en el puerto ${config.port}`)
    });
})
