const router = require('express').Router()
const nodemailer = require('nodemailer')

router.post('/mail', (req, res) => {
    const salida = `
        <h3>Mensaje</h3>
        <p>titulo: ${req.body.titulo}</p>
        <p>mensaje: ${req.body.mensaje}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Hotmail',
       //host: '127.0.0.1',
       //port: 587,
       secure: false, // true for 465, false for other ports
       auth: {
           user: 'leandro-aranguez@hotmail.com', // generated ethereal user
           pass: '19octu' // generated ethereal password
       },
       tls: {
           rejectUnauthorized: false
       }
    });

    // setup email data with unicode symbols
    let mailOptions = {
       from: 'nodemailer app: ' + '<' + req.body.mail + '>', // sender address
       to: 'leandro-aranguez@hotmail.com', // list of receivers
       subject: 'Hello ✔', // Subject line
       text: 'Hello world?', // plain text body
       html: salida // html body
   };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
       if (error) {
           return console.log(error);
       }
       console.log('Message sent: %s', info.messageId);
       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

       res.redirect('/')
    });
})

module.exports = router
