const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(cors());

// set up rate limiter: maximum of five requests per minute
const RateLimit = require('express-rate-limit');
const limiter = new RateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 25,
});

// apply rate limiter to all requests
app.use(limiter);

/* routes */
require('./routes/record')(app);
require('./routes/cloudinary')(app);
require('./routes/tensor_flow')(app);

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});
