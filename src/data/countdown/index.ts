export class Countdown {
    constructor(
        public name: string,
        public min: number,
        public max: number,
        public value: number,
        public next?: Countdown
    ) { }

    setNext(timer: Countdown) {
        this.next = timer
    }
}
