import React from 'react';
import { GridListTile } from '@material-ui/core/';
import useStyles from './useStyles';
import { Image } from 'cloudinary-react';

const RecordListItem = ({ index, id, url, title, classification, probability, date, showRecordDetail, lat, lon }) => {
	const classes = useStyles();
	const handleOnClickItem = () => {
		showRecordDetail(id, url, title, classification, probability, date, lat, lon);
	};

	return (
		<GridListTile className={classes.gridListTile} onClick={handleOnClickItem} cols={3}>
			<Image
				key={index}
				cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
				publicId={url}
				width="180"
				crop="scale"
				quality="auto"
			/>
		</GridListTile>
	);
};

export default RecordListItem;
