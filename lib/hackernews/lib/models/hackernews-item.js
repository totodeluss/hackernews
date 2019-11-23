const axios = require('axios');

/**
 * @class
 * @constructor
 * @public
 */
class HackernewsItem {
  constructor(response) {
    return (async () => {
      /**
       * Item ID
       * @type {string}
       * @public
       */
      this.id = response.id;
      /**
       * Title of the story
       * @type {string}
       * @public
       */
      this.title = HackernewsItem._checkLength(response.title) ? response.title : 'invalid title';
      /**
       * Author of the story
       * @type {string}
       * @public
       */
      this.author = HackernewsItem._checkLength(response.by) ? response.by : 'invalid author';
      /**
       * Uri of the story
       * @type {string}
       * @public
       */
      this.uri = (await HackernewsItem._checkUrlValidity(response.url)) ? response.url : 'invalid uri';
      /**
       * Points of the story
       * @type {number}
       * @public
       */
      this.points = HackernewsItem._checkPositiveInteger(response.score) ? response.score : 'invalid points';
      /**
       * Number of comments on the story
       * @type {number}
       * @public
       */
      this.comments = HackernewsItem._checkPositiveInteger(response.descendants) ? response.descendants : 'invalid comments number';

      return this;
    })();
  }

  static async _checkUrlValidity(url) {
    try {
      return (await axios.head(url)).status === 200;
    } catch (error) {
      try {
        return (await axios.get(url)).status === 200;
      } catch (error) {
        return false;
      }
    }
  }

  static _checkLength(str) {
    return str && str.length <= 256;
  }

  static _checkPositiveInteger(num) {
    return Number.isInteger(num) && num >= 0;
  }

}

module.exports = HackernewsItem;
