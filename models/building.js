const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
	url: {
		type: String,
		required: [true, 'Url is required'],
	},
	title: {
		type: String,
		required: [true, 'Prediction is required'],
	},
	description: {
		type: String,
		required: [true, 'Prediction is required'],
	},
	probability: {
		type: String,
		required: [true, 'Probability is required'],
	},
	date: {
		type: String,
		required: [true, 'Prediction is required'],
	},
	publicId: {
		type: String,
		required: [true, 'Prediction is required'],
	},
	lastModified: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Building', buildingSchema);
