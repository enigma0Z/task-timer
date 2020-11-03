import React, { Component } from "react";

import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    Slider,
    Theme,
    Typography,
    WithStyles, withStyles, createStyles,
} from "@material-ui/core";

import SettingsIcon from '@material-ui/icons/Settings';

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
    formatCallback: Function
}

interface LabelSliderState {
    value: number
    menuOpen: boolean
    anchor?: HTMLButtonElement
}

export const LabelSlider = withStyles(styles)(class LabelSliderComponent extends Component<LabelSliderProps, LabelSliderState> {
    constructor(props: LabelSliderProps) {
        super(props)
        this.state = {
            value: this.props.value,
            menuOpen: false
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


    render() {
        const { classes } = this.props
        return (
            <Box display='flex' flexDirection='column'>
                <Menu
                    id="simple-menu"
                    keepMounted
                    open={this.state.menuOpen}
                    anchorEl={this.state.anchor}
                    onClose={() => {
                        this.setState({ menuOpen: false })
                    }}
                >
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
                </Menu>
                <Box display='flex' flexDirection='row' flex='100%' alignItems='baseline' className={classes.sliderLabelContainer}>
                    <Typography variant="subtitle1" className={classes.sliderLabel}>{this.props.label}</Typography>
                    <Typography variant="caption" className={classes.sliderLabel}>({this.props.formatCallback(this.state.value)})</Typography>
                </Box>
                <Box display='flex' flex={1} flexDirection='row'>
                    <Box m={1} flex='100%' display='flex' justifyContent='flex-start' alignItems='center'>
                        <Slider
                            value={this.state.value}
                            step={this.props.step}
                            min={this.props.min}
                            max={this.props.max}
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
            </Box>
        )
    }
});
