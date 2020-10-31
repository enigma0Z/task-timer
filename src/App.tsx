import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button/Button';
import { AppBar, createStyles, Grid, IconButton, Paper, TextField, Theme, Toolbar, Typography, WithStyles, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { LabelSlider } from './components/label-slider';

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
    paddingTop:16
  }
});

enum TimerKind {
  WORK, BREAK
}

interface AppProps extends WithStyles<typeof styles> { }

interface AppState {
  workLength: number,
  breakLength: number,
  running: boolean,
  secondsLeft: number,
  currentTimer: TimerKind,
  endTime?: number,
}

const App = withStyles(styles)(class AppComponent extends Component<AppProps, AppState> {
  private timer: any;

  constructor(props: AppProps) {
    super(props)
    this.state = {
      workLength: 50,
      breakLength: 10,
      running: false,
      secondsLeft: 0,
      currentTimer: TimerKind.WORK
    }

    this.getButtonText = this.getButtonText.bind(this)
    this.handleStartOnClick = this.handleStartOnClick.bind(this)
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

  getNextTimer() {
    if (this.state.currentTimer === TimerKind.WORK) {
      return TimerKind.BREAK
    } else if (this.state.currentTimer === TimerKind.BREAK) {
      return TimerKind.WORK
    }
  }

  updateSecondsLeft() {
    if (this.state.running && this.state.endTime !== undefined) {
      let newSecondsLeft = (this.state.endTime - Date.now())/1000
      if (newSecondsLeft > 0) {
        this.setState({
          secondsLeft: Math.floor(newSecondsLeft)
        })

        this.setUpdateTimer()
      } else {
        this.setState({
          running: false,
          secondsLeft: 0
        })

        clearTimeout(this.timer)
      }
    } else {
      return 0
    }
  }

  setUpdateTimer() {
    this.timer = setTimeout(() => {this.updateSecondsLeft()}, 1000)
  }

  clearUpdateTimer() {
    clearTimeout(this.timer)
  }

  handleStartOnClick() {
    if (!this.state.running) {
      this.setState({
        running: true
      })

      let now = Date.now()
      let newEndTime = now + (this.state.workLength * 60 * 1000)
      let newSecondsLeft = this.state.workLength * 60

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

  componentDidMount() {
  }

  componentDidUpdate() {
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
            <Typography variant="h5">
              Timer parameters
            </Typography>
            <TextField label="Task Name"/><br/>
            <LabelSlider
              label="Work Length"
              labelSuffix="m"
              value={this.state.workLength}
              step={5}
              min={15}
              max={90}
              onChange={(value: number) => { this.setState({
                workLength: value
              }) }}
            />
            <LabelSlider
              label="Break Length"
              labelSuffix="m"
              value={this.state.breakLength}
              step={5}
              min={5}
              max={30}
              onChange={(value: number) => { console.log(value); this.setState({
                breakLength: value
              }) }}
            />
            <Button variant="contained" className={classes.fillWidth} onClick={this.handleStartOnClick}>
              {this.getButtonText()}
            </Button>
          </Paper> </Grid>
          <Grid item xs>
            <Paper>
              <Typography variant="h6">Time left {this.getTimerText(this.state.secondsLeft)}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
});

export default App;
