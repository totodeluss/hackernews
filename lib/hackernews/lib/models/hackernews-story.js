const HackernewsItem = require('./hackernews-item');

/**
 * @class
 * @constructor
 * @public
 */
class HackernewsStory extends HackernewsItem{
    constructor(response) {
        super(response);
        /**
         * Title of the story
         * @type {string}
         * @public
         */
        this.title = response.title;
        /**
         * Author of the story
         * @type {string}
         * @public
         */
        this.author = response.by;
        /**
         * Uri of the story
         * @type {string}
         * @public
         */
        this.uri = response.url;
        /**
         * Points of the story
         * @type {number}
         * @public
         */
        this.points = response.score;
        /**
         * Number of comments on the story
         * @type {number}
         * @public
         */
        this.comments = response.descendants;
    }
}

module.exports = HackernewsStory;
