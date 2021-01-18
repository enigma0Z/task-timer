import { HistoryItemCollection, HistoryItemObject } from '../data/History';
import { Subscribable } from '../data/Subscribable'

export class HistoryService extends Subscribable {
    private static _instance: HistoryService;
    public static get instance(): HistoryService { return this._instance || (this._instance = new this()) }

    private _history: HistoryItemCollection;

    public get history(): HistoryItemCollection { return this._history }
    public get items() { return this.history.items }

    private constructor() {
        super()
        let history: string | null = localStorage.getItem('history')
        if (history) {
            this._history = new HistoryItemCollection(JSON.parse(history))
        } else {
            this._history = new HistoryItemCollection()
        }
    }

    public save(): void {
        localStorage.setItem('history', JSON.stringify(this.history))
        this.updateSubscribers()
    }

    public addItem(item: HistoryItemObject) {
        this._history.addItem(item)
        this.save()
    }

    public clear(): void {
        this._history = new HistoryItemCollection()
        this.save()
    }
}
