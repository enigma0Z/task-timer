import { Subscribable } from "./Subscribable";

const DEFAULT_MIN = 1
const DEFAULT_MAX = 90
const DEFAULT_INTERVAL_MS = 1000

const SHORT_TIMER = false // For debug purposes

export interface CountdownObject {
    name?: string,
    min?: number,
    max?: number,
    startTime?: any,
    endTime?: any,
    running?: boolean,
    paused?: boolean
    value?: number,
    intervalMs?: number,
}

export class Countdown extends Subscribable {
    private timeout: any

    private _startTime?: number = undefined;
    private _endTime?: number = undefined;

    private _running: boolean = false
    private _paused: boolean = false

    private _name: string = 'NEW'
    private _min: number = 1
    private _max: number = 90
    private _value: number = 0
    private _intervalMs: number = 1000

    public constructor(countdown: CountdownObject) {
        super()
        this._startTime = countdown.startTime
        this._endTime = countdown.endTime
        this._running = countdown.running === true
        this._paused = countdown.paused === true
        this._name = countdown.name ? countdown.name : 'NEW'
        this._min = countdown.min ? countdown.min : DEFAULT_MIN
        this._max = countdown.max ? countdown.max : DEFAULT_MAX
        this._value = countdown.value ? countdown.value : this._min
        this._intervalMs = countdown.intervalMs ? countdown.intervalMs : DEFAULT_INTERVAL_MS
    }

    public toJSON(): CountdownObject {
        return {
            startTime: this.startTime,
            endTime: this.endTime,
            running: this.running,
            paused: this.paused,
            name: this.name,
            min: this.min,
            max: this.max,
            value: this.value,
            intervalMs: this.intervalMs,
        }
    }

    public get name(): string { return this._name }
    public set name(name: string) { this._name = name; this.updateSubscribers() }

    public get running(): boolean { return this._running }
    public get paused(): boolean { return this._paused; }

    public get value(): number { return this._value }
    public set value(value: number) { this._value = value; this.updateSubscribers() }

    public get min(): number { return this._min ? this._min : DEFAULT_MIN }
    public set min(min: number) { this._min = min; this.updateSubscribers() }

    public get max(): number { return this._max ? this._max : DEFAULT_MAX }
    public set max(max: number) { this._max = max; this.updateSubscribers() }

    public get intervalMs(): number { return this._intervalMs ? this._intervalMs : DEFAULT_INTERVAL_MS }

    public get startTime(): number | undefined { return this._startTime }
    public get endTime(): number | undefined { return this._endTime }

    public get secondsLeft(): number {
        if (this.running && this.endTime) {
            return Math.floor((this.endTime - Date.now()) / 1000)
        } else {
            return 0
        }
    }

    start() {
        this._running = true
        this._startTime = Date.now()
        if (SHORT_TIMER) {
            this._endTime = this._startTime + 2 * 1000
        } else {
            this._endTime = this._startTime + (this.value * 60 * 1000)
        }

        this.update()
    }

    stop() {
        this._running = false
        this._paused = false
        this.update()
    }

    pause() {
        if (this.running) {
            this._paused = !this._paused
            if (!this.paused) {
                this._endTime = Date.now() + (this.secondsLeft * 1000)
            }

            this.update()
        }
    }

    update() {
        if (this.endTime !== undefined && !this.paused) {
            if (this.secondsLeft > 0) {
                this.timeout = setTimeout(() => this.update(), this.intervalMs)
            } else {
                this._running = false
                this._endTime = Date.now()
                clearTimeout(this.timeout)
            }
        }

        this.updateSubscribers()
    }
}

export interface CountdownCollectionObject {
    readonly items: CountdownObject[]
    currentIndex?: number
}

export class CountdownCollection extends Subscribable implements CountdownCollectionObject {
    private _items: Countdown[] = []
    private _currentIndex = 0

    constructor(collection?: CountdownCollectionObject) {
        super()
        if (collection?.items) {
            for (let item of collection.items) {
                this.addItem(item)
            }
        }

        if (collection?.currentIndex) {
            this._currentIndex = collection.currentIndex
        }

        if (this._currentIndex > this.items.length - 1) {
            this._currentIndex = 0
        }
    }

    public get items(): Countdown[] { return this._items }
    public get currentIndex(): number { return this._currentIndex }
    public get current(): Countdown { return this.items[this.currentIndex] }
    public get nextIndex(): number { return (this.currentIndex + 1) % this.items.length }
    public get next(): Countdown { return this.items[this.nextIndex] }
    public get runningCountdown(): Countdown | null {
        return this.items.filter((countdown: Countdown) => countdown.running)[0]
    }

    public advance(): void {
        this._currentIndex = this.nextIndex
        this.updateSubscribers()
    }

    public toJSON(): CountdownCollectionObject {
        return {
            items: this.items,
            currentIndex: this.currentIndex
        }
    }

    public addItem(countdownObject: CountdownObject): void {
        if (countdownObject !== null) {
            let countdown: Countdown = new Countdown(countdownObject)
            countdown.subscribe('CountdownCollection', () => {
                this.updateSubscribers()
            })

            this.items.push(countdown)
        }
        this.updateSubscribers()
    }

    public deleteItem(index: number) {
        delete this.items[index]
        this.updateSubscribers()
    }

    public swapItems(a: number, b: number) {
        let lower: number
        let higher: number
        if (a < b) {
            lower = a
            higher = b
        } else if (b < a) {
            lower = b
            higher = a
        } else {
            throw new RangeError('Cannot swap an element with itself')
        }

        if (this.currentIndex === lower) this._currentIndex = higher;
        else if (this.currentIndex === higher) this._currentIndex = lower;

        this._items = [
            ...this.items.slice(0, lower),
            this.items[higher],
            this.items[lower],
            ...this.items.slice(higher + 1)
        ]

        this.updateSubscribers()
    }

    public getItem(index: number): Countdown {
        return this.items[index]
    }
}
