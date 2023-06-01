const express = require('express')
const router = express.Router();
const database = require("../../database/database");
const send_email = require("../../email/send_email_recover_password");
const generatePassword = require('generate-password');
const bcrypt = require("bcrypt");

router.put("/user/reset_password", async (req, res) => {

    // PEGAR O EMAIL QUE O USUARIO DIGITOU
    let { email } = req.body;

    //FAZER UMA CONSULTA COM OS DADOS DO USUARIO
    const sql = `SELECT * FROM member WHERE email = '${email}';`;

    get_data_user = async function () {
        return new Promise(function (resolve, reject) {
            database.query(
                sql,
                async function (err, rows) {

                    if (rows === undefined || rows == null || rows == '') {
                        res.send(JSON.stringify('user_not_found'));
                    }
                    else {

                        const password = generatePassword.generate({
                            length: 10,
                            numbers: true
                        })

                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(password, salt, function (err, hash) {

                                const email = rows[0].email;
                                const name = rows[0].name;
                                const id = rows[0].id;

                                const sql_update = `UPDATE member SET password = '${hash}' WHERE id = ${id}`
                                
                                database.query(
                                    sql_update,
                                    async function (err, rows) {

                                        if (rows === undefined || rows == null || rows == '') {
                                            res.send(JSON.stringify('error-update'));
                                        }else{
                                            send_email.send_email_nodemailer(email, password, name)
                                            res.send(JSON.stringify("password_updated"));
                                        }

                                    });

                            }
                        )})
                    }
                }
            )
        }
        )
    }

    get_data_user()
        .then(function (results) {
            res.send(results)
            return results
        })
        .catch(function (err) {
            res.send("Promise rejection error: " + err);
        })
});


module.exports = router