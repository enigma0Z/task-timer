import { Collection } from "../interfaces/Collection"
import { Subscribable } from "./Subscribable"

export interface HistoryItemObject {
    name: string,
    start: number,
    end: number
}

export class HistoryItem {
    readonly name: string
    readonly start: number
    readonly end: number

    constructor({
        name,
        start,
        end
    }: HistoryItemObject) {
        this.name = name
        this.start = start
        this.end = end
    }

    public get durationMs(): number {
        return this.end - this.start
    }
}

export class HistoryItemCollection extends Subscribable implements Collection<HistoryItem> {
    readonly items: HistoryItem[] = []

    constructor(collection?: Collection<HistoryItemObject>) {
        super()
        if (collection?.items) {
            for (let item of collection.items) {
                this.addItem(item)
            }
        }
    }

    public toJSON(): Collection<HistoryItemObject> {
        return {
            items: this.items
        }
    }

    get today(): HistoryItem[] {
        let now = new Date(Date.now())
        return this.items.filter((item) => {
            let start = new Date(item.start)
            return (
                start.getFullYear() === now.getFullYear() &&
                start.getMonth() === now.getMonth() &&
                start.getDay() === now.getDay()
            )
        })
    }

    public addItem(item: HistoryItemObject) {
        this.items.push(new HistoryItem(item))
        this.updateSubscribers()
    }
}
