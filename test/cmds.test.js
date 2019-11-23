const {
    _validateN,
    _formatItem,
    _getTopNStories,
} = require('../src/cmds');

const Hackernews = require('../lib/hackernews');
const hackernews = new Hackernews();

describe('lib', () => {

    describe('_validateN', () => {

        describe('with n within the range', () => {
            it('not throw error if n = 1', () =>
                expect(() => {_validateN(1)}).not.toThrow());
            it('not throw error if n = 100', () =>
                expect(() => {_validateN(100)}).not.toThrow());
        });

        describe('with n outdside the range', () => {
            it('throw error if n = 0', () =>
                expect(() => {_validateN(0)}).toThrow());
            it('throw error if n > 100', () =>
                expect(() => {_validateN(101)}).toThrow());
            it('throw error if n < 0', () =>
                expect(() => {_validateN(-1)}).toThrow());
        });
    });

    describe('_formatItem', () => {

        describe('with a valid raw item', () => {
            const rawItem =  {
                author: 'atestu',
                comments: 3,
                id: 21572573,
                points: 15,
                time: 1574169645,
                title: 'Show HN: Oversaid – Keeping track of who said what in tech',
                uri: 'https://www.oversaid.com'
            };
            const rank = 10;
            const keys =  ['title', 'uri', 'author', 'comments', 'points'];

            let formattedItem;

            beforeAll(() => {
                formattedItem = _formatItem(rawItem, rank);
            });

            it('the result should have the correct rank', () =>
                expect(formattedItem.rank).toEqual(rank));

            it('the fields should be correctly mapped', () =>
                keys.forEach(key => expect(formattedItem[key]).toEqual(rawItem[key])));
        });

    });

    describe('_getTopNStories', () => {

        describe('when it successfully get the top n stories', () => {
            const expectedFields = ['title', 'uri', 'author', 'comments', 'points'];
            let rawResponse;
            const ids = [
                21572573,
                21569610,
                21567556,
            ];

            beforeAll(async () => {
                rawResponse = await _getTopNStories(hackernews, ids);
            }, 30000);

            it('return an array with the same length as the ids', () =>
                expect(rawResponse.length).toEqual(ids.length));

            it('reponse objects have the expected fields', () =>
                rawResponse.forEach(res => {
                    let keys = Object.keys(res);
                    expectedFields.forEach(field => expect(keys.includes(field)).toEqual(true));
                }));
        });

    });
});
