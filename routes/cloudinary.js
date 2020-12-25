const { cloudinary } = require('../utils/cloudinary');
const http = require('http');
const fs = require('fs');

module.exports = (app) => {
	app.post('/api/cloudinary', async (req, res, next) => {
		/* Uploads file to Cloudinary, returns url that updates image.jpg locally. */
		try {
			const fileStr = req.body.image;
			const uploadResponse = await cloudinary.uploader.upload(fileStr, {
				upload_preset: 'ml_default',
			});

			let urlFromCloudinary = uploadResponse.url;

			const file = fs.createWriteStream('image.jpg');

			const request = http.get(urlFromCloudinary, function (response) {
				response.pipe(file);
			});
			const url = { url: urlFromCloudinary, publicId: uploadResponse.public_id };
			res.json(url);
		} catch (error) {
			next(error.message);
		}
	});
};
