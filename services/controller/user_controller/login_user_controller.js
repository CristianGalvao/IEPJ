const express = require('express')
const router = express.Router();
const database = require("../../database/database");
const bcrypt = require("bcrypt");

router.get("/user/get_data_user/:email", (req, res) => {

    let {email} = req.params;

    const sql = `SELECT * FROM member WHERE email = '${email}';`
    
    get_data_user = async function () {
        return new Promise(function (resolve, reject) {
            database.query(
                sql,
                async function (err, rows) {

                    if (rows === undefined || rows == null || rows == '') {
                        res.send(JSON.stringify('user_not_found'));
                    }

                    else {
                        resolve(rows[0])
                    }
                }
            )
        }
        )
    }

    get_data_user()
        .then(function (results) {
            res.send(JSON.stringify(results))
        })
        .catch(function (err) {
            res.send("Promise rejection error: " + err);
        });

})

// VERIFICAR STATUS SE ESTÁ VERIFICADO O EMAIL 
router.post('/user/login', async (req, res) => {
    let { email } = req.body;
    let { password } = req.body;

    const sql = `SELECT * FROM member WHERE email = '${email}';`;

    get_login = async function () {
        return new Promise(function (resolve, reject) {
            database.query(
                sql,
                async function (err, rows) {

                    if (rows === undefined || rows == null || rows == '') {
                        res.send(JSON.stringify('user_not_found'));
                    }

                    else {
                        const user = rows[0]
                        if (user.status == false) {
                            res.send(JSON.stringify('verify_email'));
                        } else {
                            if (bcrypt.compareSync(password, user.password)) {
                                res.send(JSON.stringify(rows[0]));
                                return;
                            }else{
                                res.send(JSON.stringify("error_login"));
                            }
                        }
                    }
                }
            )
        }
        )
    }

    get_login()
        .then(function (results) {
            res.send(results)
            return results
        })
        .catch(function (err) {
            res.send("Promise rejection error: " + err);
        });

})

module.exports = router;