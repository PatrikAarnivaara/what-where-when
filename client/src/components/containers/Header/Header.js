import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { Button, Box } from '@material-ui/core/';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import useStyles from './useStyles';
import Position from '../../../UI/Position';

const HeaderTest = ({ changeTheme, darkMode }) => {
	const classes = useStyles();

	const [login, setLogin] = useState(false);

	const switchTheme = () => {
		changeTheme();
	};

	return (
		<Box className={classes.root}>
			<Box className={classes.weather}>
				<Position />
			</Box>
			<Button>
				<Tooltip title="classify" aria-label="classify">
					<Link to="/" className={classes.eye}>
						<VisibilityIcon />
					</Link>
				</Tooltip>
			</Button>
			<Button>
				<Tooltip title="images" aria-label="images">
					<Link to="/records" className={classes.images}>
						<PhotoLibraryIcon />
					</Link>
				</Tooltip>
			</Button>
			<Button className={classes.mode} onClick={switchTheme}>
				<Tooltip
					title={darkMode ? 'light mode' : 'dark mode'}
					aria-label={darkMode ? 'light mode' : 'dark mode'}
				>
					{darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
				</Tooltip>
			</Button>
		</Box>
	);
};

export default HeaderTest;
