// Mot de passe oublié
const User = require('../../database/models/user'),
    mailSender = 'surfcastingdu85@gmail.com',
    mailPassword = require('../../config/mailPassword'),
    nodemailer = require('nodemailer');
    module.exports = (req, res, next) => {
        //    console.log(req.body)
        //    console.log("email : " + req.body.email)
User.findOne({
    email: req.body.email
}, (err, usr) => {
    if (err || !usr) {
        req.flash('error', 'Erreur : Aucun utilisateur n\'a été trouvé pour cette adresse mail')
        res.redirect('/user/create')
    } else {

        async function myCustomMethod(ctx) {
            let cmd = await ctx.sendCommand(
                'AUTH PLAIN ' +
                Buffer.from(
                    '\u0000' + ctx.auth.credentials.user + '\u0000' + ctx.auth.credentials.pass,
                    'utf-8'
                ).toString('base64')
            );

            if (cmd.status < 200 || cmd.status >= 300) {
                throw new Error('Failed to authenticate user: ' + cmd.text);
            }
        }
        const transporter = nodemailer.createTransport({
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
        const lnk = `${User._id}`;

        let mailOptions = {
            from: `"surfcastingdu85@gmail.com"<${mailSender}>`,
               to: req.body.email, // sender address
            // to: user.email, // list of receivers
            subject: "Mot de passe oublié", // Subject line
            text: `Bonjour ${usr.userName} !\n
                Pour réinitialiser votre mot de passe, veuillez cliquer le lien suivant, ou le copier dans la barre d'url de votre navigateur.\n
                localhost:3300/user/password/edit/${usr._id}`, // plain text body
            html: `<h1>Bonjour ${usr.userName} !</h1>
                <p>Pour réinitialiser votre mot de passe, veuillez cliquer le lien suivant, ou le copier dans la barre d\'url de votre navigateur.</p>\
                       <a href="http://localhost:3300/user/password/edit/${usr._id}">localhost:3300/user/password/edit/${usr._id}</a>` // html body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.redirect('/mot-passe-oublie')
            } else {
                console.log('message sent: Votre email a été envoyé');
                res.redirect('/')
            }
        })
    }
})}


// module.exports = (req, res, next) => {
//    console.log(req.body)
//    console.log("email : " + req.body.email)

//    User.findOne({
//        email: req.body.email
//    }).then(user => {
//        if (!user) {
//            return res.redirect('/create')
//        } else {
//            const transporter = nodemailer.createTransport({
//                host: "smtp.gmail.com",
//                port: 465,
//                secure: true, // true for 465, false for other ports
//                auth: {
//                    user: 'surfcastingdu85@gmail.com', // generated ethereal user
//                    pass: mailPassword.MAILPASSWORD, // generated ethereal password

//                },
//                tls: {
//                    rejectUnauthorized: false
//                }
//            })

//             let utilisateur = user._id
//            var mailOptions = {
//                from: `"surfcastingdu85@gmail.com"<${mailSender}>`,
//                to: req.body.email,
//                subject: "Mot de passe oublié", // Subject line
//                 text: `Bonjour !\n
//                 Pour réinitialiser votre mot de passe, veuillez cliquer le lien suivant, ou le copier dans la barre d'url de votre navigateur.\n
//                 le-surfcasting85.reynaud-sebastien.fr/user/password/edit/${utilisateur}`, // plain text body
//                 html: `<h1>Bonjour ${utilisateur.name} !</h1>
//                 <p>Pour réinitialiser votre mot de passe, veuillez cliquer le lien suivant, ou le copier dans la barre d\'url de votre navigateur.</p>\
//                        <a href="https://le-surfcasting85.reynaud-sebastien.fr/user/password/edit/${utilisateur.name}">le-surfcasting85.reynaud-sebastien.fr/user/password/edit/${utilisateur.name}</a>`// html body

//            }

//            console.log(user.id);


//             transporter.sendMail(mailOptions, function (error, info) {
//                 if (!error) {
//                     return res.redirect('/user/password/edit/{{_id}}')
//                 } else {
//                     res.send(error)
//                 }


//             })
//         }
//     })
// }


// const mailSender              = 'surfcastingdu85@gmail.com'
//     , mailReceiver            = 'sebastien.reynaud123@orange.fr'
//     , mailPassword            = require('../../config/mailPassword')
//     , nodemailer              = require('nodemailer');

// module.exports = (req, res) => {
//     console.log(req.body);

//     const output = `
//     <h1>Mot de passe oublié</h1>
//     <h3>Détails</h3>
//     <ul>

//     <li>Email: ${req.body.email}</li>
//     </ul>
//     `;

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true, // true for 465, false for other ports
//         auth: {
//             user: 'surfcastingdu85@gmail.com', // generated ethereal user
//             pass: mailPassword.MAILPASSWORD, // generated ethereal password

//         },
//         tls: {
//             rejectUnauthorized: false
//         }
//     });

//     // send mail with defined transport object
//     let mailOptions = {
//         // marnetto.cloud@gmail.com
//         from: `"Le surfcasting" <${mailSender}>`, // sender address
//         // vic.marnetto@gmail.com
//         to: `${mailReceiver}`, // list of receivers
//         subject: req.select, // Subject line
//         text: "Le surfcasting", // plain text body
//         html: output, // html body
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);

//         }

//         res.redirect('/');

//     })
// }