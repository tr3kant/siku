/* Disable ES6-Specific Rules */
/* eslint-disable no-var, prefer-template */
var version = require('./package.json').version;

var cdnUrl = '//static.skyassets.com/assets/toolkit-core/v' + version + '/toolkit-core.min.css';
var cdnTag = '<link rel="stylesheet" href="' + cdnUrl + '">';

module.exports = {
  cdnUrl,
  cdnTag,
};
