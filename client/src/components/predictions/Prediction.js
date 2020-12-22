import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PredictionList from './PredictionList';
import PredictionListItemDetail from './PredictionListItemDetail';
import useStyles from './useStyles';

const Prediction = () => {
	const classes = useStyles();
	const [predictions, setPredictions] = useState([]);

	const [predictionDetailData, setPredictionDetailData] = useState({
		_id: '',
		url: '',
		title: '',
		classification: '',
		probability: '',
		date: '',
	});

	const showPredictionDetail = (id, url, title, classification, probability, date) => {
		setPredictionDetailData({
			...predictionDetailData,
			_id: id,
			url: url,
			title: title,
			classification: classification,
			probability: probability,
			date: date,
		});
	};

	useEffect(() => {
		const getPredictions = async () => {
			try {
				const response = await axios.get('/api/predictions');
				setPredictions(response.data);
			} catch (error) {
				console.log('error', error);
			}
		};
		getPredictions();
	}, []);

	return (
		<div className={classes.predictionWrapper}>
			<PredictionList predictions={predictions} showPredictionDetail={showPredictionDetail} />
			{<PredictionListItemDetail predictionDetailData={predictionDetailData} />}
		</div>
	);
};

export default Prediction;
