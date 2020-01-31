import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Line, Radar } from 'react-chartjs-2';
import creatureData from '../data/creaturedata_grouped.json'
import { Grid } from '@material-ui/core';
import _ from 'lodash'
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';


import cyan from '@material-ui/core/colors/cyan';
import { indigo, green, red, grey, brown, lightGreen, orange, purple } from '@material-ui/core/colors';

const checkBoxStyles = theme => ({
    root: {
        color: '#ccc',
        '&$checked': {
            color: 'primary',
        },
    },
    checked: {},
})

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

const useStyles = makeStyles(theme => ({
    text: {color: '#ffffff',  },
    header: {fontSize: 64,textAlign: 'center', marginBottom: 10},
    subheader: {fontSize: 32, textAlign: 'center', marginTop: 0},
    infoText: {fontSize: 20, },
    textBox: {
      marginRight: 400, marginLeft: 400,
    },
    mainContainer: {
        width: "100%",
        justifyContent: "center"
    },
    controlPanel: {
        marginLeft: 15,
        marginTop: 15
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    select: {
        '&:before': {
            borderColor: "#fff",
        },
        '&:after': {
            borderColor: "#fff",
        }
    },
    icon: {
        fill: "#fff",
    },
    switchToggle: {
        backgroundColor: "#fff",
    },
   
  
  }));

  const towns = ["Castle", "Rampart", 'Tower', 'Inferno', 'Necropolis', 'Dungeon', 'Stronghold', 'Fortress', 'Conflux']
  const townColors = {"Castle": indigo[500], "Rampart": green[800], 'Tower': cyan[100], 'Inferno': red[800], 'Necropolis': grey[500], 'Dungeon': purple[500], 'Stronghold': brown[400], 'Fortress': lightGreen[500], 'Conflux': orange[500]}
  const statColors = {"Attack": indigo[500], "Defence": green[800], 'Damage min': cyan[100], 'Damage max': red[800], 'Hitpoints': grey[500], 'Speed': purple[500], 'Growth': brown[400], 'AI Value': lightGreen[500], 'Cost': orange[500]}
  const stats = [["Attack", "Att"], ["Defence", "Def"], ["Damage min", "D-"], ["Damage max", "D+"], ["Hitpoints", "HP"], ["Speed", "Spd"], ["AI Value", "Val"], ["Cost", "Cost"] ]
  const countInGrowth = ["D-", "D+", "HP", "Val", "Cost" ]

  const defaultRadarOptions = {
    scale: {
        gridLines: {
          color: "#555"
        },
        ticks: {
            suggestedMin: 60,
            suggestedMax: 100
        }
      }
  }

  

  const ExtraData = () => {
    const classes = useStyles();
    const [combineCharts, setCombineCharts] = React.useState(false)

    const data = _.mapValues(creatureData, townData => {
        return stats.map(stat => {
            return _.sum(townData.map(c => countInGrowth.includes(stat[1]) ? c[stat[1]] * (c.Grw/2.0) : c[stat[1]]))
            
        })
    })
    const normalizingArray = stats.map((stat, i) => _.maxBy(_.values(data), townData => {
        return townData[i]
    })[i])
    
    const getOptions = townName => {
        return {
            ...defaultRadarOptions,
            legend: {
                display: combineCharts,
            },
            
            title: {
                display: !combineCharts,
                text: townName 
            }
        }
    }

    const formRow = rowIndex => {
        return (
          <React.Fragment>
            <Grid item xs={4}>
                {<Radar options={getOptions(towns[rowIndex * 3])} data={getOneRadar(towns[rowIndex * 3])}/>}
            </Grid>
            <Grid item xs={4}>
                {<Radar options={getOptions(towns[rowIndex * 3+1])} data={getOneRadar(towns[rowIndex * 3 + 1])}/>}
            </Grid>
            <Grid item xs={4}>
                {<Radar options={getOptions(towns[rowIndex * 3+2])} data={getOneRadar(towns[rowIndex * 3 + 2])}/>}
            </Grid>
          </React.Fragment>
        );
    }

    const getSeperateRadars = () => {
        return _.range(3).map(i =>
            <Grid container item xs={12} spacing={3} key={i}>
                {formRow(i)}
            </Grid>
        )
    }

    const getCombinedRadars = () => {
        return {
            labels: stats.map(stat => stat[0]),
            datasets: _.keys(data).map(townName => getRadarData(townName))
        }
    }

    const getOneRadar = (townName) => {
        return {
            labels: stats.map(stat => stat[0]),
            datasets: [getRadarData(townName)]

        }
    }

    const getRadarData = townName => {
        /*
        console.log(creatureData)
        console.log(data)
        console.log(normalizingArray)
        */
        console.log(townName)
        console.log(data[townName].map((stat,i) => stat / normalizingArray[i] * 100))
        return {
            label: townName,
            borderColor: townColors[townName],
            pointBackgroundColor: townColors[townName],
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: data[townName].map((stat,i) => stat / normalizingArray[i] * 100)
        }
            
        
    }


    

    return (
        <div className={classes.mainContainer}>
            <Grid container>
                <Grid item  xs={1}>
                    <div className={classes.controlPanel}>
                        <FormControlLabel
                            control={
                                <Switch
                                    color="primary"
                                    checked={combineCharts}
                                    onChange={event => setCombineCharts(event.target.checked) }
                                    classes={{
                                        track: classes.switchToggle
                                    }}
                                />
                            }
                            classes={{label: classes.text}}
                            label="Combine"
                        />
                    </div>
                </Grid>
                <Grid item xs={10}>
                <Grid container spacing={1}>
                    {combineCharts ? 
                        <Radar options={defaultRadarOptions} data={getCombinedRadars()}/>
                    :
                        getSeperateRadars()
                    }
                </Grid> 
            </Grid>
            <Grid item  xs={1}>
            </Grid>
            </Grid>
        </div>
    )
}

export default ExtraData