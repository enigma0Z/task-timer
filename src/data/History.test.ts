import { HistoryItem, HistoryItemCollection } from "./History"

test('History object constructable from named parameters', () => {
    let actual = new HistoryItem({ name: 'foo', start: 1, end: 2 });
    expect(actual.name).toBe('foo');
    expect(actual.start).toBe(1);
    expect(actual.end).toBe(2);
})

test('History object constructable declared object', () => {
    let actualParams = { name: 'foo', start: 1, end: 2 }
    let actual = new HistoryItem(actualParams);
    expect(actual.name).toBe('foo');
    expect(actual.start).toBe(1);
    expect(actual.end).toBe(2);

    expect(JSON.stringify(actual)).toBe(JSON.stringify(actualParams));
})

test('HistoryCollection constructable from list of objects', () => {
    let actualParams = {items: [
        { name: 'foo', start: 1, end: 2 },
        { name: 'bar', start: 3, end: 4 }
    ]}

    let actual = new HistoryItemCollection(actualParams);
    expect(actual.items[0].name).toBe('foo');
    expect(actual.items[1].name).toBe('bar');
    expect(actual.items[0].start).toBe(1);
    expect(actual.items[0].end).toBe(2);
    expect(actual.items[1].start).toBe(3);
    expect(actual.items[1].end).toBe(4);

    expect(JSON.stringify(actual)).toBe(JSON.stringify(actualParams));
})

test('HistoryCollection constructable from empty', () => {
    let actual = new HistoryItemCollection({});
    let expected = { items: [] }
    expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
    expect(JSON.stringify(new HistoryItemCollection())).toBe(JSON.stringify(expected))
})
