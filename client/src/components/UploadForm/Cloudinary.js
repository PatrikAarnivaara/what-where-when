import { post } from 'axios';

const Cloudinary = (
	status,
	setStatus,
	setDisablePrediction,
	setCloudinaryResponseUrl,
	setCloudinaryResponsePublicID
) => {
	return async (base64Image) => {
		try {
			if (status) {
				setStatus('');
			}
			const imageToUrlCloudinary = {
				image: base64Image,
			};
			const cloudinaryResponse = await post('/api/cloudinary', imageToUrlCloudinary);
			if (cloudinaryResponse) setDisablePrediction(false);
			console.log(cloudinaryResponse.data);
			setCloudinaryResponseUrl(cloudinaryResponse.data.url);
			setCloudinaryResponsePublicID(cloudinaryResponse.data.publicId);
		} catch (error) {
			console.log('error', error);
		}
	};
};

export default Cloudinary;
