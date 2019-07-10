const Edit = require ("../../database/models/article");

module.exports = async (req,res) => {

  const article = await Edit.findById(req.params.id)

  res.render ('articles/articleEdit', {article}) 
};
// const Edit = require('../database/models/article')// editer les posts

// module.exports = async (req, res) => {
//     const articleEdit = await Edit.findById(req.params.id)


//     if (req.session.userId) {
//         console.log('edit');
//         console.log(articleEdit.title);
        
//         return res.render('articleEdit', {articleEdit})
//     }

    // res.render ('article-edit', {article})
    // const article = await Edit.findById(req.params.id)

    // const { image } = req.files.id
    // const uploadFile = path.resolve(__dirname, '..', 'public/articles', image.name);
    // image.mv(uploadFile, (error) => {
    //     post.create({
    //         ...req.body.id,
    //         image: `/articles/${image.name}`
    //     },
    //         (error, post) => {
    //             res.redirect("/articles")
    //         })
    //     // console.log(req.body);
    //             res.render ('articleEdit', {article})
    // })



