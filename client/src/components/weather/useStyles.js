import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	weatherWrapper: {
		display: "flex",
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'center',
	}, 
	/* weatherTemperature: {
		width: "2em",
		height: "2em",
	} */
	/* weatherIcon: {
		padding: 0
	}, */
}));

export default useStyles;
