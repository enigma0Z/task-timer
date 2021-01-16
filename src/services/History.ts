import { HistoryItemCollection, HistoryItemObject } from '../data/History';
import { Subscribable } from '../data/Subscribable'

export class HistoryService extends Subscribable {
    private static _instance: HistoryService;
    readonly history: HistoryItemCollection;

    public static get instance(): HistoryService {
        return this._instance || (this._instance = new this())
    }

    private constructor() {
        super()
        let history: string | null = localStorage.getItem('history')
        if (history) {
            this.history = new HistoryItemCollection(JSON.parse(history))
        } else {
            this.history = new HistoryItemCollection()
        }
    }

    public get items() {
        return this.history.items
    }

    public addItem(item: HistoryItemObject) {
        this.history.addItem(item)
        localStorage.setItem('history', JSON.stringify(this.history))
        this.updateSubscribers()
    }
}
