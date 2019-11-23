# Hacker News Scraper Test

Simple command line application output to STDOUT in JSON the 
top posts from [HackerNews](https://news.ycombinator.com/news) in the following format:
```json
[
    {
        "title": "Web Scraping in 2016",
        "uri": "https://franciskim.co/2016/08/24/dont-need-no-stinking-api-web-scraping-2016-beyond/",
        "author": "franciskim",
        "points": 133,
        "comments": 80,
        "rank": 1
    },
    {
        "title": "Instapaper is joining Pinterest",
        "uri": "http://blog.instapaper.com/post/149374303661",
        "author": "ropiku",
        "points": 182,
        "comments": 99,
        "rank": 2
    }
]
```


## Hacker News API
Hacker News expose most of their data through their [API](https://github.com/HackerNews/API)

### Top Stories List
https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty

This endpoint return the ids of the top 500 stories.
The stories are ordered by rank ascending, so the first element of the array is the rank 1 story.

### Item details
https://hacker-news.firebaseio.com/v0/item/<id>.json?print=pretty

This endpoint returns the different data about an item.
We are using this endpoint to get the data about the story ids returned by the Top Stories List endpoint.

## Install
This is a [Node.js](https://nodejs.org/en/) project,

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install
```

## Start
You can run the command:
```bash
node index.js --posts n
```
Where n is the number of posts to be fetched.

## Docker
You can use docker to build the image:
```bash
docker build -t hackerank .
```

Then you can run the command:
```bash
docker run hackerank --posts n
```

## Tests
To run the test suite, first install the dependencies, then run npm test:
```bash
$ npm install
$ npm test
```

## Libraries

### Axios (http request library)

Axios compared to the request library supports Promise API. 

### Jest (testing framework)
Some of the advantages of Jest:
- out of the box, does not require any setup
- mocking, assertion and code coverage are already built in (no need to install chai, sinon...)


