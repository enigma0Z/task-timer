import React, { Component } from 'react';

import {
    Box,
    Button,
    createStyles,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Switch,
    Theme,
    Typography,
    WithStyles, withStyles
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { NotificationService } from '../services/Notification';
import { ConfirmationModal } from './ConfirmationModal';
import { CountdownService } from '../services/Countdown';
import { HistoryService } from '../services/History';

const styles = (theme: Theme) => createStyles({
    sideBar: {
        width: 250
    },
    footer: {
        top: 'auto',
        bottom: 0,
        width: '100%',
        padding: 8,
    },
    footerButton: {
        width: '100%'
    }
})

const notificationService: NotificationService = NotificationService.instance

interface SidebarProps extends WithStyles<typeof styles> {
    open: boolean,
    onClose: Function,
}

interface SidebarState {
    notificationsEnabled: boolean
    confirmResetOpen: boolean
    confirmClearHistoryOpen: boolean
}

export const Sidebar = withStyles(styles)(class SidebarComponent extends Component<SidebarProps, SidebarState> {
    constructor(props: SidebarProps) {
        super(props)
        this.state = {
            notificationsEnabled: notificationService.desktopNotificationEnabled,
            confirmResetOpen: false,
            confirmClearHistoryOpen: false
        }
    }

    refreshNotificationState() {
        if (this.state.notificationsEnabled !== notificationService.desktopNotificationEnabled) {
            this.setState({
                notificationsEnabled: notificationService.desktopNotificationEnabled
            })
        }
    }

    componentDidUpdate() {
        this.refreshNotificationState()
    }

    componentDidMount() {
        notificationService.subscribe('NotificationService', () => {
            this.refreshNotificationState()
        })
    }

    componentWillUnmount() {
        notificationService.unsubscribe('NotificationService')
    }

    render() {
        const classes = this.props.classes
        return (
            <Drawer
                anchor='left'
                open={this.props.open}
                onClose={() => this.props.onClose()}
            >
                <ConfirmationModal
                    open={this.state.confirmResetOpen}
                    onClose={() => {
                        this.setState({
                            confirmResetOpen: false
                        })

                        this.props.onClose();
                    }}
                    onConfirm={() => {
                        CountdownService.instance.reset()

                        this.setState({
                            confirmResetOpen: false
                        })

                        this.props.onClose();
                    }}
                    subtitle='Resetting your countdowns cannot be undone'
                />
                <ConfirmationModal
                    open={this.state.confirmClearHistoryOpen}
                    onClose={() => {
                        this.setState({
                            confirmClearHistoryOpen: false
                        })

                        this.props.onClose();
                    }}
                    onConfirm={() => {
                        HistoryService.instance.clear()

                        this.setState({
                            confirmClearHistoryOpen: false
                        })

                        this.props.onClose();
                    }}
                    subtitle='Clearing history cannot be undone'
                />
                <div className={classes.sideBar} >
                    <List>
                        <ListItem
                            button
                            onClick={() => { notificationService.requestDesktopNotificationPermissions() }}
                        >
                            <ListItemIcon><NotificationsIcon /></ListItemIcon>
                            <ListItemText primary="Notifications" />
                            <ListItemSecondaryAction>
                                <Switch
                                    edge="end"
                                    onClick={() => { notificationService.requestDesktopNotificationPermissions() }}
                                    checked={this.state.notificationsEnabled}
                                    inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
                                    onFocus={() => this.refreshNotificationState()}
                                    onBlur={() => this.refreshNotificationState()}
                                    disabled={!notificationService.desktopNotificationSupport}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                        <ListItem
                            button
                            onClick={() => { this.setState({ confirmClearHistoryOpen: true }) }}
                        >
                            <ListItemText primary='Clear history' />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => { this.setState({ confirmResetOpen: true }) }}
                        >
                            <ListItemText primary='Reset to defaults' />
                        </ListItem>
                    </List>
                </div>
                <Box position='fixed' className={classes.footer}>
                    <Button>
                        <Typography variant='caption'>
                            Version {process.env.REACT_APP_VERSION} (what's new)
                        </Typography>
                    </Button>
                </Box>
            </Drawer>
        )
    }
});
