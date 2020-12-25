import React, { useEffect, useState } from 'react';
import getLocationWeather from '../../api/OpenWeatherMap';

const Weather = () => {
	const [weatherData, setWeatherData] = useState({});
	const [apiError, setApiError] = useState('');
	/* const [isLoading, setIsLoading] = useState(false); */

	useEffect(() => {
		const getWeather = async () => {
            const result = await getLocationWeather('eslov');
			setWeatherData(result.success ? result.data : {});
			setApiError(result.success ? '' : result.error);
			console.log(weatherData, apiError);
		};

		getWeather();
	}, []);

	return <div>{"TEST"}</div>;
};

export default Weather;
