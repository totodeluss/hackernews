const Hackernews = require('../lib/hackernews');

/**
 * Validate if the parameter n for the --post cmd
 * is within the defined range
 * @param {number} n
 * @throws Error
 */
const _validateN = n => {
    if (n <= 0 || n > 100) {
        throw new Error('Invalid value for n');
    }
};

/**
 * Extract the fields that need to be displayed
 * @param {hackernewItem}
 * @param {number} rank
 * @returns {object} formatted item
 */
const _formatItem = ({title, author, uri, points, comments}, rank) => {
    return {
        title,
        author,
        uri,
        points,
        comments,
        rank,
    };
};

/**
 * return the n top stories ids from hackernews
 * ordered by rank
 * @param {hackernews}
 * @param {number} number of ids to be retourned
 * @returns [item ids] array of item's ids
 */
const _getTopNStoriesIds = async (hackernews, n) => (await hackernews.getTopStories()).slice(0, n);

/**
 * return the n top items ordered by rank
 * @param {hackernews}
 * @param [item ids] array of item's ids
 * @returns {[hackernews items]} array of items
 */
const _getTopNStories = async (hackernews, ids) => await Promise.all(ids.map(
    async (id, index) => _formatItem(await hackernews.getItem(id), index + 1)
));

const _topNStories = async n => {
    _validateN(n);
    const hackernews = new Hackernews();

    return await _getTopNStories(hackernews, await _getTopNStoriesIds(hackernews, n));
};

const cmds = {
    '--posts': async (n) => console.log(JSON.stringify(await _topNStories(n), null, 4)),
};

module.exports = {
    _validateN,
    _formatItem,
    _getTopNStories,
    cmds,
};
