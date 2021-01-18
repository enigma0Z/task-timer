export abstract class Subscribable {
    private subscribers: Map<String, (() => void)> = new Map()
    protected abstract readonly name: string

    public subscribe(id: string, callback: () => void) {
        console.debug('Subscribe', id, 'to', this.constructor.name, this)
        this.subscribers.set(id, callback)
    }

    public unsubscribe(id: string) {
        console.debug('Unsubscribe', id, 'from', this.constructor.name, this)
        this.subscribers.delete(id)
    }

    protected updateSubscribers() {
        this.subscribers.forEach((value, key, map) => {
            console.debug('Update Subscriber', key, 'on', this.constructor.name, this)
            value()
        })
    }
}
