const Record = require('../models/record');
const { cloudinary } = require('../utils/cloudinary');

module.exports = (app) => {
	app.get('/api/records', async (req, res) => {
		const records = await Record.find({});
		res.send(records);
	});

	app.get('/api/records/:id', async (req, res) => {
		const record = await Record.findOne({ _id: req.params.id });
		if (!record) {
			res.status(404).json('No result found');
		} else {
			res.send(record);
		}
	});

	app.post('/api/records', async (req, res) => {
		try {
			let record = new Record({
				url: req.body.url,
				title: req.body.title,
				classification: req.body.classification,
				probability: req.body.probability,
				date: req.body.date,
				publicId: req.body.publicId,
				lastModified: req.body.date,
				latitude: req.body.latitude,
				longitude: req.body.longitude,
			});
			await record.save();
			res.status(200).send('POST complete');
		} catch (err) {
			console.error(err);
			res.status(500).json({ err: 'Something went wrong' });
		}
	});

	app.patch('/api/records/:id', async (req, res) => {
		try {
			await Record.updateOne(
				{ _id: req.params.id },
				{ $set: { title: req.body.title }, $currentDate: { lastModified: true } }
			);
			res.send('Record updated.');
		} catch (error) {
			console.log(error)
		}
	});

	app.delete('/api/records/:id', async (req, res) => {
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
};
