import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@material-ui/core/';
import DeleteButton from '../../UI/DeleteButton';
import EditButton from '../../UI/EditButton';
import { Image } from 'cloudinary-react';
import useStyles from './useStyles';

const RecordInfo = (props) => {
	const classes = useStyles();
	const [record, setRecord] = useState({});

	useEffect(() => {
		const getRecord = async () => {
			try {
				const response = await axios.get(`/api/records/${props.match.params._id}`);
				setRecord(response.data);
			} catch (error) {
				console.log('error', error);
			}
		};
		getRecord();
	}, [props]); 

	return (
		<div className={classes.infoWrapper}>
			<div className={classes.infoContentWrapper}>
				<Image
					cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
					publicId={record.url}
					width="300"
					crop="scale"
					quality="auto"
				/>
				<Typography>User: {record.title}</Typography>
				<Typography>TensorFlow: {record.classification}</Typography>
				<Typography>Probability: {record.probability * 100}%</Typography>
				<Typography className={classes.date}>Date: {record.date}</Typography>
				<div className={classes.infoButtonWrapper}>
					<DeleteButton {...props} />
					<EditButton id={record._id} />
				</div>
			</div>
		</div>
	);
};

export default RecordInfo;
