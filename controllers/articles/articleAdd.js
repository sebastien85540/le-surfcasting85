module.exports = (req, res) => { // ajout d'articles
    if (req.session.userId) {
        return res.render("articles/add")
    }
    res.redirect("/users/login")
}