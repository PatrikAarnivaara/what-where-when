import React from 'react';
import ClassificationProbabilityListItem from '../ClassificationProbability/ClassificationProbabilityListItem';

const ClassificationProbabilityList = ({ predictions }) => {
	console.log(predictions);
	return (
		<div>
			{predictions.map((prediction, index) => (
				<ClassificationProbabilityListItem
					key={index}
					classification={prediction.className}
					probability={prediction.probability}
				/>
			))}
		</div>
	);
};

export default ClassificationProbabilityList;
