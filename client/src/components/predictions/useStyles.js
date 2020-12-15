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
	infoWrapper: {
		display: 'flex',
		justifyContent: 'center',
		minHeight: '120vh',
		marginTop: '10vh',
		marginBottom: '10vh',
	},
	infoContentWrapper: {
		minWidth: '300',
		flexDirection: 'column',
		flexWrap: 'wrap',
	},
	infoButtonWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	itemDetailWrapper: {
		marginRight: '2em',
		marginLeft: "1em", 
		paddingTop: '1em',
		maxWidth: '30vw',
		minWidth: '280px',
	},
	gridListTile: {
		padding: '1em',
		cursor: 'pointer',
	},
	icon: {
		color: 'rgba(255, 255, 255, 0.54)',
	},
	subHeader: {
		fontSize: '1.5em',
	},
	editButton: {
		marginTop: '1em',
	},
	clickImageInfoWrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		marginTop: '3em',
	},
	touchAppIcon: {
		marginBottom: '1em',
	},
	date: {
		marginBottom: '1em',
	},
	editContentWrapper: {
		minWidth: '300px',
	},
	editTextField: {
		marginTop: '1em',
		minWidth: '300px',
	},
	editButtonWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	editUploadButton: {
		marginTop: '1em',
	},
	editClearButton: {
		marginTop: '1em',
	},
}));

export default useStyles;
