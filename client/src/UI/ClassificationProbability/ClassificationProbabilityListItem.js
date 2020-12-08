import React from 'react';
import { Typography } from '@material-ui/core/';

const ClassificationProbabilityListItem = ({ classification, probability }) => {
	return (
		<div>
			<Typography>Classification: {classification}</Typography>
			<Typography>Probability: {probability * 100/10}%</Typography>
		</div>
	);
};

export default ClassificationProbabilityListItem;
