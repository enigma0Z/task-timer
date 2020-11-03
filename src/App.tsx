import React, { Component } from 'react';

import {
    AppBar,
    createStyles,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    Switch,
    Theme,
    Toolbar,
    Typography,
    WithStyles, withStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button/Button';

import './App.css';
import { LabelSlider } from './components/label-slider';
import { Countdown } from './data/model/countdown'
import { TimeFormat } from './data/format/time'

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

    sideBar: {
        width: 250
    }
});

interface AppProps extends WithStyles<typeof styles> { }

interface AppState {
    workLength: number,
    breakLength: number,
    running: boolean,
    secondsLeft: number,
    currentCountdown: Countdown,
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

DEFAULT_COUNTDOWNS[0].setNext(DEFAULT_COUNTDOWNS[1])
DEFAULT_COUNTDOWNS[1].setNext(DEFAULT_COUNTDOWNS[0])

const App = withStyles(styles)(class AppComponent extends Component<AppProps, AppState> {
    private timer: any;
    public notification: any;

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
            currentCountdown: DEFAULT_COUNTDOWNS[0]
        }

        this.getButtonText = this.getButtonText.bind(this)
        this.handleStartStopOnClick = this.handleStartStopOnClick.bind(this)
        this.updateSecondsLeft = this.updateSecondsLeft.bind(this)
        this.requestNotificationPermission = this.requestNotificationPermission.bind(this)
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

                localStorage.setItem('secondsLeft', Math.floor(newSecondsLeft).toString())

                this.setUpdateTimer()
            } else {
                this.stopTimer()
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

    startTimer() {
        let now = Date.now()
        let newEndTime = now + (this.state.currentCountdown.value * 60 * 1000)
        let newSecondsLeft = this.state.currentCountdown.value * 60

        this.setState({
            running: true,
            endTime: newEndTime,
            secondsLeft: newSecondsLeft
        })

        localStorage.setItem('running', true.toString())
        localStorage.setItem('endTime', newEndTime.toString())
        localStorage.setItem('secondsLeft', newSecondsLeft.toString())
        localStorage.setItem('currentCountdownName', this.state.currentCountdown.name)

        this.setUpdateTimer()
    }

    stopTimer(showNotification: boolean = true) {
        if (showNotification && this.state.notificationSupport) {
            let notification = new Notification(
                APP_TITLE,
                {
                    body: `${this.state.currentCountdown.name} completed!`,
                }
            )

            notification.onclick = (event: Event) => { notification.close(); window.focus() }
        }

        this.setState({
            running: false,
            secondsLeft: 0,
            currentCountdown: this.getNextCountdown()
        })

        localStorage.setItem('running', false.toString())
        localStorage.setItem('secondsLeft', '0')
        localStorage.setItem('currentCountdownName', this.getNextCountdown().name)

        this.clearUpdateTimer()
    }

    handleStartStopOnClick() {
        if (!this.state.running) {
            this.startTimer()
        } else {
            this.stopTimer(false)
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
                    }}
                    formatCallback={(value: number) => TimeFormat.minutes(value)}
                />
            </Grid>
        )
    }

    requestNotificationPermission() {
        if (this.state.notificationSupport) {
            if (Notification.permission === 'default') {
                Notification.requestPermission()
            } else if (Notification.permission === 'denied') {
                alert('Notifications have been disabled, enable them in your browser')
            }
        }
    }

    componentDidMount() {
        this.requestNotificationPermission()

        // Load from state
        const running = localStorage.getItem('running') === 'true'
        const endTime = localStorage.getItem('endTime')
        const secondsLeft = localStorage.getItem('secondsLeft')
        const currentCountdown = this.state.countdowns.find((countdown: Countdown) => { return countdown.name === localStorage.getItem('currentCountdownName') })

        this.setState({
            running: running,
            endTime: endTime ? parseInt(endTime) : this.state.endTime,
            secondsLeft: secondsLeft ? parseInt(secondsLeft) : this.state.secondsLeft,
            currentCountdown: currentCountdown ? currentCountdown : this.state.currentCountdown
        })

        if (running) {
            this.setUpdateTimer()
        }
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
                            onClick={() => { this.setState({ sidebarOpen: true }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {APP_TITLE}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    anchor='left'
                    open={this.state.sidebarOpen}
                    onClose={() => { this.setState({ sidebarOpen: false }) }}
                >
                    <div className={classes.sideBar} >
                        <List>
                            <ListItem
                                button
                                onClick={this.requestNotificationPermission}
                            >
                                <ListItemIcon><NotificationsIcon /></ListItemIcon>
                                <ListItemText primary="Notifications" />
                                <ListItemSecondaryAction>
                                    <Switch
                                        edge="end"
                                        onClick={this.requestNotificationPermission}
                                        checked={this.state.notificationSupport && Notification.permission === 'granted'}
                                        inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
                                        disabled={this.state.notificationSupport === false}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
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
                                    {this.getButtonText()}
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper> </Grid>
                    <Grid item xs>
                        <Paper className={classes.paperContainer}>
                            <Typography variant="h5">{this.state.running ? "Running" : "On deck"}: {this.state.currentCountdown.name}</Typography>
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
