import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core/';
import Radio from '@material-ui/core/Radio';
import useStyles from './useStyles';

const ClassificationProbabilityListItem = ({ classification, probability, setClassification, test }) => {
	const classes = useStyles();
	const [selectedValue, setSelectedValue] = useState();

	const handleChange = (e) => {
		console.log(test.toString());
		setSelectedValue(e.target.value);
		setClassification(classification);
	};

	return (
		<div>
			<Box className={classes.radioButtonPredictionDataWrapper}>
				{
					<Radio
						className={classes.radioButton}
						checked={selectedValue === test.toString()}
						color="default"
						value={test.toString()}
						onChange={handleChange}
					/>
				}
				<Box className={classes.predictionData}>
					<Typography>Classification: {classification}</Typography>
					<Typography>Probability: {probability * 100}%</Typography>
				</Box>
			</Box>
		</div>
	);
};

export default ClassificationProbabilityListItem;
