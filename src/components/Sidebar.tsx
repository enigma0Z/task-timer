import React, { Component } from 'react';

import {
    createStyles,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Switch,
    Theme,
    WithStyles, withStyles
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { NotificationService } from '../services/notification';
import App from '../App';

const styles = (theme: Theme) => createStyles({
    sideBar: {
        width: 250
    }
})

const notificationService: NotificationService = NotificationService.instance

interface SidebarProps extends WithStyles<typeof styles> {
    onOpen: Function,
    onClose: Function,
    resetCallback: () => void
}

interface SidebarState {
    open: boolean,
    notificationsEnabled: boolean
}

export const Sidebar = withStyles(styles)(class SidebarComponent extends Component<SidebarProps, SidebarState> {
    constructor(props: SidebarProps) {
        super(props)
        this.state = {
            open: false,
            notificationsEnabled: notificationService.desktopNotificationEnabled
        }

        // this.refreshNotificationState = this.refreshNotificationState.bind(this)
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
        notificationService.subscribe(this.constructor.name, () => {
            this.refreshNotificationState()
        })
    }

    componentWillUnmount() {
        notificationService.unsubscribe(this.constructor.name)
    }

    render() {
        const classes = this.props.classes
        return (
            <Drawer
                anchor='left'
                open={this.props.onOpen()}
                onClose={() => this.props.onClose()}
            >
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
                        <ListItem
                            button
                            onClick={this.props.resetCallback}
                        >
                            <ListItemText primary='Reset to defaults' />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        )
    }

});
