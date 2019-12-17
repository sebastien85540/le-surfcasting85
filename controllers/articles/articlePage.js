// page d'articles regroupés

const post = require('../../database/models/article')
const User= require('../../database/models/user')


module.exports = async (req, res) => {
    const title = "page des l'articles"
    const utilisateur = await User.findById(req.session.userId)
    const posts = await post.find({}).sort({_id:-1}).limit(6)
    // console.log(posts);
    // console.log(req.session);
    
    res.render("articles/articlesPage",
        { posts,utilisateur, title}
    )
}
// const post = require('../database/models/article')

// const path = require('path')
// module.exports = (req, res) => {
//     // console.log(req.files);
//     const { image } = req.files
//     const uploadFile = path.resolve(__dirname, '..', 'public/articles', image.name);
//     image.mv(uploadFile, (error) => {
//         post.create({
//             ...req.body,
//             image: `/articles/${image.name}`
//         },
//             (error, post) => {
//                 res.redirect("/")
//             })
//         // console.log(req.body);

//     })

// }







