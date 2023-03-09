const express = require('express');

//Instanciando o express
const app = express();

const database = require('./database/database');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const regiser_controller = require("./controller/register_controller")
app.use('/', regiser_controller)

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log('Servidor rodando' + port);
});
