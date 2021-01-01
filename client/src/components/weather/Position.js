import React, { useState, useEffect } from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocationOffIcon from '@material-ui/icons/LocationOff';

const Position = () => {
	const [position, setPosition] = useState({ lat: '', lon: '' });

	useEffect(() => {
		if (navigator.geolocation)
			navigator.geolocation.watchPosition((position) => {
				setPosition({ ...position, lat: position.coords.latitude, lon: position.coords.longitude });
			});
	}, []);

	return (
		<div>
			{position.lat ? (
				<LocationOnIcon
					onClick={() => {
						console.log(position.lat);
					}}
				/>
			) : (
				<LocationOffIcon />
			)}
		</div>
	);
};

/* Weather.propTypes = {
	location: PropTypes.string.isRequired,
}; */

export default Position;
