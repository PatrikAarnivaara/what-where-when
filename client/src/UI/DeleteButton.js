import React from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core/';
import useStyles from './useStyles';

const DeleteButton = (props) => {
	const classes = useStyles();

	const handleDelete = async () => {
		try {
			await axios.delete(`/api/predictions/${props.match.params._id}`);
			props.history.push('/predictions');
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<React.Fragment>
			<Button onClick={handleDelete} variant="outlined" color="secondary" className={classes.deleteButton}>
				DELETE
			</Button>
		</React.Fragment>
	);
};

export default DeleteButton;
