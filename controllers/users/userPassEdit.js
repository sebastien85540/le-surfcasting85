module.exports = (req, res) => {
    const title = "page d'édition de mot de passe"
    res.render('admins/users/userEditPass',{title})
}