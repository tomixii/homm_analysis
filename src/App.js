import React from 'react';
import { makeStyles, createMuiTheme, ThemeProvider   } from '@material-ui/core/styles';
import BottomStepper from './components/BottomStepper'
import GeneralInfo from './pages/GeneralInfo'
import CompareTowns from './pages/CompareTowns'
import CompareCreatures from './pages/CompareCreatures'
import Sandbox from './pages/Sandbox'


import cyan from '@material-ui/core/colors/cyan';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

const useStyles = makeStyles(theme => ({
  text: {color: '#ffffff',  },
  header: {fontSize: 64,textAlign: 'center', marginBottom: 10},
  subheader: {fontSize: 32, textAlign: 'center', marginTop: 0},
  infoText: {fontSize: 20, },
  textBox: {
    marginRight: 400, marginLeft: 400,
  },
  bottom: {
    position: 'fixed',
    bottom: '2%',
    width: '100%',
  }

}));

const App = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(3);
  
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  function getCurrentContent() {
    switch (activeStep) {
      case 0:
        return <GeneralInfo/>;
      case 1:
        return <CompareTowns/>;
      case 2:
        return <CompareCreatures/>;
      default:
        return <Sandbox/>;
    }
  }

	return (
    <ThemeProvider theme={theme}>
      {getCurrentContent()}
      <div className={classes.bottom}>
        <BottomStepper handleNext={handleNext} handleBack={handleBack} activeStep={activeStep} getCurrentContent={getCurrentContent}/>
      </div>
    </ThemeProvider>
	);
};

export default App;
