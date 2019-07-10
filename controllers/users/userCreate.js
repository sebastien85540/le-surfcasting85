// creer un usager

module.exports = (req, res) => {
    //console.log(req.session.registerError);
    
    res.render("users/register",{
        errors: req.flash('registerError'),
        data : req.flash('data')[0]
    })
}