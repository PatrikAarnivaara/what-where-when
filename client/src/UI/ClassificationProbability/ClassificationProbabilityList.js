import React, { useState } from 'react';
/* import ClassificationProbabilityListItem from '../ClassificationProbability/ClassificationProbabilityListItem'; */
import { Box, Typography } from '@material-ui/core/';
import Radio from '@material-ui/core/Radio';
import useStyles from './useStyles';

const ClassificationProbabilityList = ({ records, setClassification, setProbability }) => {
	const classes = useStyles();

	/* Set highest probability as default */
	const [selectedValue, setSelectedValue] = useState();
	/* Change to dynamic radio buttons */
	const handleChange = (e) => {
		setSelectedValue(e.target.value);
		switch (e.target.value) {
			case 'a':
				setClassification(records[0].className);
				setProbability(records[0].probability);
				break;
			case 'b':
				setClassification(records[1].className);
				setProbability(records[1].probability);
				break;
			case 'c':
				setClassification(records[2].className);
				setProbability(records[2].probability);
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
					<Typography>Classification: {records[0].className}</Typography>
					<Typography>Probability: {records[0].probability * 100}%</Typography>
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
					<Typography>Classification: {records[1].className}</Typography>
					<Typography>Probability: {records[1].probability * 100}%</Typography>
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
					<Typography>Classification: {records[2].className}</Typography>
					<Typography>Probability: {records[2].probability * 100}%</Typography>
				</Box>
			</Box>
		</div>
	);
};

export default ClassificationProbabilityList;
