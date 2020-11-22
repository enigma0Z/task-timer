import { Backdrop, Button, Card, createStyles, Fade, Grid, Modal, Theme, Typography, WithStyles, withStyles } from "@material-ui/core"
import React, { Component } from "react"

const styles = (theme: Theme) => createStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        border: 'none'
    },
});

interface ConfirmationModalProps extends WithStyles<typeof styles> {
    onClose: () => void
    onConfirm: () => void
    open: boolean
    title: string
    subtitle: string
    buttonText: string
}

interface ConfirmationModalState { }

export const ConfirmationModal = withStyles(styles)(class ConfirmationModalComponent extends Component<ConfirmationModalProps, ConfirmationModalState> {
    static defaultProps = {
        title: 'Are you sure?',
        subtitle: 'This action cannot be undone',
        buttonText: 'Continue'
    }

    render() {
        const classes = this.props.classes
        return (
            <Modal
                open={this.props.open}
                onClose={this.props.onClose}
                closeAfterTransition
                className={classes.modal}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={this.props.open}>
                    <Card className={classes.modal}>
                        <Grid container direction='column' alignItems='center' alignContent='center'>
                            <Grid item xs>
                                <Typography variant='h4'>{this.props.title}</Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant='subtitle1'>{this.props.subtitle}</Typography><br />
                            </Grid>
                            <Button
                                color='secondary'
                                variant='contained'
                                onClick={this.props.onConfirm}
                            >
                                <Grid item xs>
                                    {this.props.buttonText}
                                </Grid>
                            </Button>
                        </Grid>
                    </Card>
                </Fade>
            </Modal>
        )
    }
})
