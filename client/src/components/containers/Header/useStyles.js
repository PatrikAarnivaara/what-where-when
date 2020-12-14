import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '4em',
		maxHeight: '4em',
		width: '100%',
		boxShadow: '0px 10px 24px 0px rgba(0,0,0,0.25)',
		top: 0,
		display: 'flex',
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'center',
		opacity: '1',
		marginBottom: "2em"
	},
	border: {
		borderColor: 'red',
	},
	eye: {
		display: 'flex',
		color: '#33c9dc',
		fontSize: '1.5em',
	},
	images: {
		display: 'flex',
		color: '#008394',
		fontSize: '1.5em',
	},
	icon: {
		marginRight: theme.spacing(0.5),
		width: 20,
		height: 20,
		fontSize: '1.5em',
	},
	login: {
		position: 'absolute',
		left: 'calc(5% - 2rem)',
		top: 'calc(5% - 1.5rem)',
	},
	mode: {
		position: 'absolute',
		right: 'calc(5% - 2rem)',
		top: 'calc(5% - 1.5rem)',
	},
}));

export default useStyles;
