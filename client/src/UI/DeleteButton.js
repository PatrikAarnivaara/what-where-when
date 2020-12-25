import React from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core/';
import useStyles from './useStyles';

const DeleteButton = (props) => {
	const classes = useStyles();

	const handleDelete = async () => {
		try {
			const deleted = await axios.delete(`/api/records/${props.match.params._id}`);
			console.log(deleted);
			props.history.push('/records');
		} catch {
			console.log('deleted?');
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
