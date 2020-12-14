import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	deleteButton: {
		marginRight: '1em',
	},
	editButton: {
		cursor: 'pointer',
	},
	link: {
		textDecoration: 'none',
	},
}));

export default useStyles;
