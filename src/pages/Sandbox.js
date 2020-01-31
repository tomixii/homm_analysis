import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Line } from 'react-chartjs-2';
import creatureData from '../data/creaturedata_grouped.json'
import { Grid } from '@material-ui/core';
import _ from 'lodash'
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
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
  const defaultLineOptions = {
   
    lineTension: 0,
    borderColor: cyan[500],
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: cyan[500],
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: cyan[500],
    pointHoverBorderColor: cyan[500],
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    responsive: true,
    maintainAspectRatio: true,
  }

  const towns = ["Castle", "Rampart", 'Tower', 'Inferno', 'Necropolis', 'Dungeon', 'Stronghold', 'Fortress', 'Conflux']
  const townColors = {"Castle": indigo[500], "Rampart": green[800], 'Tower': cyan[100], 'Inferno': red[800], 'Necropolis': grey[500], 'Dungeon': purple[500], 'Stronghold': brown[400], 'Fortress': lightGreen[500], 'Conflux': orange[500]}
  
  const ComapreTowns = () => {
      const classes = useStyles();
      const [attMultiplier, setAttMultiplier] = React.useState(1)
      const [defMultiplier, setDefMultiplier] = React.useState(1)
      const [hpMultiplier, setHpMultiplier] = React.useState(1)
      const [dmgMultiplier, setDmgMultiplier] = React.useState(1)
      const [speedMultiplier, setSpeedMultiplier] = React.useState(1)
      const [offset, setOffset] = React.useState(0)

    const calcAIValue = creature => {
        const {Att, Def, HP, Spd} = creature
        const DMin = creature["D-"]
        const DMax = creature["D+"] 
        console.log(attMultiplier, defMultiplier, hpMultiplier, dmgMultiplier, speedMultiplier)
        return attMultiplier * Att + defMultiplier * Def + hpMultiplier * HP + dmgMultiplier * Math.floor((DMin + DMax) / 2.0) + (Spd-3) * speedMultiplier + offset
    }

    const getLines = () => {
        return {
            labels:_.range(0,126),
            datasets:[
                {
                    ...defaultLineOptions,
                    borderColor: cyan[500],
                    pointHoverBackgroundColor: cyan[500],
                    pointHoverBorderColor: cyan[500],
                    label: "My AI Value",
                    fill: false,
                    data: _.flatten(_.values(creatureData)).map(c => calcAIValue(c))
                },
                {
                    ...defaultLineOptions,
                    borderColor: red[500],
                    pointHoverBackgroundColor: red[500],
                    pointHoverBorderColor: red[500],
                    label: "Real AI Value",
                    fill: false,
                    data: _.flatten(_.values(creatureData)).map(c => c.Val)
                }
            ]
            
        }
    }

    const getOptions = townName => {
        return {
            scales: {
                xAxes: [
                    {
                        gridLines: {
                          color: '#555',
                          borderDash: [2, 3],
                        },
                      }
                ],
                yAxes: [
                    {
                        gridLines: {
                          color: '#555',
                          borderDash: [2, 3],
                        },
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: null
                        }
                      }
                ]
            },
            title: {
                display: "AI Value",
                text: townName 
            }
        }
    }

    const getSlider = (name, func, step = 1, min = 0, max = 50,) => {
        return (
            <div>

                <Typography id="discrete-slider" gutterBottom color="primary">
                    {name}
                </Typography>
                <Slider
                    defaultValue={1}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={step}
                    min={min}
                    max={max}
                    onChange={(event, value) => func(value)}
                />
            </div>
        )
    }

    return (
        <div className={classes.mainContainer}>
            <Grid container>
                <Grid item  xs={1}>
                    <div className={classes.controlPanel}>
                        {getSlider("Attack multiplier", setAttMultiplier)}
                        {getSlider("Defence multiplier", setDefMultiplier)}
                        {getSlider("HP multiplier", setHpMultiplier)}
                        {getSlider("Damage multiplier", setDmgMultiplier)}
                        {getSlider("Speed multiplier", setSpeedMultiplier)}
                        {getSlider("Offset", setOffset, 1, -200, 200)}


                    </div>
                </Grid>
                <Grid item xs={10}>
                <Grid container spacing={1}>
                    <Line options={getOptions("")} data={getLines()}/> 
                    
                </Grid> 
            </Grid>
            <Grid item  xs={1}>
            </Grid>
            </Grid>
        </div>
    )
}

export default ComapreTowns