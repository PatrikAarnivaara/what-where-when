import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		marginTop: '1em',
		marginBottom: '3em',
		flexDirection: 'column',
		maxWidth: '200vw',
	},
	radioButtonPredictionDataWrapper: {
		display: "flex",
		flexDirection: 'row',
		maxWidth: '180vw',
	},
	radioButton: {
		height: '2em',
		width: '2em',
		marginRight: "1em"
	},
	predictionData: {
		marginTop: '0.5em',
		marginBottom: '0.5em',
	},
}));

export default useStyles;
