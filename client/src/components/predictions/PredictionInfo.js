import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@material-ui/core/';
import DeleteButton from '../../UI/DeleteButton';
import EditButton from '../../UI/EditButton';
import { Image } from 'cloudinary-react';
import useStyles from './useStyles';

const PredictionInfo = (props) => {
	const classes = useStyles();
	const [prediction, setPrediction] = useState({});

	useEffect(
		function () {
			async function getPrediction() {
				try {
					const response = await axios.get(`/api/predictions/${props.match.params._id}`);
					setPrediction(response.data);
				} catch (error) {
					console.log('error', error);
				}
			}
			getPrediction();
		},
		[props]
	);

	return (
		<div className={classes.infoWrapper}>
			<div className={classes.infoContentWrapper}>
				<Image
					cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
					publicId={prediction.url}
					width="300"
					crop="scale"
					quality="auto"
				/>
				<Typography>User: {prediction.title}</Typography>
				<Typography>TensorFlow: {prediction.classification}</Typography>
				<Typography>Probability: {prediction.probability * 100}%</Typography>
				<Typography className={classes.date}>Date: {prediction.date}</Typography>
				<div className={classes.infoButtonWrapper}>
					<DeleteButton {...props} />
					<EditButton id={prediction._id} />
				</div>
			</div>
		</div>
	);
};

export default PredictionInfo;
