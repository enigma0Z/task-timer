export abstract class Subscribable {
    private subscribers: Map<String, (() => void)> = new Map()

    public subscribe(id: string, callback: () => void) {
        this.subscribers.set(id, callback)
    }

    public unsubscribe(id: string) {
        this.subscribers.delete(id)
    }

    protected updateSubscribers() {
        this.subscribers.forEach((value, key, map) => {
            console.log(`updating subscriber ${key}`)
            value()
        })
    }
}
