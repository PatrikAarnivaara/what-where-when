import React, { useEffect, useState } from 'react';
import { get, patch } from 'axios';
import { Box, TextField, Button } from '@material-ui/core/';
import useStyles from '../UploadForm/useStyles';

const PredictionEdit = (props) => {
	const classes = useStyles();
	const initialState = { title: '', description: '' };
	const [prediction, setPrediction] = useState(initialState);
	const [previewSource, setPreviewSource] = useState('');

	useEffect(
		function () {
			async function getPrediction() {
				try {
					const response = await get(`/api/predictions/${props.match.params._id}`);
					setPrediction(response.data);
					setPreviewSource(response.data.url);
				} catch (error) {
					console.log('error', error);
				}
			}
			getPrediction();
		},
		[props]
	);

	const handleInputChange = (e) => {
		e.preventDefault();
		setPrediction({ ...prediction, [e.target.name]: e.target.value });
	};

	const uploadWithJSON = async () => {
		async function updatePrediction() {
			try {
				await patch(`/api/edit/${props.match.params._id}`, prediction);
				props.history.push(`/predictions/`);
			} catch (error) {
				console.log(error);
			}
		}
		updatePrediction();

		/*  editForm("application/json", data, (msg) =>
      console.log("Upload SUBMIT JSON", msg)
    ); */
	};

	const clearFields = () => {
		/* setFile("");
    setPreviewSource("");
    setTitle("");
    setDescription(""); */
	};

	return (
		<Box className={classes.root}>
			<Box className={classes.box}>
				<Box className={classes.previewContainer}>
					{previewSource && <img src={previewSource} alt="chosen" className={classes.preview} />}
				</Box>
				<form>
					<TextField
						id="outlined-basic"
						variant="outlined"
						label="title"
						color="secondary"
						type="text"
						name="title"
						value={prediction.title}
						onChange={handleInputChange}
						className={classes.textFieldTop}
					/>
					<TextField
						id="outlined-basic"
						variant="outlined"
						label="description"
						color="secondary"
						type="text"
						name="description"
						value={prediction.description}
						onChange={handleInputChange}
						className={classes.textFieldBottom}
					/>
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
						<Button variant="outlined" onClick={clearFields}>
							CLEAR
						</Button>
					</Box>
				</form>
			</Box>
		</Box>
	);
};

export default PredictionEdit;