import React, { useState } from 'react';
/* import ClassificationProbabilityListItem from '../ClassificationProbability/ClassificationProbabilityListItem'; */
import { Box, Typography } from '@material-ui/core/';
import Radio from '@material-ui/core/Radio';
import useStyles from './useStyles';

const ClassificationProbabilityList = ({ predictions, setDescription }) => {
	const classes = useStyles();

	const [selectedValue, setSelectedValue] = useState('a');

	const handleChange = (e) => {

		switch (e.target.value) {
			case 'a':
				setDescription(predictions[0].className);
				break;
			case 'b':
				setDescription(predictions[1].className);
				break;
			case 'c':
				setDescription(predictions[2].className);
				break;
			default:
				return;
		}

		setSelectedValue(e.target.value);
	};

	return (
		<div className={classes.root}>
			<Box /* className={classes.radioButtonPredictionDataWrapper} */>
				{
					<Radio
						className={classes.radioButton}
						checked={selectedValue === 'a'}
						color="default"
						value={'a'}
						onChange={handleChange}
					/>
				}
				<Box className={classes.predictionData}>
					<Typography>Classification: {predictions[0].className}</Typography>
					<Typography>Probability: {predictions[0].probability * 100}%</Typography>
				</Box>
				{
					<Radio
						className={classes.radioButton}
						checked={selectedValue === 'b'}
						color="default"
						value={'b'}
						onChange={handleChange}
					/>
				}
				<Box className={classes.predictionData}>
					<Typography>Classification: {predictions[1].className}</Typography>
					<Typography>Probability: {predictions[1].probability * 100}%</Typography>
				</Box>
				{
					<Radio
						className={classes.radioButton}
						checked={selectedValue === 'c'}
						color="default"
						value={'c'}
						onChange={handleChange}
					/>
				}
				<Box className={classes.predictionData}>
					<Typography>Classification: {predictions[2].className}</Typography>
					<Typography>Probability: {predictions[2].probability * 100}%</Typography>
				</Box>
			</Box>
		</div>
	);
};

export default ClassificationProbabilityList;
