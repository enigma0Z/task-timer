import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button/Button';
import { AppBar, createStyles, Grid, IconButton, Paper, TextField, Theme, Toolbar, Typography, WithStyles, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { LabelSlider } from './components/label-slider';

import { Countdown } from './data/countdown'

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },

  fillWidth: {
    width: '100%',
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  title: {
    flexGrow: 1,
  },

  gridContainer: {
    flexGrow: 1,
    padding: 8,
  },

  paperContainer: {
    padding: 8
  },

  sliderBox: {
    paddingTop: 16
  }
});

interface AppProps extends WithStyles<typeof styles> {
  countdowns: Countdown[]
}

interface AppState {
  workLength: number,
  breakLength: number,
  running: boolean,
  secondsLeft: number,
  currentCountdown: Countdown,
  endTime?: number,
}

const defaultCountdowns: Countdown[] = [
  new Countdown('Work', 5, 90, 50),
  new Countdown('Break', 5, 15, 10),
]

defaultCountdowns[0].setNext(defaultCountdowns[1])
defaultCountdowns[1].setNext(defaultCountdowns[0])

const App = withStyles(styles)(class AppComponent extends Component<AppProps, AppState> {
  static defaultProps = {
    countdowns: defaultCountdowns
  }

  private timer: any;

  constructor(props: AppProps) {
    super(props)
    this.state = {
      workLength: 50,
      breakLength: 10,
      running: false,
      secondsLeft: 0,
      currentCountdown: this.props.countdowns[0]
    }

    this.getButtonText = this.getButtonText.bind(this)
    this.handleStartStopOnClick = this.handleStartStopOnClick.bind(this)
    this.updateSecondsLeft = this.updateSecondsLeft.bind(this)
  }

  getTimerText(timerSeconds: number): string {
    let hours = Math.floor(timerSeconds / 60 / 60)
    let minutes = Math.floor((timerSeconds - (hours * 60 * 60)) / 60)
    let seconds = Math.floor(timerSeconds - (hours * 60 * 60) - (minutes * 60))

    let returnStr: string[] = []

    if (hours > 0) {
      returnStr.push(`${hours}h`)
    }

    if (minutes > 0) {
      returnStr.push(`${minutes}m`)
    }

    returnStr.push(`${seconds}s`)

    return returnStr.join(' ')
  }

  getButtonText() {
    if (this.state.running) {
      return "Stop"
    } else {
      return "Start"
    }
  }

  getNextCountdown(): Countdown {
    if (this.state.currentCountdown.next !== undefined) {
      return this.state.currentCountdown.next
    }

    return this.state.currentCountdown
  }

  updateSecondsLeft() {
    if (this.state.endTime !== undefined) {
      let newSecondsLeft = (this.state.endTime - Date.now()) / 1000
      if (this.state.running && newSecondsLeft > 0) {
        this.setState({
          secondsLeft: Math.floor(newSecondsLeft)
        })

        this.setUpdateTimer()
      } else {
        console.log('Stopping, next timer:', this.getNextCountdown())
        this.setState({
          running: false,
          secondsLeft: 0,
          currentCountdown: this.getNextCountdown()
        })

        clearTimeout(this.timer)
      }
    } else {
      return 0
    }
  }

  setUpdateTimer() {
    this.timer = setTimeout(() => { this.updateSecondsLeft() }, 1000)
  }

  clearUpdateTimer() {
    clearTimeout(this.timer)
  }

  handleStartStopOnClick() {
    if (!this.state.running) {
      this.setState({
        running: true
      })

      let now = Date.now()
      let newEndTime = now + (this.state.currentCountdown.value * 60 * 1000)
      let newSecondsLeft = this.state.currentCountdown.value * 60

      this.setState({
        endTime: newEndTime,
        secondsLeft: newSecondsLeft
      })

      this.setUpdateTimer()
    } else {
      this.setState({
        running: false,
        secondsLeft: 0
      })
    }
  }

  renderSliders() {
    return this.props.countdowns.map((countdown) =>
      <Grid item key={countdown.name}>
        <LabelSlider
          label={countdown.name}
          labelSuffix="m"
          value={countdown.value}
          step={1}
          min={countdown.min}
          max={countdown.max}
          onChange={(value: number, thisCountdown: Countdown = countdown) => {
            thisCountdown.value = value
          }}
        />
      </Grid>
    )
  }

  render() {

    const classes = this.props.classes

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Start a new task
            </Typography>
            <Button color="inherit">Test</Button>
          </Toolbar>
        </AppBar>
        <Grid container className={classes.gridContainer} spacing={2}>
          <Grid item xs={12} lg={2}> <Paper className={classes.paperContainer}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="h5">
                  Timer parameters
                </Typography>
              </Grid>
              <Grid item>
                <TextField label="Task Name" /><br />
              </Grid>
              {this.renderSliders()}
              <Grid item>
                <Button variant="contained" className={classes.fillWidth} onClick={this.handleStartStopOnClick}>
                  {this.getButtonText()}
                </Button>
              </Grid>
            </Grid>
          </Paper> </Grid>
          <Grid item xs>
            <Paper className={classes.paperContainer}>
              <Typography variant="h5">{this.state.running ? "Running" : "On deck"}: {this.state.currentCountdown.name}</Typography>
              <Typography variant="h6">Time left {this.getTimerText(this.state.secondsLeft)}</Typography>
              <Typography variant="caption">Up next: {this.getNextCountdown().name}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
});

export default App;
