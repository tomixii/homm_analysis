import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Line } from 'react-chartjs-2';
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
      const [currentStat, setCurrentStat] = React.useState("HP")
      const [tickMax, setTickMax] = React.useState(300)
      const [combineCharts, setCombineCharts] = React.useState(false)
      const [normalizeWithGold, setNormalizeWithGold] = React.useState(false)
      const [showTier, setShowTier] = React.useState(new Array(14).fill(true))

      const getTownData = townName => {
          console.log(creatureData[townName].filter((n, i) => showTier[i]).map(c => normalizeWithGold ? c[currentStat] / c.Cost : c[currentStat]))
          return {
                labels: creatureData[townName].filter((n, i) => showTier[i]).map(c => c.Name),
                datasets: [
                    {
                        ...defaultLineOptions,
                        borderColor: townColors[townName],
                        pointHoverBackgroundColor: townColors[townName],
                        pointHoverBorderColor: townColors[townName],
                        label: townName,
                        fill: false,
                        data: creatureData[townName].filter((n, i) => showTier[i]).map(c => normalizeWithGold ? c[currentStat] / c.Cost : c[currentStat])
                    }
                ]
            }
        
    }

    const calcAIValue = creature => {
        const {Att, Def, HP, Spd} = creature
        const DMin = creature["D-"]
        const DMax = creature["D+"] 
        console.log(DMin, DMax, (DMin + DMax) / 2.0)
        return (Att + Def + HP + Math.ceil((DMin + DMax) / 2.0)) * Spd
    }

    const getAllTownsData = () => {
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
                    data: _.flatten(_.values(creatureData)).filter(c => c.Special === "").map(c => calcAIValue(c))
                },
                {
                    ...defaultLineOptions,
                    borderColor: red[500],
                    pointHoverBackgroundColor: red[500],
                    pointHoverBorderColor: red[500],
                    label: "Real AI Value",
                    fill: false,
                    data: _.flatten(_.values(creatureData)).filter(c => c.Special === "").map(c => c.Val)
                }
            ]
            
        }
    }

    const getOptions = townName => {
        return {
            legend: {
                display: combineCharts,
            },
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
                            suggestedMax: combineCharts ? null: tickMax
                        }
                      }
                ]
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
                {<Line options={getOptions(towns[rowIndex * 3])} data={getTownData(towns[rowIndex * 3])}/>}
            </Grid>
            <Grid item xs={4}>
                {<Line options={getOptions(towns[rowIndex * 3+1])} data={getTownData(towns[rowIndex * 3 + 1])}/>}
            </Grid>
            <Grid item xs={4}>
                {<Line options={getOptions(towns[rowIndex * 3+2])} data={getTownData(towns[rowIndex * 3 + 2])}/>}
            </Grid>
          </React.Fragment>
        );
      }

    const getAllCharts = () => {
        return _.range(3).map(i =>
            <Grid container item xs={12} spacing={3} key={i}>
                {formRow(i)}
            </Grid>
        )
        
    }

    const handleChangeTierVisibility = i => {
        const tmp = [...showTier]
        tmp[i] = !tmp[i]
        const maxTickCreature = _.maxBy(_.flatten(_.values(_.mapValues(creatureData,townData => townData.filter((n, i) => tmp[i])))), c => normalizeWithGold ? c[currentStat]/c.Cost : c[currentStat])
        setShowTier(tmp)
        console.log(normalizeWithGold ? maxTickCreature[currentStat] / maxTickCreature.Cost : maxTickCreature[currentStat])
        setTickMax(normalizeWithGold ? maxTickCreature[currentStat] / maxTickCreature.Cost : maxTickCreature[currentStat] )
    }

    const getTierCheckboxes = ( ) => {
        return _.range(7).map( i =>
            <Grid container key={i}>
                <Grid item xs={6}>
                    <FormControlLabel
                        control={<CustomCheckbox color="primary" checked={showTier[i*2]} onChange={() => handleChangeTierVisibility(i*2)} value={(i+1).toString()} />}
                        label={i+1}
                        classes={{label: classes.text}}

                        />
                </Grid>
                <Grid item xs={6}>
                    <FormControlLabel
                        control={<CustomCheckbox  color="primary" checked={showTier[i*2+1]} onChange={() => handleChangeTierVisibility(i*2+1)} value={(i+1).toString().concat("+")} />}
                        label={(i+1).toString().concat("+")}
                        classes={{label: classes.text}}

                    />
                </Grid>
            </Grid>
                        

        )
    }


    const handleStatChange = event => {
        
        setCurrentStat(event.target.value)
        const maxTickCreature = _.maxBy(_.flatten(_.values(_.mapValues(creatureData,townData => townData.filter((n, i) => showTier[i])))), c => normalizeWithGold ? c[event.target.value]/c.Cost : c[event.target.value])
        setTickMax(normalizeWithGold ? maxTickCreature[event.target.value] / maxTickCreature.Cost : maxTickCreature[event.target.value] )
    }

    return (
        <div className={classes.mainContainer}>
            <Grid container>
                <Grid item  xs={1}>
                    <div className={classes.controlPanel}>

                        <FormControl className={classes.formControl} color="primary" style={{color: "#fff"}}>
                            <Select
                                labelId="currentStatLabel"
                                id="currentStat"
                                value={currentStat}
                                onChange={handleStatChange}
                                style={{color: "#fff"}}
                                className={classes.select}
                                inputProps={{
                                    classes: {
                                        icon: classes.icon,
                                    },
                                }}
                            >
                                <MenuItem value={"Att"}>Attack</MenuItem>
                                <MenuItem value={"Def"}>Defence</MenuItem>
                                <MenuItem value={"D-"}>Min Damage</MenuItem>
                                <MenuItem value={"D+"}>Max Damage</MenuItem>
                                <MenuItem value={"HP"}>HP</MenuItem>
                                <MenuItem value={"Spd"}>Speed</MenuItem>
                                <MenuItem value={"Grw"}>Growth</MenuItem>
                                <MenuItem value={"Cost"}>Cost</MenuItem>
                                <MenuItem value={"Val"}>AI Value</MenuItem>

                            </Select>
                        </FormControl>
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
                        <FormControlLabel
                            control={
                                <Switch
                                    color="primary"
                                    checked={normalizeWithGold}
                                    onChange={event => {
                                        const maxTickCreature = _.maxBy(_.flatten(_.values(_.mapValues(creatureData,townData => townData.filter((n, i) => showTier[i])))), c => event.target.checked ? c[currentStat]/c.Cost : c[currentStat])
                                        setTickMax(event.target.checked ? maxTickCreature[currentStat] / maxTickCreature.Cost : maxTickCreature[currentStat] )
                                        
                                        setNormalizeWithGold(event.target.checked)}
                                    }
                                    classes={{
                                        track: classes.switchToggle
                                    }}
                                />
                            }
                            classes={{label: classes.text}}
                            label="Per 1 gold"
                        />
                        <FormGroup>
                            {getTierCheckboxes()}
                        
                        </FormGroup>
                    </div>
                </Grid>
                <Grid item xs={10}>
                <Grid container spacing={1}>
                    <Line options={getOptions("")} data={getAllTownsData()}/> 
                    
                </Grid> 
            </Grid>
            <Grid item  xs={1}>
            </Grid>
            </Grid>
        </div>
    )
}

export default ComapreTowns