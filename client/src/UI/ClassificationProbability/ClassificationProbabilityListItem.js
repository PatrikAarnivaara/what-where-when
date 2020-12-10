import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core/';
import Radio from '@material-ui/core/Radio';
import useStyles from './useStyles';

const ClassificationProbabilityListItem = ({ classification, probability, setDescription }) => {
	const classes = useStyles();

	const [selectedValue, setSelectedValue] = useState();

	const handleChange = (e) => {
		setSelectedValue(e.target.value);
		setDescription(classification);
	};

	return (
		<div>
			<Box className={classes.radioButtonPredictionData}>
				{
					<Radio
						checked={selectedValue === probability}
						color="default"
						onChange={handleChange}
						value={probability}
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
