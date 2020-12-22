import React, { useState } from 'react';
/* import ClassificationProbabilityListItem from '../ClassificationProbability/ClassificationProbabilityListItem'; */
import { Box, Typography } from '@material-ui/core/';
import Radio from '@material-ui/core/Radio';
import useStyles from './useStyles';

const ClassificationProbabilityList = ({ predictions, setClassification, setProbability }) => {
	const classes = useStyles();

	/* Set highest probability as default */
	const [selectedValue, setSelectedValue] = useState();
	/* Change to dynamic radio buttons */
	const handleChange = (e) => {
		setSelectedValue(e.target.value);
		switch (e.target.value) {
			case 'a':
				setClassification(predictions[0].className);
				setProbability(predictions[0].probability);
				break;
			case 'b':
				setClassification(predictions[1].className);
				setProbability(predictions[1].probability);
				break;
			case 'c':
				setClassification(predictions[2].className);
				setProbability(predictions[2].probability);
				break;
			default:
				return;
		}
	};

	return (
		<div className={classes.root}>
			<Box className={classes.radioButtonPredictionDataWrapper}>
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
			</Box>
			<Box className={classes.radioButtonPredictionDataWrapper}>
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
			</Box>
			<Box className={classes.radioButtonPredictionDataWrapper}>
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
