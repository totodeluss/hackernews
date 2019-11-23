class HackernewsUnknownError extends Error {
  constructor(error) {
    super('Unknown error fron Hackernews API');
    this.name = this.constructor.name;
    // Attach full error to error object
    this.error  = error;
  }
}

module.exports = HackernewsUnknownError;
