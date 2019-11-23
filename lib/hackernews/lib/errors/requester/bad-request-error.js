class BadRequestError extends Error {
  constructor(error) {
    super('Something happened in setting up the request');
    this.name = this.constructor.name;
    // Attach full error to error object
    this.error  = error;
  }
}

module.exports = BadRequestError;
