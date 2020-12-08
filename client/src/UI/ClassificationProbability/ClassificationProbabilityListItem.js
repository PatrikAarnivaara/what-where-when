import React from 'react';
import { Typography } from '@material-ui/core/';
import useStyles from './useStyles';

const ClassificationProbabilityListItem = ({ classification, probability }) => {
	const classes = useStyles();
	return (
		<div className={classes.text}>
			<Typography>Classification: {classification}</Typography>
			<Typography>Probability: {probability * 100}%</Typography>
		</div>
	);
};

export default ClassificationProbabilityListItem;
