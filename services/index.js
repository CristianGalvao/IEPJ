const express = require('express');
//Instanciando o express
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const email = require("./email/send_email")

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const database = require("./database/database");

const create_user = require("./controller/user_controller/create_user_controller")
app.use('/', create_user);

const login_user = require("./controller/user_controller/login_user_controller")
app.use('/', login_user);

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log('Servidor rodando' + port);
});
