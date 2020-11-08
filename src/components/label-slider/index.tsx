import React, { ChangeEvent, Component } from "react";

import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    Slider,
    Theme,
    Typography,
    WithStyles, withStyles, createStyles, TextField,
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

    editContainer: {
        paddingRight: 8,
        marginTop: -6,
        marginBottom: -7
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
    label: string,
    value: number
    min: number,
    max: number,
    step: number,
    menuOpen: boolean
    editing: boolean
    anchor?: HTMLButtonElement
    labelError: boolean,
    minError: boolean,
    maxError: boolean
}

export const LabelSlider = withStyles(styles)(class LabelSliderComponent extends Component<LabelSliderProps, LabelSliderState> {
    private startingLabel?: string = undefined
    private startingMin?: number = undefined
    private startingMax?: number = undefined

    constructor(props: LabelSliderProps) {
        super(props)
        this.state = {
            value: this.props.value,
            min: this.props.min,
            max: this.props.max,
            step: this.props.step,
            label: this.props.label,
            menuOpen: false,
            editing: false,
            labelError: false,
            minError: false,
            maxError: false
        }

        this.handleOnChange = this.handleOnChange.bind(this)
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
    };

    renderNormalView() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <Menu
                    id="normalMenu"
                    keepMounted
                    open={this.state.menuOpen}
                    anchorEl={this.state.anchor}
                    onClose={() => {
                        this.setState({ menuOpen: false })
                    }}
                >
                    <MenuItem onClick={() => {
                        this.startingLabel = this.state.label
                        this.startingMin = this.state.min
                        this.startingMax = this.state.max
                        this.setState({ editing: true })
                    }}>
                        Edit
                    </MenuItem>
                    <MenuItem>Delete</MenuItem>
                </Menu>
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
                            this.setState({
                                anchor: event.currentTarget,
                                menuOpen: true
                            })
                        }}>
                            <SettingsIcon />
                        </IconButton>
                    </Box>
                </Box>
            </React.Fragment>
        )
    }

    renderEditView() {
        const classes = this.props.classes
        return (
            <React.Fragment>
                <Box display='flex' flex={1} flexDirection='row'>
                    <Box m={1} flex='100%' display='flex' justifyContent='flex-start' alignItems='center'>
                        <Box className={classes.editContainer} flex={3}>
                            <TextField
                                fullWidth
                                label="Name"
                                error={this.state.labelError}
                                value={this.state.label}
                                margin='dense'
                                size='small'
                                variant="standard"
                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                                    this.setState({
                                        label: event.target.value,
                                        labelError: (
                                            event.target.value === ''
                                        )
                                    })
                                }}
                            />
                        </Box>
                        <Box className={classes.editContainer} flex={1}>
                            <TextField
                                label="Min"
                                error={this.state.minError}
                                size='small'
                                variant="outlined"
                                margin='dense'
                                value={this.state.min}
                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                                    const value = parseInt(event.target.value)
                                    this.setState({
                                        min: value || 0,
                                        minError: (
                                            isNaN(value) || value < 1
                                        )
                                    })
                                }}
                            />
                        </Box>
                        <Box className={classes.editContainer} flex={1}>
                            <TextField
                                label="Max"
                                error={this.state.maxError}
                                size='small'
                                variant="outlined"
                                margin='dense'
                                value={this.state.max}
                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                                    const value = parseInt(event.target.value)
                                    this.setState({
                                        max: value || 0,
                                        maxError: (
                                            isNaN(value) || value < 1 || value < this.state.min
                                        )
                                    })
                                }}
                            />
                        </Box>
                    </Box>
                    <Box flex={1} display='flex' justifyContent='flex-end' alignItems='center'>
                        <IconButton onClick={(event) => {
                            let value: number
                            if (this.state.value > this.state.max) {
                                value = this.state.max
                            } else if (this.state.value < this.state.min) {
                                value = this.state.min
                            } else (
                                value = this.state.value
                            )

                            this.props.onEditSave(this.state.label, this.state.min, this.state.max)
                            this.setState({
                                menuOpen: false,
                                editing: false,
                                value: value
                            })
                        }}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton onClick={(event) => {
                            this.setState({
                                menuOpen: false,
                                editing: false,
                            })

                            if (
                                this.startingLabel !== undefined &&
                                this.startingMin !== undefined &&
                                this.startingMax !== undefined
                            ) {
                                this.setState({
                                    label: this.startingLabel,
                                    min: this.startingMin,
                                    max: this.startingMax
                                })
                            }
                        }}>
                            <CancelIcon />
                        </IconButton>
                    </Box>
                </Box>
            </React.Fragment>
        )
    }

    renderCurrentView() {
        if (this.state.editing) {
            return this.renderEditView()
        } else {
            return this.renderNormalView()
        }
    }

    render() {
        return (
            <Box display='flex' flexDirection='column'>
                {this.renderCurrentView()}
            </Box>
        )
    }
});
