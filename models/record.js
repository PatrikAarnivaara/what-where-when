const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
	url: {
		type: String,
		required: [true, 'Url is required'],
	},
	title: {
		type: String,
		required: [true, 'Title is required'],
	},
	classification: {
		type: String,
		required: [true, 'Classification is required'],
	},
	probability: {
		type: String,
		required: [true, 'Probability is required'],
	},
	date: {
		type: String,
		required: [true, 'Date is required'],
	},
	publicId: {
		type: String,
		required: [true, 'Public Id is required'],
	},
	lastModified: {
		type: String,
		required: true,
	},
	latitude: {
		type: Number,
		required: true,
	},
	longitude: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('Record', recordSchema);
