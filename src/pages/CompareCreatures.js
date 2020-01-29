import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Line, Bar } from 'react-chartjs-2';
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
import { indigo, green, red, grey, brown, lightGreen, orange, purple, cyan } from '@material-ui/core/colors';

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
  const statColors = {"Attack": indigo[500], "Defence": green[800], 'Damage min': cyan[100], 'Damage max': red[800], 'Hitpoints': grey[500], 'Speed': purple[500], 'Growth': brown[400], 'AI Value': lightGreen[500], 'Cost': orange[500]}
  const stats = [["Attack", "Att"], ["Defence", "Def"], ["Damage min", "D-"], ["Damage max", "D+"], ["Hitpoints", "HP"], ["Speed", "Spd"], ["Growth", "Grw"], ["AI Value", "Val"], ["Cost", "Cost"] ]

  const CompareCreatures = () => {
      const classes = useStyles();
      const [currentTier, setCurrentTier] = React.useState("1")
      const [tickMax, setTickMax] = React.useState(300)
      const [combineCharts, setCombineCharts] = React.useState(false)
      const [showStat, setShowStat] = React.useState(new Array(stats.length).fill(true))

      const getStatData = statName => {
          const shortenedName = stats.find(item => item[0] === statName)[1]
          return {
                labels: towns,
                datasets: [
                    {
                        backgroundColor: statColors[statName],
                        borderWidth: 1,
                        borderColor: cyan[500],
                        hoverBackgroundColor: cyan[500],
                        hoverBorderColor: cyan[500],
                        label: statName,
                        data: _.flatten(_.values(creatureData).map(town => town.filter(c => c.Lvl.toString() === currentTier).map(c => c[shortenedName])))
                    }
                ]
            }
        
    }

    const getAllStatsData = () => {
        const allData = [] 
        for(let i = 0; i < stats.length; i++) {
            allData.push(_.flatten(_.values(creatureData).map(town => town.filter(c => c.Lvl.toString() === currentTier).map(c => c[stats[i][1]]))))
        }
        return {
            labels: towns,
            datasets: allData.filter((n, i) => showStat[i]).map((arr,i) => {
                return {
                    backgroundColor: statColors[stats.filter((n, i) => showStat[i])[i][0]],
                    borderWidth: 1,
                    label: stats.filter((n, i) => showStat[i])[i][0],
                    data: arr
                }
            })
            
        }
    }

    const getOptions = statName => {
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
                            suggestedMax: null//combineCharts ? null: tickMax
                        }
                      }
                ]
            },
            title: {
                display: !combineCharts,
                text: statName 
            }
        }
    }

    const formRow = rowIndex => {
        return (
          <React.Fragment>
            <Grid item xs={4}>
                {<Bar options={getOptions(stats[rowIndex * 3][0])} data={getStatData(stats[rowIndex * 3][0])}/>}
            </Grid>
            <Grid item xs={4}>
                {<Bar options={getOptions(stats[rowIndex * 3+1][0])} data={getStatData(stats[rowIndex * 3 + 1][0])}/>}
            </Grid>
            <Grid item xs={4}>
                {<Bar options={getOptions(stats[rowIndex * 3+2][0])} data={getStatData(stats[rowIndex * 3 + 2][0])}/>}
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

    const handleChangeStatVisibility = i => {
        const tmp = [...showStat]
        tmp[i] = !tmp[i]
        setShowStat(tmp)
        //setTickMax(_.maxBy(_.flatten(_.values(_.mapValues(creatureData,townData => townData.filter((n, i) => tmp[i])))), c => c[currentStat])[currentStat])
    }

    const getStatCheckboxes = ( ) => {
        return stats.map( (stat, i) =>
            <Grid container key={stat[0]}>
                <Grid item xs={6}>
                    <FormControlLabel
                        control={<CustomCheckbox color="primary" checked={showStat[i]} onChange={() => handleChangeStatVisibility(i)} value={stat[1]} />}
                        label={stat[0]}
                        classes={{label: classes.text}}

                        />
                </Grid>
            </Grid>
                        

        )
    }


    const handleTierChange = event => {
        setCurrentTier(event.target.value)
        //setTickMax(_.maxBy(_.flatten(_.values(_.mapValues(creatureData,townData => townData.filter((n, i) => showTier[i])))), c => c[event.target.value])[event.target.value])
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
                                value={currentTier}
                                onChange={handleTierChange}
                                style={{color: "#fff"}}
                                className={classes.select}
                                inputProps={{
                                    classes: {
                                        icon: classes.icon,
                                    },
                                }}
                            >
                                <MenuItem value={"1"}>Tier 1</MenuItem>
                                <MenuItem value={"1+"}>Tier 1+</MenuItem>
                                <MenuItem value={"2"}>Tier 2</MenuItem>
                                <MenuItem value={"2+"}>Tier 2+</MenuItem>
                                <MenuItem value={"3"}>Tier 3</MenuItem>
                                <MenuItem value={"3+"}>Tier 3+</MenuItem>
                                <MenuItem value={"4"}>Tier 4</MenuItem>
                                <MenuItem value={"4+"}>Tier 4+</MenuItem>
                                <MenuItem value={"5"}>Tier 5</MenuItem>
                                <MenuItem value={"5+"}>Tier 5+</MenuItem>
                                <MenuItem value={"6"}>Tier 6</MenuItem>
                                <MenuItem value={"6+"}>Tier 6+</MenuItem>
                                <MenuItem value={"7"}>Tier 7</MenuItem>
                                <MenuItem value={"7+"}>Tier 7+</MenuItem>

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
                        {combineCharts && 
                            <FormGroup>
                                {getStatCheckboxes()}
                            
                            </FormGroup>
                        }
                    </div>
                </Grid>
                <Grid item xs={10}>
                <Grid container spacing={1}>
                    {combineCharts ?
                        <Bar options={getOptions("")} data={getAllStatsData()}/> 
                    :
                        getAllCharts()
                    }
                </Grid> 
            </Grid>
            <Grid item  xs={1}>
            </Grid>
            </Grid>
        </div>
    )
}

export default CompareCreatures