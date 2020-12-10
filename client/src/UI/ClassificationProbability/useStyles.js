import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		marginTop: '1em',
		marginBottom: '3em',
		flexDirection: 'column',
		maxWidth: '80vw',
	},
	radioButtonPredictionDataWrapper: {
		display: 'flex',
		flexDirection: 'row',
		maxWidth: '80vw',
		marginLeft: '1em',
		
	},
	radioButton: {
		/* marginTop: '0.5em',
		marginBottom: '0.5em', */
		height: '2em',
		width: '2em',
	},
	predictionData: {
		marginTop: '0.5em',
		marginBottom: '0.5em',
		marginLeft: '1.5em',
		cursor: "pointer",
	},
}));

export default useStyles;
