import React from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';
import Check from '@material-ui/icons/Check';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import cyan from '@material-ui/core/colors/cyan';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        "& .MuiPaper-root": {
            backgroundColor: "#222",
        },
        "& .MuiStepLabel-label.MuiStepLabel-active": {
            color: "white"
        },
        "& .MuiStepLabel-label": {
            color: "#ffffffa0"
        },
        direction: "row"
    },
    stepper: {
        backgroundColor: "#222",
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    whiteText: {
        color:"white"
    }
}));

  const useQontoStepIconStyles = makeStyles({
    root: {
      color: '#d9eefa',
      display: 'flex',
      height: 22,
      alignItems: 'center',
    },
    active: {
      color: cyan[500],
    },
    circle: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    completed: {
      color: cyan[500],
      zIndex: 1,
      fontSize: 20,
    },
  });
  
  function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
      </div>
    );
  }
  
  QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
  };

function getSteps() {
  return ['General info', 'Compare towns', 'Compare creatures', 'Sandbox'];
}

export default function HorizontalLabelPositionBelowStepper(props) {
  const classes = useStyles();
  const steps = getSteps();
  return (
    <div className={classes.root}>    
      <Grid container alignItems="center">
        <Grid item xs={1}>
          <Button
            disabled={props.activeStep === 0}
            onClick={props.handleBack}
            className={classes.backButton}
            >
            <KeyboardArrowLeftIcon  style={{ fill: "#ffffff" }} fontSize="large"/>
          </Button>
        </Grid>
        <Grid item xs={10}>
          <Stepper activeStep={props.activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
          <Grid item xs={1}>
            <Button onClick={props.handleNext}>
            <KeyboardArrowRightIcon  style={{ fill: "#ffffff" }} fontSize="large"/>

            </Button>
          </Grid>
        </Grid> 
    </div>
  );
}