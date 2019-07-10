

module.exports = (req, res, next) => {
    if (!req.files) {
        return res.redirect('/articles')
    }
    // console.log("je suis le middleware");
    next()
}