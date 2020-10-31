import { createStyles, Slider, Theme, WithStyles, withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";
import React, { Component } from "react";

const styles = (theme: Theme) => createStyles({
    sliderSpacing: {
        paddingLeft: 8,
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
    onChange: Function
}

interface LabelSliderState {
    value: number
}

export const LabelSlider = withStyles(styles)(class LabelSliderComponent extends Component<LabelSliderProps, LabelSliderState> {
    constructor(props: LabelSliderProps) {
        super(props)
        this.state = {
            value: this.props.value
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
        return(
            <div>
                <Typography variant="caption" id='break-length' gutterBottom>{this.props.label} ({this.state.value}{this.props.labelSuffix})</Typography>
                <div className={classes.sliderSpacing}>
                    <Slider
                        marks
                        value={this.state.value}
                        step={this.props.step}
                        min={this.props.min}
                        max={this.props.max}
                        onChange={this.handleOnChange}
                        getAriaValueText={(value: number) => {return `${value}m`}}
                        valueLabelDisplay="off"
                        aria-labelledby="break-length"
                    />
                </div>
            </div>
        )
    }
});
