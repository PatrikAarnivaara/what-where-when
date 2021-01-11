import React, { memo } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
	width: '30%',
	height: '30%',
};

const GoogleMaps = ({ lat, lon }) => {
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

export default memo(GoogleMaps);
