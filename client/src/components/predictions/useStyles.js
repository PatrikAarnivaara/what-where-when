import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		marginBottom: '2em',
		marginLeft: '2em',
	},
	predictionWrapper: {
		display: 'flex',
		flexDirection: 'row',
	},
	itemDetailWrapper: {
		marginLeft: '1em',
		marginRight: '2em',
		maxWidth: '30vw',
		minWidth: '280px',
	},
	gridList: {},
	gridListTile: {
		cursor: 'pointer',
	},
	icon: {
		color: 'rgba(255, 255, 255, 0.54)',
	},
	subHeader: {
		fontSize: '1.5em',
	},
}));

export default useStyles;
