import React, { Component } from 'react';

import {
    AppBar,
    Button,
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

import { Sidebar } from './components/Sidebar';

import { NotificationService } from './services/Notification'

import MenuIcon from '@material-ui/icons/Menu';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';
import { HistoryList } from './components/History';
import { CountdownComponent } from './components/Countdown';
import { FlexModal } from './components/FlexModal';

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
        border: 'none',
        width: '100%',
        height: '100%'
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
    paused: boolean,
    secondsLeft: number,
    sidebarOpen: boolean,
    notificationSupport: boolean,
    endTime?: number,
    editingOrder: boolean,
    confirmDeleteOpen: boolean
    confirmDeleteIndex: number
    confirmDeleteName: string
    confirmResetOpen: boolean
    warningNotificationSent: boolean
    selectedDate: Date,
    whatsNewModalOpen: boolean,
}

export const APP_TITLE: string = 'Task Timer'
export const APP_TITLE_SHORT: string = 'TT'

const notificationService: NotificationService = NotificationService.instance

const App = withStyles(styles)(class AppComponent extends Component<AppProps, AppState> {
    public sliderRefs: any[] = []

    constructor(props: AppProps) {
        super(props)

        let secondsLeft = 0
        let running = false
        let paused = false

        const selectedDate = localStorage.getItem('selectedDate')
        const lastVersion = localStorage.getItem('version')

        this.state = {
            workLength: 50,
            breakLength: 10,
            running: running,
            paused: paused,
            secondsLeft: secondsLeft,
            sidebarOpen: false,
            notificationSupport: "Notification" in window,
            editingOrder: false,
            confirmDeleteOpen: false,
            confirmDeleteIndex: 0,
            confirmDeleteName: '',
            confirmResetOpen: false,
            warningNotificationSent: false,
            selectedDate: selectedDate ? new Date(JSON.parse(selectedDate)) : new Date(0, 0, 0, 12, 0, 10),
            whatsNewModalOpen: lastVersion !== process.env.REACT_APP_VERSION
        }

        this.checkSchedule = this.checkSchedule.bind(this)
    }

    componentDidMount() {
        notificationService.requestDesktopNotificationPermissions()

        if (process.env.REACT_APP_VERSION) {
            localStorage.setItem('version', process.env.REACT_APP_VERSION)
        }

        this.checkSchedule()
    }

    checkSchedule() {
        const now = new Date()
        if (
            now.getHours() === this.state.selectedDate.getHours()
            && now.getMinutes() === this.state.selectedDate.getMinutes()
        ) {
            notificationService.showNotification(APP_TITLE, {
                body: "It's lunchtime!"
            })
        }

        setTimeout(() => this.checkSchedule(), 1000 * 50)
    }

    render() {
        const classes = this.props.classes
        return (
            <div className={classes.root}>
                <FlexModal
                    open={this.state.whatsNewModalOpen}
                    onClose={() => { console.log('App.tsx onClose()'); this.setState({ whatsNewModalOpen: false }) }}
                    spacing={{
                        top: { xs: 1, md: 2 },
                        middle: { xs: 1, md: 1 },
                        center: { xs: 5, md: 1 },
                        bottom: { xs: 1, md: 2 },
                    }}
                >
                    <Card className={classes.modal}>
                        <Grid container direction='column' alignItems='center' alignContent='center'>
                            <Grid item xs>
                                <Typography variant='h4'>Version {process.env.REACT_APP_VERSION}</Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant='body1'>
                                    Task Timer has been updated since the last time you were here. Click below to
                                    see what's new!
                                                    </Typography> <br />
                            </Grid>
                            <Grid item xs>
                                <Button
                                    variant='contained'
                                    href='/WHATS_NEW.html'
                                    target='_blank'
                                    onClick={() => { this.setState({ whatsNewModalOpen: false }) }}
                                >
                                    See what's new!
                                            </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </FlexModal>
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
                />

                <Grid container className={classes.gridContainer} spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Paper className={classes.paperContainer}>
                            <CountdownComponent />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.paperContainer}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="h3">Schedule</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardTimePicker
                                            id="lunch-time-picker"
                                            label="Lunch"
                                            value={this.state.selectedDate}
                                            onChange={(date: any) => {
                                                this.setState({
                                                    selectedDate: date
                                                })
                                                localStorage.setItem('selectedDate', JSON.stringify(date))
                                            }}
                                            minutesStep={5}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Paper className={classes.paperContainer}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="h3">History</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <HistoryList />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div >
        );
    }
});

export default App;
