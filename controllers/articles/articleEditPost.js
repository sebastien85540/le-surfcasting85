const article = require('../../database/models/article')
   , path        = require('path')


module.exports =  (req,res) => {

   let query = {_id:req.body.articleId}
   const {image} = req.files
      const uploadFile = path.resolve(__dirname, '..','public/articles',image.name);
      image.mv(uploadFile, (error)=>{
          article.findOneAndUpdate(query, {...req.body, image: `/articles/${image.name}`}, function(error, post){
                  if(error){
                           console.log(error);
                          return;
                  }else{
                          res.redirect('/articles');
                  }
                   });
           })
   }
// async (req, res) => { // post les editions

//    const query        = { _id: req.params.id }

//    ,     { image }  = req.files

//    ,     uploadFile   = path.resolve(__dirname, '../', 'public/articles', image.name);

//    logoApp.mv(uploadFile, (error) => {
//        PostItemApp.findOneAndUpdate(
//            query, {
//             ...req.body,
//              logoActu: `/images/itemsapps/${logoApp.name}` },

//              { useFindAndModify: false },

//                function (error, post) {

//            if (error) {
//                console.log(error);
//                return;
//                res.redirect('/');
//            } else {
//                res.redirect('/app/myapps');
//            }

//        });
//    })

//    console.log('editpost');

// };