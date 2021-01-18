import { Backdrop, Box, Fade, Modal, Theme } from "@material-ui/core"
import { createStyles, WithStyles, withStyles } from "@material-ui/styles"
import React from "react"
import { Component } from "react"

const styles = (theme: Theme) => createStyles({
    container: { width: '100%', height: '100%' },
});
/**
 * Data values for flex box spacing of {@link FlexModal}
 * 
 * @param top Spacing for the top of the modal
 * @param left Spacing left of the modal
 * @param bottom Spacing below the modal
 * @param right Spacing right of the modal
 * @param middle Vertical space allocated for the modal
 * @param center Horizontal space allocated for the modal
 */
interface IFlexGrid {
    top?: number | object
    left?: number | object
    bottom?: number | object
    right?: number | object
    middle?: number | object // Vertical
    center?: number | object // Horizontal
}

class FlexGrid implements IFlexGrid {
    grid: IFlexGrid

    constructor(grid?: IFlexGrid) {
        if (grid) {
            this.grid = grid
        } else {
            this.grid = { top: 1 }
        }
    }

    public get top(): number | object { return this.grid.top ? this.grid.top : 1 }
    public get left(): number | object { return this.grid.left ? this.grid.left : 1 }
    public get bottom(): number | object { return this.grid.bottom ? this.grid.bottom : 1 }
    public get right(): number | object { return this.grid.right ? this.grid.right : 1 }
    public get middle(): number | object { return this.grid.middle ? this.grid.middle : 1 }
    public get center(): number | object { return this.grid.center ? this.grid.center : 1 }
}

interface FlexModalProps extends WithStyles<typeof styles> {
    open: boolean
    onClose: () => void
    spacing?: IFlexGrid
};

interface FlexModalState { };

export const FlexModal = withStyles(styles)(class FlexModalInternal extends Component<FlexModalProps, FlexModalState> {
    private spacing: FlexGrid

    constructor(props: FlexModalProps) {
        super(props)
        this.spacing = new FlexGrid(props.spacing)
    }

    render() {
        const classes = this.props.classes;
        return (
            <Modal
                open={this.props.open}
                onClose={this.props.onClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={this.props.open}>
                    <Box display='flex' flexDirection='column' className={classes.container}>
                        <Box flex={this.spacing.top} onClick={this.props.onClose} />
                        <Box flex={this.spacing.middle}>
                            <Box display='flex' flexDirection='row' className={classes.container}>
                                <Box flex={this.spacing.left} onClick={this.props.onClose} />
                                <Box flex={this.spacing.center}>
                                    {this.props.children}
                                </Box>
                                <Box flex={this.spacing.right} onClick={this.props.onClose} />
                            </Box>
                        </Box>
                        <Box flex={this.spacing.bottom} onClick={this.props.onClose} />
                    </Box>
                </Fade>
            </Modal>
        )
    }
});
