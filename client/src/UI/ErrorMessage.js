import React from 'react';
import ErrorIcon from "@material-ui/icons/Error";
import Typography from "@material-ui/core/Typography";

const ErrorMessage = ({ apiError }) => {
	if (!apiError) return null;

	return (
		<>
			<ErrorIcon color="error" />
			<Typography color="error" variant="h6">
				{apiError}
			</Typography>
		</>
	);
};
export default ErrorMessage;
