const tfnode = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');
const fs = require('fs');
const sanitize = require('sanitize-filename');

module.exports = (app) => {
	app.post('/api/tensorflow', async (req, res, next) => {
		try {
			const readImage = (path) => {
				const imageBuffer = fs.readFileSync(path);
				const tfimage = tfnode.node.decodeImage(imageBuffer);
				return tfimage;
			};

			const imageClassification = async (path) => {
				const image = readImage(path);
				const mobilenetModel = await mobilenet.load();
				const records = await mobilenetModel.classify(image);
				console.log('Classification Results:', records);
				res.json(records);
			};
			// Sanitize the string to be safe for use as a filename.
			let fileName = sanitize(req.body.file);
			imageClassification(fileName);
		} catch (error) {
			next(error.message);
		}
	});
};
