/**
 * @class
 * @constructor
 * @public
 */
class HackernewsItem {
  constructor(response) {
    /**
     * Item ID
     * @type {string}
     * @public
     */
    this.id = response.id;
  }
}

module.exports = HackernewsItem;

