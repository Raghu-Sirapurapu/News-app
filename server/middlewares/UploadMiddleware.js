const multer = require('multer');
const path = require('path');


//storage image locally first
const storage = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null,'uploads/')
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname));
    }
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype.startsWith('image') || file.mimetype.startsWith('video')){
        cb(null,true)
    } else {
        cb(new Error('Not an image or video! Please upload only images/videos.'));
    }
}


const upload = multer({
    storage,
    fileFilter,
    limits : { fileSize : 50 * 1024 * 1024 }
});


module.exports = upload;