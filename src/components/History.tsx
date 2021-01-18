import { Box, createStyles, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography, WithStyles, withStyles } from "@material-ui/core"
import React, { Component } from "react"
import { TimeFormat } from "../data/format/Time";
import { HistoryItem, HistoryItemCollection } from "../data/History";
import { HistoryService } from "../services/History";
import { TwoText } from "../widgets/TwoText";

const styles = (theme: Theme) => createStyles({
    table: {
        minWidth: 650,
    },
    totalsGrid: { flexGrow: 1, padding: 8 },
});

interface HistoryListProps extends WithStyles<typeof styles> { };
interface HistoryListState {
    history: HistoryItemCollection
};

export const HistoryList = withStyles(styles)(class HistoryListInternal extends Component<HistoryListProps, HistoryListState> {
    constructor(props: HistoryListProps) {
        super(props)

        this.state = {
            history: HistoryService.instance.history
        }
    }

    componentDidMount() {
        HistoryService.instance.subscribe(
            this.constructor.name, () => { this.setState({ history: HistoryService.instance.history }) }
        )
    }

    componentWillUnmount() {
        HistoryService.instance.unsubscribe(this.constructor.name)
    }

    render() {
        const classes = this.props.classes
        let totals: { [name: string]: number } = {}

        for (let name of this.state.history.today.map((item: HistoryItem) => item.name).sort()) {
            if (!(name in totals)) {
                totals[name] = this.state.history.today
                    .filter((item: HistoryItem) => item.name === name)
                    .map((item: HistoryItem) => item.durationMs)
                    .reduce((previous: number, current: number) => previous + current)
            }
        }

        return <Grid container spacing={2} className={classes.totalsGrid}>
            <Grid item xs={2}>
                <Box flexDirection='column' display='flex' alignItems='center' justifyContent='center' height='100%'>
                    <Typography variant='h5'>Totals</Typography>
                </Box>
            </Grid>
            {
                Object.keys(totals).map((name: string) => (
                    <Grid item xs={2}>
                        <Paper>
                            <TwoText caption={name} text={`${TimeFormat.seconds(totals[name] / 1000)}`} />
                        </Paper>
                    </Grid>
                ))
            }
            <Grid item xs={12}>
                <TableContainer>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Task Name</TableCell>
                                <TableCell align="right">Duration</TableCell>
                                <TableCell align="right">Start</TableCell>
                                <TableCell align="right">End</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.history.today.map((item: HistoryItem) => {
                                let start: Date = new Date(item.start)
                                let end: Date = new Date(item.end)
                                return (
                                    <TableRow key={item.name + item.start}>
                                        <TableCell component="th" scope="row">
                                            {item.name}
                                        </TableCell>
                                        <TableCell align="right">{TimeFormat.seconds(item.durationMs / 1000)}</TableCell>
                                        <TableCell align="right">{`${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}`}</TableCell>
                                        <TableCell align="right">{`${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}`}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid >
    }
});
