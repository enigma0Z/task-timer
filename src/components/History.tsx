import { Backdrop, Button, Card, createStyles, Fade, Grid, Modal, Theme, Typography, WithStyles, withStyles } from "@material-ui/core"
import React, { Component } from "react"
import { HistoryItem } from "../data/History";

const styles = (theme: Theme) => createStyles({ });

interface HistoryListProps extends WithStyles<typeof styles> { };

export const HistoryList = withStyles(styles)(class HistoryListInternal extends Component {
    constructor(props: HistoryListProps) {
    }
});
