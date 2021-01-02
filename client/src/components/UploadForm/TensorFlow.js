import { post } from 'axios';

const TensorFlow = (setSpinner, setRecords, setDisableUpload) => {
	return async () => {
		try {
			setSpinner(true);
			const filePath = {
				file: 'image.jpg',
			};

			console.log(filePath);
			const recordResponse = await post('/api/tensorflow', filePath);
			setRecords(recordResponse.data);
			if (recordResponse) {
				setDisableUpload(false);
			}
			if (recordResponse) {
				setSpinner(false);
			}
		} catch (error) {
			console.log('error', error);
		}
	};
};

export default TensorFlow;
