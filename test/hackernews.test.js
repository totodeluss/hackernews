const Hackernews = require('../lib/hackernews');

const {
    HackernewsInvalidIdError,
} = require('../lib/hackernews/lib/errors');

describe('Hackernews', () => {
    describe('getItem', () => {

        describe('when the item id is invalid', () => {
            let hackernews;
            let error;

            beforeAll(async () => {
                hackernews = new Hackernews();
                hackernews.requester = {
                    get: getMethod,
                };
                getMethod.mockReturnValueOnce({data: null});
                try {
                    await hackernews.getItem(1)
                } catch (e) {
                    error = e;
                }
            });

            it('throw an error', () =>
                expect(error).toEqual(HackernewsInvalidIdError));
        });

    });

    describe('getTopStories', () => {

        describe('when doing a successfull request', () => {
            let res;

            beforeAll(async () => {
                const hackernews = new Hackernews();
                res = await hackernews.getTopStories()
            });

            it('returns an array of lenght 500', () =>
                expect(res.length).toEqual(500));

            it('each element of the array is a number', () =>
                res.forEach(element => expect(typeof element).toEqual('number')));
        });

    });
});
