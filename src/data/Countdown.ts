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
    secondsLeft?: number,
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
    private _secondsLeft: number = 0;

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
        this._secondsLeft = countdown.secondsLeft ? countdown.secondsLeft : 0
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
            secondsLeft: this.secondsLeft,
            name: this.name,
            min: this.min,
            max: this.max,
            value: this.value,
            intervalMs: this.intervalMs,
        }
    }

    public get name(): string { return this._name }
    public set name(name: string) { this._name = name }

    public get secondsLeft(): number { return this._secondsLeft }

    public get running(): boolean { return this._running }
    public get paused(): boolean { return this._paused }

    public get value(): number { return this._value }
    public set value(value: number) { this._value = value }

    public get min(): number { return this._min ? this._min : DEFAULT_MIN }
    public set min(min: number) { this._min = min }

    public get max(): number { return this._max ? this._max : DEFAULT_MAX }
    public set max(max: number) { this._max = max }

    public get intervalMs(): number { return this._intervalMs ? this._intervalMs : DEFAULT_INTERVAL_MS }

    public get startTime(): number | undefined { return this._startTime }
    public get endTime(): number | undefined { return this._endTime }

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
                this._endTime = Date.now() + (this._secondsLeft * 1000)
            }

            this.update()
        }
    }

    update() {
        if (this.endTime !== undefined && !this.paused) {
            this._secondsLeft = Math.floor((this.endTime - Date.now()) / 1000)
            if (this._running && this.secondsLeft > 0) {
                this.timeout = setTimeout(() => this.update(), this.intervalMs)
            } else {
                this._running = false
                this._secondsLeft = 0
                clearTimeout(this.timeout)
            }
        }

        this.updateSubscribers()
    }
}
