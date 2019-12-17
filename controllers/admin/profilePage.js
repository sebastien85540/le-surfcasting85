const User = require('../../database/models/user')

module.exports = async (req, res) => {
    let admins = req.session.userId
    // console.log(admins);
    const title = "page de profile"
    const utilisateur = await User.findById(req.session.userId),
        userAdmin = await User.findById(admins);
    // console.log(userAdmin.accountType);

    if (userAdmin.accountType === 'admin') {
        let admin = true;

        res.render('admins/profilePage', {
            utilisateur,
            admin, title
        })
    } else {
        res.render('admins/profilePage', {
            utilisateur, title
        })
    }

}