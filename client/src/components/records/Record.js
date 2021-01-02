import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecordList from './RecordList';
import RecordListItemDetail from './RecordListItemDetail';
import useStyles from './useStyles';

const Record = () => {
	const classes = useStyles();
	const [records, setRecords] = useState([]);
	const [recordDetailData, setRecordDetailData] = useState({
		_id: '',
		url: '',
		title: '',
		classification: '',
		probability: '',
		date: '',
	});

	const showRecordDetail = (id, url, title, classification, probability, date, lat, lon) => {
		setRecordDetailData({
			...recordDetailData,
			_id: id,
			url: url,
			title: title, 
			classification: classification,
			probability: probability,
			date: date,
			lat: lat,
			lon, lon
		});
	};

	useEffect(() => {
		const getRecords = async () => {
			try {
				const response = await axios.get('/api/records');
				setRecords(response.data);
			} catch (error) {
				console.log('error', error);
			}
		};
		getRecords();
	}, []);

	return (
		<div className={classes.recordWrapper}>
			<RecordList records={records} showRecordDetail={showRecordDetail} />
			{<RecordListItemDetail recordDetailData={recordDetailData} />}
		</div>
	);
};

export default Record;
