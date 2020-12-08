import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core/';
import Radio from '@material-ui/core/Radio';
import useStyles from './useStyles';



const ClassificationProbabilityListItem = ({ classification, probability, setDescription }) => {
	const classes = useStyles();

	const [selectedValue, setSelectedValue] = useState(probability);

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
		setDescription(classification);
	};

	return (
		<div>
			<Box className={classes.checkBoxPredictionWrapper}>
				<Radio checked={selectedValue === probability} color="default" onChange={handleChange} value={probability} />
				<Box className={classes.text}>
					<Typography>Classification: {classification}</Typography>
					<Typography>Probability: {probability * 100}%</Typography>
				</Box>
			</Box>
		</div>
	);
};

export default ClassificationProbabilityListItem;
