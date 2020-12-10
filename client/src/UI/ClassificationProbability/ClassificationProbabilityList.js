import React from 'react';
import ClassificationProbabilityListItem from '../ClassificationProbability/ClassificationProbabilityListItem';
import useStyles from './useStyles';

const ClassificationProbabilityList = ({ predictions, setDescription }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			{predictions.map((prediction, index) => (
				<ClassificationProbabilityListItem
					key={index}
					classification={prediction.className}
					probability={prediction.probability}
					setDescription={setDescription}
				/>
			))}
		</div>
	);
};

export default ClassificationProbabilityList;
