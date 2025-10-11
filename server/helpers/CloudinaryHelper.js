const cloudinary = require('../config/Cloudinary');


const uploadToCloudinary = async (filepath,mimetype) =>{
    try{
        const resourceType = mimetype.startsWith('video') ? 'video' : 'image';
        const result = await cloudinary.uploader.upload(filepath ,{ resource_type : resourceType });

        //after upload return the url and public id given by cloudinary
        return {
            url : result.secure_url,
            publicId : result.public_id,
            type : resourceType
        }
    }catch(err){
        console.log(`Error while uploading to cloudinary ${err}`);
        throw new Error(`Error while uploading to cloudinary`)
    }
}

const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (err) {
    console.error(`Cloudinary delete error: ${err}`);
    throw new Error('Failed to delete image/video from Cloudinary');
  }
};


module.exports = {
    uploadToCloudinary,
    deleteFromCloudinary
}