import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './components/containers/Header/Header';
import UploadForm from './components/UploadForm/UploadForm';
import Record from './components/records/Record';
import RecordInfo from './components/records/RecordInfo';
import RecordEdit from './components/records/RecordEdit';


/* const LOCAL_STORAGE_KEY = 'locations';
	function saveToLocalStorage(locations) {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(locations));
	}

	function readFromLocalStorage() {
		const storedLocations = localStorage.getItem(LOCAL_STORAGE_KEY);
		return storedLocations ? JSON.parse(storedLocations) : [];
	} */

const App = () => {
	const [darkMode, setDarkMode] = useState(true);
	/* const [weatherLocations, setWeatherLocations] = useState(readFromLocalStorage()); */
	
	const theme = createMuiTheme({
		palette: {
			type: darkMode ? 'dark' : 'light',
		},
		
	});

	const changeTheme = () => {
		setDarkMode(!darkMode);
	};

	/* const updateLocations = locations => {
        setWeatherLocations(locations);
        saveToLocalStorage(locations);
    }; */

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="App">
				<Router>
					<Header darkMode={darkMode} changeTheme={changeTheme} />
					<Switch>
						<Route exact path="/" component={UploadForm} />
						<Route exact path="/records" component={Record} />
						<Route exact path="/records/:_id" component={RecordInfo} />
						<Route exact path="/records/:_id/edit" component={RecordEdit} />
					</Switch>
				</Router>
			</div>
		</ThemeProvider>
	);
};

export default App;
