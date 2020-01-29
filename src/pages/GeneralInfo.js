import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import info from '../infoTexts/info.json'


const useStyles = makeStyles(theme => ({
    text: {color: '#ffffff',  },
    header: {fontSize: 64,textAlign: 'center', marginBottom: 10},
    subheader: {fontSize: 32, textAlign: 'center', marginTop: 0},
    infoText: {fontSize: 20, },
    textBox: {
      marginRight: 400, marginLeft: 400,
    }
  
  }));

const GeneralInfo = () => {
    const classes = useStyles();

    return (
        <div>
            <h1 className={`${classes.header} ${classes.text}`}>Heroes of Might and Magic III</h1>
            <p className={`${classes.subheader} ${classes.text}`}>Creature analysis</p>
            <div className={classes.textBox}>
                <h2 className={classes.text}><u>Intro</u></h2>
                <p className={`${classes.text} ${classes.infoText}`}>{info.HoMMintro}</p>
            
                <h2 className={classes.text}><u>Creatures</u></h2>
                <p className={`${classes.text} ${classes.infoText}`}>{info.creatureIntro}</p>

            </div>
        </div>
    )
}

export default GeneralInfo