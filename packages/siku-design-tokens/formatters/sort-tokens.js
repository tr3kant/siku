const sortBy  = require('lodash/sortBy');

const sortObjByKey = obj =>
  Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      // eslint-disable-next-line no-param-reassign
      result[key] = obj[key];
      return result;
    }, {});

module.exports = (json) => {
  const aliases = sortObjByKey(json.aliases);
  const props = sortBy(json.props, 'name');
  const options = sortObjByKey(json.options);
  return { aliases, props, options };
};

