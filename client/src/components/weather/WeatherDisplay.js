import React, { useMemo } from 'react';
import useStyles from './useStyles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

function WeatherDisplay({ weatherData }) {
	const classes = useStyles();
	const { temp, description, icon } = useMemo(() => {
		const [weather] = weatherData.weather || [];
		return {
			temp: weatherData.main && weatherData.main.temp ? Math.round(weatherData.main.temp).toString() : '',
			description: weather ? weather.description : '',
			icon: weather ? `http://openweathermap.org/img/wn/${weather.icon}@2x.png` : '',
		};
	}, [weatherData]);
	return (
		<div className={classes.weatherWrapper}>
			{icon && (
				<Tooltip title={description} aria-label={description}>
					<Avatar className={classes.weatherIcon} alt={description} src={icon} />
				</Tooltip>
			)}
			{temp && (
				<Typography variant="h6" className={classes.weatherTemperature}>
					{temp}&deg;C
				</Typography>
			)}
			
		</div>
	);
}

export default WeatherDisplay;
