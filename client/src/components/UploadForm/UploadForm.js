import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, TextField, Button, IconButton, Typography } from '@material-ui/core/';
import useStyles from './useStyles';
import { submitForm } from '../../api/submitForm';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ClearIcon from '@material-ui/icons/Clear';
import BackspaceIcon from '@material-ui/icons/Backspace';
import ClassificationProbabilityList from '../../UI/ClassificationProbability/ClassificationProbabilityList';
import Cloudinary from './Cloudinary';
import TensorFlow from './TensorFlow';

const UploadForm = () => {
	const classes = useStyles();
	const [title, setTitle] = useState('');
	const [classification, setClassification] = useState('');
	const [probability, setProbability] = useState('');
	const [cloudinaryResponsePublicID, setCloudinaryResponsePublicID] = useState();
	const [cloudinaryResponseUrl, setCloudinaryResponseUrl] = useState();
	const [status, setStatus] = useState('');
	const [previewSource, setPreviewSource] = useState('');
	const [records, setRecords] = useState([]);
	const [spinner, setSpinner] = useState(false);
	const [disableUpload, setDisableUpload] = useState(true);
	const [disablePrediction, setDisablePrediction] = useState(true);
	const [position, setPosition] = useState({ latitude: '', longitude: '' });

	useEffect(() => {
		if (navigator.geolocation)
			navigator.geolocation.watchPosition((position) => {
				console.log(position.coords.latitude)
				setPosition({ ...position, latitude: position.coords.latitude, longitude: position.coords.longitude });
			});
	}, []);

	const handleFileInputChange = (e) => {
		e.preventDefault();
		previewFile(e.target.files[0]);
	};

	const previewFile = async (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setPreviewSource(reader.result);
			saveUrlToLocalFile(reader.result);
		};
	};

	const saveUrlToLocalFile = Cloudinary(
		status,
		setStatus,
		setDisablePrediction,
		setCloudinaryResponseUrl,
		setCloudinaryResponsePublicID
	);

	const classifyImage = TensorFlow(setSpinner, setRecords, setDisableUpload);

	const clearFields = () => {
		/* Add cloudinary delete image request */
		setPreviewSource('');
		setTitle('');
		setClassification('');
		setProbability('');
		setRecords([]);
	};

	const upload = async () => {
		if (title && cloudinaryResponseUrl && probability && classification) {
			try {
				console.log(position.latitude)
				const data = {
					url: cloudinaryResponseUrl,
					title: title,
					classification: classification,
					probability: probability,
					date: new Date().toLocaleString(),
					publicId: cloudinaryResponsePublicID,
					latitude: position.latitude,
					longitude: position.longitude,
				};

				submitForm('application/json', data, (msg) => console.log('Upload SUBMIT JSON', msg));
				setStatus('Upload successful.');
				clearFields();
			} catch (error) {
				console.log('error', error);
			}
		} else {
			setStatus('You forgot something.');
			return;
		}
	};

	return (
		<Box className={classes.root}>
			<Box className={classes.box}>
				<Box className={classes.previewWrapper}>
					{previewSource && <img src={previewSource} alt="chosen" className={classes.preview} />}
				</Box>
				<form>
					<Box className={classes.uploadTextInputAndBackspaceiconWrapper}>
						<TextField
							required
							id="outlined-basic"
							variant="outlined"
							label="Classification"
							color="secondary"
							type="text"
							autoComplete="off"
							value={title}
							onChange={(e) => {
								setTitle(e.target.value);
							}}
							className={classes.uploadTextField}
							helperText={title ? 'Thanks!' : 'Required.'}
						/>
						<BackspaceIcon
							className={classes.BackspaceIcon}
							onClick={() => {
								setTitle('');
							}}
						/>
					</Box>
					<Box className={classes.uploadFileZoneWrapper}>
						<input
							className={classes.fileUpload}
							accept="image/*"
							id="icon-button-file"
							type="file"
							onChange={handleFileInputChange}
						/>
						<label htmlFor="icon-button-file">
							<IconButton color="secondary" aria-label="upload picture" component="span">
								{!spinner && <PhotoCamera fontSize="large" />}
							</IconButton>
						</label>
						{spinner && <CircularProgress color="secondary" />}
					</Box>
					{records.length > 0 && (
						<ClassificationProbabilityList
							records={records}
							setClassification={setClassification}
							setProbability={setProbability}
						/>
					)}
					<Box className={classes.uploadButtonWrapper}>
						<Button
							variant="outlined"
							color="secondary"
							type="button"
							value="Upload"
							onClick={upload}
							disabled={disableUpload}
						>
							UPLOAD
						</Button>
						<Button variant="outlined" onClick={clearFields}>
							<ClearIcon />
						</Button>
						<Button variant="outlined" onClick={classifyImage} disabled={disablePrediction}>
							CLASSIFY
						</Button>
					</Box>
					<Box className={classes.statusMessageWrapper}>
						<Typography className={classes.status}>{status}</Typography>
					</Box>
				</form>
			</Box>
		</Box>
	);
};

export default UploadForm;
