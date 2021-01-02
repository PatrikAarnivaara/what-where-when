import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const GoogleMaps = ({ google, lat, lon }) => {
	console.log(lat);
	const mapStyles = {
		width: '20%',
		height: '20%',
	};

	return (
		<div>
			<Map
				google={google}
				zoom={14}
				style={mapStyles}
				initialCenter={{
					lat: lat,
					lng: lon,
				}}
			>
				{<Marker /* onClick={onMarkerClick} */ name={'Current location'} />}
			</Map>
		</div>
	);
};

export default GoogleApiWrapper({
	apiKey: process.env.GOOGLE_MAPS_API_KEY,
	/* GoogleMaps: GoogleMaps, */
})(GoogleMaps);
