const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

async function send_email_nodemailer(email, name, token){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER,
          pass: process.env.PASS
        }
      });
      
      const mailOptions = {
        from: process.env.USER,
        to: email,
        subject: 'Confirme seu e-mail',
        html: `<h1>Olá ${name}</h1><br>
        Confirme seu e-mail ${process.env.BASE_URL}/verify_user/${token}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
       console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
          // do something useful
        }
      });
}

module.exports = {send_email_nodemailer}