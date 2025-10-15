const cloudinary = require('../config/Cloudinary');


const streamUpload = (buffer, mimetype) => {
    return new Promise((resolve, reject) => {
        const resourceType = mimetype.startsWith('video') ? 'video' : 'image';
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: resourceType },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
        uploadStream.end(buffer);
    });
};

const uploadToCloudinary = async (fileBuffer, mimetype) => {
    try {
        const result = await streamUpload(fileBuffer, mimetype);
        return {
            url : result.secure_url,
            publicId : result.public_id,
            type : result.resource_type
        }
    } catch (err) {
        console.log(`Error while uploading to cloudinary ${err}`);
        throw new Error(`Error while uploading to cloudinary`);
    }
};


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