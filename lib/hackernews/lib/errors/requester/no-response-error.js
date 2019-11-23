
class NoResponseError extends Error {
  constructor(error) {
    super(`
      The request was made but no response was recieved.
      \`error.request is an instance of http.ClientRequest\`
    `);
    this.name = this.constructor.name;
    // Attach full error to error object
    this.error  = error;
  }
}

module.exports = NoResponseError;
