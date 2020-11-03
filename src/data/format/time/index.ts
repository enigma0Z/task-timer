
export class TimeFormat {
    static seconds(timerSeconds: number): string {
        let hours = Math.floor(timerSeconds / 60 / 60)
        let minutes = Math.floor((timerSeconds - (hours * 60 * 60)) / 60)
        let seconds = Math.floor(timerSeconds - (hours * 60 * 60) - (minutes * 60))

        let returnStr: string[] = []

        if (hours > 0) {
            returnStr.push(`${hours}h`)
        }

        if (minutes > 0) {
            returnStr.push(`${minutes}m`)
        }

        returnStr.push(`${seconds}s`)

        return returnStr.join(' ')
    }

    static minutes(timerMinutes: number): string {
        let hours = Math.floor(timerMinutes / 60)
        let minutes = timerMinutes - (hours * 60)

        let returnStr: string[] = []

        if (hours > 0) {
            returnStr.push(`${hours}h`)
        }

        returnStr.push(`${minutes}m`)

        return returnStr.join(' ')
    }
}
