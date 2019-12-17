const mailSender              = 'surfcastingdu85@gmail.com'
    , mailReceiver            = 'sebastien.reynaud123@orange.fr'
    , mailPassword            = require('../../config/mailPassword')
    , nodemailer              = require('nodemailer');

module.exports = (req, res) => {
    console.log(req.body);
    
    const output = `
    <h1>Nouvelle requète de contact</h1>
    <h3>Détails</h3>
    <ul>
    <li>Nom: ${req.body.name}</li>
    <li>Prénom: ${req.body.surname}</li>
    <li>Email: ${req.body.email}</li>
    <li>Objet: ${req.body.select}</li>
    </ul>
    <h3>Message: </h3>
    <p>${req.body.message}</p>
    `;
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'surfcastingdu85@gmail.com', // generated ethereal user
            pass: mailPassword.MAILPASSWORD, // generated ethereal password
            
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
    // send mail with defined transport object
    let mailOptions = {
        // Le surfcasting
        from: `"Le surfcasting" <${mailSender}>`, // sender address
        to: `${mailReceiver}`, // list of receivers
        subject: req.select, // Subject line
        text: "Le surfcasting", // plain text body
        html: output, // html body
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
            
        }
        
        res.redirect('/');
        
    })
}