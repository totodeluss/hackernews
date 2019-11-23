const axios = require('axios');

const {
    NoResponseError,
    BadRequestError,

    HackernewsUnknownError,
} = require('./errors');

/**
 * Configures an instance of Axios, which handles all outgoing requests.
 * Attaching defaults to all requests and throws SE related errors.
 */
class HackernewsRequester {
    /**
     * HackernewsRequester Constructor
     * @param {string} baseURL - base URL for all requests.
     * @param {object} headers - default headers to set for all requests.
     */
    constructor(baseURL, headers) {
        // Configure default requests instance
        this.core = axios.create({baseURL});
    }

    /**
     * Wraps requests made to throw explicit error
     * @param {Function} requestFunc - Axios request method
     * @param  {...any} params - params required for Axios request method `requestFunc`
     *
     * @throws {NoResponseError}
     * @throws {BadRequestError}
     */
    async _wrappedSERequest(requestFunc, ...params) {
        try {
            return await requestFunc(...params);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // This must be a SaltEdge error response.
                throw new HackernewsUnknownError(error);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of http.ClientRequest.
                throw new NoResponseError(error);
            } else {
                // Something happened in setting up the request that triggered an Error
                throw new BadRequestError(error);
            }
        }

    }

    async get(url) {
        return await this._wrappedSERequest(this.core.get, url);
    }
}

module.exports = HackernewsRequester;
