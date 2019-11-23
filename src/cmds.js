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

const formatStory = ({title, author, uri, points, comments}, rank) => {
    return {
        title,
        author,
        uri,
        points,
        comments,
        rank,
    };
}

const showTopNStories = async n => {
    _validateN(n);

    const hackernews = new Hackernews();

    const topNStoriesIds = (await hackernews.getTopStories()).slice(0, n);
    const topNStories = await Promise.all(topNStoriesIds.map(
        async (id, index) => formatStory(await hackernews.getStory(id), index + 1)
    ));

    console.log(JSON.stringify(topNStories, null, 4));
}

const cmds = {
    '--posts': showTopNStories,
};

module.exports = {
    _validateN,
    showTopNStories,
    cmds,
};
