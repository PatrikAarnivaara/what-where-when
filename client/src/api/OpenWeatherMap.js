export default async (/* { lat, lon } */) => {
	/* const [lat, lon] = position; */

	/* console.log('lat: ', lat); */
	try {
		const result = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${55.854363799999994}&lon=${13.3077733}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`
		);
		if (result.status === 200) {
			return { success: true, data: await result.json() };
		}
		return { success: false, error: result.statusText };
	} catch (ex) {
		return { success: false, error: ex.message };
	}
};

/* api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY} */
