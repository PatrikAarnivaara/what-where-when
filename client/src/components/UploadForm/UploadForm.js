import React, { useState } from 'react';
import { post } from 'axios';
import { Box, CircularProgress, TextField, Button, IconButton, Typography } from '@material-ui/core/';
import useStyles from './useStyles';
import { submitForm } from '../../api/submitForm';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ClearIcon from '@material-ui/icons/Clear';
import BackspaceIcon from '@material-ui/icons/Backspace';
import ClassificationProbabilityList from '../../UI/ClassificationProbability/ClassificationProbabilityList';

const UploadForm = () => {
	const classes = useStyles();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [probability, setProbability] = useState('');
	const [cloudinaryResponseUrl, setCloudinaryResponseUrl] = useState();
	const [status, setStatus] = useState('');
	const [previewSource, setPreviewSource] = useState('');
	const [predictions, setPredictions] = useState([]);
	const [spinner, setSpinner] = useState(false);
	const [disableUpload, setDisableUpload] = useState(true);
	const [disablePrediction, setDisablePrediction] = useState(true);

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

	const saveUrlToLocalFile = async (base64Image) => {
		try {
			const imageToUrlCloudinary = {
				image: base64Image,
			};
			const cloudinaryResponse = await post('/api/cloudinary', imageToUrlCloudinary);
			if (cloudinaryResponse) setDisablePrediction(false);
			setCloudinaryResponseUrl(cloudinaryResponse.data.url);
		} catch (error) {
			console.log('error', error);
		}
	};

	const classifyImage = async () => {
		try {
			setSpinner(true);
			const filePath = {
				/* TODO: this has to be fixed! */
				file: '/Users/patrik/what-where-when/image.jpg',
			};
			const predictionResponse = await post('/api/tensorflow', filePath);
			setPredictions(predictionResponse.data);
			if (predictionResponse) {
				setDisableUpload(false);
			}
			if (predictionResponse) {
				setSpinner(false);
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	const clearFields = () => {
		/* Add cloudinary delete image request */
		setPreviewSource('');
		setTitle('');
		setDescription('');
		setProbability('');
		setPredictions([]);
	};

	const uploadWithJSON = async () => {
		if (title && cloudinaryResponseUrl && probability && description) {
			try {
				const data = {
					title: title,
					file: cloudinaryResponseUrl,
					description: description,
					probability: probability,
					date: new Date().toLocaleString(),
				};

				/* TSpinner? */
				submitForm('application/json', data, (msg) => console.log('Upload SUBMIT JSON', msg));
				setStatus('Upload successfull.');
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
					{predictions.length > 0 && (
						<ClassificationProbabilityList
							predictions={predictions}
							setDescription={setDescription}
							setProbability={setProbability}
						/>
					)}
					<Box className={classes.uploadButtonWrapper}>
						<Button
							variant="outlined"
							color="secondary"
							type="button"
							value="Upload"
							onClick={uploadWithJSON}
							disabled={disableUpload}
						>
							UPLOAD
						</Button>
						<Button variant="outlined" onClick={clearFields}>
							<ClearIcon />
						</Button>
						<Button variant="outlined" onClick={classifyImage} disabled={disablePrediction}>
							PREDICT
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
