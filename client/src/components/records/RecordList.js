import React from 'react';
import GridList from '@material-ui/core/GridList';
import useStyles from './useStyles';
import RecordListItem from './RecordListItem';

const RecordList = ({ records, showRecordDetail }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<GridList cellHeight={100} cols={1}>
				{records.map((record, index) => (
					<RecordListItem
						key={index}
						id={record._id}
						url={record.url}
						title={record.title}
						classification={record.classification}
						probability={record.probability}
						date={record.date}
						index={index}
						showRecordDetail={showRecordDetail}
					></RecordListItem>
				))}
			</GridList>
		</div>
	);
};

export default RecordList;
