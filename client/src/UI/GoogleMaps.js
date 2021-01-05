import React, { memo, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
	width: '300px',
	height: '300px',
};

const GoogleMaps = ({ lat, lon }) => {
	/* const [center, setCenter] = useState({ lat: parseFloat(lat), lng: parseFloat(lon) });

	useEffect(() => {
		const setPosition = () => {
			setCenter({ ...center, lat: parseFloat(lat), lng: parseFloat(lon) });
		};
		setPosition();
	}, [setCenter]); */

	return (
		<LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={{
					lat: lat,
					lng: lon,
				}}
				zoom={15}
			>
				<Marker
					position={{
						lat: lat,
						lng: lon,
					}}
				/>
			</GoogleMap>
		</LoadScript>
	);
};

export default /* memo( */ GoogleMaps /* ) */;
