import { Subscribable } from '../data/Subscribable'

export class NotificationService extends Subscribable {
    private static _instance: NotificationService;
    private _desktopNotificationSupport: boolean = false

    public static get instance(): NotificationService {
        return this._instance || (this._instance = new this())
    }

    private constructor() {
        super()
        this._desktopNotificationSupport = 'Notification' in window
    }

    public get desktopNotificationSupport(): boolean {
        return this._desktopNotificationSupport
    }

    public get desktopNotificationEnabled() {
        return this.desktopNotificationSupport && Notification.permission === 'granted'
    }

    public requestDesktopNotificationPermissions() {
        if (this.desktopNotificationSupport && Notification.permission === 'default') {
            Notification.requestPermission()
                .then((value) => { this.updateSubscribers() })
        }
    }

    public showNotification(
        title: string,
        options: NotificationOptions,
        onclick: (notification: Notification, event: Event) => void = (
            notification: Notification, event: Event
        ) => {
            notification.close(); window.focus()
        }
    ) {
        let notification = new Notification(
            title, options
        )

        notification.onclick = (event: Event) => (onclick(notification, event))
    }
}
