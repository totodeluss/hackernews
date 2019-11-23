const Hackernews = require('../lib/hackernews');

/**
 * Validate if the parameter n for the --post cmd
 * is within the defined range
 * @param {number} n
 * @returns {boolean}
 */
const _validateN = n => {
    if (n <= 0 || n > 100) {
        throw new Error('Invalid value for n');
    }
};

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

const _getTopNStories = async n => {
    _validateN(n);

    const hackernews = new Hackernews();

    const topNStoriesIds = (await hackernews.getTopStories()).slice(0, n);
    return await Promise.all(topNStoriesIds.map(
        async (id, index) => _formatItem(await hackernews.getItem(id), index + 1)
    ));
};

const cmds = {
    '--posts': async (n) => console.log(JSON.stringify(await _getTopNStories(n), null, 4)),
};

module.exports = {
    _validateN,
    _formatItem,
    _getTopNStories,
    cmds,
};
