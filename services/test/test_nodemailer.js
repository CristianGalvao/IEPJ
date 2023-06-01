const nodemailer = require('nodemailer');

function sendEmail(email, token) {
 
    var email = email;
    var token = token;
 
    console.log(token)
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '',
          pass: ''
        }
    });
    
 
    const mailOptions = {
        from: '',
        to: '',
        subject: 'Subject',
        text: 'Email content'
      };

    mail.sendMail(mailOptions, function(error, info) {
        if (error) {
            return 1
        } else {
            return 0
        }
    });
}

sendEmail()