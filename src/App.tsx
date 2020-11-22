import React, { Component } from 'react';

import {
    AppBar,
    Box,
    Card,
    createStyles,
    Grid,
    IconButton,
    Paper,
    Theme,
    Toolbar,
    Typography,
    WithStyles, withStyles
} from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';

import { LabelSlider } from './components/LabelSlider';
import { Sidebar } from './components/Sidebar';
import { ConfirmationModal } from './components/ConfirmationModal';
import { Countdown, CountdownJsonObject } from './data/Countdown'
import { TimeFormat } from './data/format/Time'

import { NotificationService } from './services/notification'

import MenuIcon from '@material-ui/icons/Menu';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        overflow: 'hidden'
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

    popperCardStyle: {
        paddingLeft: theme.spacing(1),
        backgroundColor: theme.palette.grey[50],
        margin: 8,
        height: '100%'
    },

    popperContentsStyle: {
        marginRight: 8
    },

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        border: 'none'
    },

    statusStyle: {
        marginTop: -0.5,
        marginBottom: -1
    }
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
    editingOrder: boolean,
    confirmDeleteOpen: boolean
    confirmDeleteIndex: number
    confirmDeleteName: string
    confirmResetOpen: boolean
    warningNotificationSent: boolean
}

const APP_TITLE: string = 'Task Timer'
const DEFAULT_COUNTDOWNS: Countdown[] = [
    new Countdown('Work', 1, 90, 50),
    new Countdown('Break time', 1, 15, 10),
]

const notificationService: NotificationService = NotificationService.instance

const App = withStyles(styles)(class AppComponent extends Component<AppProps, AppState> {
    public sliderRefs: any[] = []

    constructor(props: AppProps) {
        super(props)

        const currentCountdownIndex = localStorage.getItem('currentCountdownIndex')
        const countdownsStr = localStorage.getItem('countdowns')
        let countdowns = DEFAULT_COUNTDOWNS

        if (countdownsStr !== null) {
            countdowns = JSON.parse(countdownsStr).map((countdownJsonObject: CountdownJsonObject) => {
                return new Countdown().loadFromJsonObject(countdownJsonObject)
            })
        }

        let secondsLeft = 0
        let running = false
        const runningCountdown: Countdown = countdowns.filter((countdown: Countdown) => { return countdown.running })[0]

        if (runningCountdown) {
            runningCountdown.update()
            secondsLeft = runningCountdown.secondsLeft
            running = true
        }

        this.state = {
            workLength: 50,
            breakLength: 10,
            running: running,
            secondsLeft: secondsLeft,
            sidebarOpen: false,
            notificationSupport: "Notification" in window,
            countdowns: countdowns,
            currentCountdownIndex: currentCountdownIndex ? parseInt(currentCountdownIndex) : 0,
            editingOrder: false,
            confirmDeleteOpen: false,
            confirmDeleteIndex: 0,
            confirmDeleteName: '',
            confirmResetOpen: false,
            warningNotificationSent: false
        }

        this.handleStartStopOnClick = this.handleStartStopOnClick.bind(this)
        this.updateCountdownState = this.updateCountdownState.bind(this)
        this.updateSubscriber = this.updateSubscriber.bind(this)
        this.saveCountdownsToLocalStorage = this.saveCountdownsToLocalStorage.bind(this)
        this.swapCountdowns = this.swapCountdowns.bind(this)
        this.deleteCountdown = this.deleteCountdown.bind(this)
    }

    componentDidMount() {
        notificationService.requestDesktopNotificationPermissions()
        if (this.state.running) {
            this.currentCountdown.subscribe(this.constructor.name, this.updateSubscriber)
        }
    }

    get currentCountdown(): Countdown {
        if (this.state.countdowns[this.state.currentCountdownIndex] === undefined) {
            this.setState({
                currentCountdownIndex: 0
            })
            localStorage.setItem('currentCountdownIndex', '0')
            return this.state.countdowns[0]
        } else {
            return this.state.countdowns[this.state.currentCountdownIndex]
        }
    }

    get nextCountdownIndex(): number {
        return (this.state.currentCountdownIndex + 1) % this.state.countdowns.length
    }

    swapCountdowns(a: number, b: number) {
        let lower: number
        let higher: number
        if (a < b) {
            lower = a
            higher = b
        } else if (b < a) {
            lower = b
            higher = a
        } else {
            throw new RangeError('Cannot swap an element with itself')
        }

        console.log({
            lower: lower,
            higher: higher
        })

        if (this.state.currentCountdownIndex === lower) this.setState({ currentCountdownIndex: higher })
        else if (this.state.currentCountdownIndex === higher) this.setState({ currentCountdownIndex: lower })

        let newCountdowns = [
            ...this.state.countdowns.slice(0, lower),
            this.state.countdowns[higher],
            this.state.countdowns[lower],
            ...this.state.countdowns.slice(higher + 1)
        ]

        console.log({
            currentCountdowns: this.state.countdowns,
            newCountdowns: newCountdowns
        })

        this.setState({
            countdowns: newCountdowns
        })
    }

    deleteCountdown(index: number) {
        let newCountdowns = [
            ...this.state.countdowns.slice(0, index),
            ...this.state.countdowns.slice(index + 1)
        ]

        this.saveCountdownsToLocalStorage(newCountdowns)

        this.setState({
            countdowns: newCountdowns
        })
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

    saveCountdownsToLocalStorage(countdowns: Countdown[] = this.state.countdowns) {
        localStorage.setItem(
            'countdowns',
            JSON.stringify(
                countdowns.map((countdown) => countdown.exportToJsonObject())
            )
        )
    }

    updateSubscriber() {

        if (this.currentCountdown.running) {
            this.updateCountdownState(this.currentCountdown)
            if (
                !this.state.warningNotificationSent
                && this.currentCountdown.secondsLeft < 300
                && this.currentCountdown.secondsLeft > 240
            ) {
                this.setState({
                    warningNotificationSent: true
                })

                notificationService.showNotification(
                    APP_TITLE,
                    {
                        body: `Stopping soon: ${this.currentCountdown.name}`
                    }
                )
            }
        } else {
            console.log('Stopping countdown')
            notificationService.showNotification(
                APP_TITLE,
                {
                    body: `Complete: ${this.currentCountdown.name}`
                }
            )
            this.stopTimer()
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
            currentCountdownIndex: this.nextCountdownIndex,
            warningNotificationSent: false
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
        const classes = this.props.classes
        let elements: JSX.Element[] = []

        for (let i in this.state.countdowns) {
            const index: number = parseInt(i)
            const countdown = this.state.countdowns[i]
            const upDisabled = index === 0
            const downDisabled = index === this.state.countdowns.length - 1

            if (this.state.editingOrder) {
                elements.push(
                    <Grid item key={countdown.name}>
                        <Card className={classes.popperCardStyle}>
                            <Box display='flex' flexDirection='row'>
                                <Box flex='100%' display='flex' justifyContent='left' alignItems='center'>
                                    <Typography variant='button'>
                                        {countdown.name}
                                    </Typography>
                                </Box>
                                <Box flex={1} display='flex' justifyContent='right' justifyItems='right'>
                                    <IconButton
                                        color='primary'
                                        disabled={upDisabled}
                                        onClick={() => {
                                            this.swapCountdowns(index, index - 1)
                                        }}
                                    >
                                        <ArrowUpwardIcon />
                                    </IconButton>
                                    <IconButton
                                        color='primary'
                                        disabled={downDisabled}
                                        onClick={() => {
                                            this.swapCountdowns(index, index + 1)
                                        }}
                                    >
                                        <ArrowDownwardIcon />
                                    </IconButton>
                                    <IconButton
                                        color='secondary'
                                        onClick={() => {
                                            this.setState({
                                                confirmDeleteOpen: true,
                                                confirmDeleteIndex: index,
                                                confirmDeleteName: countdown.name
                                            })
                                        }}
                                    >
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                )
            } else {
                console.log(countdown.name, countdown.value)
                elements.push(
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
                                console.log('value', value, this.state.countdowns, thisCountdown)
                                this.saveCountdownsToLocalStorage()
                            }}
                            onEditSave={(name: string, min: number, max: number) => {
                                countdown.name = name
                                countdown.min = min
                                countdown.max = max
                                this.forceUpdate()
                                this.saveCountdownsToLocalStorage()
                            }}
                            formatCallback={(value: number) => TimeFormat.minutes(value)}
                        />
                    </Grid>
                )
            }
        }

        return elements
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
                    open={this.state.sidebarOpen}
                    onClose={() => {
                        this.setState({ sidebarOpen: false })
                    }}
                    resetCallback={() => {
                        this.setState({
                            confirmResetOpen: true,
                            sidebarOpen: false
                        })
                    }}
                />
                <ConfirmationModal
                    open={this.state.confirmResetOpen}
                    onClose={() => {
                        this.setState({
                            confirmResetOpen: false
                        })
                    }}
                    onConfirm={() => {
                        this.setState({
                            confirmResetOpen: false,
                            countdowns: DEFAULT_COUNTDOWNS
                        })

                        this.saveCountdownsToLocalStorage(DEFAULT_COUNTDOWNS)
                    }}
                    subtitle='Resetting your countdowns cannot be undone'
                />
                <ConfirmationModal
                    open={this.state.confirmDeleteOpen}
                    onClose={() => {
                        this.setState({
                            confirmDeleteOpen: false
                        })
                    }}
                    onConfirm={() => {
                        this.deleteCountdown(this.state.confirmDeleteIndex)
                        this.setState({
                            confirmDeleteOpen: false
                        })
                    }}
                    subtitle='Deleting this cannot be undone'
                />
                <Grid container className={classes.gridContainer} spacing={2}>
                    <Grid item xs={12} md={8} lg={6}> <Paper className={classes.paperContainer}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box display='flex' flexDirection="row">
                                    <Box flex='100%'>
                                        <Typography variant="h3"> Timers </Typography>
                                    </Box>
                                    <Box flex={1}>
                                        <IconButton
                                            disabled={this.state.editingOrder}
                                            onClick={() => {
                                                let newCountdowns = [
                                                    ...this.state.countdowns,
                                                    new Countdown(`NEW ${this.state.countdowns.length}`)
                                                ]

                                                this.saveCountdownsToLocalStorage(newCountdowns)

                                                this.setState({
                                                    countdowns: newCountdowns
                                                })
                                            }}
                                        >
                                            <AddIcon color={this.state.editingOrder ? 'disabled' : 'primary'} />
                                        </IconButton>
                                    </Box>
                                    <Box flex={1}>
                                        <IconButton
                                            onClick={() => {
                                                if (this.state.editingOrder) { // if we are leaving edit mode
                                                    this.saveCountdownsToLocalStorage()
                                                }

                                                this.setState({
                                                    editingOrder: !this.state.editingOrder
                                                })
                                            }}
                                        >
                                            <SettingsIcon color={this.state.editingOrder ? 'primary' : 'action'} />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                {this.renderSliders()}
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Button
                                    variant="contained"
                                    className={classes.fillWidth}
                                    onClick={this.handleStartStopOnClick}
                                    color={this.state.running ? 'secondary' : 'primary'}
                                >
                                    {this.state.running ? 'Stop' : 'Start'}
                                </Button>
                            </Grid>
                            <Grid item xs={4} sm={3}>
                                <Box flexDirection='column' flex={2} display='flex' alignItems='center'>
                                    <Box display='flex'>
                                        <Typography variant="subtitle1">{this.state.running ? "Running" : "On deck"}</Typography>
                                    </Box>
                                    <Box display='flex'>
                                        <Typography variant='caption'>{this.currentCountdown.name}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={4} sm={3}>
                                <Box flexDirection='column' flex={2} display='flex' alignItems='center'>
                                    <Box display='flex'>
                                        <Typography variant="subtitle1">Time left</Typography>
                                    </Box>
                                    <Box display='flex'>
                                        <Typography variant='caption'>{TimeFormat.seconds(this.state.secondsLeft)}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={4} sm={3}>
                                <Box flexDirection='column' flex={2} display='flex' alignItems='center'>
                                    <Box display='flex'>
                                        <Typography variant="subtitle1">Up next</Typography>
                                    </Box>
                                    <Box display='flex'>
                                        <Typography variant='caption'>{this.getNextCountdown().name}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper> </Grid>
                    {/* <Grid item xs={12} sm={4} lg={6}> <Paper className={classes.paperContainer}>
                        <Typography variant="h5">Test</Typography>
                    </Paper> </Grid> */}
                </Grid>
            </div >
        );
    }
});

export default App;
