import React from 'react';
import { Typography } from '@material-ui/core/'; 

const ClassificationProbabilityListItem = ({ classification, probability }) => {
	return (
		<div>
			<Typography>{classification}</Typography>
            <Typography>{probability}</Typography>
		</div>
	);
};

export default ClassificationProbabilityListItem;
