export default async (location) => {
	try {
		const result = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`
		);

		if (result.status === 200) {
			return { success: true, data: await result.json() };
		}

		return { success: false, error: result.statusText };
	} catch (ex) {
		return { success: false, error: ex.message };
	}
};
