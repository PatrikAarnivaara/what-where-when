import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		minHeight: '120vh',
		marginTop: '10vh',
		marginBottom: '10vh',
	},
	box: {
		width: '25vw',
		flexDirection: 'column',
		flexWrap: 'wrap',
	},
	previewWrapper: {
    display: 'flex',
		justifyContent: 'center',
		position: 'relative',
		overflow: 'hidden',
		width: '25vw',
		height: '20vw',
		padding: '2em',
		background: 'rgba(255, 255, 255, 0.04)',
		borderRadius: '5px',
	},
	preview: {
		
		position: 'relative',
		maxWidth: '20vw',
		maxHeight: '15vw',
	},
	uploadTextInputAndBackspaceiconWrapper: {
		display: 'flex',
		alignItems: 'center',
		marginTop: '1em',
	},
	uploadTextField: {
		width: '30vw',
	},
	BackspaceIcon: {
		marginLeft: '1em',
		cursor: 'pointer',
	},
	uploadFileZoneWrapper: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '1em',
		marginBottom: '2em',
	},
	fileUpload: {
		marginBottom: '4vh',
		display: 'none',
		fontSize: 'large',
	},
	uploadButtonWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
	},
}));

export default useStyles;
