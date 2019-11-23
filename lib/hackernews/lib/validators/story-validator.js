const axios = require('axios');

const {
    HackernewsInvalidStoryError,
    HackernewsInvalidIdError,
} = require('../errors');

const _checkLength = (str) => str && str.length <= 256;

const _checkPositiveInteger = num => Number.isInteger(num) && num >= 0;

const _checkUrlValidity = async url => {
    try {
        return (await axios.head(url)).status === 200;
    } catch (error) {
        try {
            return (await axios.head(url)).status === 200;
        } catch (error) {
            return false;
        }
    }
}

const _checkIsNull = story => story === null;

const _validateFields = ({by, descendants, score, title, url, type}) =>
    (!_checkLength(by)
        || !_checkLength(title)
        || !_checkPositiveInteger(score)
        || !_checkPositiveInteger(descendants)
        || !_checkUrlValidity(url)
);


const storyValidator = story => {
    if (_checkIsNull(story)) {
        throw HackernewsInvalidIdError;
    }
    if (_validateFields(story)) {
        throw HackernewsInvalidStoryError;
    }
}

module.exports = {
    _checkLength,
    _checkPositiveInteger,
    _checkUrlValidity,
    _checkIsNull,
    _validateFields,
    storyValidator,
};
