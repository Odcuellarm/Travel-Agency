let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer'); //multer allows to read binary-data (this is DATA-type, and not only JSON)
let postsRouter = require('./routes/posts');

mongoose.connect('mongodb://localhost/travels', {userNewUrlParser: true});
app.use(express.json()); //converts the data from Post01 to JSON format
let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),  //Allows the storage of data-type image in images folder, under the same name
    filename: (req, file, cb) => cb(null, file.originalname)
})
app.use(multer({storage: imageStorage}).single('imageFile')); // imageFile is the name given for the key of the POST:body:data-object
app.use(express.static('public'));

app.use('/posts', postsRouter);

app.listen(3000, () => console.log('Bon Voyage!...'))