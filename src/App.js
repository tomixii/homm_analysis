import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
	root: { backgroundColor: '#787878', height: '100%' },
	mainText: { color: '#ffffff' }
}));

const App = () => {
	const classes = useStyles();
	return (
		<Box height="100%" className={classes.root}>
			<p className={classes.mainText}>tekstiä</p>
		</Box>
	);
};

export default App;
