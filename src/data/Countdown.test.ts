import { Countdown, CountdownCollection } from "./Countdown";

test('Countdown object constructable', () => {
    let actual = new Countdown({
        name: 'foo',
        min: 1,
        value: 2,
        max: 3,
    });

    expect(JSON.stringify(actual)).toBe(JSON.stringify({
        running: false,
        paused: false,
        name: 'foo',
        min: 1,
        max: 3,
        value: 2,
        intervalMs: 1000
    }));
})

test('Countdown duration calculated correctly', () => {
    let actual = new Countdown({
        name: 'foo',
        min: 1,
        value: 2,
        max: 3,
    })
    expect(actual.secondsLeft).toBe(0)
    actual.start()
    expect(actual.secondsLeft).toBeLessThanOrEqual(120)
    expect(actual.secondsLeft).toBeGreaterThan(0)
    actual.stop()
})

test('CountdownCollection constructable from list of objects', () => {
    let actualParams = {
        items: [{
            running: false,
            paused: false,
            name: 'foo',
            min: 1,
            max: 3,
            value: 2,
            intervalMs: 1000,
        }, {
            running: false,
            paused: false,
            name: 'bar',
            min: 4,
            max: 6,
            value: 5,
            intervalMs: 1000,
        }],
        currentIndex: 0
    }

    let actual = new CountdownCollection(actualParams);
    expect(actual.items[0].name).toBe('foo');
    expect(actual.items[0].min).toBe(1);
    expect(actual.items[0].value).toBe(2);
    expect(actual.items[0].max).toBe(3);
    expect(actual.items[1].name).toBe('bar');
    expect(actual.items[1].min).toBe(4);
    expect(actual.items[1].value).toBe(5);
    expect(actual.items[1].max).toBe(6);

    expect(JSON.stringify(actual)).toBe(JSON.stringify(actualParams));
})

test('CountdownCollection constructable from empty', () => {
    let actual = new CountdownCollection();
    let expected = { items: [], currentIndex: 0 }
    expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
    expect(JSON.stringify(new CountdownCollection())).toBe(JSON.stringify(expected))
})
