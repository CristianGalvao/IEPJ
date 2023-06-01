const express = require('express')
const router = express.Router();
const database = require("../../database/database");
const bcrypt = require("bcrypt");


router.get('/user/get_url_photo/:email', (req, res) => {

    let { email } = req.params;
    const sql = `SELECT photo FROM member where email = '${email}';`

    get_url_photo = async function () {
        return new Promise(function (resolve, reject) {
            database.query(
                sql,
                async function (err, rows) {

                    if (rows === undefined || rows == null || rows == '') {
                        res.send(JSON.stringify('user_not_found'));
                    }

                    else {
                        res.send(rows[0])
                    }
                }
            )
        }
        )
    }

    get_url_photo()
        .then(function (results) {
            res.send(results)
            return results
        })
        .catch(function (err) {
            res.send("Promise rejection error: " + err);
        })
});

router.put('/user/update_photo', (req, res) => {

    let { email } = req.body;
    let { photo } = req.body;

    const sql = `UPDATE member SET photo = '${photo}' where email = '${email}';`

    get_photo = async function () {
        return new Promise(function (resolve, reject) {
            database.query(
                sql,
                async function (err, rows) {

                    if (rows === undefined || rows == null || rows == '') {
                        res.send(JSON.stringify('user_not_found'));
                    }

                    else {
                        res.send(JSON.stringify("updated_photo"))
                    }
                }
            )
        }
        )
    }

    get_photo()
        .then(function (results) {
            res.send(results)
            return results
        })
        .catch(function (err) {
            res.send("Promise rejection error: " + err);
        })
});

router.put('/user/update_fields/:email', (req, res) => {

    let { name } = req.body;
    let { whatssap } = req.body;
    let { password } = req.body;
    let { email } = req.params;


    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, function (err, hash) {

            const sql = `update member set name = '${name}', whatssap = '${whatssap}', password = '${hash}'  where email = '${email}';`;

            update_fields_user = async function () {
                return new Promise(function (resolve, reject) {
                    database.query(
                        sql,
                        async function (err, rows) {
                            if (rows === undefined) {
                                reject(new Error("Error rows is undefined"));
                            } else {
                                console.log(rows)
                                resolve(rows);
                            }
                        }
                    )
                }
                )
            }

            update_fields_user()
                .then(function (results) {
                    res.send(JSON.stringify("updated_fields"))
                })
                .catch(function (err) {
                    res.send("Promise rejection error: " + err);
                })

        })
    })


});

module.exports = router;