import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingIndicator = ({ isLoading }) => {
	return isLoading ? <CircularProgress /> : null;
};
export default LoadingIndicator;
