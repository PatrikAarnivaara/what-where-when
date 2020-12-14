import React, { useState } from 'react';
import { post } from 'axios';
import { Box, CircularProgress, TextField, Button, IconButton } from '@material-ui/core/';
import useStyles from './useStyles';
import { submitForm } from '../../api/submitForm';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ClearIcon from '@material-ui/icons/Clear';
import BackspaceIcon from '@material-ui/icons/Backspace';
import ClassificationProbabilityList from '../../UI/ClassificationProbability/ClassificationProbabilityList';

const UploadForm = () => {
	const classes = useStyles();
	const [title, setTitle] = useState('');
	const [file, setFile] = useState(null);
	/* Chnage description to probability */
	const [description, setDescription] = useState('');
	const [previewSource, setPreviewSource] = useState('');
	const [predictions, setPredictions] = useState([]);
	const [spinner, setSpinner] = useState(false);
	const [probability, setProbability] = useState('');
	const [disableUpload, setDisableUpload] = useState(true);
	const [disablePrediction, setDisablePrediction] = useState(true);

	console.log(description);
	console.log(probability);

	const handleFileInputChange = (e) => {
		e.preventDefault();
		setFile(e.target.files[0]);
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

	const saveUrlToLocalFile = async (baseSixtyFourImage) => {
		try {
			const imageToUrlCloudinary = {
				image: baseSixtyFourImage,
			};

			const cloudinaryResponse = await post('/api/cloudinary', imageToUrlCloudinary);
			if (cloudinaryResponse) setDisablePrediction(false);
		} catch (error) {
			console.log('error', error);
		}
	};

	const classifyImage = async () => {
		setSpinner(true);
		const filePath = {
			/* TODO: this has to be fixed! */
			file: '/Users/patrik/what-where-when/image.jpg',
		};

		try {
			const predictionResponse = await post('/api/tensorflow', filePath);
			console.log('Here it is: ', predictionResponse);
			setPredictions(predictionResponse.data);
			if (predictionResponse) {
				setSpinner(false);
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	const uploadWithJSON = async () => {
		/* Remove toBase64 and change file to url from preview req */
		const toBase64 = (file) =>
			new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(reader.result);
				reader.onerror = (error) => reject(error);
			});

		const data = {
			title: title,
			file: await toBase64(file),
			description: description,
			probability: probability,
			date: new Date().toLocaleString(),
		};
		setPreviewSource('');
		/* Try/Catch, add Spinner? */
		submitForm('application/json', data, (msg) => console.log('Upload SUBMIT JSON', msg));
	};

	const clearFields = () => {
		/* Add cloudinary delete image request */
		setFile('');
		setPreviewSource('');
		setTitle('');
		setDescription('');
		setProbability('');
		setPredictions([]);
	};

	return (
		<Box className={classes.root}>
			<Box className={classes.box}>
				<Box className={classes.previewContainer}>
					{previewSource && <img src={previewSource} alt="chosen" className={classes.preview} />}
				</Box>
				<form>
					<Box className={classes.textInputAndBackspaceiconWrapper}>
						<TextField
							required
							id="outlined-basic"
							variant="outlined"
							label="Your prediction"
							color="secondary"
							type="text"
							value={title}
							onChange={(e) => {
								setTitle(e.target.value);
							}}
							className={classes.textFieldTop}
						/>
						<BackspaceIcon
							className={classes.BackspaceIcon}
							onClick={() => {
								setTitle('');
							}}
						/>
					</Box>
					<Box className={classes.fileZoneWrapper}>
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
					<Box className={classes.buttonWrap}>
						<Button
							variant="outlined"
							color="secondary"
							type="button"
							value="Upload"
							onClick={uploadWithJSON}
							/* disabled={disableUpload} */
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
				</form>
			</Box>
		</Box>
	);
};

export default UploadForm;
