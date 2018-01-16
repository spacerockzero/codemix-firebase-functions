const jsync = require('asyncawait/async');
const jwait = require('asyncawait/await');
const pify = require('pify');
const parser = require('rss-parser');
const url = require('url');
const parseURL = pify(parser.parseURL);

const NEWS_RSS_URL = 'https://news.google.com/news/rss/search/section/q/';

const getFeed = jsync(topic => {
  // get feed, return big json
  const feed = jwait(parseURL(`${NEWS_RSS_URL}${topic}`));
  return feed.feed.entries;
});

const cleanObjects = objects => {
  const objs = objects.map(item => {
    console.log('raw article:', item);
    const cleanObj = {
      title: item.title,
      link: item.link
    };
    // from aggregator
    if (item.categories) {
      cleanObj.categories = item.categories;
    }
    return cleanObj;
  });
  return objs;
};

const getNews = jsync(topic => {
  // get news on given topic from google news rss
  const content = jwait(getFeed(topic));
  // clean it up
  const cleanedContent = cleanObjects(content);
  // return filtered content as json
  return cleanedContent;
});

module.exports = {
  getFeed,
  cleanObjects,
  getNews
};
