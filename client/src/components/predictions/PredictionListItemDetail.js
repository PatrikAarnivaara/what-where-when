import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core/';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import useStyles from './useStyles';

const PredictionListItemDetail = ({ predictionDetailData: { _id, url, title, description, probability, date } }) => {
	const classes = useStyles();

	return (
		<div className={classes.itemDetailWrapper}>
			<img src={url} alt={title} />
			<Typography>Your prediction: {title}</Typography>
			<Typography>Classification: {description}</Typography>
			<Typography>Probability: {probability * 100}%</Typography>
			<Typography>Date: {date}</Typography>
			<Link to={`/predictions/${_id}`}>
				<EditOutlinedIcon style={{ cursor: 'pointer' }} />
			</Link>
		</div>
	);
};

export default PredictionListItemDetail;
