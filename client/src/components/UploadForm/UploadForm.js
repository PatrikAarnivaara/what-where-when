import React, { useState } from 'react';
import { post } from 'axios';
import { Box, TextField, Button } from '@material-ui/core/';
import useStyles from './useStyles';
import { submitForm } from '../../api/submitForm';

const UploadForm = () => {
	const classes = useStyles();
	const [title, setTitle] = useState('');
	const [file, setFile] = useState(null);
	const [description, setDescription] = useState('');
	const [previewSource, setPreviewSource] = useState('');

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
			/* classifyImage(); */
		};
	};

	const saveUrlToLocalFile = async (baseSixtyFourImage) => {
		try {
			const imageToUrlCloudinary = {
				image: baseSixtyFourImage,
			};

			const cloudinaryResponse = await post('/api/cloudinary', imageToUrlCloudinary);
			console.log(cloudinaryResponse);
		} catch (error) {
			console.log('error', error);
		}
	};

	const classifyImage = async () => {
		const filePath = {
			file: '/Users/patrik/what-where-when/image.jpg',
		};

		try {
			const predictionResponse = await post('/api/tensorflow', filePath);
			console.log(predictionResponse);
			/* setPrediction(predictionResponse) */
		} catch (error) {
			console.log('error', error);
		}
	};

	const uploadWithJSON = async () => {
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
			date: new Date().toLocaleString(),
		};
		/* Clear up more fields? */
		setPreviewSource('');
		/* Try/Catch, add Spinner? */
		submitForm('application/json', data, (msg) => console.log('Upload SUBMIT JSON', msg));
	};

	const clearFields = () => {
		setFile('');
		setPreviewSource('');
		setTitle('');
		setDescription('');
	};

	return (
		<Box className={classes.root}>
			<Box className={classes.box}>
				<Box className={classes.previewContainer}>
					{previewSource && <img src={previewSource} alt="chosen" className={classes.preview} />}
				</Box>
				<form>
					<TextField
						required
						id="outlined-basic"
						variant="outlined"
						label="Title"
						color="secondary"
						type="text"
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						className={classes.textFieldTop}
					/>
					<TextField
						required
						id="outlined-basic"
						variant="outlined"
						label="#meta tag"
						color="secondary"
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className={classes.textFieldBottom}
					/>
					<input className={classes.fileUpload} type="file" name="file" onChange={handleFileInputChange} />
					<Box className={classes.buttonWrap}>
						<Button
							variant="outlined"
							color="secondary"
							type="button"
							value="Upload"
							onClick={uploadWithJSON}
						>
							UPLOAD
						</Button>
						{/* <Button variant="outlined" onClick={clearFields}>
							CLEAR
						</Button> */}
						<Button variant="outlined" onClick={classifyImage}>
							PREDICT
						</Button>
					</Box>
				</form>
			</Box>
		</Box>
	);
};

export default UploadForm;