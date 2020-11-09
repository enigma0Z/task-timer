import React, { Component } from 'react';

import {
    AppBar,
    createStyles,
    Grid,
    IconButton,
    Paper,
    Theme,
    Toolbar,
    Typography,
    WithStyles, withStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button/Button';

import './App.css';
import { LabelSlider } from './components/LabelSlider';
import { Sidebar } from './components/Sidebar';
import { Countdown, CountdownJsonObject } from './data/Countdown'
import { TimeFormat } from './data/format/Time'

import { NotificationService } from './services/notification'

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
    },

});

interface AppProps extends WithStyles<typeof styles> { }

interface AppState {
    workLength: number,
    breakLength: number,
    running: boolean,
    secondsLeft: number,
    currentCountdownIndex: number,
    countdowns: Countdown[],
    sidebarOpen: boolean,
    notificationSupport: boolean,
    endTime?: number,
}

const APP_TITLE: string = 'Task Timer'
const DEFAULT_COUNTDOWNS: Countdown[] = [
    new Countdown('Work', 1, 90, 50),
    new Countdown('Break time', 1, 15, 10),
]

const notificationService: NotificationService = NotificationService.instance

const App = withStyles(styles)(class AppComponent extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)

        this.state = {
            workLength: 50,
            breakLength: 10,
            running: false,
            secondsLeft: 0,
            sidebarOpen: false,
            notificationSupport: "Notification" in window,
            countdowns: DEFAULT_COUNTDOWNS,
            currentCountdownIndex: 0
        }

        this.handleStartStopOnClick = this.handleStartStopOnClick.bind(this)
        this.updateCountdownState = this.updateCountdownState.bind(this)
        this.updateSubscriber = this.updateSubscriber.bind(this)
        this.saveCountdownsToLocalStorage = this.saveCountdownsToLocalStorage.bind(this)
    }

    get currentCountdown(): Countdown {
        return this.state.countdowns[this.state.currentCountdownIndex]
    }

    get nextCountdownIndex(): number {
        return (this.state.currentCountdownIndex + 1) % this.state.countdowns.length
    }

    getNextCountdown(): Countdown {
        return this.state.countdowns[this.nextCountdownIndex]
    }

    updateCountdownState(countdown: Countdown) {
        this.setState({
            secondsLeft: countdown.secondsLeft,
            running: countdown.running
        })

        this.saveCountdownsToLocalStorage()
    }

    saveCountdownsToLocalStorage() {
        localStorage.setItem(
            'countdowns',
            JSON.stringify(
                this.state.countdowns.map((countdown) => countdown.exportToJsonObject())
            )
        )
    }

    updateSubscriber() {
        this.updateCountdownState(this.currentCountdown)

        if (!this.currentCountdown.running) {
            notificationService.showNotification(
                APP_TITLE,
                {
                    body: `${this.currentCountdown.name} done`
                }
            )
            this.currentCountdown.unsubscribe(this.constructor.name)
        }
    }

    startTimer() {
        this.currentCountdown.subscribe(this.constructor.name, this.updateSubscriber)
        this.currentCountdown.start()
    }

    stopTimer() {
        this.currentCountdown.unsubscribe(this.constructor.name)
        this.currentCountdown.stop()
        this.updateCountdownState(this.currentCountdown)

        this.setState({
            currentCountdownIndex: this.nextCountdownIndex
        })

        localStorage.setItem('currentCountdownIndex', this.nextCountdownIndex.toString())
    }

    handleStartStopOnClick() {
        if (!this.state.running) {
            this.startTimer()
        } else {
            this.stopTimer()
        }
    }

    renderSliders() {
        return this.state.countdowns.map((countdown) =>
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
                        this.saveCountdownsToLocalStorage()
                    }}
                    onEditSave={(name: string, min: number, max: number) => {
                        countdown.name = name
                        countdown.min = min
                        countdown.max = max
                        this.saveCountdownsToLocalStorage()
                    }}
                    formatCallback={(value: number) => TimeFormat.minutes(value)}
                />
            </Grid>
        )
    }

    componentDidMount() {
        notificationService.requestDesktopNotificationPermissions()

        // Load from state
        const currentCountdownIndex = localStorage.getItem('currentCountdownIndex')
        const countdownsStr = localStorage.getItem('countdowns')

        if (countdownsStr !== null) {
            const countdowns = JSON.parse(countdownsStr).map((countdownJsonObject: CountdownJsonObject) => {
                return new Countdown().loadFromJsonObject(countdownJsonObject)
            })

            this.setState({
                countdowns: countdowns,
            })

            const runningCountdown: Countdown = countdowns.filter((countdown: Countdown) => {return countdown.running})[0]

            if (runningCountdown) {
                runningCountdown.update()
                runningCountdown.subscribe(this.constructor.name, this.updateSubscriber)
                this.updateCountdownState(runningCountdown)
            }
        }

        this.setState({
            currentCountdownIndex: currentCountdownIndex ? parseInt(currentCountdownIndex) : this.state.currentCountdownIndex
        })
    }

    render() {
        const classes = this.props.classes
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit" aria-label="menu"
                            onClick={() => {
                                this.setState({ sidebarOpen: true })
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {APP_TITLE}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Sidebar
                    onOpen={() => this.state.sidebarOpen}
                    onClose={() => {
                        this.setState({sidebarOpen: false})
                    }}
                />
                <Grid container className={classes.gridContainer} spacing={2}>
                    <Grid item xs={12} lg={2}> <Paper className={classes.paperContainer}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <Typography variant="h5">
                                    Timers
                                </Typography>
                            </Grid>
                            <Grid item>
                                {this.renderSliders()}
                            </Grid>
                            <Grid item>
                                <Button variant="contained" className={classes.fillWidth} onClick={this.handleStartStopOnClick}>
                                    {this.state.running ? 'Stop' : 'Start'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper> </Grid>
                    <Grid item xs>
                        <Paper className={classes.paperContainer}>
                            <Typography variant="h5">{this.state.running ? "Running" : "On deck"}: {this.currentCountdown.name}</Typography>
                            <Typography variant="h6">Time left {TimeFormat.seconds(this.state.secondsLeft)}</Typography>
                            <Typography variant="caption">Up next: {this.getNextCountdown().name}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
});

export default App;
