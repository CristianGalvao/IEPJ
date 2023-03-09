const database = require('../database/database')
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/register_user', (req, res)=>{
    
    let {name} = req.body;
    let {email} = req.body;
    let {password} = req.body;
    let {cpf} = req.body;
    let {whatssap} = req.body;

    const sql = `INSERT INTO members_iepj (name, email, password, cpf, whatssap) VALUES ("${name}", "${email}", "${password}", "${cpf}", "${whatssap}")`

    database.query(sql, function (error, results, fields) {
        if (error){
            console.log(error)
            res.send(error)
        }else{
            res.send("Dados inseridos com sucesso")
        }
      });
});

module.exports = router