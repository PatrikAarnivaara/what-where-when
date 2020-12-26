import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { Button, Box } from '@material-ui/core/';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import useStyles from './useStyles';
import Weather from '../../weather/Weather';

const HeaderTest = ({ changeTheme, darkMode }) => {
	const classes = useStyles();

	const [login, setLogin] = useState(false);

	const switchTheme = () => {
		changeTheme();
	};

	return (
		<Box className={classes.root}>
			<Button className={classes.weather}>
				<Weather />
			</Button>
			<Button>
				<Link to="/" className={classes.eye}>
					<VisibilityIcon />
				</Link>
			</Button>
			<Button>
				<Link to="/records" className={classes.images}>
					<PhotoLibraryIcon />
				</Link>
			</Button>
			<Tooltip title={darkMode ? 'light mode' : 'dark mode'} aria-label={darkMode ? 'light mode' : 'dark mode'}>
				<Button className={classes.mode} onClick={switchTheme}>
					{darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
				</Button>
			</Tooltip>
		</Box>
	);
};

export default HeaderTest;
