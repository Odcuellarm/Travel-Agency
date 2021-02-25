let Post = require('../models/posts').Post;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();
let path = require('path'); //to parse the \ from the image URL 


router.get('/', async (req, resp) => {
    //get all the posts from the DB
    let posts = await Post.find();
    //send the response to Client
    resp.send(posts);
})
 
router.post('/', async (req, resp) => {
    let reqBody = req.body;
    let imgPath;
    if(reqBody.imageURL){
        imgPath = reqBody.imageURL;
    }else{
        imgPath = req.file.path.substring(req.file.path.indexOf(path.sep), req.file.path.length);
    }

    let newPost = new Post({
        id: uniqid(),
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageURL: imgPath
    })
 
    await newPost.save();
    resp.send('Created');
})

router.delete('/:id', async (req, resp) => {
    let id = req.params.id;
    await Post.deleteOne({id: id});
    resp.send('Deleted!');
});

module.exports = router;