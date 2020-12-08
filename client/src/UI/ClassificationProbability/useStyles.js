import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		marginTop: '1em',
		marginBottom: '2em',
		flexDirection: "column",
		alignItems: "center",
		/* justifyContent: "center", */
	},
	checkBoxPredictionWrapper: {
		display: 'flex',
		flexDirection: "row",
	},
	text: {
		marginTop: '1em',
		marginBottom: '1em',
	},
}));

export default useStyles;
