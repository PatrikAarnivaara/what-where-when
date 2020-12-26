import React, { useEffect, useState } from 'react';
/* import { makeStyles } from "@material-ui/core/styles"; */
import PropTypes from 'prop-types';
import getLocationWeather from '../../api/OpenWeatherMap';
import ErrorMessage from '../../UI/ErrorMessage';
import LoadingIndicator from '../../UI/LoadingIndicatior';
import WeatherDisplay from './WeatherDisplay';

const Weather = (/* { location } */) => {
	/* const classes = useStyles(); */

	const [weatherData, setWeatherData] = useState({});
	const [apiError, setApiError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [position, setPosition] = useState({ lat: '', lon: '' });

	useEffect(
		() => {
			/* if (navigator.geolocation) {
				navigator.geolocation.watchPosition((position) => {
                    setPosition({ ...position, lat: "55.854182599999994", lon: "13.3077733" });
                    console.log('Latitude is :', position.coords.latitude);
                    console.log('Longitude is :', position.coords.longitude);
				});
			} */
			const loadingIndicatorTimeout = setTimeout(() => setIsLoading(true), 500);
			const getWeather = async () => {
				const result = await getLocationWeather(position);
				clearTimeout(loadingIndicatorTimeout);
				setIsLoading(false);
				setWeatherData(result.success ? result.data : {});
				setApiError(result.success ? '' : result.error);
			};
			getWeather();
			return () => clearTimeout(loadingIndicatorTimeout);
		},
		[
			/* location */
		]
	);

	return (
		<div /* className={classes.detailLine} */>
			<LoadingIndicator isLoading={isLoading} />
			<ErrorMessage apiError={apiError} />
			<WeatherDisplay weatherData={weatherData} />
		</div>
	);
};

Weather.propTypes = {
	location: PropTypes.string.isRequired,
};
export default Weather;
