import { CountdownCollection, CountdownCollectionObject } from '../data/Countdown';
import { Subscribable } from '../data/Subscribable'

const DEFAULT_COUNTDOWNS: CountdownCollectionObject = {
    items: [
        { name: 'Work', min: 1, max: 90, value: 50 },
        { name: 'Break time', min: 1, max: 15, value: 10 },
    ]
}

export class CountdownService extends Subscribable {
    private static _instance: CountdownService;
    private _countdowns: CountdownCollection = new CountdownCollection();
    protected readonly name: string = 'CountdownService'

    public static get instance(): CountdownService {
        return this._instance || (this._instance = new this())
    }

    public get countdowns(): CountdownCollection { return this._countdowns }

    public get items() {
        return this.countdowns.items
    }

    private constructor() {
        super()
        this.load()
    }

    public load(): void {
        let countdowns: string | null = localStorage.getItem(this.name)
        if (countdowns) {
            this._countdowns = new CountdownCollection(JSON.parse(countdowns))
        } else {
            let legacyCountdowns: string | null = localStorage.getItem('countdowns')
            let currentCountdown: string | null = localStorage.getItem('currentCountdown')

            if (legacyCountdowns) {
                this._countdowns = new CountdownCollection({
                    items: JSON.parse(legacyCountdowns),
                    currentIndex: currentCountdown ? parseInt(currentCountdown) : 0
                })

            } else { // If no data is present, provide default data
                this._countdowns = new CountdownCollection(DEFAULT_COUNTDOWNS)
            }
        }

        this._countdowns.subscribe(this.name, () => {
            this.save()
        })

        this.save()
    }

    public save(): void {
        localStorage.setItem(this.name, JSON.stringify(this.countdowns))
        this.updateSubscribers()
    }

    public reset(): void {
        this._countdowns = new CountdownCollection(DEFAULT_COUNTDOWNS);
        this.save()
    }
}
