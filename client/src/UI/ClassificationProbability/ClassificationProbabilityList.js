import React from 'react';
import ClassificationProbabilityListItem from '../ClassificationProbability/ClassificationProbabilityListItem';
import useStyles from './useStyles';

const ClassificationProbabilityList = ({ predictions, setDescription }) => {
	const classes = useStyles();
	console.log(predictions[0])
	
	return (
		<div className={classes.root}>
			{predictions.map((prediction, index) => (
				<ClassificationProbabilityListItem
					key={index}
					test={index}
					classification={prediction.className}
					probability={prediction.probability}
					setDescription={setDescription}
				/>
			))}
		</div>
	);
};

export default ClassificationProbabilityList;
