import React, { useEffect, useState } from 'react';
import { get, patch } from 'axios';
import { Box, TextField, Button } from '@material-ui/core/';
import { Image } from 'cloudinary-react';
import useStyles from './useStyles';

const PredictionEdit = (props) => {
	const classes = useStyles();
	const initialState = { title: '', classification: '' };
	const [prediction, setPrediction] = useState(initialState);
	const [previewSource, setPreviewSource] = useState('');

	useEffect(() => {
		const getPrediction = async () => {
			try {
				const response = await get(`/api/predictions/${props.match.params._id}`);
				setPrediction(response.data);
				setPreviewSource(response.data.url);
			} catch (error) {
				console.log('error', error);
			}
		}
		getPrediction();
	}, [props]);

	const handleInputChange = (e) => {
		e.preventDefault();
		setPrediction({ ...prediction, [e.target.name]: e.target.value });
	};

	const uploadWithJSON = async () => {
		const updatePrediction = async() =>{
			try {
				await patch(`/api/edit/${props.match.params._id}`, prediction);
				props.history.push(`/predictions/`);
			} catch (error) {
				console.log(error);
			}
		}
		updatePrediction();
	};

	const clearFields = () => {
		/* setFile("");
    setPreviewSource("");
    setTitle("");
    setClassification(""); */
	};

	return (
		<Box className={classes.root}>
			<Box className={classes.box}>
				<Box className={classes.editContentWrapper}>
					{previewSource && (
						<Image
							cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
							publicId={previewSource}
							width="300"
							crop="scale"
							quality="auto"
						/>
					)}
				</Box>
				<form>
					<TextField
						id="outlined-basic"
						variant="outlined"
						label="Edit title"
						color="secondary"
						type="text"
						name="title"
						autoComplete="off"
						value={prediction.title}
						onChange={handleInputChange}
						className={classes.editTextField}
					/>
					<Box className={classes.editButtonWrapper}>
						<Button
							variant="outlined"
							color="secondary"
							type="button"
							value="Upload"
							className={classes.editUploadButton}
							onClick={uploadWithJSON}
						>
							UPLOAD
						</Button>
						<Button variant="outlined" className={classes.editClearButton} onClick={clearFields}>
							CLEAR
						</Button>
					</Box>
				</form>
			</Box>
		</Box>
	);
};

export default PredictionEdit;
