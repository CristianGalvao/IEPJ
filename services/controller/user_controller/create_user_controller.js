const express = require('express')
const router = express.Router();
const database = require("../../database/database");
const send_email_user = require("../../email/send_email");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

router.post('/user/create_user', async (req, res) => {

  let { email } = req.body;
  let { name } = req.body;
  let { password } = req.body;
  let { cpf } = req.body;
  let { whatssap } = req.body;
  let { photo } = req.body;
  let { login_by } = req.body;
  let {status} = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, function (err, hash) {

      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      console.log(token)

      const sql = `INSERT INTO member (name, email, password, cpf, whatssap, status,token, photo, login_by) VALUES ("${name}", "${email}", "${hash}", "${cpf}", "${whatssap}", ${status}, "${token}", "${photo}", "${login_by}");`

      try {
        database.query(sql, function (err, result) {
          if (result)
            res.send(JSON.stringify('cadastrado'))
          if (login_by == 'Google') {

          } else {
            send_email_user.send_email_nodemailer(email, name, token)
          }
        })
      } catch (err) {
        res.send(err)
      }
    });
  });
});



router.get("/verify_user/:token", async (req, res) => {

  let {token} = req.params;
  const sql = `UPDATE member SET status = true WHERE token = "${token}";`;

  get_token = async function () {
    return new Promise(function (resolve, reject) {
      database.query(
        sql,
        async function (err, rows) {
          if (rows === undefined) {
            reject(new Error("Error rows is undefined"));
          } else {
            resolve(rows);
          }
        }
      )
    }
    )
  }

  get_token()
    .then(function (results) {
      res.send("Obrigado por confirmar o e-mail")
      return results
    })
    .catch(function (err) {
      res.send("Promise rejection error: " + err);
    })
});

module.exports = router