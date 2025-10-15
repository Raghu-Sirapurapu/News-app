const multer = require('multer')

const fileFilter = (req,file,cb) => {
    if(file.mimetype.startsWith('image') || file.mimetype.startsWith('video')){
        cb(null,true)
    } else {
        cb(new Error('Not an image or video! Please upload only images/videos.'));
    }
}

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    fileFilter,
    limits : { fileSize : 50 * 1024 * 1024 }
});


module.exports = upload;