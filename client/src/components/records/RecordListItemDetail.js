import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core/';
import { Image } from 'cloudinary-react';
import GoogleMaps from '../../UI/GoogleMaps';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import useStyles from './useStyles';

const RecordListItemDetail = ({
	recordDetailData: { _id, url, title, classification, probability, date, lat, lon },
}) => {
	const classes = useStyles();

	return (
		<div className={classes.itemDetailWrapper}>
			<Image
				cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
				publicId={url}
				width="280"
				crop="scale"
				quality="auto"
			/>
			{url ? (
				<div>
					<Typography>User: {title}</Typography>
					<Typography>TensorFlow: {classification}</Typography>
					<Typography>Probability: {probability * 100}%</Typography>
					<Typography>Date: {date}</Typography>
					{/* <Typography>Latitude: {lat}</Typography>
					<Typography>Longitude: {lon}</Typography> */}
					<Link to={`/records/${_id}`}>
						<Button variant="outlined" className={classes.editButton}>
							<EditOutlinedIcon />
						</Button>
					</Link>
					<GoogleMaps lat={lat} lon={lon} />
				</div>
			) : (
				<div className={classes.clickImageInfoWrapper}>
					<TouchAppIcon className={classes.touchAppIcon} />
					<Typography>Click an image to see info here.</Typography>
				</div>
			)}
		</div>
	);
};

export default RecordListItemDetail;
