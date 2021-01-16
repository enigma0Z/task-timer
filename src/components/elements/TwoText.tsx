import { Box, createStyles, Theme, Typography, withStyles, WithStyles } from "@material-ui/core";
import React from "react";
import { Component } from "react";

const styles = (theme: Theme) => createStyles({});

interface TwoTextProps extends WithStyles<typeof styles> {
    caption: string,
    text: string
};

interface TwoTextState { }

export const TwoText = withStyles(styles)(class TwoTextInternal extends Component<TwoTextProps, TwoTextState> {
    render() {
        return (
            <Box flexDirection='column' flex={2} display='flex' alignItems='center' >
                <Box display='flex'>
                    <Typography variant="caption">{this.props.caption}</Typography>
                </Box>
                <Box display='flex'>
                    <Typography variant='subtitle1'>{this.props.text}</Typography>
                </Box>
            </Box>
        )
    }
});
