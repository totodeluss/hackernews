const HackernewsRequester = require('./lib/hackernews-requester');

const {
    HackernewsInvalidStoryError,
    HackernewsInvalidIdError,
} = require('./lib/errors');

const {
    HackernewsStory,
} = require('./lib/models');

const {
    storyValidator,
} = require('./lib/validators');

/** Wrapper lib around Hackernews API requests. */
class Hackernews {
    /**
     * Hackernews constructor
     */
    constructor() {
        this.requester = this._createRequester();
    }

    /**
     * Create and configure HackernewsRequester, settings default
     * baseUrl for subsequent requests.
     * @return {HackernewsRequester} a configured instance of HackernewsRequester.
     * @private
     */
    _createRequester() {
        const domain = 'hacker-news.firebaseio.com';
        const basePath = '/v0';

        const baseURL = `https://${domain}${basePath}`;

        // Configure default requests instance
        return new HackernewsRequester(baseURL);
    }

    /**
     * Returns a single story object.
     * @returns {HackernewsStory}
     *
     * @throws {NoResponseError}
     * @throws {BadRequestError}
     * @throws {HackernewsInvalidStoryError}
     * @throws {HackernewsInvalidIdError}
     * @throws {HackernewsUnknownError}
     */
    async getStory(storyId) {
        try {
            let url = `/item/${storyId}.json?print=pretty`;
            const {data} = await this.requester.get(url);
            storyValidator(data);

            return new HackernewsStory(data);
        } catch (error) {
            switch (error) {
                case HackernewsInvalidStoryError:
                    console.debug(`Invalid story fields for id: ${storyId}`);
                    throw error;
                case HackernewsInvalidIdError:
                    console.debug(`Invalid story id: ${storyId}`);
                    throw error;
                default:
                    throw error;
            }
        }
    }

    /**
     * Returns an array of items ids
     * @returns {[number]} array of ids
     *
     * @throws {NoResponseError}
     * @throws {BadRequestError}
     * @throws {HackernewsUnknownError}
     */
    async getTopStories() {
        try {
            let url = `/topstories.json?print=pretty`;
            const {data} = await this.requester.get(url);;

            return data;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Hackernews;
