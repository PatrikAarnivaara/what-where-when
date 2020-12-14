const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { cloudinary } = require('./utils/cloudinary');
const cors = require('cors');
const bodyParser = require('body-parser');
const Building = require('./models/building');

/* TODO: move all routes to separate files in routes folder and
simplify req/res call to endpoint with cleaner async/await syntax */

//TensorFlow.js is an open-source hardware-accelerated JavaScript library
//for training and deploying machine learning models.
const tf = require('@tensorflow/tfjs');

//MobileNet : pre-trained model for TensorFlow.js
const mobilenet = require('@tensorflow-models/mobilenet');

//The module provides native TensorFlow execution
//in backend JavaScript applications under the Node.js runtime.
const tfnode = require('@tensorflow/tfjs-node');

//The fs module provides an API for interacting with the file system.
const fs = require('fs');
const http = require('http');

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(cors());

/* Is body parser necessary? */
app.use(bodyParser.json());

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
			//reads the entire contents of a file.
			//readFileSync() is synchronous and blocks execution until finished.
			const imageBuffer = fs.readFileSync(path);
			//Given the encoded bytes of an image,
			//it returns a 3D or 4D tensor of the decoded image. Supports BMP, GIF, JPEG and PNG formats.
			const tfimage = tfnode.node.decodeImage(imageBuffer);
			return tfimage;
		};

		const imageClassification = async (path) => {
			const image = readImage(path);
			// Load the model.
			const mobilenetModel = await mobilenet.load();
			// Classify the image.
			const predictions = await mobilenetModel.classify(image);
			console.log('Classification Results:', predictions);
			res.json(predictions);
		};

		imageClassification(req.body.file);
	} catch (error) {
		next(error.message);
	}
});

app.get('/api/predictions', function (req, res) {
	/* error handling */
	Building.find(function (err, buildings) {
		res.json(buildings);
	});
});

app.get('/api/predictions/:id', function (req, res) {
	Building.findById(req.params.id, function (err, building) {
		if (!building) {
			res.status(404).send('No result found');
		} else {
			res.json(building);
		}
	});
});

app.post('/api/upload', async (req, res) => {
	try {
		const fileStr = req.body.file;
		const uploadResponse = await cloudinary.uploader.upload(fileStr, {
			upload_preset: 'ml_default',
		});
		/* res.json({ msg: "HI CLOUDINARY!" }); */

		let building = new Building({
			url: uploadResponse.url,
			title: req.body.title,
			description: req.body.description,
			probability: req.body.probability,
			date: req.body.date,
			publicId: uploadResponse.public_id,
		});

		building
			.save()
			.then((building) => {
				res.send(building);
			})
			.catch(function (err) {
				res.status(422).send('Building add failed');
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: 'Something went wrong' });
	}
});

app.patch('/api/edit/:id', async (req, res, next) => {
	try {
		await Building.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
		res.send(console.log('Prediction updated.'));
	} catch (error) {
		next(error.message);
	}
});

app.delete('/api/predictions/:id', function (req, res) {
	Building.findById(req.params.id, function (err, building) {
		if (!building) {
			res.status(404).send('Building not found');
		} else {
			cloudinary.uploader.destroy(building.publicId);
			Building.findByIdAndRemove(req.params.id)
				.then(function () {
					res.status(200).json('Building deleted');
				})
				.catch(function (err) {
					res.status(400).send('Building delete failed.');
				});
		}
	});
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});
