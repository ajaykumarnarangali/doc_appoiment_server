const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.cloudImageUpload = (imageBuffer) => {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: process.env.CLOUDINARY_FOLDER_NAME,
            },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        streamifier.createReadStream(imageBuffer).pipe(stream);
    })
}

exports.deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log('Deleted:', result);
    } catch (error) {
        console.error('Error deleting image:', error);
    }
};