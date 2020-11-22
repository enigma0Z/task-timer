import React, { Component } from 'react';

import {
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
    WithStyles, withStyles
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { NotificationService } from '../services/notification';

const styles = (theme: Theme) => createStyles({
    sideBar: {
        width: 250
    }
})

const notificationService: NotificationService = NotificationService.instance

interface SidebarProps extends WithStyles<typeof styles> {
    open: boolean,
    onClose: Function,
    resetCallback: () => void
}

interface SidebarState {
    notificationsEnabled: boolean
}

export const Sidebar = withStyles(styles)(class SidebarComponent extends Component<SidebarProps, SidebarState> {
    constructor(props: SidebarProps) {
        super(props)
        this.state = {
            notificationsEnabled: notificationService.desktopNotificationEnabled
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
                open={this.props.open}
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
                        <Divider />
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
