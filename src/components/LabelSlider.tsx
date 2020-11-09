import React, { ChangeEvent, Component, KeyboardEvent, RefObject } from "react";

import {
    Box,
    IconButton,
    Slider,
    Theme,
    Typography,
    WithStyles, withStyles, createStyles, TextField, Grid, Popover
} from "@material-ui/core";

import SettingsIcon from '@material-ui/icons/Settings';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';

const styles = (theme: Theme) => createStyles({
    fullWidth: {
        width: '100%'
    },

    centeringGrid: {
        display: 'flex'
    },

    listItemText: {
        display: 'block'
    },

    sliderSpacing: {
        width: '100%',
        justifyContent: 'center',
        verticalAlign: 'middle'
    },

    sliderLabelContainer: {
        marginBottom: -16
    },

    sliderLabel: {
        paddingRight: 10
    },

    editPopover: {
        padding: 8
    },

    editContainer: {
        paddingRight: 8,
    }
})

interface LabelSliderProps extends WithStyles<typeof styles> {
    label: string,
    labelSuffix: string,
    value: number,
    step: number,
    min: number,
    max: number,
    onChange: Function,
    onEditSave: (name: string, min: number, max: number) => void,
    formatCallback: Function
}

interface LabelSliderState {
    value: number
    label: string,
    editLabel: string,
    min: number,
    editMin: number,
    max: number,
    editMax: number,
    step: number,
    menuOpen: boolean
    editing: boolean
    anchor?: HTMLElement
    labelError: boolean,
    minError: boolean,
    maxError: boolean,
}

export const LabelSlider = withStyles(styles)(class LabelSliderComponent extends Component<LabelSliderProps, LabelSliderState> {
    private popoverRef: RefObject<any>

    constructor(props: LabelSliderProps) {
        super(props)
        this.state = {
            value: this.props.value,
            label: this.props.label,
            editLabel: this.props.label,
            min: this.props.min,
            editMin: this.props.min,
            max: this.props.max,
            editMax: this.props.max,
            step: this.props.step,
            menuOpen: false,
            editing: false,
            labelError: false,
            minError: false,
            maxError: false
        }

        this.popoverRef = React.createRef()

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.openPopover = this.openPopover.bind(this)
        this.closePopover = this.closePopover.bind(this)
        this.saveForm = this.saveForm.bind(this)
        this.cancelEdit = this.cancelEdit.bind(this)
        this.handleEscapeKeypress = this.handleEscapeKeypress.bind(this)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleEscapeKeypress, false);
    }

    handleEscapeKeypress(event: any) {
        if (event.keyCode === 27) {
            this.cancelEdit()
        }
    }

    handleOnChange(event: any, newValue: number | number[]) {
        if (typeof newValue === 'number') {
            this.setState({
                value: newValue
            })
        } else if (typeof newValue === 'object') {
            this.setState({
                value: newValue[0]
            })
        }

        this.props.onChange(this.state.value)
    }

    handleKeyPress(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.saveForm()
        }
    }

    openPopover() {
        this.setState({
            editing: true,
            editLabel: this.state.label,
            editMin: this.state.min,
            editMax: this.state.max
        })

        document.addEventListener("keydown", this.handleEscapeKeypress, false);
    }

    closePopover() {
        this.setState({
            editing: false
        })

        document.removeEventListener("keydown", this.handleEscapeKeypress, false);
    }

    saveForm() {
        let value: number
        if (this.state.value > this.state.max) {
            value = this.state.max
        } else if (this.state.value < this.state.min) {
            value = this.state.min
        } else (
            value = this.state.value
        )

        this.props.onEditSave(this.state.editLabel, this.state.editMin, this.state.editMax)
        this.setState({
            value: value,
            label: this.state.editLabel,
            min: this.state.editMin,
            max: this.state.editMax
        })

        this.closePopover()
    }

    cancelEdit() {
        this.closePopover()
    }

    renderNormalView() {
        const { classes } = this.props
        return (
            <>
                <Box display='flex' flexDirection='row' flex='100%' alignItems='baseline' className={classes.sliderLabelContainer}>
                    <Typography variant="subtitle1" className={classes.sliderLabel}>{this.state.label}</Typography>
                    <Typography variant="caption" className={classes.sliderLabel}>({this.props.formatCallback(this.state.value)})</Typography>
                </Box>
                <Box display='flex' flex={1} flexDirection='row'>
                    <Box m={1} flex='100%' display='flex' justifyContent='flex-start' alignItems='center'>
                        <Slider
                            value={this.state.value}
                            step={this.state.step}
                            min={this.state.min}
                            max={this.state.max}
                            onChange={this.handleOnChange}
                            getAriaValueText={(value: number) => { return `${value}m` }}
                            valueLabelDisplay="off"
                            aria-labelledby="break-length"
                        />
                    </Box>
                    <Box flex={1} display='flex' justifyContent='flex-end' alignItems='center'>
                        <IconButton onClick={(event) => {
                            this.openPopover()
                        }}>
                            <SettingsIcon />
                        </IconButton>
                    </Box>
                </Box>
            </>
        )
    }

    renderEditPopover() {
        const classes = this.props.classes
        return (
            <Popover open={this.state.editing} anchorEl={this.popoverRef.current}>
                <Box display='flex' flex={1} flexDirection='row' className={classes.editPopover}>
                    <Grid container>
                        <Grid item xs={6} className={classes.editContainer}>
                            <TextField
                                fullWidth
                                label="Name"
                                error={this.state.labelError}
                                value={this.state.editLabel}
                                margin='dense'
                                size='small'
                                variant="standard"
                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                                    this.setState({
                                        editLabel: event.target.value,
                                        labelError: (
                                            event.target.value === ''
                                        )
                                    })
                                }}
                                onKeyPress={this.handleKeyPress}
                            />
                        </Grid>
                        <Grid item xs={3} className={classes.editContainer}>
                            <TextField
                                label="Min"
                                error={this.state.minError}
                                value={this.state.editMin}
                                size='small'
                                variant="outlined"
                                margin='dense'
                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                                    const value = parseInt(event.target.value)
                                    this.setState({
                                        editMin: value || 0,
                                        minError: (
                                            isNaN(value) || value < 1
                                        )
                                    })
                                }}
                                onKeyPress={this.handleKeyPress}
                            />
                        </Grid>
                        <Grid item xs={3} className={classes.editContainer}>
                            <TextField
                                label="Max"
                                error={this.state.maxError}
                                value={this.state.editMax}
                                size='small'
                                variant="outlined"
                                margin='dense'
                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                                    const value = parseInt(event.target.value)
                                    this.setState({
                                        editMax: value || 0,
                                        maxError: (
                                            isNaN(value) || value < 1 || value < this.state.min
                                        )
                                    })
                                }}
                                onKeyPress={this.handleKeyPress}
                            />
                        </Grid>
                    </Grid>
                    <Box flex={1} display='flex' justifyContent='flex-end' alignItems='center'>
                        <IconButton onClick={this.saveForm}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton onClick={(event) => {
                            this.cancelEdit()
                        }}>
                            <CancelIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Popover>
        )
    }

    render() {
        return (
            <div ref={this.popoverRef}> {/* So the popover can have its origin on the row */}
                <Box display='flex' flexDirection='column'>
                    {this.renderNormalView()}
                    {this.renderEditPopover()}
                </Box>
            </div>
        )
    }
});
