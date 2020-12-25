import React from 'react';
import { Button } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';

const EditButton = ({ id }) => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Button variant="outlined" className={classes.editButton}>
				<Link to={`/records/${id}/edit`} color="secondary" className={classes.link}>
					EDIT
				</Link>
			</Button>
		</React.Fragment>
	);
};

export default EditButton;
