import {
    Box,
    Button,
    ButtonGroup,
    Card,
    createStyles,
    Grid,
    IconButton,
    Theme,
    Typography,
    WithStyles,
    withStyles
} from "@material-ui/core"
import React, { Component } from "react"
import { Countdown, CountdownCollection } from "../data/Countdown";
import { TimeFormat } from "../data/format/Time";
import { CountdownService } from "../services/Countdown";
import { TwoText } from "../widgets/TwoText";

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

import { LabelSlider } from "../widgets/LabelSlider";
import { NotificationService } from "../services/Notification";

import { APP_TITLE, APP_TITLE_SHORT } from "../App";
import { ConfirmationModal } from "./ConfirmationModal";
import { FlexModal } from "./FlexModal";

const styles = (theme: Theme) => createStyles({
    popperCardStyle: {
        paddingLeft: theme.spacing(1),
        backgroundColor: theme.palette.grey[50],
        margin: 8,
        height: '100%'
    },

    modalStyle: {
        padding: 8,
        height: '100%',
    },

    fillWidth: {
        width: '100%',
    },

});

interface CountdownComponentProps extends WithStyles<typeof styles> { };
interface CountdownComponentState {
    countdowns: CountdownCollection
    editingOrder: boolean
    completeModalOpen: boolean,
    confirmDeleteOpen: boolean,
    confirmDeleteIndex: number,
    confirmDeleteName: string
    running: boolean,
    paused: boolean,
    warningNotificationSent: boolean,
};

export const CountdownComponent = withStyles(styles)(class CountdownInternal extends Component<CountdownComponentProps, CountdownComponentState> {
    private notificationService: NotificationService

    constructor(props: CountdownComponentProps
    ) {
        super(props)

        this.state = {
            countdowns: CountdownService.instance.countdowns,
            editingOrder: false,
            completeModalOpen: false,
            confirmDeleteOpen: false,
            confirmDeleteIndex: 0,
            confirmDeleteName: '',
            running: CountdownService.instance.countdowns.current?.running,
            paused: false,
            warningNotificationSent: false,
        }

        if (CountdownService.instance.countdowns.current?.running) {
            CountdownService.instance.countdowns.runningCountdown?.update()
        }

        this.notificationService = NotificationService.instance

        this.handleStartStopOnClick = this.handleStartStopOnClick.bind(this)
        this.countdownSubscriber = this.countdownSubscriber.bind(this)
    }

    componentDidMount() {
        CountdownService.instance.subscribe(
            'CountdownComponent', () => { this.countdownSubscriber() }
        )
    }

    componentWillUnmount() {
        CountdownService.instance.unsubscribe('CountdownComponent')
    }

    handleStartStopOnClick() {
        if (!this.state.running) {
            this.start()
        } else {
            this.stop()
        }
    }

    start() {
        this.setState({ running: true })
        CountdownService.instance.countdowns.current.runningCallback = (countdown: Countdown) => {
            if (countdown.secondsLeft > 0) {
                if (
                    !this.state.warningNotificationSent
                    && countdown.secondsLeft < 300
                    && countdown.secondsLeft > 240
                ) {
                    this.setState({
                        warningNotificationSent: true
                    })

                    this.notificationService.showNotification(
                        APP_TITLE,
                        {
                            body: `Stopping soon: ${CountdownService.instance.countdowns.current.name}`
                        }
                    )
                }
            } else if (countdown.running) { // Only send a stopped notification if running is true, i.e., we stopped naturally
                NotificationService.instance.showNotification(
                    APP_TITLE,
                    {
                        body: `Complete: ${CountdownService.instance.countdowns.current.name}`
                    }
                )
                this.setState({ completeModalOpen: true })
            }
        }

        CountdownService.instance.countdowns.current.start()
    }

    stop() {
        this.setState({ running: false })
        CountdownService.instance.countdowns.current.stop()

    }

    countdownSubscriber() {
        this.setState({ countdowns: CountdownService.instance.countdowns })

        if (CountdownService.instance.countdowns.current.running) {
            this.setState({ running: true })
            window.document.title = `${APP_TITLE_SHORT} [${CountdownService.instance.countdowns.current.name} ${TimeFormat.seconds(CountdownService.instance.countdowns.current.secondsLeft)}]`
        } else {
            this.setState({
                warningNotificationSent: false,
                paused: false,
                running: false
            })
            window.document.title = APP_TITLE_SHORT
        }
    }

    renderSliders() {
        const classes = this.props.classes
        let elements: JSX.Element[] = []

        for (let i in CountdownService.instance.countdowns.items) {
            const index: number = parseInt(i)
            const countdown = CountdownService.instance.countdowns.items[i]
            const upDisabled = index === 0
            const downDisabled = index === CountdownService.instance.countdowns.items.length - 1

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
                                            CountdownService.instance.countdowns.swapItems(index, index - 1)
                                        }}
                                    >
                                        <ArrowUpwardIcon />
                                    </IconButton>
                                    <IconButton
                                        color='primary'
                                        disabled={downDisabled}
                                        onClick={() => {
                                            CountdownService.instance.countdowns.swapItems(index, index + 1)
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
                elements.push(
                    <Grid item key={countdown.name}>
                        <LabelSlider
                            label={countdown.name}
                            labelSuffix="m"
                            value={countdown.value}
                            step={1}
                            min={countdown.min}
                            max={countdown.max}
                            onChange={(value: number) => {
                                countdown.value = value
                            }}
                            onEditSave={(name: string, min: number, max: number) => {
                                countdown.name = name
                                countdown.min = min
                                countdown.max = max
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

        return <Grid container>
            <ConfirmationModal
                open={this.state.confirmDeleteOpen}
                onClose={() => {
                    this.setState({
                        confirmDeleteOpen: false
                    })
                }}
                onConfirm={() => {
                    CountdownService.instance.countdowns.deleteItem(this.state.confirmDeleteIndex)
                    this.setState({
                        confirmDeleteOpen: false
                    })
                }}
                subtitle='Deleting this cannot be undone'
            />
            <FlexModal
                open={this.state.completeModalOpen}
                onClose={() => { this.setState({ completeModalOpen: false }) }}
                spacing={{
                    middle: 1,
                    center: 10
                }}
            >
                <Card style={{ height: '100%', padding: 8 }}>
                    <Box display='flex' flexDirection='column' style={{ height: '100%' }}>
                        <Box display='flex' flex={2} justifyContent='center' alignItems='center'>
                            <Typography variant='h4'>{CountdownService.instance.countdowns.previous.name} complete!</Typography>
                        </Box>
                        <Box display='flex' flex={1} justifyContent='center'>
                            <Button
                                variant='contained'
                                color='primary'
                                style={{ width: '100%' }}
                                onClick={() => {
                                    this.start()
                                    this.setState({
                                        completeModalOpen: false,
                                    })
                                }}
                            >
                                <Typography variant='h5'>
                                    Start {CountdownService.instance.countdowns.current.name}
                                </Typography>
                            </Button>
                        </Box>
                    </Box>
                </Card>
            </FlexModal>
            <Grid item xs={12}>
                <Box display='flex' flexDirection="row">
                    <Box flex='100%'>
                        <Typography variant="h3"> Timers </Typography>
                    </Box>
                    <Box flex={1}>
                        <IconButton
                            disabled={this.state.editingOrder}
                            onClick={() => {
                                CountdownService.instance.countdowns.addItem({ name: `NEW ${CountdownService.instance.countdowns.items.length}` })
                            }}
                        >
                            <AddIcon color={this.state.editingOrder ? 'disabled' : 'primary'} />
                        </IconButton>
                    </Box>
                    <Box flex={1}>
                        <IconButton
                            onClick={() => {
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
                <ButtonGroup
                    className={classes.fillWidth}
                    variant="contained"
                    color={
                        this.state.running
                            ? this.state.paused ? 'default' : 'secondary'
                            : 'primary'
                    }
                >
                    <Button className={classes.fillWidth} onClick={this.handleStartStopOnClick}>
                        {this.state.running ? <StopIcon /> : <PlayArrowIcon />}
                    </Button>
                    <Button className={classes.fillWidth} disabled={!this.state.running} onClick={() => {
                        if (this.state.running) {
                            CountdownService.instance.countdowns.current.pause()
                            this.setState({
                                paused: !this.state.paused
                            })
                        }
                    }}>
                        {this.state.paused ? <PlayCircleOutlineIcon /> : <PauseIcon />}
                    </Button>
                </ButtonGroup>
            </Grid>
            <Grid item xs={4} sm={3}>
                <TwoText
                    caption={this.state.running ? this.state.paused ? 'Paused' : "Running" : "On deck"}
                    text={CountdownService.instance.countdowns.current?.name || 'NONE'}
                />
            </Grid>
            <Grid item xs={4} sm={3}>
                <TwoText
                    caption="Time left"
                    text={TimeFormat.seconds(CountdownService.instance.countdowns.current?.secondsLeft)}
                />
            </Grid>
            <Grid item xs={4} sm={3}>
                <TwoText caption="Up next" text={CountdownService.instance.countdowns.next?.name || 'NONE'} />
            </Grid>
        </Grid>
    }
});
