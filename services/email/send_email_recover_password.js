const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

async function send_email_nodemailer(email, password, name) {
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
    subject: 'Nova senha',
    html: `<h1>Olá, ${name}, </h1><br>
    <h3>Segue abaixo sua nova senha.<br><br>

      Esta senha pode ser alterada assim que realizar login.<br><br>

      Ao efetuar o seu Login você poderá acessar "Perfil", preencha os campos necessários e clique em salvar.<br><br>

      Nova Senha: ${password}<br><br>

      Por gentileza, não responda esta mensagem. Esta caixa de correio é exclusiva para o envio de respostas.<br><br>Caso ainda tenha alguma dúvida, crítica ou sugestão, entre em contato.
      
      <br><br>

      Telefone: (00) 00000-0000<br>
      Email: oneheart@gmail.com
      
      </h2>
      `
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email enviado: ' + info.response);
      // do something useful
    }
  });
}

module.exports = { send_email_nodemailer }