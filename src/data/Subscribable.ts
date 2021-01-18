export abstract class Subscribable {
    private subscribers: Map<String, (() => void)> = new Map()
    // abstract readonly name: string

    public subscribe(id: string, callback: () => void) {
        // console.log('Subscribe', id, 'to', this.constructor.name, this)
        this.subscribers.set(id, callback)
    }

    public unsubscribe(id: string) {
        // console.log('Unsubscribe', id, 'from', this.constructor.name, this)
        this.subscribers.delete(id)
    }

    protected updateSubscribers() {
        this.subscribers.forEach((value, key, map) => {
            // console.log('Update Subscriber', key, 'on', this.constructor.name, this)
            value()
        })
    }
}
