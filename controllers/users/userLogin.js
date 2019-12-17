// page de connection

module.exports = (req, res) => {
    const title = "page de connexion"
    res.render('users/login',{
        errors: req.flash('registerError'),
        data : req.flash('data')[0],
        title
    })
}