const NoResponseError = require('./requester/no-response-error');
const BadRequestError = require('./requester/bad-request-error');

const HackernewsUnknownError = require('./hackernews/hackernews-unknown-error');

const Errors = {
  NoResponseError,
  BadRequestError,
  HackernewsUnknownError,
  HackernewsInvalidItemError: new Error('Invalid item fields'),
  HackernewsInvalidIdError: new Error('Invalid story id'),
};

module.exports = Errors;
