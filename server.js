const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { cloudinary } = require('./utils/cloudinary');
const cors = require('cors');
/* const bodyParser = require('body-parser'); */
const Record = require('./models/record');
const tfnode = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');
const fs = require('fs');
const http = require('http');
const sanitize = require('sanitize-filename');

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(cors());

/* Is body parser necessary? */
/* app.use(bodyParser.json()); */

// set up rate limiter: maximum of five requests per minute
const RateLimit = require('express-rate-limit');
const limiter = new RateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 25,
});

// apply rate limiter to all requests
app.use(limiter);

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
	console.log('Connected to the Database.');
});
mongoose.connection.on('error', (err) => {
	console.log('Mongoose Connection Error : ' + err);
});

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
			const predictions = await mobilenetModel.classify(image);
			console.log('Classification Results:', predictions);
			res.json(predictions);
		};
		// Sanitize the string to be safe for use as a filename.
		let fileName = sanitize(req.body.file);
		imageClassification(fileName);
	} catch (error) {
		next(error.message);
	}
});

app.get('/api/predictions', async (req, res) => {
	const records = await Record.find({});
	res.send(records);
});

app.get('/api/predictions/:id', async (req, res) => {
	const record = await Record.findOne({ _id: req.params.id });
	if (!record) {
		res.status(404).json('No result found');
	} else {
		res.send(record);
	}
});

app.post('/api/upload', async (req, res) => {
	console.log(req.body);
	try {
		let record = new Record({
			url: req.body.url,
			title: req.body.title,
			classification: req.body.classification,
			probability: req.body.probability,
			date: req.body.date,
			publicId: req.body.publicId,
			lastModified: req.body.date,
		});
		await record.save();
		res.status(200).send('POST complete');
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: 'Something went wrong' });
	}
});

app.patch('/api/edit/:id', async (req, res) => {
	try {
		console.log(req.body);
		await Record.updateOne(
			{ _id: req.params.id },
			{ $set: { title: req.body.title }, $currentDate: { lastModified: true } }
		);
		res.send(console.log('Record updated.'));
	} catch (error) {
		res.status(500).send(err);
	}
});

app.delete('/api/predictions/:id', async (req, res) => {
	const record = await Record.findOne({ _id: req.params.id });
	if (record) {
		await cloudinary.uploader.destroy(record.publicId);
		const recordDeleted = await Record.deleteOne({ _id: req.params.id });
		if (recordDeleted.deletedCount === 1) {
			res.send('Record deleted');
		}
	} else {
		res.send('Record delete failed.');
	}
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});
