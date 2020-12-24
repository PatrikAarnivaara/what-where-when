import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './components/containers/Header/Header';
import UploadForm from './components/UploadForm/UploadForm';
import Prediction from './components/predictions/Prediction';
import PredictionInfo from './components/predictions/PredictionInfo';
import PredictionEdit from './components/predictions/PredictionEdit';

const App = () => {
	const [darkMode, setDarkMode] = useState(true);
	const theme = createMuiTheme({
		palette: {
			type: darkMode ? 'dark' : 'light',
		},
	});

	const changeTheme = () => {
		setDarkMode(!darkMode);
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="App">
				<Router>
					<Header darkMode={darkMode} changeTheme={changeTheme} />
					<Switch>
						<Route exact path="/" component={UploadForm} />
						<Route exact path="/predictions" component={Prediction} />
						<Route exact path="/predictions/:_id" component={PredictionInfo} />
						<Route exact path="/predictions/:_id/edit" component={PredictionEdit} />
					</Switch>
				</Router>
			</div>
		</ThemeProvider>
	);
};

export default App;